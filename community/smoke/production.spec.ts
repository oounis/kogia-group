import { test, expect } from "@playwright/test";

/**
 * Un code 200 ne prouve pas qu'une page fonctionne. Le 2026-08-16, /suite/ a
 * répondu 200 tout en affichant une page complètement blanche pendant une
 * journée : les chemins d'assets relatifs étaient cassés. Aucune
 * vérification de statut ne l'aurait vu. Ces tests regardent donc du CONTENU
 * RENDU, et surveillent aussi les erreurs de console.
 */

test("l'accueil rend le contenu, sans erreur console", async ({ page }) => {
  const erreurs: string[] = [];
  page.on("pageerror", (e) => erreurs.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") erreurs.push(m.text());
  });

  await page.goto("/", { waitUntil: "load" });

  const texte = await page.locator("body").innerText();
  expect(texte.length, "trop peu de texte rendu, montage probablement cassé").toBeGreaterThan(200);
  await expect(page.locator("body")).toContainText("Kogia");
  // Le contenu qui justifie le domaine : au moins un article atteignable.
  await expect(page.locator('a[href*="/articles/"]').first()).toBeVisible();

  expect(erreurs, `erreurs console : ${erreurs.join(" | ")}`).toEqual([]);
});

test("un article réel s'affiche entièrement", async ({ page }) => {
  await page.goto("/articles/kharbga-from-sand-to-screen", { waitUntil: "load" });
  await expect(page.locator("h1")).toBeVisible();
  const texte = await page.locator("main").innerText();
  // Un article long : s'il ne rend que son titre, la base ne répond plus.
  expect(texte.length, "le corps de l'article est absent").toBeGreaterThan(2000);
});

test("/explore liste au moins un article", async ({ page }) => {
  await page.goto("/explore", { waitUntil: "load" });
  await expect(page.locator('a[href*="/articles/"]').first()).toBeVisible();
});

test("la démo /suite/ démarre vraiment (le piège du 2026-08-16)", async ({ page }) => {
  await page.goto("/suite/", { waitUntil: "load" });
  await page.waitForTimeout(1500); // application Vite, montage client
  const texte = await page.locator("body").innerText();
  expect(texte.length, "la démo répond mais n'affiche rien — chemins d'assets cassés ?").toBeGreaterThan(100);
});

test("les anciennes URL partagées redirigent au lieu de tomber en 404", async ({ page }) => {
  // Ces liens ont été publiés sur Facebook et Reddit avant le transfert de
  // domaine : s'ils cassent, le référencement acquis est perdu.
  const reponse = await page.goto("/idees/kharbga-from-sand-to-screen.html", { waitUntil: "load" });
  expect(reponse?.status()).toBe(200);
  expect(page.url()).toContain("/articles/kharbga-from-sand-to-screen");
});

/* ═══ Géométrie : TOUTES les routes publiques × TOUTES les largeurs ═══
   Première version : seul l'accueil, à 390 et 768 px. Elle passait au vert
   pendant que l'article débordait de 165 px à 320 px et que les pages
   d'authentification débordaient à 320 px. Une matrice trop étroite donne
   une fausse assurance — c'est pire que pas de test, parce qu'on s'y fie. */
/* Les quatre routes de vitrine ont été livrées le 2026-09-02 sans entrer dans
   cette liste, et la liste EST la couverture : la géométrie et la structure
   de titres n'en vérifiaient donc aucune. Deux débordements sont passés en
   production le jour même, tous deux à 320 px seulement, tous deux invisibles
   pour la matrice 1440/390 utilisée à la main pendant le développement.
   Une page nouvelle s'ajoute ici en même temps qu'elle s'ajoute au site. */
const ROUTES_PUBLIQUES = [
  "/",
  "/explore",
  "/about",
  "/realisations",
  "/realisations/coreon-edu",
  "/journal",
  "/savoir-faire",
  "/articles/kharbga-from-sand-to-screen",
  "/join",
  "/login",
  "/terms",
  "/privacy",
];
const LARGEURS = [320, 360, 375, 390, 412, 768, 1024, 1440];

for (const route of ROUTES_PUBLIQUES) {
  test(`aucun débordement horizontal sur ${route}`, async ({ page }) => {
    const debordements: string[] = [];
    for (const largeur of LARGEURS) {
      await page.setViewportSize({ width: largeur, height: 844 });
      await page.goto(route, { waitUntil: "load" });
      const { scrollW, clientW } = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
      }));
      if (scrollW > clientW + 1) debordements.push(`${largeur}px: +${scrollW - clientW}px`);
    }
    expect(debordements, `${route} défile latéralement — ${debordements.join(", ")}`).toEqual([]);
  });
}

