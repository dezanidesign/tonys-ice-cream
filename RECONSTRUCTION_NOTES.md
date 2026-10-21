# Reconstruction notes – tonysicecream.co.uk

Rebuild of the WordPress 6.8.3 / Elementor 3.19 / **Catera 1.0.1** (child theme `catera-child`) site as a static
Next.js 16 app for Vercel. Work done 2026-10-21 from the Wayback Machine and the live Catera demo.

**Read this first – the three things that matter**

1. **None of Tony's own images could be recovered** (logo, hero photo, "Satisfaction" photo, event/gallery photos, the
   `pngegg` clip-art). The Wayback Machine never captured a single file under `/wp-content/` for this domain (details
   under *Missing assets*). The site is fully built with correctly-sized, isolated placeholders; dropping the original files
   into `public/images/tonys/` (original filenames) replaces them automatically. **The logo is the most important one.**
2. **Most of the Catera demo homepage was switched off in the original.** In the archived markup the event cards, photo
   gallery teaser, team, blog, partners, menus/venues banners, e-mail sign-up and opening hours all carry Elementor's
   "hide on every device" classes. I followed the DOM: they are not rendered. The four event cards (Corporate / Festivals /
   Weddings & Birthdays / School Events) are built and, at the owner's request, **switched on** (`SECTIONS.eventCards` in `src/lib/sections.ts`; set to `false` to match the original).
3. **Tony's own Elementor CSS was not archived either** (`post-18.css`, `post-8.css`, …). Layout, spacing, colours and type
   come from the *Catera demo's* CSS for the same Elementor element IDs (Tony's site was cloned from the demo, so the IDs
   match), measured live with computed styles. Anything Tony's customised in CSS (as opposed to markup) is therefore inferred.

---

## Archived sources used

| What | URL / timestamp | Used for |
| --- | --- | --- |
| Homepage (primary) | `https://web.archive.org/web/20260116112114/https://tonysicecream.co.uk/` (raw HTML via `…20260116112114id_/…`) | all homepage content, DOM, hidden-state, nav, footer, image names, Revolution Slider layer data |
| About | `…/web/20240718035132/https://tonysicecream.co.uk/about-us/` | About copy, testimonials |
| Contact | `…/web/20240718040638/https://tonysicecream.co.uk/contact/` | address, form fields, map query |
| Gallery | `…/web/20240718055455/https://tonysicecream.co.uk/gallery/` | the 11 gallery filenames, filter labels |
| Demo service page | `…/web/20240718043443/https://tonysicecream.co.uk/service/corporate/` | confirmed lorem ipsum (not rebuilt) |
| CDX index of the whole domain | `https://web.archive.org/cdx/search/cdx?url=tonysicecream.co.uk&matchType=domain&collapse=urlkey` | URL inventory (108 URLs, none under `/wp-content/`) |
| 2018 PHP site | `http://tonysicecream.co.uk/` (20180811095456), `/images/slide1.jpg` (20180904161546), `/images/Tonys%20Ices%20logo.png` (20180904171132) … | checked as a possible image source – **not used** (see below) |
| Catera demo (live) | `https://demo2.pavothemes.com/catera/` + its `post-6/18/22/23/24/32/34/991.css`, `style.css`, `elementor.css`, `font-face.css` | layout numbers, typography, colours, interactions, the theme artwork/font |

The only inner-page captures are from July 2024 (the nearest to 2026 that exist); they could differ slightly from the live
2026 versions.

## Recovered directly from Tony's

*Content (verbatim, 2026 homepage unless noted)*
- Title `Tony's Ice Cream – Ice Cream Van Catering Service`; inner titles `About Us / Contact / Gallery – Tony's Ice Cream`.
- Hero: "Ice Cream Van / Hire For Events", the six credential lines (NCASS · Member · CRB Checked · Fully Insured ·
  5 Star Rating · Public Liability Insured), "Enquire Now" → `/contact/`.
- Counters: **50+ years experience**, **100+ events each year**.
- 3 testimonials (Tracy M – linked to addtoevent.co.uk/tonys-ice-cream, Lexy M, Fiona do / Wedding Host).
- "what we do / Events We Cater" + paragraph; "why tony's / Satisfaction Guaranteed" with *Wide Coverage*, *Member of the
  NCASS*, *5 Star Food Hygiene*; "Call us now **+44 7834 015445** for more information."; "request a quote now".
