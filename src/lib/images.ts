/**
 * Central image registry – every photo/artwork path on the site lives here.
 *
 * Tony's photos were recovered from the old Cloudways server (/wp-content/uploads/2024/03/) and live in
 * public/images/tonys/ under their ORIGINAL filenames. Sizes below are the intended display crops from the
 * old Elementor markup (cards 460×580 / 460×533, hero 1600×1200 …); Photo/Image components render with
 * object-fit: cover, so the crop stays identical whatever the file's own dimensions.
 * To swap an image, replace the file (same name) or change its `src` here.
 */

export type SiteImage = {
  src: string;
  /** Intended display size – drives aspect ratio / crop. */
  width: number;
  height: number;
  alt: string;
};

const T = "/images/tonys/";

export const images = {
  /** White round badge (transparent background) – made for the green header/footer. Downscaled from 3206×3236. */
  logo: { src: `${T}Tonys-Ice-Cream-Logo.png`, width: 640, height: 646, alt: "Tony's Ice Cream" },
  hero: {
    src: `${T}f664199f-c05a-4047-a030-1d415c287533-1.jpg`,
    width: 1600,
    height: 1200,
    alt: "Four of Tony's ice cream vans parked side by side",
  },
  /** Shown small (17% wide) under the three icon boxes – it is the Food Standards Agency 5-star rating card. */
  hygieneRating: {
    src: `${T}97466962-2333-4881-abc7-8b17686b3388.jpg`,
    width: 561,
    height: 393,
    alt: "Food Standards Agency food hygiene rating: 5 – very good",
  },
  /** Decorative soft-serve cut-outs (500×500, transparent). */
  statsDecor: { src: `${T}pngegg.png`, width: 500, height: 500 },
  satisfactionDecor: { src: `${T}pngegg-1.png`, width: 500, height: 500 },
  /** Page-title banner behind the nav on inner pages (Catera stock photo kept by Tony's CSS – see SECTIONS). */
  pageBanner: "/images/tonys/page-banner.jpg",
  /** About page: left-hand background of the intro band, and background of the closing "Get In Touch" band. */
  aboutIntro: { src: `${T}11870697_863353177052846_5016898890022409916_n.jpg`, width: 960, height: 720 },
  aboutClosing: { src: `${T}a9691cbf-142f-4e6e-a0f0-7ff9ca076848-1.jpg`, width: 1600, height: 1200 },
} as const;

/** Event cards: full-size photo used both as the card background and (cropped) in the arch. */
export const eventImages = {
  corporate: {
    src: `${T}8565dc9a-4dc4-4b83-b2a8-9bdaf656157e-1.jpg`,
    width: 460,
    height: 580,
    alt: "Tony's ice cream van at a corporate event",
  },
  festivals: {
    src: `${T}11416184_837436012977896_8211611883253727661_n.jpg`,
    width: 460,
    height: 580,
    alt: "Tony's ice cream van at a festival",
  },
  weddings: {
    src: `${T}a9691cbf-142f-4e6e-a0f0-7ff9ca076848-1.jpg`,
    width: 460,
    height: 580,
    alt: "Tony's ice cream vans at a wedding or birthday",
  },
  school: {
    src: `${T}11079358_796461497075348_5992334639463268779_n.jpg`,
    width: 460,
    height: 533,
    alt: "Tony's ice cream van at a school event",
  },
} as const satisfies Record<string, SiteImage>;

/** Gallery page – "Truck and Events" (11 photos). Real pixel sizes, so the masonry keeps each photo's own ratio. */
const galleryFiles: [file: string, w: number, h: number][] = [
  ["89e8071d-22b1-44af-bc56-40289772fada-1.jpg", 960, 1350],
  ["9cc26e06-bc79-4259-b870-906ef1434513-1.jpg", 1600, 1200],
  ["8565dc9a-4dc4-4b83-b2a8-9bdaf656157e-1.jpg", 1583, 1261],
  ["a9691cbf-142f-4e6e-a0f0-7ff9ca076848-1.jpg", 1600, 1200],
  ["f664199f-c05a-4047-a030-1d415c287533-1.jpg", 1600, 1200],
  ["11885314_866180283436802_3849951503818683677_n.jpg", 960, 540],
  ["11416184_837436012977896_8211611883253727661_n.jpg", 640, 640],
  ["11079358_796461497075348_5992334639463268779_n.jpg", 800, 533],
  ["11870697_863353177052846_5016898890022409916_n.jpg", 960, 720],
  ["335061816_2181752998699625_4959581713451306687_n.jpg", 1125, 653],
  ["97466962-2333-4881-abc7-8b17686b3388.jpg", 561, 393],
];

export const gallery: SiteImage[] = galleryFiles.map(([file, width, height], i) => ({
  src: `${T}${file}`,
  width,
  height,
  alt: file.startsWith("97466962")
    ? "Food Standards Agency food hygiene rating: 5 – very good"
    : `Tony's ice cream van and events – photo ${i + 1}`,
}));

/** Template artwork copied from the Catera demo (also used by Tony's pages). */
export const theme = {
  heroBadge: { src: "/images/theme/hero-badge.png", width: 117, height: 118 },
  statsWaves: "/images/theme/stats-waves.png",
  footerDivider: { src: "/images/theme/footer-divider.png", width: 1291, height: 20 },
} as const;