/* Les pages légales sont liées depuis le formulaire d'inscription : on
   demandait aux gens d'accepter des documents qui répondaient 404. */
test("les pages légales liées à l'inscription existent vraiment", async ({ request }) => {
  for (const chemin of ["/terms", "/privacy"]) {
    const r = await request.get(chemin);
    expect(r.status(), `${chemin} devrait exister, il est lié depuis /join`).toBe(200);
    expect((await r.text()).length, `${chemin} répond mais semble vide`).toBeGreaterThan(1500);
  }
});

/* Aucun lien interne ne doit tomber en 404 : c'est exactement comme ça que
   /terms et /privacy sont restés cassés sans que rien ne le dise. */
test("aucun lien interne cassé sur les pages principales", async ({ page, request }) => {
  const vus = new Set<string>();
  const casses: string[] = [];
  for (const depart of ["/", "/about", "/join", "/realisations", "/journal", "/savoir-faire"]) {
    await page.goto(depart, { waitUntil: "load" });
    const liens: string[] = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href^="/"]'))
        .map((a) => (a as HTMLAnchorElement).getAttribute("href")!)
        .filter((h) => !h.startsWith("//"))
    );
    for (const lien of liens) {
      const propre = lien.split("#")[0];
      if (!propre || vus.has(propre)) continue;
      vus.add(propre);
      const r = await request.get(propre);
      if (r.status() >= 400) casses.push(`${propre} -> ${r.status()} (lié depuis ${depart})`);
    }
  }
  expect(casses, `liens internes cassés : ${casses.join(", ")}`).toEqual([]);
});

/* L'image de couverture de l'article a été cassée pendant deux jours sans
   que rien ne le signale : les tests comptaient les caractères du corps, et
   une image morte n'enlève aucun caractère. */
test("les images de l'article se chargent vraiment", async ({ page }) => {
  await page.goto("/articles/kharbga-from-sand-to-screen", { waitUntil: "load" });
  const cassees = await page.evaluate(() =>
    Array.from(document.querySelectorAll("img"))
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src)
  );
  expect(cassees, `images cassées : ${cassees.join(", ")}`).toEqual([]);
});

test("robots.txt et sitemap.xml existent", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/articles/");
});

/* ═══ SÉCURITÉ ═══
   Le 2026-08-18, un compte `role = member` pouvait publier directement via
   l'API (POST /rest/v1/articles avec status='published'), le contenu
   devenait visible du public, et son corps était rendu tel quel. Autrement
   dit : toute personne pouvant s'inscrire pouvait exécuter du JavaScript
   chez chaque visiteur. Corrigé par la migration 0004 + l'assainissement
   au rendu. Ces tests existent pour que la faille ne se rouvre pas en
   silence. */
