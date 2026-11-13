// Brochure screenshots of interactive UI (booking popup, search, quick view, bag, hotspots, before/after): node scripts/shoot-ui.mjs
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
const puppeteer = createRequire("/Users/admin/Documents/Fahad Data/Penta & Tech/Products/Websites/Penta Services/penta-claude-code/tools/package.json")("puppeteer-core");
const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const OUT = fileURLToPath(new URL("../docs/brochure-source/shots/", import.meta.url));
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png" };
const srv = createServer(async (q, r) => { const f = join(DIST, decodeURIComponent(q.url.split("?")[0]).replace(/\/$/, "/index.html")); try { const body = await readFile(f); r.writeHead(200, { "content-type": MIME[extname(f)] || "application/octet-stream" }); r.end(body); } catch { r.writeHead(404); r.end(); } }).listen(0);
const base = `http://127.0.0.1:${srv.address().port}/`;
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await b.newPage(); const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function go(path, w, h, dpr) { await p.setViewport({ width: w, height: h, deviceScaleFactor: dpr }); await p.goto(base + path, { waitUntil: "networkidle0" }); await p.evaluate(() => document.fonts.ready); await p.evaluate(async () => { document.querySelectorAll("img").forEach((i) => { i.loading = "eager"; }); await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); }); await sleep(700); }
const click = (sel) => p.evaluate((s) => document.querySelector(s).click(), sel);
// booking popup with a treatment pre-selected, desktop + phone
for (const [w, h, dpr, n] of [[1440, 900, 1.5, "d-ui-booking"], [390, 844, 2, "m-ui-booking"]]) {
  await go("treatments.html", w, h, dpr);
  await click(".ae-open-booking-btn[data-treatment]"); await sleep(900);
  await p.screenshot({ path: OUT + n + ".jpg", type: "jpeg", quality: 82 });
}
// live search with a query
await go("index.html", 1440, 900, 1.5);
await click(".ae-search-toggle-btn"); await sleep(600);
await p.type("#searchInput", "laser", { delay: 40 }); await sleep(700);
await p.screenshot({ path: OUT + "d-ui-search.jpg", type: "jpeg", quality: 82 });
// shop: quick view, then two products in the bag
await go("shop.html", 1440, 900, 1.5);
await click(".ae-quick-view-btn"); await sleep(800);
await p.screenshot({ path: OUT + "d-ui-quickview.jpg", type: "jpeg", quality: 82 });
await p.evaluate(() => document.querySelector("#quickViewModal").classList.remove("is-open"));
await p.evaluate(() => { const a = document.querySelectorAll(".ae-add-to-cart-btn"); a[0].click(); a[2].click(); }); await sleep(400);
await click(".ae-cart-toggle-btn"); await sleep(900);
await p.screenshot({ path: OUT + "d-ui-cart.jpg", type: "jpeg", quality: 82 });
// homepage body hotspots and before/after slider, as element shots
await go("index.html", 1440, 900, 1.5);
await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); } scrollTo(0, 0); document.querySelectorAll(".reveal").forEach((e) => e.classList.add("in-view")); });
await sleep(900);
await p.evaluate(() => { for (const el of document.querySelectorAll("body *")) { const s = getComputedStyle(el); if (s.position === "fixed" || s.position === "sticky") el.style.visibility = "hidden"; } document.querySelector("#hotspotCardFloat") && (document.querySelector("#hotspotCardFloat").style.visibility = "visible"); document.querySelector(".ae-header").style.display = "none"; });
const pin = await p.$$(".ae-hotspot-pin"); if (pin[1]) { await p.evaluate((e) => e.click(), pin[1]); await sleep(600); }
for (const [sel, n] of [[".ae-hotspot-pin", "d-ui-hotspots"], ["#aeComparisonSlider", "d-ui-compare"]]) {
  const el = await p.evaluateHandle((s) => document.querySelector(s).closest("section"), sel);
  await el.asElement().screenshot({ path: OUT + n + ".jpg", type: "jpeg", quality: 80 });
}
await b.close(); srv.close(); console.log("ui shots ok");
