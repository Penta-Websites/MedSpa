// Ready Sites screenshots for pentaservices.co.uk (same format as the other live demos).
// Serves dist/ locally (run scripts/deploy-preview.sh or its build part first), shoots full pages at 1200px.
// node scripts/readysites.mjs → penta-claude-code/assets/tpl/<id>-<page>.jpg + <id>-thumb.jpg, prints heights for `shots`
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
const PENTA = "/Users/admin/Documents/Fahad Data/Penta & Tech/Products/Websites/Penta Services/penta-claude-code/";
const puppeteer = createRequire(PENTA + "tools/package.json")("puppeteer-core");
const { id, pages } = JSON.parse(await readFile(new URL("./readysites.json", import.meta.url)));
const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".mp4": "video/mp4" };
const srv = createServer(async (q, r) => {
  const f = join(DIST, decodeURIComponent(q.url.split("?")[0]).replace(/\/$/, "/index.html"));
  try { const body = await readFile(f); r.writeHead(200, { "content-type": MIME[extname(f)] || "application/octet-stream" }); r.end(body); } catch { r.writeHead(404); r.end(); }
}).listen(0);
const base = `http://127.0.0.1:${srv.address().port}/`;
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await b.newPage(); await p.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const H = {};
for (const [k, path] of pages) {
  await p.goto(base + path, { waitUntil: "networkidle0" });
  await p.evaluate(() => document.fonts.ready); await sleep(800);
  // scroll through so scroll-reveal sections and lazy images appear, then back to the top
  await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); document.body.scrollTop = y; await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); document.body.scrollTop = 0; document.querySelectorAll(".reveal").forEach((e) => e.classList.add("in-view")); });
  await sleep(1200);
  // pin fixed/sticky bars to the top of the page so they appear once, not repeated or over content
  await p.evaluate(() => { for (const el of document.querySelectorAll("body *")) { const s = getComputedStyle(el); if (s.position === "fixed" || s.position === "sticky") { const r = el.getBoundingClientRect(); if (r.top < 5 && r.height < 200) el.style.position = "absolute"; else if (r.height < 300) el.style.display = "none"; } } });
  await sleep(300);
  H[k] = await p.evaluate(() => document.documentElement.scrollHeight);
  await p.screenshot({ path: PENTA + `assets/tpl/${id}-${k}.jpg`, type: "jpeg", quality: 72, fullPage: true });
  if (k === "home") await p.screenshot({ path: PENTA + `assets/tpl/${id}-thumb.jpg`, type: "jpeg", quality: 74, clip: { x: 0, y: 0, width: 1200, height: 1650 } });
}
console.log("HEIGHTS", JSON.stringify(H)); await b.close(); srv.close();
