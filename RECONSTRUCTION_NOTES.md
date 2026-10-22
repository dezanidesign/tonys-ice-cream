# Reconstruction notes – tonysicecream.co.uk

Rebuild of the WordPress 6.8.3 / Elementor 3.19 / **Catera 1.0.1** (child theme `catera-child`) site as a static
Next.js 16 app for Vercel. Work done 2026-10-21/22 from the Wayback Machine, the live Catera demo and – once it
turned out the old Cloudways app had simply been switched off – the original server's public files.

**The short version**

1. **Everything was recovered.** The Wayback Machine never captured Tony's `/wp-content/` files, but the old Cloudways
   app (`Tonys Ice Cream V2`, app 4361776) still had them; public access to it had been switched off (503 on every URL).
   It was re-enabled temporarily and the images and Tony's own Elementor CSS were downloaded over plain HTTP.
   So the images, logo and exact CSS in this build are Tony's real ones, not placeholders or inferences.
2. **Most of the Catera demo homepage was switched off in Tony's original** (Elementor "hide on every device"). Hidden
   sections are not rebuilt, except the four event cards, which were switched **on** at the owner's request.
3. **A few stock-photo leftovers are still in Tony's own CSS** (chef-photo page banner, "EXQUISITE CATERING SERVICES"
   badge). They are kept for fidelity and flagged below, each with a one-line switch.

---

## Sources

| What | Where | Used for |
| --- | --- | --- |
| Homepage (2026) | `https://web.archive.org/web/20260116112114/https://tonysicecream.co.uk/` (raw: `…20260116112114id_/…`) | content, DOM, hidden-state, nav, footer, Revolution-Slider layer data |
| About / Contact / Gallery (2024) | `…/web/20240718035132/…/about-us/`, `…20240718040638/…/contact/`, `…20240718055455/…/gallery/` | copy, testimonials, address, gallery list |
| Wayback CDX index | `…/cdx/search/cdx?url=tonysicecream.co.uk&matchType=domain&collapse=urlkey` | URL inventory (108 URLs, none under `/wp-content/`) |
| **Old Cloudways app** | `wordpress-1124088-4361776.cloudwaysapps.com/wp-content/…` (server 1124088, app 4361776) | all images, `post-8/18/22/23/24/32/34/991.css`, `global.css`, WP media library via `/wp-json/wp/v2/media` |
| Catera demo | `https://demo2.pavothemes.com/catera/` + its CSS, `style.css`, `elementor.css`, font | computed-style measurements, theme artwork/font, behaviour of components |
| 2018 PHP site | `http://tonysicecream.co.uk/` (20180811095456) | checked as an image source – not needed |

## Recovered from Tony's (verbatim)

*Content (2026 homepage unless noted)*
- Title `Tony's Ice Cream – Ice Cream Van Catering Service`; inner titles `About Us / Contact / Gallery – Tony's Ice Cream`.
- Hero "Ice Cream Van / Hire For Events", six credential lines, "Enquire Now" → `/contact/`; counters **50+ years experience**, **100+ events each year**;
  3 testimonials; "what we do / Events We Cater"; "why tony's / Satisfaction Guaranteed" (*Wide Coverage*, *Member of the NCASS*, *5 Star Food Hygiene*);
  "Call us now **+44 7834 015445** for more information."; "request a quote now"; marquee Healthy · Taste · Enjoy · Fresh.
- Header: Home / About / Gallery / Contact, "call us +44 7834 015445", Facebook. Footer: "Find us – Bradford", "Contact Us", tagline, divider, "follow us".
- About (2024): "Delivering Ice Creams For Over 25 Years" + two paragraphs, "What They Say" (3 *different* testimonials), "Get In Touch / Your next catered event!".
- Contact (2024): form (name*, e-mail*, message, "request quote"), *The Beeches, Bradford Road, Bingley, West Yorkshire, BD16 1TT*, phone, e-mail, map for `BD16 1TT`.
- Gallery (2024): filters "All photos 11" / "Truck and Events 11" and 11 photos.

*Layout/behaviour from Tony's own CSS (post-8/18/22/23/24/32/34/991) – differences from the Catera template that are now applied*
- Header: phone number 20px, call-us column 25% wide, nav widget `margin-left:20px`, Facebook icon 16px (32px square, Elementor default blue `#3b5998`), logo `max-width:70%`.
- Footer: logo `max-width:8%`.
- Home: stats-panel decor at `left:-22%` (template: -18%); the "Satisfaction" image is `max-width:17%`; the **template's food-photo backdrop behind "Satisfaction Guaranteed" was removed** in Tony's CSS (plain white).
- Event cards: each card's background is Tony's event photo (+50% black veil) with the same photo in an arch.
- About: intro band background = `11870697_…jpg` (left, natural size, no-repeat, hidden on phones); closing band background = `a9691cbf-…-1.jpg` + 60% black overlay.
- Kit: primary `#09574A`, accent `#EBC6A4`, text `#626262`, Montserrat + Bagdoll Display (identical to the template kit).
- Everything else (section paddings, widths, breakpoints 1440/1200/1024/880/767, component styling) is identical to the template's CSS for the same element IDs, which was measured live on the demo.

