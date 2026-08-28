import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { architecture, boardSpec, categories, pieceClasses, product, screenshotInventory, stages } from "../spec.js";

const base = new URL("../", import.meta.url);
const [html, css, app, contract, rules, readme] = await Promise.all([
  "index.html",
  "styles.css",
  "app.js",
  "CLAMP_WARS_TECHNICAL_BUILD_CONTRACT.md",
  "CLAMP_WARS_RULES_AND_PRODUCT_FOUNDATION.md",
  "README.md",
].map((file) => readFile(new URL(file, base), "utf8")));

const requirements = categories.flatMap((category) => category.requirements);
const ids = requirements.map(({ id }) => id);
const allText = `${html}\n${css}\n${app}\n${contract}\n${rules}\n${readme}`;

assert.equal(product.id, "clamp-wars");
assert.equal(product.repository, "clamp-wars");
assert.equal(boardSpec.size, 9);
assert.equal(boardSpec.center, "e5");
assert.equal(boardSpec.totalDeployedPieces, 48);
assert.equal(boardSpec.emptySquaresAfterFounding, 33);
assert.equal(boardSpec.siegeWinThreshold, 5);
assert.deepEqual(pieceClasses.map(({ name }) => name), ["Guard", "Rampart", "Compass", "Strider"]);
assert.equal(screenshotInventory.length, 33, "all 33 product observations must be mapped");
assert.ok(categories.length >= 30, "technical review must remain comprehensive");
assert.ok(requirements.length >= 120, "technical review must retain specific requirements");
assert.equal(new Set(ids).size, ids.length, "requirement IDs must be unique");
assert.deepEqual(new Set(requirements.map(({ stage }) => stage)), new Set(Object.keys(stages)), "every roadmap stage must be represented");
assert.ok(requirements.every(({ id, title, requirement, acceptance }) => id && title && requirement && acceptance.length >= 2), "requirements need usable acceptance criteria");
assert.ok(categories.every(({ screenshots = [] }) => screenshots.every((id) => screenshotInventory.some(([known]) => known === id))), "category screenshot references must exist");
assert.ok(Object.values(architecture).every((items) => items.length >= 4));
assert.match(html, /id="battlefield"/);
assert.match(html, /id="requirements"/);
assert.match(html, /Copy Claude brief/);
assert.match(html, /33 product observations/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /board-preview/);
assert.match(app, /navigator\.clipboard/);
assert.match(contract, /new independent game repository/);
assert.match(rules, /Sealed Siege/);
assert.doesNotMatch(allText, /Sultan|Mullah|Malha|Citadel|Exchange/);

console.log(`PASS · ${categories.length} categories · ${requirements.length} requirements · ${screenshotInventory.length} observations · ${ids.length} unique IDs`);
