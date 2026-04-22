// Process Gemini-generated editorial images:
//   - Crop the bottom-right Gemini watermark
//   - Convert to WebP at quality 85
//   - Emit to public/images/editorial/
//
// Run: node scripts/process-editorial-images.mjs

import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const downloadsDir = "C:/Users/hp/Downloads";
const outDir = resolve(repoRoot, "public/images/editorial");

// slot → { source filename, output stem }
const JOBS = [
  { slot: "A1", source: "A1.png", out: "home-pathways" },
  { slot: "A2.1", source: "A2.1.png", out: "home-voices" },
  { slot: "A2.2", source: "A2.2.png", out: "home-voices-alt" },
  { slot: "A3", source: "A3.png", out: "honorary-hero" },
  { slot: "A4", source: "A4.png", out: "dba-hero" },
  { slot: "A5", source: "A5.png", out: "phd-hero" },
  { slot: "B1", source: "B1.png", out: "home-hero-backdrop" },
  { slot: "B2", source: "B2.png", out: "home-advisory" },
  { slot: "B3", source: "B3.png", out: "home-threshold" },
  { slot: "B4", source: "B4.png", out: "honorary-recognition" },
  { slot: "B5", source: "B5.png", out: "contact-header" },
  { slot: "C1", source: "C1.png", out: "threshold-alt" },
  { slot: "C2", source: "C2.png", out: "programs-establishing" },
  { slot: "C3", source: "C3.png", out: "universities-header" },
];

// Gemini watermark — conservatively remove the bottom-right corner.
// The mark is ~100–140px at native res; 6% from each side is safe with headroom.
const CROP_RIGHT_PCT = 0.06;
const CROP_BOTTOM_PCT = 0.06;

await mkdir(outDir, { recursive: true });

const results = [];

for (const job of JOBS) {
  const src = resolve(downloadsDir, job.source);
  let buf;
  try {
    buf = await readFile(src);
  } catch {
    console.warn(`[skip] ${job.slot} — source not found: ${src}`);
    results.push({ ...job, status: "missing" });
    continue;
  }

  const meta = await sharp(buf).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  if (!w || !h) {
    console.warn(`[skip] ${job.slot} — invalid dimensions`);
    results.push({ ...job, status: "invalid" });
    continue;
  }

  // New dimensions after crop
  const newW = Math.round(w * (1 - CROP_RIGHT_PCT));
  const newH = Math.round(h * (1 - CROP_BOTTOM_PCT));

  const outPath = resolve(outDir, `${job.out}.webp`);

  await sharp(buf)
    .extract({ left: 0, top: 0, width: newW, height: newH })
    .webp({ quality: 85 })
    .toFile(outPath);

  const origAspect = (w / h).toFixed(3);
  const newAspect = (newW / newH).toFixed(3);

  console.log(
    `[ok] ${job.slot} · ${w}×${h} (ar ${origAspect}) → ${newW}×${newH} (ar ${newAspect}) · ${job.out}.webp`
  );
  results.push({
    ...job,
    status: "ok",
    width: newW,
    height: newH,
    aspect: parseFloat(newAspect),
  });
}

const ok = results.filter((r) => r.status === "ok").length;
const missing = results.filter((r) => r.status === "missing").length;
console.log(`\n${ok} processed, ${missing} missing.`);