## Images

All in `public/images/tonys/` under their original filenames (registry: `src/lib/images.ts`):

| File | Used for |
| --- | --- |
| `Tonys-Ice-Cream-Logo.png` | header, footer, favicon source. Original is 3206×3236 / 561 KB – shipped downscaled to 640px. White badge reading **"TONY'S ICE CREAMS" "19 79"** |
| `f664199f-…-1.jpg` | hero (four vans) |
| `97466962-….jpg` | the small image under the icon boxes – it is the **Food Standards Agency 5-star hygiene rating card** |
| `8565dc9a-…-1.jpg`, `11416184_…_n.jpg`, `a9691cbf-…-1.jpg`, `11079358_…_n.jpg` | event cards (Corporate, Festivals, Weddings & Birthdays, School) |
| `pngegg.png`, `pngegg-1.png` | soft-serve cut-outs (stats panel, Satisfaction heading) |
| 11 gallery photos | `/gallery/` (the four above + `89e8071d`, `9cc26e06`, `f664199f`, `11885314`, `11870697`, `335061816`, and the FSA card) |
| `page-banner.jpg` | inner-page banner – Catera's stock chef photo (`2023/10/bg-b-default.jpg`, 2 MB → 123 KB) |

Not shipped (downloaded, unused): `Ice-Cream.png` (belonged to the hidden "partners" section), `Tonys-Logo-V2-1.png` (see below), the pre-resized `-460x580` variants.
`src/app/icon.png` / `apple-icon.png` are the logo on brand green (the white badge is invisible on a white tab otherwise).

