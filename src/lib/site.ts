/**
 * Business facts and navigation. All values were taken from the archived Tony's site
 * (Wayback 2026-01-16 homepage; 2024-07-18 About / Contact / Gallery pages).
 */
export const site = {
  name: "Tony's Ice Cream",
  // Production domain. Never the old Cloudways hostname.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tonysicecream.co.uk").replace(/\/$/, ""),
  locale: "en_GB",
  title: "Tony's Ice Cream – Ice Cream Van Catering Service", // <title> of the archived homepage
  description:
    "Ice cream van hire for weddings, festivals, galas, birthdays, school and corporate events. NCASS member, CRB checked, fully insured with a 5 star food hygiene rating. We cover most of the UK.",
  phone: "+44 7834 015445",
  phoneHref: "tel:+447834015445",
  email: "tonysicecreams@gmail.com",
  address: {
    street: "The Beeches, Bradford Road",
    locality: "Bingley",
    region: "West Yorkshire",
    postalCode: "BD16 1TT",
    country: "GB",
    // Footer of the archived homepage only says "Bradford"
    footerLabel: "Bradford",
  },
  // Header icon (post-32) and footer icon (post-34) pointed at two different Facebook URLs
  facebookHeader: "https://www.facebook.com/p/Tonys-icecream-yorkshire-100057281506672/",
  facebookFooter: "https://www.facebook.com/profile.php?id=100057281506672",
  reviewsUrl: "https://www.addtoevent.co.uk/tonys-ice-cream", // linked from the first testimonial
  mapEmbed: "https://maps.google.com/maps?q=BD16%201TT&t=m&z=14&output=embed&iwloc=near",
  footerTagline: "Let’s create unforgettable moments with exceptional catering!",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Contact", href: "/contact/" },
] as const;

/** Absolute URL helper for canonicals / OG tags. */
export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
