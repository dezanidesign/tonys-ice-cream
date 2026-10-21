import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageBanner } from "@/components/PageBanner";
import { galleryPage } from "@/lib/content";
import { gallery } from "@/lib/images";
import styles from "./gallery.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Gallery", // "Gallery – Tony's Ice Cream" on the archived page
  description:
    "Photos of Tony's ice cream van and the events we have catered.",
  path: "/gallery/",
});

export default function GalleryPage() {
  return (
    <>
      <PageBanner title="Gallery" />
      <section className={styles.section}>
        <GalleryGrid
          images={gallery}
          filters={[
            { id: "all", label: "All photos" },
            { id: "truck-and-events", label: galleryPage.filter },
          ]}
        />
      </section>
    </>
  );
}
