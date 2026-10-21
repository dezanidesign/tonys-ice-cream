import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Central image registry.
 *
 * Tony's custom photos lived in /wp-content/uploads/2024/03/ and were NOT archived by the
 * Wayback Machine (see RECONSTRUCTION_NOTES.md → Missing assets). Each entry below records the
 * original filename and the intended size. Until the real file exists, an isolated placeholder
 * SVG with the same aspect ratio is used so layout and crops stay correct.
 *
 * To restore a photo: copy the original file into  public/images/tonys/<original filename>
 * and rebuild — it is picked up automatically, nothing else to edit.
 */

export type SiteImage = {
  /** Public URL actually rendered (real file when present, otherwise placeholder). */
  src: string;
  /** Intended pixel size (from the archived markup) – drives aspect ratio / crop. */
  width: number;
  height: number;
  alt: string;
  /** false → placeholder is showing. */
  recovered: boolean;
  /** Filename on the old WordPress site. */
  original: string;
};

const REAL_DIR = join(process.cwd(), "public", "images", "tonys");
const PLACEHOLDER = (w: number, h: number) => `/images/placeholders/photo-${w}x${h}.svg`;

function image(
  original: string,
  width: number,
  height: number,
  alt: string,
  placeholder = PLACEHOLDER(width, height),
): SiteImage {
  const recovered = existsSync(join(REAL_DIR, original));
  return {
    src: recovered ? `/images/tonys/${original}` : placeholder,
    width,
    height,
    alt,
    recovered,
    original,
  };
}

export const images = {
  logo: image("Tonys-Ice-Cream-Logo.png", 300, 300, "Tony's Ice Cream", "/images/placeholders/logo.svg"),
  hero: image(
    "f664199f-c05a-4047-a030-1d415c287533-1.jpg",
    1600,
    1200,
    "Tony's ice cream van set up at an event",
    "/images/placeholders/photo-1600x1200-dark.svg", // darker placeholder so the overlapping white title stays legible
  ),
  satisfaction: image(
    "97466962-2333-4881-abc7-8b17686b3388.jpg",
    561,
    393,
    "Tony's ice cream van serving customers",
  ),
  // Decorative cut-outs ("pngegg" clip-art). Placeholder = nothing rendered.
  statsDecor: decor("pngegg.png", 500, 500),
  satisfactionDecor: decor("pngegg-1.png", 500, 500),
  iceCreamDecor: decor("Ice-Cream.png", 500, 340),
} as const;

function decor(original: string, width: number, height: number) {
  const recovered = existsSync(join(REAL_DIR, original));
  return {
    src: recovered ? `/images/tonys/${original}` : null,
    width,
    height,
    recovered,
    original,
  };
}

/** Event / service cards (460×580 crops, "School Events" is 460×533). */
export const eventImages = {
  corporate: image(
    "8565dc9a-4dc4-4b83-b2a8-9bdaf656157e-1-460x580.jpg",
    460,
    580,
    "Ice cream van at a corporate event",
  ),
  festivals: image(
    "11416184_837436012977896_8211611883253727661_n-460x580.jpg",
    460,
    580,
    "Ice cream van at a festival",
  ),
  weddings: image(
    "a9691cbf-142f-4e6e-a0f0-7ff9ca076848-1-460x580.jpg",
    460,
    580,
    "Ice cream van at a wedding",
  ),
  school: image(
    "11079358_796461497075348_5992334639463268779_n-460x533.jpg",
    460,
    533,
    "Ice cream van at a school event",
  ),
} as const;

/**
 * Gallery page ("Truck and Events", 11 photos, masonry). Full-size originals; aspect ratios were
 * not recorded in the archive, so the placeholders use a neutral mix. Real photos use their own
 * natural ratio via width/height below – update if you restore them with different dimensions.
 */
const galleryFiles: [original: string, w: number, h: number][] = [
  ["89e8071d-22b1-44af-bc56-40289772fada-1.jpg", 1200, 1600],
  ["9cc26e06-bc79-4259-b870-906ef1434513-1.jpg", 1600, 1200],
  ["8565dc9a-4dc4-4b83-b2a8-9bdaf656157e-1.jpg", 1200, 1600],
  ["a9691cbf-142f-4e6e-a0f0-7ff9ca076848-1.jpg", 1600, 1200],
  ["f664199f-c05a-4047-a030-1d415c287533-1.jpg", 1600, 1200],
  ["11885314_866180283436802_3849951503818683677_n.jpg", 1600, 1200],
  ["11416184_837436012977896_8211611883253727661_n.jpg", 1200, 1600],
  ["11079358_796461497075348_5992334639463268779_n.jpg", 1600, 1200],
  ["11870697_863353177052846_5016898890022409916_n.jpg", 1200, 1200],
  ["335061816_2181752998699625_4959581713451306687_n.jpg", 1200, 1600],
  ["97466962-2333-4881-abc7-8b17686b3388.jpg", 1600, 1200],
];

export const gallery: SiteImage[] = galleryFiles.map(([file, w, h], i) =>
  image(file, w, h, `Tony's ice cream van and events – photo ${i + 1}`),
);

/** Template artwork that *is* available (copied from the Catera demo, see notes). */
export const theme = {
  heroBadge: { src: "/images/theme/hero-badge.png", width: 117, height: 118 },
  statsWaves: "/images/theme/stats-waves.png",
  guaranteedWaves: "/images/theme/guaranteed-waves.png",
  teamWaves: "/images/theme/team-waves.png",
  footerDivider: { src: "/images/theme/footer-divider.png", width: 1291, height: 20 },
} as const;