- Marquee words Healthy · Taste · Enjoy · Fresh.
- Header: Home / About (`/about-us/`) / Gallery / Contact, "call us +44 7834 015445", Facebook
  (`facebook.com/p/Tonys-icecream-yorkshire-100057281506672/`).
- Footer: "Find us – Bradford", "Contact Us – +44 7834 015445, tonysicecreams@gmail.com", tagline, divider, "follow us" Facebook
  (`facebook.com/profile.php?id=100057281506672`).
- About (2024): "Delivering Ice Creams For Over 25 Years" + two paragraphs + "get in touch"; "What They Say" with 3 *different*
  testimonials (Tracy M, Lizzie G, Rachel B); closing "Get In Touch / Your next catered event!".
- Contact (2024): "Get an answer…", "Leave your message" form (name*, e-mail*, message, button "request quote"), address
  *The Beeches, Bradford Road, Bingley, West Yorkshire, BD16 1TT*, phone, e-mail, Google map for `BD16 1TT`.
- Gallery (2024): filters "All photos 11" / "Truck and Events 11"; 11 photos (filenames in `src/lib/images.ts`).
- The three icon-box glyphs (location-arrow, check-circle, award) – SVG paths copied from the markup (`src/lib/icon-paths.ts`).

*Structure / behaviour read from the DOM*
- Section order on the homepage: hero → stats + testimonials → Events We Cater → Satisfaction Guaranteed → marquee → footer.
- Which widgets are hidden on which breakpoints (e.g. `pngegg` decor only ≥1025px, marquee hidden ≤880px, "call us" hidden ≤767px,
  hamburger ≤1024px).
- Slider Revolution layer data: levels 1920/1024/778/480, font sizes, spacer heights, image sizes, animation frames
  (slide-ins 1s / 2.5s power3.out, button delayed 660ms, badge rotating 360° / 12s), colours (`#EBC6A4` button, hover white).
- Counter 2s count-up; testimonial autoplay 5s / 500ms transition / pause on hover; marquee 4 strips × 25s linear.
- `<title>`, canonical, `robots`, favicon = the logo. (No meta description, no Open Graph, no JSON-LD existed.)

## Inferred from Catera (demo CSS / live computed styles)

- Kit tokens: primary `#09574A`, accent `#EBC6A4`, text `#626262`, border `#E3DFDA`, cream `#F6F0EA`; Montserrat body, **Bagdoll Display** headings.
- Every section's padding / widths at each Elementor breakpoint (1440 / 1200 / 1024 / 880 / 767) from `post-18.css` (home), `post-32.css`
  (header), `post-34.css` (footer), `post-991.css` (page banner), `post-22/23/24.css` (contact/about/gallery).
- Component styling from the theme: buttons (12px/600/uppercase, 16×30 padding), headings (100px → 50 → 35), sub-title with leaf
  ornaments, counters, testimonial layout-1 + round pagination (style 2), icon boxes, outlined marquee type, nav (20px display, lowercase,
  sparkle separators, 48px link padding), off-canvas mobile menu (330px, 70% overlay), back-to-top button, gallery hover veil + 70px "+" button,
  contact-form fields (`#F5F5F5` pills, 56.5px high) measured on the demo.
- The stats panel's wave artwork, the footer divider and the hero badge ring are Catera files (see below).

## Recovered assets

Nothing of Tony's. Template artwork copied from the live Catera demo (it is part of the theme Tony's site was built on):

