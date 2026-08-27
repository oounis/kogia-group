import { test, expect, type Page } from "@playwright/test";
import { creerCompteTest, codeOtp, supprimerCompteTest, compteExiste, idDuCompte, lireTable }
  from "./aide-auth";

/**
 * Le parcours d'inscription de bout en bout — la lacune que docs/STATUS.md
 * décrivait comme « jamais menée à terme par un vrai nouveau compte ».
 *
 * Ce qui est RÉEL ici : l'interface construite depuis ce dépôt, la
 * vérification du code par Supabase, les politiques RLS, et toutes les
 * écritures en base. Ce qui est SIMULÉ : uniquement l'ENVOI de l'e-mail
 * (`POST /auth/v1/otp`). L'envoi n'est pas la logique testée, il passe par
 * le SMTP intégré de Supabase limité à quelques messages par heure, et il
 * expédierait du courrier à des adresses inventées. Le code à six chiffres
 * utilisé ensuite est un vrai code, obtenu par l'API admin.
 */

const marque = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

/** Intercepte l'envoi du code et retient ce que le client a demandé. */
async function interceptEnvoi(page: Page) {
  const vu: { create_user?: boolean }[] = [];
  await page.route("**/auth/v1/otp*", async (route) => {
    vu.push(JSON.parse(route.request().postData() ?? "{}"));
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });
  return vu;
}

test("/login ne crée pas de compte pour une adresse inconnue", async ({ page }) => {
  const email = `e2e-inconnu-${marque()}@example.com`;
  const vu = await interceptEnvoi(page);

  await page.goto("/login");
  await page.getByLabel("Adresse e-mail").fill(email);
  await page.getByRole("button", { name: /Continuer avec e-mail/ }).click();
  await expect(page.getByLabel("Code reçu par e-mail")).toBeVisible();

  // Le défaut corrigé : /login et /join envoyaient exactement le même appel.
  expect(vu, "aucun appel d'envoi capté").toHaveLength(1);
  expect(vu[0].create_user, "/login demande encore la création du compte").toBe(false);
  expect(await compteExiste(email), "/login a créé un compte").toBe(false);
});

test("/join demande bien la création du compte", async ({ page }) => {
  const email = `e2e-nouveau-${marque()}@example.com`;
  const vu = await interceptEnvoi(page);

  await page.goto("/join");
  await page.getByLabel("Adresse e-mail").fill(email);
  await page.getByRole("button", { name: /Continuer avec e-mail/ }).click();
  await expect(page.getByLabel("Code reçu par e-mail")).toBeVisible();

  expect(vu[0].create_user, "/join ne doit pas refuser la création").toBe(true);
});

test("un compte neuf va jusqu'au bout, et tout est écrit en base", async ({ page }) => {
  const tampon = marque();
  const email = `e2e-parcours-${tampon}@example.com`;
  const handle = `e2e_${tampon}`.slice(0, 30);
  let userId: string | null = null;

  try {
    // Un compte d'authentification existe, sans ligne `profiles` : l'état
    // exact d'une personne qui vient de recevoir son premier code.
    userId = await creerCompteTest(email);
    await interceptEnvoi(page);

    await page.goto("/login");
    await page.getByLabel("Adresse e-mail").fill(email);
    await page.getByRole("button", { name: /Continuer avec e-mail/ }).click();

    // Vrai code, vraie vérification par Supabase.
    // Longueur volontairement non figée : c'est un réglage du projet
    // Supabase (8 chiffres au 2026-08-26), et le champ imposait 6.
    const code = await codeOtp(email);
    expect(code).toMatch(/^[0-9]{6,10}$/);
    const saisi = await page.getByLabel("Code reçu par e-mail").inputValue();
    expect(saisi, "champ pré-rempli, état inattendu").toBe("");
    await page.getByLabel("Code reçu par e-mail").fill(code);
    // Le défaut qui rendait la connexion par e-mail impossible : `maxLength`
    // à 6 tronquait le code réel, donc le champ ne contenait jamais ce que
    // la personne avait reçu.
    expect(await page.getByLabel("Code reçu par e-mail").inputValue(),
      "le champ tronque le code reçu").toBe(code);
    await page.getByRole("button", { name: /Confirmer/ }).click();

    // Défaut 1 : la vérification par code renvoyait vers l'accueil sans
    // jamais regarder `onboarding_completed_at`. Seul le chemin Google le
    // faisait, donc un compte neuf arrivait sans profil ni pseudo.
    await page.waitForURL(/\/onboarding/, { timeout: 30_000 });

    await page.getByLabel("Nom d'utilisateur").fill(handle);
    await page.getByLabel("Nom affiché").fill("Compte de test");
    await page.getByRole("button", { name: /^Continuer$/ }).click();
    await expect(page.getByRole("heading", { name: /Ce qui vous intéresse/ })).toBeVisible();

    // Défaut 4 : le formulaire affirmait une acceptation que rien n'écrivait.
    const consentements = await lireTable(
      "user_consents", `user_id=eq.${userId}&select=document_type,document_version,source`);
    expect(consentements.map((c: { document_type: string }) => c.document_type).sort())
      .toEqual(["privacy", "terms"]);
    expect(consentements[0].source).toBe("onboarding");

    // Défaut 2 : l'écran exigeait des sujets et les jetait.
    const sujets = page.locator("main button[aria-pressed]");
    const dispo = await sujets.count();
    expect(dispo, "aucun sujet en base, `topics` n'est pas peuplé").toBeGreaterThan(0);
    const aChoisir = Math.min(3, dispo);
    for (let i = 0; i < aChoisir; i++) await sujets.nth(i).click();
    await page.getByRole("button", { name: /^Continuer \(/ }).click();

    await page.getByRole("button", { name: /Découvrir Kogia/ }).click();
    await page.waitForURL((u) => !u.pathname.startsWith("/onboarding"), { timeout: 30_000 });

    const choisis = await lireTable("profile_topics", `profile_id=eq.${userId}&select=topic_id`);
    expect(choisis, "les sujets choisis ne sont pas enregistrés").toHaveLength(aChoisir);

    const profils = await lireTable(
      "profiles", `id=eq.${userId}&select=handle,display_name,role,onboarding_completed_at`);
    expect(profils).toHaveLength(1);
    expect(profils[0].handle).toBe(handle);
    expect(profils[0].role, "un compte neuf ne doit jamais naître staff").toBe("member");
    expect(profils[0].onboarding_completed_at, "onboarding non marqué terminé").not.toBeNull();
  } finally {
    const id = userId ?? (await idDuCompte(email));
    if (id) await supprimerCompteTest(id);
  }
});
