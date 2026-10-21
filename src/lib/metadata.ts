import type { Metadata } from "next";
import { site } from "./site";

/**
 * Per-page metadata. Next.js replaces (does not deep-merge) `openGraph`, so each page restates the
 * site-wide Open Graph fields together with its own title / description / canonical path.
 * Page titles keep the original "<Page> – Tony's Ice Cream" pattern via the layout's title template.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} – ${site.name}`;
  // Same social card on every page (src/app/opengraph-image.tsx)
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}
