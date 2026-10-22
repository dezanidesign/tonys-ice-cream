import Image from "next/image";
import Link from "next/link";
import { images, theme } from "@/lib/images";
import { site } from "@/lib/site";
import { Icon } from "./Icon";
import styles from "./Footer.module.css";

/**
 * Footer (Elementor template post 34, as customised for Tony's): logo, "Find us" / "Contact Us" /
 * tagline row, decorative divider, copyright line + "follow us" Facebook link.
 * The opening-hours list and the e-mail sign-up form exist in the archived markup but were hidden on
 * every breakpoint (the form was an empty Mailchimp stub), so they are not rendered.
 */
export function Footer() {
  const logo = images.logo;
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`boxed ${styles.inner}`}>
        <div className={styles.top}>
          <Link href="/" className={styles.logo} aria-label={`${site.name} – home`}>
            <Image src={logo.src} alt="" width={logo.width} height={logo.height} sizes="120px" />
          </Link>
        </div>

        <div className={styles.row}>
          <div className={`${styles.col} ${styles.find}`}>
            <h2 className={styles.colTitle}>Find us</h2>
            <p className={styles.colText}>{site.address.footerLabel}</p>
          </div>
          <div className={`${styles.col} ${styles.contact}`}>
            <h2 className={styles.colTitle}>Contact Us</h2>
            <p className={`${styles.colText} ${styles.strong}`}>
              <a href={site.phoneHref}>{site.phone}</a>
            </p>
            <p className={styles.colText}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <div className={styles.tagline}>
            <p>{site.footerTagline}</p>
          </div>
        </div>

        <Image
          className={styles.divider}
          src={theme.footerDivider.src}
          alt=""
          width={theme.footerDivider.width}
          height={theme.footerDivider.height}
        />

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} {site.name}. All rights reserved
          </p>
          <div className={styles.follow}>
            <span className={styles.followLabel}>follow us</span>
            <a
              className={styles.social}
              href={site.facebookFooter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tony's Ice Cream on Facebook (opens in a new tab)"
            >
              <Icon name="facebook" size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
