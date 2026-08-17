import { defineConfig } from "@playwright/test";

/**
 * Fumée de production uniquement : on interroge le site réel, on ne démarre
 * pas de serveur local. Volontairement minimal — cette configuration ne sert
 * qu'au job `fumee-production` de .github/workflows/community.yml.
 */
export default defineConfig({
  testDir: "./smoke",
  timeout: 45_000,
  expect: { timeout: 15_000 },
  // Une fumée qui échoue au hasard ne vaut rien : deux tentatives, puis
  // c'est un vrai échec.
  retries: 2,
  reporter: [["list"]],
  use: {
    baseURL: process.env.SMOKE_BASE_URL ?? "https://kogiagroup.com",
    ignoreHTTPSErrors: false,
  },
});
