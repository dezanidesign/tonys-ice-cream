import Link from "next/link";
import styles from "./PageBanner.module.css";

/**
 * Inner-page title band (Elementor "breadcrumb" template, post 991): dark banner with a 70px display
 * title and a small "Home > Page" trail. The original used Catera's stock banner photo behind a 40% black
 * overlay; here it is a plain primary-green panel (see notes).
 */
export function PageBanner({ title }: { title: string }) {
  return (
    <section className={styles.banner}>
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
