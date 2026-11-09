import { test, expect } from "@playwright/test";
import nextConfig from "../next.config";
import { INDUSTRIES, PRODUCTS } from "../src/lib/catalog";
import { LANGS } from "../src/lib/i18n";

/**
 * Fumée de production (site à trois niveaux, trois langues, 2026-11-09).
 * On interroge le site réel, ou un serveur local via SMOKE_BASE_URL, et on
 * regarde du contenu rendu, la direction du texte, la géométrie et les
 * métadonnées. Les routes viennent du catalogue : un produit ajouté est
 * couvert sans toucher ce fichier.
 */
const PAGES = [
  "", "/industries", "/products", "/capabilities", "/how-we-work", "/presence", "/about", "/contact", "/privacy", "/terms",
  ...INDUSTRIES.map((i) => `/industries/${i.slug}`),
  ...PRODUCTS.map((p) => `/products/${p.slug}`),
];
const ORIGINE_PUBLIQUE = "https://kogiagroup.com";

for (const lang of LANGS) {
  test(`${lang} : chaque page s'affiche, dans la bonne direction, sans débordement`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const w of [390, 1366]) {
      await page.setViewportSize({ width: w, height: 900 });
      for (const p of PAGES) {
        const r = await page.goto(`/${lang}${p}`);
        expect(r?.status(), `/${lang}${p}`).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", lang);
        await expect(page.locator("html")).toHaveAttribute("dir", lang === "ar" ? "rtl" : "ltr");
        await expect(page.locator("h1")).toHaveCount(1);
        const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(over, `débordement horizontal /${lang}${p} @${w}`).toBeLessThanOrEqual(0);
        if (w === 1366) {
          const canon = await page.locator('link[rel="canonical"]').getAttribute("href");
          expect(canon).toBe(`${ORIGINE_PUBLIQUE}/${lang}${p}`);
          const text = await page.locator("main").innerText();
          expect(text, `tiret cadratin sur /${lang}${p}`).not.toContain("—");
        }
      }
    }
    expect(errors).toEqual([]);
  });
}

test("la racine renvoie vers une langue", async ({ request }) => {
  const r = await request.get("/", { maxRedirects: 0, headers: { "accept-language": "fr-FR,fr;q=0.9" } });
  expect(r.status()).toBe(307);
  expect(r.headers().location).toMatch(/\/fr$/);
});

test("chaque ancienne adresse aboutit à une page qui existe", async ({ request }) => {
  const redirections = (await nextConfig.redirects?.()) ?? [];
  for (const { source } of redirections) {
    const url = source.replace(":slug.html", "x.html").replace(":slug", "x").replace(":path*", "x");
    const r = await request.get(url);
    expect(r.status(), url).toBe(200);
  }
});

test("aucun lien interne cassé depuis l'accueil", async ({ page, request }) => {
  for (const lang of LANGS) {
    await page.goto(`/${lang}`);
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute("href")!))]);
    for (const h of hrefs) expect((await request.get(h)).status(), h).toBe(200);
  }
});

test("les en-têtes de sécurité sont servis", async ({ request }) => {
  const r = await request.get("/en");
  expect(r.headers()["content-security-policy"]).toContain("default-src 'self'");
  expect(r.headers()["x-frame-options"]).toBe("DENY");
});

test("robots.txt et sitemap.xml répondent et listent les trois langues", async ({ request }) => {
  expect((await request.get("/robots.txt")).status()).toBe(200);
  const s = await (await request.get("/sitemap.xml")).text();
  for (const l of LANGS) expect(s).toContain(`/${l}/products/kogia-health`);
});

test("le menu mobile s'ouvre et expose le contact", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ar");
  await page.locator(".k-drawer summary").click();
  await expect(page.locator(".k-drawer-panel a.k-btn")).toBeVisible();
});
