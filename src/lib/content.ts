/**
 * Page copy, verbatim from the archived Tony's site (typos in the original are corrected only
 * where noted). Source pages are listed in RECONSTRUCTION_NOTES.md.
 */

export const hero = {
  titleLines: ["Ice Cream Van", "Hire For Events"],
  points: ["NCASS", "Member", "CRB Checked", "Fully Insured", "5 Star Rating", "Public Liability Insured"],
  cta: { label: "Enquire Now", href: "/contact/" },
} as const;

export const stats = [
  { value: 50, suffix: "+", label: "years experience" },
  { value: 100, suffix: "+", label: "events each year" },
] as const;

export type Testimonial = { quote: string; name: string; role?: string; href?: string };

/** Homepage testimonials (2026 snapshot). */
export const homeTestimonials: Testimonial[] = [
  {
    quote:
      "Great communication, arrived in plenty of time, service with a smile.Thank you, the ice cream van made our event perfect. We will be booking again for next year!",
    name: "Tracy M",
    href: "https://www.addtoevent.co.uk/tonys-ice-cream",
  },
  {
    quote:
      "This was for a family fun day at a charity so we are quite price conscious. Prices and range available were great - went down a storm. Thanks!",
    name: "Lexy M",
  },
  {
    quote:
      "Tony provided a great service throughout, from booking to the actual event. Clear communication and always on hand to discuss our requirements. Punctual on the day and great with all of our members who visited his ice cream van throughout the event. We would definitely book him again. Thanks Tony!",
    name: "Fiona do",
    role: "Wedding Host",
  },
];

/** About page testimonials (2024 snapshot) – a different set from the homepage. */
export const aboutTestimonials: Testimonial[] = [
  {
    quote:
      "Great communication, arrived in plenty of time, service with a smile.Thank you, the ice cream van made our event perfect. We will be booking again for next year!",
    name: "Tracy M",
  },
  {
    quote:
      "Kersh was great - arrived when he said he would and coped with the constant queue he had while he was here!! And we’ve already booked him to come back!!",
    name: "Lizzie G",
  },
  {
    quote:
      "Tony's agreed to attend our charity event for Dementia UK that we held on 1st May 2022. They arrived in their lovely ice-cream van and our guests were treated to some fabulous sweet treats. Thank you for helping us raise funds for a great cause.",
    name: "Rachel B",
  },
];

export const eventsIntro = {
  subtitle: "what we do",
  title: "Events We Cater",
  text: "We offer refreshing treats like ice cream and slush, perfect for any celebration! From galas and festivals to summer fairs and charity events, we cater to all occasions, including weddings. Let us make your event unforgettable!",
} as const;

/** Event cards – present in the archived markup but hidden on every breakpoint (see SECTIONS). */
export const eventCards = [
  { key: "corporate", title: "Corporate" },
  { key: "festivals", title: "Festivals" },
  { key: "weddings", title: "Weddings & Birthdays" },
  { key: "school", title: "School Events" },
] as const;

export const guarantee = {
  subtitle: "why tony's",
  title: "Satisfaction Guaranteed",
  items: [
    {
      icon: "locationArrow",
      title: "Wide Coverage",
      text: "Ice cream van hire for weddings, festivals, galas and birthdays. We cover most of UK.",
    },
    {
      icon: "checkCircle",
      title: "Member of the NCASS",
      text: "As members of the Nationwide Caterers Association you can have peace of mind that you are dealing with the best in the business.",
    },
    {
      icon: "award",
      title: "5 Star Food Hygiene",
      // original: "Rated b y the Food Standards Agency" (stray space in the archive)
      text: "Rated by the Food Standards Agency, we ensure quality and safety as our top priorities.",
    },
  ],
  callText: "Call us now",
  cta: { label: "request a quote now", href: "/contact/" },
} as const;

export const scrollingWords = ["Healthy", "Taste", "Enjoy", "Fresh"] as const;

export const about = {
  title: "Delivering Ice Creams For Over 25 Years",
  paragraphs: [
    "Welcome to Tony’s Ice Cream, where every scoop tells a story of flavor, quality, and tradition. Nestled in the heart of our community, Tony’s Ice Cream has been a beloved destination for frozen treats.",
    "At Tony’s, we believe in crafting more than just ice cream; we create memories. Our journey began with a passion for indulgence and a commitment to using only the finest ingredients. From rich, creamy classics to innovative, seasonal delights, each batch is carefully churned to perfection, ensuring every spoonful is a taste of pure joy.",
  ],
  cta: { label: "get in touch", href: "/contact/" },
  testimonials: { subtitle: "testimonials", title: "What They Say" },
  closing: { title: "Get In Touch", subtitle: "Your next catered event!" },
} as const;

export const contact = {
  heading: "Get an answer",
  intro:
    "We’d love to hear from you. Please tell us about the event you would like us to create and we’ll connect with you to get started.",
  formHeading: "Leave your message",
  detailsHeading: "Contact",
} as const;

export const galleryPage = {
  filter: "Truck and Events",
} as const;