test("les en-têtes de sécurité sont bien servis", async ({ request }) => {
  const r = await request.get("/");
  const h = r.headers();
  expect(h["content-security-policy"], "CSP absente").toBeTruthy();
  expect(h["content-security-policy"]).toContain("object-src 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBeTruthy();
  expect(h["strict-transport-security"]).toBeTruthy();
  expect(h["x-powered-by"], "la pile ne doit pas s'annoncer").toBeUndefined();
});

test("l'article ne contient aucun vecteur de script exécutable", async ({ page }) => {
  await page.goto("/articles/kharbga-from-sand-to-screen", { waitUntil: "load" });
  const dangers = await page.evaluate(() => {
    const corps = document.querySelector("main");
    if (!corps) return ["<main> introuvable"];
    const trouves: string[] = [];
    corps.querySelectorAll("*").forEach((el) => {
      for (const a of Array.from(el.attributes)) {
        if (a.name.startsWith("on")) trouves.push(`${el.tagName}[${a.name}]`);
        if (/^javascript:/i.test(a.value)) trouves.push(`${el.tagName} javascript: URL`);
      }
      if (["IFRAME", "OBJECT", "EMBED", "FORM"].includes(el.tagName)) trouves.push(el.tagName);
    });
    return trouves;
  });
  expect(dangers, `vecteurs trouvés : ${dangers.join(", ")}`).toEqual([]);
});

/* L'image Open Graph pointait sur http://localhost:10000/... en production :
   chaque partage Facebook/Reddit/WhatsApp affichait un aperçu cassé. */
test("les métadonnées sociales sont absolues et publiques", async ({ page }) => {
  await page.goto("/articles/kharbga-from-sand-to-screen", { waitUntil: "load" });
  const meta = await page.evaluate(() => ({
    ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content"),
    ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content"),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    jsonLd: !!document.querySelector('script[type="application/ld+json"]'),
  }));
  expect(meta.ogImage, "og:image manquante").toBeTruthy();
  expect(meta.ogImage, "og:image doit être absolue et publique").toMatch(/^https:\/\/kogiagroup\.com\//);
  expect(meta.ogUrl).toMatch(/^https:\/\/kogiagroup\.com\//);
  expect(meta.canonical, "lien canonique manquant").toMatch(/^https:\/\/kogiagroup\.com\//);
  expect(meta.jsonLd, "données structurées absentes").toBe(true);

  // L'image annoncée doit réellement se charger pour les robots sociaux.
  const img = await page.request.get(meta.ogImage!);
  expect(img.status(), "l'image sociale ne se charge pas").toBe(200);
});

/* ═══ ACCESSIBILITÉ ═══
   Audit du 2026-08-18 : /join et /login ne rendaient AUCUN <h1>, le champ
   e-mail rendait `outline-style: none` (donc aucun anneau de focus visible
   au clavier), les champs faisaient 15,2 px (Safari iOS zoome sous 16 px) et
   plusieurs liens mesuraient 15 à 23 px de haut, sous le plancher tactile de
   44 px. Rien de tout cela ne cassait un test : aucun test ne regardait. */
for (const route of ROUTES_PUBLIQUES) {
  test(`structure de titres correcte sur ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "load" });
    const h1 = await page.locator("h1").count();
    expect(h1, `${route} doit avoir exactement un <h1>, il en a ${h1}`).toBe(1);
  });
}

test("les champs de formulaire ont un anneau de focus visible", async ({ page }) => {
  await page.goto("/join", { waitUntil: "load" });
  const champ = page.locator('input[type="email"]');
  await champ.focus();
  const s = await champ.evaluate((e) => {
    const c = getComputedStyle(e);
    return { style: c.outlineStyle, width: c.outlineWidth, taille: parseFloat(c.fontSize) };
  });
  expect(s.style, "aucun anneau de focus : au clavier on ne sait plus où l'on est").not.toBe("none");
  // Sous 16 px, Safari iOS zoome la page à la mise au point du champ.
  expect(s.taille, "police du champ sous 16 px, Safari iOS va zoomer").toBeGreaterThanOrEqual(16);
});

test("les cibles tactiles atteignent 44 px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const trop_petites: string[] = [];
  for (const route of ["/", "/about", "/join", "/explore", "/realisations", "/journal", "/savoir-faire"]) {
    await page.goto(route, { waitUntil: "load" });
    const p = await page.evaluate(() =>
      [...document.querySelectorAll("a,button")]
        /* WCAG 2.5.5 exempte explicitement les liens EN LIGNE dans une phrase :
           on ne peut pas agrandir un lien au milieu d'un paragraphe sans casser
           l'interligne. Seules les cibles autonomes sont mesurées. */
        .filter((e) => !e.closest("p, li"))
        .map((e) => ({ t: (e.textContent || "").trim().slice(0, 22), h: Math.round(e.getBoundingClientRect().height) }))
        .filter((x) => x.h > 0 && x.h < 44)
    );
    p.forEach((x) => trop_petites.push(`${route} « ${x.t} » ${x.h}px`));
  }
  expect(trop_petites, `cibles sous 44 px : ${trop_petites.join(" · ")}`).toEqual([]);
});

test("le temps de lecture est cohérent entre l'accueil et l'article", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });
  const accueil = (await page.locator("body").innerText()).match(/(\d+) min de lecture/)?.[1];
  await page.goto("/articles/kharbga-from-sand-to-screen", { waitUntil: "load" });
  const article = (await page.locator("body").innerText()).match(/(\d+) min de lecture/)?.[1];
  expect(accueil, `l'accueil annonce ${accueil} min, l'article ${article} min`).toBe(article);
});

test("chaque page a une image de partage", async ({ page }) => {
  for (const route of [
    "/", "/explore", "/about", "/articles/kharbga-from-sand-to-screen",
    "/realisations", "/realisations/coreon-edu", "/journal", "/savoir-faire",
  ]) {
    await page.goto(route, { waitUntil: "load" });
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(og, `${route} n'a pas d'image de partage`).toBeTruthy();
    expect(og, `${route} : image de partage non absolue`).toMatch(/^https:\/\//);
  }
});