| File in repo | Original | Notes |
| --- | --- | --- |
| `public/images/theme/hero-badge.png` | `2023/10/img-slider1-2-min-1.png` | rotating ring above the hero title – **reads "EXQUISITE CATERING SERVICES"** (see questionable content) |
| `public/images/theme/stats-waves.png` | `2023/11/h1-bg03.png` | wave lines at the bottom of the green stats panel |
| `public/images/theme/footer-divider.png` | `2023/10/divide-min.png` | footer rule with leaf ornament |
| `public/images/theme/guaranteed-waves.png` | `2023/10/h1-guaranteed.png` | **actually a stock photo of pots of rice and tomatoes** behind the Satisfaction section – see below |
| `public/images/theme/team-waves.png` | `2023/10/h1-bg02.png` | unused (belonged to the hidden "Our Team" section) |
| `public/images/theme/leaf-left/right.svg` | theme CSS data-URIs | sub-title ornaments |
| `src/app/fonts/BagdollDisplayRegular.woff2` | theme `assets/fonts/` | heading font. **Licence check:** it ships with the Catera theme, so Tony's theme licence should cover self-hosting it – confirm if in doubt. |
| Montserrat 300–600 | Google Fonts via `next/font` (self-hosted at build) | |

## Missing assets

**How they were searched for.** (1) Domain-wide CDX listing (`matchType=domain`, every host spelling, any timestamp, any status): 108 captured URLs,
**zero** under `/wp-content/` or `/wp-includes/` – only the 2018 PHP site's `/images`, `/thumbs`, `/css`, `/js` files and HTML pages. That alone rules out every
resized (`-460x580`, `-768x…`), full-size, `srcset`, `/elementor/thumbs/…` and CSS-referenced variant, because they all live in that never-captured folder.
(2) Direct `web/2id_/` probes (nearest capture across all timestamps) of the logo, `Ice-Cream.png`, the hero photo, the Satisfaction photo and one event-card
image (resized and full-size URLs) – all 404. (3) Exact-URL CDX queries for the logo, `Ice-Cream.png` and the hero photo – empty; per-filename prefix queries
for the hero and the first two event/gallery photos – empty (the CDX API then began timing out, so the remaining filenames were covered by check 1 only).
(4) The CSS files (`post-18.css`, `global.css`, `catera/style.css`, `catera-child/style.css` …) – all 404, so no `background-image` URLs or Elementor metadata
beyond the HTML's own `data-settings` could be recovered. The 2024 inner-page captures reference the same folder and fare no better.

| Original file (`/wp-content/uploads/2024/03/`) | Role | Intended size | Status |
| --- | --- | --- | --- |
| `Tonys-Ice-Cream-Logo.png` (+ `-297x300`, `-150x150`) | header + footer logo, favicon, touch icon | 297×300 | **missing** → `placeholders/logo.svg` (text badge) |
| `f664199f-c05a-4047-a030-1d415c287533-1.jpg` | hero photo | 1600×1200 | missing → dark placeholder |
| `97466962-2333-4881-abc7-8b17686b3388.jpg` | Satisfaction photo | 561×393 | missing |
| `8565dc9a-…-1-460x580.jpg`, `11416184_…_n-460x580.jpg`, `a9691cbf-…-1-460x580.jpg`, `11079358_…_n-460x533.jpg` | event cards (Corporate, Festivals, Weddings & Birthdays, School) – hidden section | 460×580 / 460×533 | missing |
| `pngegg.png`, `pngegg-1.png` | decorative cut-outs beside the stats panel / Satisfaction heading (likely ice-cream clip-art) | 500×500 | missing → nothing rendered |
| `Ice-Cream.png` | decor at the bottom of the (hidden) partners section | 500×340 | missing → not used (section hidden) |
| 11 gallery photos: `89e8071d-…-1`, `9cc26e06-…-1`, `8565dc9a-…-1`, `a9691cbf-…-1`, `f664199f-…-1`, `11885314_…_n`, `11416184_…_n`, `11079358_…_n`, `11870697_…_n`, `335061816_…_n`, `97466962-…` (`.jpg`) | /gallery/ | unknown (originals; aspect ratios guessed) | missing |
| `Tonys-Ice-Cream-Logo-297x300.png` etc. | | | covered by the logo row |
| Rev-slider decoration `2023/10/img-slider1-2-min-1.png`, theme images `2023/10/*` | | | recovered from the Catera demo instead (table above) |
| Elementor CSS (`post-8/18/32/34/991.css`, `global.css`) | Tony's exact spacing/colours | – | missing → demo CSS used |

