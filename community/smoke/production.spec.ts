import { test, expect } from "@playwright/test";
import nextConfig from "../next.config";

/**
 * Fumée de production : on interroge le site réel (ou un serveur local via
 * SMOKE_BASE_URL), jamais un rendu simulé. Un code 200 ne prouve pas qu'une
 * page fonctionne : le 2026-08-16, /suite/ a répondu 200 en affichant une
 * page blanche pendant une journée. Ces tests regardent donc du CONTENU
 * RENDU, les erreurs de page, la géométrie et les métadonnées.
 *
 * Le site vitrine a remplacé la communauté le 2026-09-13. Cette liste EST la
 * couverture : une page nouvelle s'ajoute ici en même temps qu'au plan du
 * site (src/app/sitemap.ts). Les routes retirées (/explore, /articles,
 * /journal, /join…) ne sont plus des parcours : elles sont vérifiées comme
 * redirections, plus bas.
 */
const ROUTES = ["/", "/ecosysteme", "/education", "/skills", "/business", "/research", "/play", "/about", "/contact", "/terms", "/privacy"];
const LARGEURS = [320, 390, 768, 1440];

/* La canonique doit porter le domaine public quel que soit l'endroit où le
   serveur tourne : c'est tout l'objet de SITE_URL (src/lib/site.ts). */
const ORIGINE_PUBLIQUE = "https://kogiagroup.com";

for (const route of ROUTES) {
  test(`${route} : contenu rendu, mise en page et métadonnées`, async ({ page }) => {
    const erreurs: string[] = [];
    page.on("pageerror", (e) => erreurs.push(e.message));
    const reponse = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(reponse?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    expect((await page.locator("main").innerText()).length, "trop peu de texte rendu").toBeGreaterThan(100);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /^https:\/\//);

    /* /privacy en ligne portait la canonique de l'accueil : chaque page
       hérite du gabarit si elle oublie la sienne (audit du 2026-09-14). */
    const canonique = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonique?.replace(/\/$/, ""), `${route} : canonique absente ou vers une autre page`)
      .toBe(`${ORIGINE_PUBLIQUE}${route}`.replace(/\/$/, ""));

    await page.evaluate(() => document.fonts.ready);
    for (const largeur of LARGEURS) {
      await page.setViewportSize({ width: largeur, height: 844 });
      const deborde = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      expect(deborde, `${route} défile latéralement à ${largeur}px`).toBe(false);
    }
    expect(erreurs, `erreurs de page : ${erreurs.join(" | ")}`).toEqual([]);
  });
}

/* C'est exactement comme ça que /terms et /privacy sont restés en 404 sans
   que rien ne le dise : aucun lien interne ne doit tomber. */
test("aucun lien interne cassé", async ({ page, request }) => {
  const liens = new Set<string>();
  for (const route of ROUTES) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((a) => a.map((e) => e.getAttribute("href") ?? ""));
    for (const href of hrefs) if (href && !href.startsWith("//")) liens.add(href.split("#")[0]);
  }
  const casses: string[] = [];
  for (const href of liens) {
    const r = await request.get(href);
    if (!r.ok()) casses.push(`${href} -> ${r.status()}`);
  }
  expect(casses, `liens internes cassés : ${casses.join(", ")}`).toEqual([]);
});

/* Les redirections sont lues dans next.config.ts lui-même : la liste testée
   ne peut pas diverger de la liste servie. Jusqu'au 2026-10-11, /idees/x.html
   redirigeait vers /articles/x, qui n'existait plus : redirection PUIS 404,
   et aucun test ne suivait la chaîne jusqu'au bout. */
test("chaque redirection configurée aboutit à une page qui existe", async ({ request }) => {
  const redirections = nextConfig.redirects ? await nextConfig.redirects() : [];
  expect(redirections.length).toBeGreaterThan(0);
  const problemes: string[] = [];
  for (const { source, destination } of redirections) {
    // Un chemin concret pour chaque motif : `:slug.html`, `:slug`, `:path*`.
    const exemple = source
      .replace(/:[a-z]+\.html/g, "exemple.html")
      .replace(/:[a-z]+\*/g, "assets/exemple.js")
      .replace(/:[a-z]+/g, "exemple");
    const sans = await request.get(exemple, { maxRedirects: 0 });
    if (sans.status() !== 308 && sans.status() !== 301) {
      problemes.push(`${exemple} répond ${sans.status()} au lieu d'une redirection permanente`);
      continue;
    }
    const avec = await request.get(exemple);
    const arrivee = new URL(avec.url()).pathname;
    if (avec.status() !== 200) problemes.push(`${exemple} -> ${arrivee} répond ${avec.status()}`);
    else if (arrivee !== destination.replace(/:[a-z]+\*?/g, "")) problemes.push(`${exemple} arrive sur ${arrivee}, attendu ${destination}`);
  }
  expect(problemes, problemes.join(" · ")).toEqual([]);
});

test("les en-têtes de sécurité sont bien servis", async ({ request }) => {
  const h = (await request.get("/")).headers();
  expect(h["content-security-policy"], "CSP absente").toContain("object-src 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBeTruthy();
  expect(h["x-powered-by"], "la pile ne doit pas s'annoncer").toBeUndefined();
});

test("robots.txt et sitemap.xml existent et se répondent", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const route of ROUTES) expect(xml, `${route} absente du plan du site`).toContain(`${ORIGINE_PUBLIQUE}${route}<`);
});

/* Un <details> sans JavaScript : il doit s'ouvrir au clavier et donner
   accès au contact, le seul parcours de conversion du site. */
test("le menu mobile s'ouvre au clavier et expose le contact", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator("header summary").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("header details")).toHaveAttribute("open", "");
  await expect(page.locator('header details a[href="/contact"]')).toBeVisible();
});

test("les offres Education et le contact restent atteignables", async ({ page }) => {
  await page.goto("/education", { waitUntil: "domcontentloaded" });
  await expect(page.locator('main a[href="https://kogiakids.com"]')).toBeVisible();
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  await expect(page.locator('main a[href^="mailto:"]').first()).toBeVisible();
});

/* Le pied de page affirmait que « les commentaires publiés sont publics »
   sur un site qui n'a plus de commentaires, et /privacy décrivait des
   comptes Supabase retirés : les textes légaux doivent dire le site actuel. */
test("le pied de page et la politique de confidentialité décrivent le site actuel", async ({ page }) => {
  await page.goto("/privacy", { waitUntil: "domcontentloaded" });
  await expect(page.locator("footer")).not.toContainText("commentaires publiés");
  await expect(page.locator("main")).not.toContainText("Supabase");
  await expect(page.locator("main")).toContainText("ni publication de commentaires");
});
