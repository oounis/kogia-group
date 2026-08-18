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

/* Le 2026-08-18, l'en-tête débordait de 86 px à 390 px : « Rejoindre Kogia »
   sortait de l'écran et toute la page défilait latéralement. Aucun test ne
   l'a vu, parce qu'ils comptaient du texte, pas de la géométrie. */
for (const [nom, largeur] of [["mobile", 390], ["tablette", 768]] as const) {
  test(`aucun débordement horizontal en ${nom} (${largeur}px)`, async ({ page }) => {
    await page.setViewportSize({ width: largeur, height: 844 });
    await page.goto("/", { waitUntil: "load" });
    const { scrollW, clientW } = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    expect(scrollW, `la page déborde de ${scrollW - clientW}px et défile latéralement`).toBeLessThanOrEqual(clientW + 1);
  });
}

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