*Placeholders:* `public/images/placeholders/*.svg` (generated by `scripts/generate-placeholders.mjs`, same aspect ratios, labelled "PHOTO COMING SOON").
Paths are centralised in `src/lib/images.ts`; real files in `public/images/tonys/` win automatically. The 2018 site's photos are real Tony's van photos
(e.g. `/images/slide1.jpg`, 774×297, archived 2018-09-04) and its old "Tony's Ices" logo (204×158) *is* in the archive, but they are different
pictures/branding from the 2024 site, so I did **not** use them as stand-ins – say if you want them as interim imagery.

## Approximated sections

- **Hero** – Slider Revolution is rebuilt in CSS from its layer data. Left offset of the text column (`353 grid-px` at ≥1240) and top offset (`50`)
  are derived from the row/column offsets and the stacked layer heights (they sum to the 920px slide height, which supports the reading). At 1024–1239 and
  778–1023 the layers are taller than the slide, so the section grows instead of clipping the button. Outro/loop of the slider is not reproduced (plays once).
- **Header** – logo size = "70% of its column" per the logo widget setting (capped on tablet/phone); the header Facebook button uses Elementor's default
  "official colour" square (blue `#3b5998`, 50px) because Tony's header-specific CSS was lost – change `.facebook` in `Header.module.css` if it looked different.
- **Marquee section background** – the original had a YouTube *background video* (Catera demo footage) under a 50% black overlay. Replaced by a plain dark green panel.
- **Inner-page banner** – the original used Catera's stock banner photo with a 40% black overlay; rebuilt as a plain primary-green panel with the same title/breadcrumb type.
  The About page's left-hand background photo and the closing "Get In Touch" photo (both demo stock) are likewise solid green.
- **Footer** – logo width (140px) and the left-packed three-column row follow the template with the two removed columns; the original footer-logo size is unknown.
- **Testimonial text** – 36px display type at ≥1025px as in the theme; reduced to 30px (≤1024) and 24px (≤767) because Tony's quotes are far longer than the demo's one-liner.
  The slider height follows the active slide (the original used the tallest slide, leaving a big gap under short quotes).
- **Gallery** – Isotope masonry → CSS columns (3/2/1, 30px gap), so items read down columns rather than across; filter pill padding guessed; lightbox is new (Magnific Popup replacement).
- **Contact form** – styling measured on the demo's Contact Form 7 form; validation rules mirror CF7 (name + e-mail required).
- **Counters** start at 0 and count up when scrolled into view (as Elementor), a visually-hidden copy carries the final numbers for screen readers.
- **Back-to-top button** appears after ~300px of scroll (theme behaviour), hidden on phones.
- **Event cards** (hidden section) use a solid green card background instead of the demo's stock photo backgrounds.
- **Not reproduced** (no archive evidence + no visual impact): parallax on the banner, Elementor entrance animations (the home page used none), Mailchimp form.

## Questionable demo content

*Present in the live 2026 markup and kept (flagged):*
- **Hero badge text "EXQUISITE CATERING SERVICES"** – baked into the Catera ring image. Swap `public/images/theme/hero-badge.png` for an ice-cream wording or remove the `<Image>` in `Hero.tsx`.
- **Footer tagline** "Let's create unforgettable moments with exceptional catering!" – Catera copy, kept as Tony's text.
- **"Events We Cater" intro** talks about "slush", "galas", "summer fairs" – Tony's own wording (kept).
- **Food-photo backdrop** (`h1-guaranteed.png`, rice + tomatoes) behind the Satisfaction section – Catera stock; kept for fidelity, drop with `SECTIONS.guaranteeFoodBackdrop = false`.
- **"50+ years experience" (home) vs "Delivering Ice Creams For Over 25 Years" (About)** – contradictory claims; copied as-is. Please decide which is right.
- About page copy ("Nestled in the heart of our community… every batch is carefully churned") reads as generic template copy.
- Different Facebook URLs in header and footer; address "Bradford" in the footer vs Bingley on the Contact page.
- Contact page: the 2024 snapshot's address is "The Beeches, Bradford Road, Bingley" – publish only if Tony wants that public.
- Page name "Home 1" (the WordPress page title; its breadcrumb band is hidden on the homepage by the theme) – not shown.

