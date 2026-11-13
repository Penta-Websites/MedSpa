// Brochure screenshots: node scripts/shoot.mjs → docs/brochure-source/shots/
// d-<page>.jpg first screen (1440×900), d-<page>-sN.jpg each <section>, m-<page>.jpg phone (390×844), from a local server over dist/
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
const puppeteer = createRequire("/Users/admin/Documents/Fahad Data/Penta & Tech/Products/Websites/Penta Services/penta-claude-code/tools/package.json")("puppeteer-core");
const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const OUT = fileURLToPath(new URL("../docs/brochure-source/shots/", import.meta.url)); await mkdir(OUT, { recursive: true });
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".mp4": "video/mp4" };
const srv = createServer(async (q, r) => { const f = join(DIST, decodeURIComponent(q.url.split("?")[0]).replace(/\/$/, "/index.html")); try { const body = await readFile(f); r.writeHead(200, { "content-type": MIME[extname(f)] || "application/octet-stream" }); r.end(body); } catch { r.writeHead(404); r.end(); } }).listen(0);
const base = `http://127.0.0.1:${srv.address().port}/`;
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await b.newPage(); const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const credit = `body>div:last-of-type[style*="0b0b0b"]{display:none!important}`;
async function go(path, w, h, dpr) {
  await p.setViewport({ width: w, height: h, deviceScaleFactor: dpr });
  await p.goto(base + path, { waitUntil: "networkidle0" }); await p.addStyleTag({ content: credit });
  await p.evaluate(() => document.fonts.ready); await sleep(900);
  await p.evaluate(async () => { document.querySelectorAll("img").forEach((i) => { i.loading = "eager"; }); await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
  await p.evaluate(async () => { const H = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); for (let y = 0; y < H; y += 400) { scrollTo(0, y); document.body.scrollTop = y; await new Promise((r) => setTimeout(r, 90)); } scrollTo(0, 0); document.body.scrollTop = 0; document.querySelectorAll(".reveal").forEach((e) => e.classList.add("in-view")); });
  await sleep(1300);
}
const pages = (process.argv[2] || "").split(",").filter(Boolean);
for (const pg of pages) {
  const n = pg.replace(".html", "");
  await go(pg, 1440, 900, 1.5); await p.screenshot({ path: OUT + `d-${n}.jpg`, type: "jpeg", quality: 80 });
  await p.evaluate(() => { for (const el of document.querySelectorAll("body *")) { const s = getComputedStyle(el); if (s.position === "fixed" || s.position === "sticky") el.style.visibility = "hidden"; } });
  await p.evaluate(() => { document.querySelectorAll("header.ae-header,.ae-back-to-top,.ae-toast-container").forEach((e) => e.remove()); });
  const secs = await p.$$("main section, body > section, main > div > section");
  let i = 0; for (const s of secs) { const bb = await s.boundingBox(); if (!bb || bb.height < 120) continue; i++; await s.screenshot({ path: OUT + `d-${n}-s${i}.jpg`, type: "jpeg", quality: 80 }); }
  await p.screenshot({ path: OUT + `f-${n}.jpg`, type: "jpeg", quality: 78, fullPage: true });
  await go(pg, 390, 844, 2); await p.screenshot({ path: OUT + `m-${n}.jpg`, type: "jpeg", quality: 80 });
  console.log(n, "sections:", i);
}
await b.close(); srv.close();
