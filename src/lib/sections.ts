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
   * The wave/food artwork behind the bottom of "Satisfaction Guaranteed" (h1-guaranteed.png). It is a Catera
   * stock photo of pots of rice and tomatoes that the Tony's CSS very likely still referenced; on an ice cream
   * site it is almost certainly demo residue. Kept for fidelity – set to false to drop it.
   */
  guaranteeFoodBackdrop: true,
} as const;