Template artwork (from the Catera files Tony's pages reference): `hero-badge.png` (the rotating ring), `stats-waves.png`, `footer-divider.png`, leaf ornaments (extracted from theme CSS), `sparkle.svg`. Font: `BagdollDisplayRegular.woff2` from the theme –
**licence check:** it ships with the Catera theme, so Tony's theme licence should cover self-hosting it; confirm if in doubt.

## Approximated

- **Hero** – Slider Revolution rebuilt in CSS from the layer data (levels 1920/1024/778/480). The text column's left offset (353 grid-px) and top offset (50) are derived from the layer geometry; at 1024–1239 and 778–1023 the layers are taller than the slide, so the section grows rather than clipping. Slider outro/loop not reproduced (plays once).
- **Marquee section** – original sat on a YouTube background video (Catera demo footage, `youtu.be/2azkO17qweM`) under a 50% black overlay; replaced by a plain dark green panel.
- **Testimonials** – 36px display type at ≥1025px as in the theme; 30px (≤1024) and 24px (≤767) because Tony's quotes are far longer than the demo's. Slider height follows the active slide.
- **Gallery** – Isotope masonry → CSS columns (3/2/1, 30px gap; items read down columns); filter pill padding guessed; new lightbox (Magnific Popup replacement).
- **Satisfaction decor** – Tony's CSS stretches the 500×500 `pngegg-1.png` into 370×294; rendered with `object-fit: contain` so the cone isn't squashed. The 17%-wide hygiene card has a 150px minimum so it stays legible on phones.
- **Mobile banner** – original top padding 70px put the title beside the logo; raised to 135px. Contact intro gets 60px extra bottom margin on phones (the form card otherwise covers its last line).
- **Contact form** – styling measured on the demo's Contact Form 7 form; validation mirrors CF7. Delivery is not connected (see README).
- Counters count up on scroll (with a visually hidden final value); back-to-top button after ~300px, hidden on phones; alt text is new (the original had none) and generic for the event/gallery photos.
- **Not reproduced:** banner parallax (a fixed background on ≥1441px stands in), Mailchimp form, Elementor entrance animations (the home page used none).

## Questionable demo content – decide what stays

*Kept (faithful to Tony's live site):*
- **Page banner photo** – a Catera stock shot of a tattooed chef plating food, behind the title on About/Contact/Gallery. Tony's CSS still used it; **switched off by request** (`SECTIONS.pageBannerPhoto = false` in `src/lib/sections.ts`; set `true` to match the original).
- **Hero badge text "EXQUISITE CATERING SERVICES"** – baked into the Catera ring image (`public/images/theme/hero-badge.png`). Replace the file or remove the `<Image>` in `Hero.tsx`.
- **Footer tagline** "Let's create unforgettable moments with exceptional catering!" – Catera copy.
- **Two logos exist.** The site used `Tonys-Ice-Cream-Logo.png` ("ICE CREAMS", "19 79"). A newer `Tonys-Logo-V2-1.png` ("ICE CREAM", "20 02") is in the same media library and was used for the WordPress favicon. Which is current? (Swap in `src/lib/images.ts`.)
- **"50+ years experience" (home) vs "Delivering Ice Creams For Over 25 Years" (About)**, and a "1979" logo – three different claims. Copied as-is.
- About-page copy ("Nestled in the heart of our community… churned to perfection") reads as generic template copy.
- Different Facebook URLs in header and footer; "Bradford" in the footer vs Bingley on the Contact page (publish the address only if Tony wants it public).
- The domain: the old site redirected `tonysicecream.co.uk` → `tonysicecreams.co.uk` (with an extra "s"); this build assumes `tonysicecream.co.uk` is canonical.

*Hidden on every breakpoint in the original (not rendered unless noted; flags in `src/lib/sections.ts`):*
- Event cards – **now ON by request** (`SECTIONS.eventCards`). Menus/Venues banners (links to `source.wpopal.com`), "Our Team" (Albert Flores… "Head chef"), "Photo Gallery" teaser, "Our Blog" (6 lorem-ipsum posts), "Partners We Serve" (8 template logos), "Join our email list" (empty Mailchimp stub), opening hours "Mon–Sat 10am–6pm, Sunday closed" (add back if true).
- The archived WordPress also served dozens of Catera demo pages (services, menus, venues, lorem blog posts, archives) – redirected, not rebuilt.

*Removed:* the login popup; the "Website Created by Dezani Design Ltd." credit (replaced by a copyright line – re-add in `Footer.tsx` if wanted); `maximum-scale=1` in the viewport meta (blocked pinch-zoom). Two copy fixes: "Rated b y" → "Rated by"; stray quote mark in Lexy M's testimonial.

## URLs and redirects

Real pages keep their WordPress paths (with trailing slash): `/`, `/about-us/`, `/gallery/`, `/contact/`. Redirects (308) in `next.config.ts`:

| Old URL(s) | New |
| --- | --- |
| `/service/*`, `/services/*` (demo pages) | `/#events` |
| `/menus/*`, `/venues/*`, `/2023/*`, `/category/*`, `/tag/*`, `/author/*`, `/feed`, `/comments/feed`, `/home-1` | `/` |
| `/contact.php`, `/gallery.php` (2018 site) | `/contact/`, `/gallery/` |
| `/index.php`, `/promotions.php` (2018) | `/` |
| `/events.php`, `/weddings.php` (2018) | `/#events` |
| `/about`, `/contact-us` | `/about-us/`, `/contact/` |
| `/contact` (no slash) etc. | trailing-slash redirect |

`/wp-admin`, `/wp-login.php`, `/wp-json`, `/xmlrpc.php` are intentionally not redirected (404). Two slash-less variants (`/about`, `/service/weddings`) take one extra hop through the trailing-slash redirect.

## Verified

- `npm run build` (Next 16.4.2, strict TypeScript) passes: 4 static pages + OG image + icons + sitemap + robots, one dynamic route (`/api/contact`).
- Lighthouse mobile, simulated Slow-4G (busy dev machine): Accessibility **100**, Best Practices **100**, SEO **100**; Performance 78–96 run to run. CLS < 0.01. ~575 KB transferred on the home page (real photos).
- Scripted Chrome checks: mobile menu (open/Escape/focus return/navigation), desktop nav + `aria-current`, gallery lightbox, contact-form validation and API paths (422/200/503/400), 12 redirect paths, 404 page, no console errors.
- Screenshots reviewed at 390, 768, 820, 1024, 1100, 1440, 1920px; no horizontal overflow.
- **Not verified:** real e-mail delivery (needs the Resend variables), the Vercel deployment itself, Safari/Firefox.

## Still to do

1. Connect the enquiry form (3 env vars on Vercel) and send a test enquiry.
2. Decide the open content questions above (which logo, 50 vs 25 years, banner photo, hero-badge wording, opening hours, Bingley address, Dezani credit, canonical domain spelling).
3. Fix the Vercel 404 (see README), point the domain at Vercel, then submit `sitemap.xml` in Search Console.
4. Once live: download backups of the old Cloudways app and delete or lock it down; its SSL certificate expired on 2026-06-20 and public access was re-enabled for the image download.
