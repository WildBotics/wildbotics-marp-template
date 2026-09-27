// Build themes/wildbotics.css, the stylesheet Marp actually loads, from
// src/wildbotics.css.
//
// Marp injects a theme into a <style> tag in the generated HTML, so relative
// url() paths inside it would resolve against the deck rather than the theme.
// Every asset is therefore inlined as a data URI. Each one is inlined once, as
// a custom property, because several layouts share the same crest.
//
// Usage: node scripts/build-theme.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(root, "src/wildbotics.css");
const out = resolve(root, "themes/wildbotics.css");

const ASSET = /url\(["']?\.\.\/assets\/([^"')]+)["']?\)/g;

let css = readFileSync(src, "utf8");

// Collect every asset the theme references, once each.
const assets = new Map();
for (const [, file] of css.matchAll(ASSET)) {
  if (assets.has(file)) continue;
  const data = readFileSync(resolve(root, "assets", file));
  const mime = extname(file) === ".png" ? "image/png" : "image/svg+xml";
  const name = `--wb-img-${basename(file, extname(file))}`;
  assets.set(file, {
    name,
    value: `url("data:${mime};base64,${data.toString("base64")}")`,
  });
}

css = css.replace(ASSET, (_, file) => `var(${assets.get(file).name})`);

// Declare them ahead of the theme so the custom properties are always defined.
const decls = [...assets.values()]
  .map(({ name, value }) => `  ${name}: ${value};`)
  .join("\n");

const header = [
  "/* @theme wildbotics */",
  "/* GENERATED FILE - edit src/wildbotics.css and run `npm run build:theme` */",
  "/* The embedded images are WildBotics brand artwork; see README. */",
  ":root {",
  decls,
  "}",
  "",
].join("\n");

// src/wildbotics.css carries its own @theme marker; only one may survive.
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, header + css.replace("/* @theme wildbotics */\n", ""));

const kb = (n) => `${(n / 1024).toFixed(0)} kB`;
console.log(
  `themes/wildbotics.css written - ${assets.size} assets inlined, ${kb(
    readFileSync(out).length
  )}`
);
