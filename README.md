# Tony's Ice Cream – tonysicecream.co.uk

Modern, static rebuild of the old WordPress / Elementor / Catera site. Next.js 16 (App Router) · React 19 ·
TypeScript · CSS Modules. No CMS, no database, no WordPress.

How the rebuild was done, what came from where, and what is still missing is documented in
**[RECONSTRUCTION_NOTES.md](./RECONSTRUCTION_NOTES.md)** – read that first.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (this is what Vercel runs)
npm run start      # serve the production build
npm run typecheck
```

Requires Node 20+ (developed on Node 22).

## Deploy to Vercel

1. Import the repository in Vercel – framework is auto-detected (Next.js); no build settings to change.
2. Add the domain `tonysicecream.co.uk` under *Project → Settings → Domains* and point DNS at Vercel.
3. (Optional) add the e-mail variables below so the contact form delivers mail.

Everything is statically prerendered except `POST /api/contact` (one small serverless function).
Old WordPress URLs are redirected in [`next.config.ts`](./next.config.ts); `trailingSlash: true` keeps the
original `…/contact/` style URLs.

## Environment variables (all optional)

See [`.env.example`](./.env.example).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin. Defaults to `https://tonysicecream.co.uk`. |
| `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` | Deliver contact-form enquiries by e-mail through [Resend](https://resend.com). Without them the form validates, then tells the visitor to phone/e-mail instead. |

To use a different mail provider, replace the body of `sendEnquiry()` in
[`src/lib/send-enquiry.ts`](./src/lib/send-enquiry.ts) – nothing else changes.

## Images

Tony's real photos, logo and artwork are in [`public/images/tonys/`](./public/images/tonys/) under their original filenames; every path is listed in
[`src/lib/images.ts`](./src/lib/images.ts). To swap one, replace the file or change its `src` there. The browser-tab icons are
`src/app/icon.png` and `src/app/apple-icon.png`.

## Project map

```
src/app/                 routes: / · /about-us/ · /gallery/ · /contact/ · /api/contact · sitemap · robots · OG image
src/components/          Header, MobileNav, Hero, StatsTestimonials, EventsIntro, Guarantee, ScrollingText,
                         Testimonials, Counter, GalleryGrid (+lightbox), ContactForm, Footer, …
src/lib/site.ts          business details + navigation        src/lib/content.ts   page copy (verbatim from the archive)
src/lib/images.ts        image registry        src/lib/sections.ts  switches for hidden-in-original sections
public/images/tonys/     Tony's photos + logo (recovered from the old server)
public/images/theme/     artwork copied from the Catera template (waves, divider, hero badge, leaf ornaments)
```