*Present in the markup but hidden on every breakpoint (not rendered; flags in `src/lib/sections.ts`):*
- Event cards with Tony's photos (**now switched on by request – `SECTIONS.eventCards`**), Menus/Venues banners (links to `source.wpopal.com`), "Our Team"
  (Albert Flores, Robert Fox… "Head chef"), "Photo Gallery" teaser, "Our Blog" (6 lorem-ipsum posts by `dezani.design@gmail.com`), "Partners We Serve"
  (8 template logos), "Join our email list" (empty Mailchimp stub), opening hours "Mon–Sat 10am–6pm, Sunday closed" (hidden – if true, consider adding), `h1-cater.png`, `img-contact-vegetable2-min.png`, `img-footer-1-min.png`.
- A YouTube background video (`youtu.be/2azkO17qweM`) on the marquee section – demo footage, not embedded.
- The archived WordPress also still served dozens of Catera demo pages (services, menus, venues, lorem blog posts, categories, tags, author archive – dozens of URLs) – redirected, not rebuilt.

*Removed:* Catera / PavoThemes branding (none visible), the login popup, the "Website Created by Dezani Design Ltd." credit (replaced by a copyright line – re-add in `Footer.tsx` if Dezani Design should stay credited),
`maximum-scale=1` in the viewport meta (it blocked pinch-zoom). Two small copy fixes: "Rated b y" → "Rated by"; stray quote mark in Lexy M's testimonial.

## URLs and redirects

Real pages keep their WordPress paths (with trailing slash): `/`, `/about-us/`, `/gallery/`, `/contact/`. Redirects (308) live in `next.config.ts`:

| Old URL(s) | New |
| --- | --- |
| `/service/*`, `/services/*` (Catera demo pages) | `/#events` |
| `/menus/*`, `/venues/*`, `/2023/*` (demo posts), `/category/*`, `/tag/*`, `/author/*`, `/feed`, `/comments/feed`, `/home-1` | `/` |
| `/contact.php`, `/gallery.php` (2018 site) | `/contact/`, `/gallery/` |
| `/index.php`, `/promotions.php` (2018) | `/` |
| `/events.php`, `/weddings.php` (2018) | `/#events` |
| `/about`, `/contact-us` | `/about-us/`, `/contact/` |
| `/contact` (no slash) etc. | trailing-slash redirect (`trailingSlash: true`) |

`/wp-admin`, `/wp-login.php`, `/wp-json`, `/xmlrpc.php` are intentionally not redirected (they 404). Tested locally with `next start`.

## What was verified

- `npm run build` succeeds (Next 16.4.2, TypeScript strict, 0 errors); 4 static pages + OG image + `sitemap.xml` + `robots.txt`, one dynamic route (`/api/contact`).
- Lighthouse (mobile, simulated Slow-4G): Accessibility **100**, Best Practices **100**, SEO **100** on all four pages; Performance 78–96 run to run (the dev machine was busy; scores swing with CPU load)
  – unthrottled in Chrome: first paint/LCP 1.1s desktop, 1.4s mobile, CLS < 0.01, ~420 KB transferred incl. 150 KB of the food-photo backdrop.
- Scripted browser checks (Chrome): mobile menu open/close/Escape/focus return/link navigation; desktop nav + `aria-current`; gallery lightbox (open, arrow keys, Escape,
  focus return); contact-form validation, focus on first error, API 422/200/503/400 paths; 12 redirect paths (two slash-less variants, `/service/weddings` and `/about`, take an extra hop through the trailing-slash redirect before landing correctly); 404 page; no console errors.
- Screenshots reviewed at 390, 768, 820, 1024, 1100, 1440 and 1920px; horizontal-overflow checks also at 1280. No overflow on any page.
- **Not verified:** real e-mail delivery (needs the Resend variables), deployment on Vercel itself, appearance with the real photos/logo, Safari/Firefox.

## Still to do

1. Supply the missing images (above) – especially the logo, hero photo and favicon.
2. Connect the enquiry form (three env vars on Vercel) and send a test enquiry.
3. Decide the open content questions (50+ vs 25 years, opening hours, event cards on/off, hero badge wording, whether to show the Bingley address, Dezani credit).
4. Point `tonysicecream.co.uk` at Vercel; after the switch submit `sitemap.xml` in Search Console.
