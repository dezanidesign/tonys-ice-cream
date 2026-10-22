import Link from "next/link";
import { images } from "@/lib/images";
import { SECTIONS } from "@/lib/sections";
import styles from "./PageBanner.module.css";

/**
 * Inner-page title band (Elementor "breadcrumb" template, post 991): dark banner with a 70px display
 * title and a small "Home > Page" trail, over Tony's (Catera stock) banner photo with a 40% black overlay.
 */
export function PageBanner({ title }: { title: string }) {
  return (
    <section
      className={`${styles.banner} ${SECTIONS.pageBannerPhoto ? styles.photo : ""}`}
      style={SECTIONS.pageBannerPhoto ? { backgroundImage: `url(${images.pageBanner})` } : undefined}
    >
      <h1 className={styles.title}>{title}</h1>
      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
    </section>
  );
}
