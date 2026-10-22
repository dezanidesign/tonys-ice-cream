/**
 * Homepage sections that exist in the archived markup but were set to "hide on all devices" in
 * Elementor (class list contains elementor-hidden-desktop/laptop/tablet_extra/tablet/mobile_extra/mobile).
 * Visitors of the old site never saw them, so they are OFF by default (except where noted below). Flip a flag to bring one back –
 * the component is already built and styled.
 * NOTE: eventCards was switched ON at the owner's request even though the original hid it on every device.
 *
 * Not rebuilt at all (hidden on every breakpoint AND pure Catera demo content): "Menus / Venues" banners,
 * "Our Team" (Albert Flores…), "Our Blog" (lorem ipsum posts), "Partners We Serve" logos, "Photo Gallery"
 * teaser (the real gallery lives at /gallery/), "Join our email list", opening hours.
 *
 * See RECONSTRUCTION_NOTES.md → Questionable demo content.
 */
export const SECTIONS = {
  /** "Corporate / Festivals / Weddings & Birthdays / School Events" photo cards under "Events We Cater". */
  eventCards: true,
  /**
   * Inner-page title banner photo: a Catera stock shot of a tattooed chef plating food, still referenced by Tony's
   * Elementor CSS (post-991) behind a 40% black overlay. Looks odd on an ice cream site – set false for a plain
   * green banner.
   */
  pageBannerPhoto: false,
} as const;
