// Generates the isolated placeholder SVGs used for Tony's photos that could not be
// recovered from the Wayback Machine (see RECONSTRUCTION_NOTES.md → Missing assets).
//
//   node scripts/generate-placeholders.mjs
//
// Placeholders keep the original aspect ratios so crops/layout match the real photos.
// Real photos override them automatically: drop the file (original filename) into
// public/images/tonys/ and rebuild — see src/lib/images.ts.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "placeholders");
mkdirSync(out, { recursive: true });

const PRIMARY = "#09574A";
const ACCENT = "#EBC6A4";
const CREAM = "#F6F0EA";

function photo(w, h, dark = false) {
  const bg = dark ? "url(#g)" : CREAM;
  const ink = dark ? "#EBC6A4" : PRIMARY;
  const fill = dark ? "#0b3b32" : "#fff";
  const s = Math.min(w, h) / 460; // scale the icon with the canvas
  const cx = w / 2;
  const cy = h / 2;
  const fs = Math.max(11, Math.round(14 * s));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Photo coming soon">
  ${dark ? `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d6b5c"/><stop offset="1" stop-color="#0b3b32"/></linearGradient></defs>` : ""}
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <rect x="${12 * s}" y="${12 * s}" width="${w - 24 * s}" height="${h - 24 * s}" fill="none" stroke="${ACCENT}" stroke-width="${2 * s}" stroke-dasharray="${10 * s} ${8 * s}" rx="${16 * s}"/>
  <g transform="translate(${cx} ${cy - 18 * s}) scale(${s})" fill="none" stroke="${ink}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" opacity="${dark ? 0.8 : 0.55}">
    <path d="M-34 -6 L0 92 L34 -6 Z" fill="${ACCENT}" fill-opacity=".55"/>
    <path d="M-34 -6 C-52 -6 -52 -44 -26 -44 C-26 -70 26 -70 26 -44 C52 -44 52 -6 34 -6 Z" fill="${fill}" fill-opacity=".7"/>
    <path d="M-16 8 L10 70 M4 8 L22 52 M-22 30 L-6 70" stroke-width="3" opacity=".6"/>
  </g>
  <text x="${cx}" y="${cy + 112 * s}" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-size="${fs}" font-weight="600" letter-spacing="${2 * s}" fill="${ink}" opacity=".7">PHOTO COMING SOON</text>
</svg>
`;
}

function logo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300" role="img" aria-label="Tony's Ice Cream">
  <circle cx="150" cy="150" r="146" fill="${PRIMARY}"/>
  <circle cx="150" cy="150" r="132" fill="none" stroke="${ACCENT}" stroke-width="3" stroke-dasharray="3 9" stroke-linecap="round"/>
  <g transform="translate(150 92)" fill="none" stroke="${ACCENT}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <path d="M-26 0 L0 66 L26 0 Z" fill="${ACCENT}" fill-opacity=".35"/>
    <path d="M-26 0 C-40 0 -40 -30 -20 -30 C-20 -50 20 -50 20 -30 C40 -30 40 0 26 0 Z" fill="#fff" fill-opacity=".9"/>
  </g>
  <text x="150" y="196" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="46" font-weight="700" fill="#fff">Tony's</text>
  <text x="150" y="232" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-size="20" font-weight="600" letter-spacing="5" fill="${ACCENT}">ICE CREAM</text>
</svg>
`;
}

const sizes = [
  [1600, 1200],
  [1200, 1600],
  [1200, 1200],
  [460, 580],
  [460, 533],
  [561, 393],
];
for (const [w, h] of sizes) writeFileSync(join(out, `photo-${w}x${h}.svg`), photo(w, h));
writeFileSync(join(out, "photo-1600x1200-dark.svg"), photo(1600, 1200, true)); // hero: white title overlaps it
writeFileSync(join(out, "logo.svg"), logo());
console.log(`Wrote ${sizes.length + 1} placeholders to ${out}`);
