import { defineConfig } from "@playwright/test";

/**
 * Parcours d'inscription, contre un serveur LOCAL construit depuis ce dépôt.
 *
 * Séparé de playwright.smoke.config.ts, qui interroge le site public : ces
 * tests écrivent en base (création puis suppression d'un compte jetable) et
 * ne doivent donc jamais être lancés à l'aveugle contre la production.
 */
export default defineConfig({
  testDir: "./e2e",
  testMatch: /.*\.spec\.ts/,
  timeout: 90_000,
  expect: { timeout: 20_000 },
  // Un parcours d'inscription qui ne passe qu'une fois sur deux n'est pas
  // terminé : aucune nouvelle tentative, un échec est un échec.
  retries: 0,
  workers: 1,
  reporter: [["list"]],
  use: { baseURL: process.env.E2E_BASE_URL ?? "http://127.0.0.1:3100" },
});
