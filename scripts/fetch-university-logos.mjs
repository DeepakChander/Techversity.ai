// Fetch university logos from their official sites, trim, and save to public/logos/.
// Run: node scripts/fetch-university-logos.mjs

import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const outDir = resolve(repoRoot, "public/logos");

// Primary sources identified during the research pass. We try the primary,
// fall through to the alt list on failure.
const LOGOS = [
  {
    id: "eu-global",
    candidates: [
      "https://www.euglobal.edu.eu/wp-content/uploads/2024/07/Institute-of-Innovation-Technology.png",
    ],
  },
  {
    id: "esdst",
    candidates: [
      "https://esdst.eu/wp-content/uploads/2021/06/ESDST-400x159.png",
    ],
  },
  {
    id: "texas-global",
    candidates: [
      "https://texasglobaluniversity.us/wp-content/uploads/2022/10/logo-footer.png",
      "https://texasglobaluniversity.us/wp-content/uploads/2022/10/logo.png",
    ],
  },
  {
    id: "amu-paris",
    candidates: [
      "https://amu.edu.eu/wp-content/uploads/2025/01/logo.webp",
      "https://amu.edu.eu/wp-content/uploads/2025/01/logo.png",
    ],
  },
  {
    id: "central-global",
    candidates: [
      "https://www.centralglobaluniversity.org/wp-content/uploads/2024/02/cropped-cgu_logo-240x76.png",
    ],
  },
  {
    id: "sbs-swiss",
    // SBS uses inline SVG in the header (no file URL); favicon is the only
    // hosted asset. Leaving candidate list empty — page falls back to
    // serif-initial plate until a clean brand asset is supplied.
    candidates: [],
  },
  {
    id: "dunster",
    candidates: [
      "https://dunster.ch/wp-content/uploads/2025/01/DBS_New-Final-Logo.png",
      "https://dunster.ch/wp-content/uploads/2024/11/Group-Logos-website-3-3.png",
    ],
  },
  {
    id: "kennedy",
    candidates: [
      "https://lh3.googleusercontent.com/-d52fiIf_LFcHZk5hkFk_haqu65qyPZHwcKhTXcGwi5aZvy2cMItePlppL5bUxxl2LBwtnURmDdPmJI_Cd4OwR-f1wwV7MnQ4cDnPBvPmLO7KgxPv6MRkw",
    ],
  },
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

await mkdir(outDir, { recursive: true });

async function tryFetch(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
        "Accept-Language": "en",
      },
      redirect: "follow",
    });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.startsWith("image/")) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    return { buf, ct, url };
  } catch {
    return null;
  }
}

const results = [];

for (const { id, candidates } of LOGOS) {
  let hit = null;
  for (const url of candidates) {
    // eslint-disable-next-line no-await-in-loop
    hit = await tryFetch(url);
    if (hit) break;
  }

  if (!hit) {
    console.log(`[miss]  ${id} — no candidate URL returned an image`);
    results.push({ id, status: "miss" });
    continue;
  }

  const outPath = resolve(outDir, `${id}.webp`);
  try {
    // For SVGs we save raw; for raster we trim + normalize and convert to WebP.
    if (hit.ct === "image/svg+xml") {
      const svgPath = resolve(outDir, `${id}.svg`);
      await writeFile(svgPath, hit.buf);
      console.log(`[ok ]  ${id} · svg · ${hit.url}`);
      results.push({ id, status: "ok", ext: "svg", source: hit.url });
    } else {
      const meta = await sharp(hit.buf).metadata();
      // Trim near-white borders so logos sit tight to their mark.
      await sharp(hit.buf)
        .trim({ threshold: 20 })
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 90 })
        .toFile(outPath);
      console.log(`[ok ]  ${id} · ${meta.width}×${meta.height} · ${hit.url}`);
      results.push({ id, status: "ok", ext: "webp", source: hit.url });
    }
  } catch (err) {
    console.log(`[err]   ${id} — processing failed: ${err.message}`);
    results.push({ id, status: "err", error: String(err) });
  }
}

console.log("");
console.log(
  `Summary: ${results.filter((r) => r.status === "ok").length} ok, ${results.filter((r) => r.status === "miss").length} miss, ${results.filter((r) => r.status === "err").length} err`
);
console.log("");
console.log("Results:");
for (const r of results) console.log(`  ${r.id.padEnd(18)} ${r.status}${r.source ? " · " + r.source : ""}`);
