import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { Icon } from "./Icon";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import styles from "./Header.module.css";

/**
 * Site header – laid over the top of the hero / page banner (position: absolute), exactly like
 * the Elementor "Header & Footer" template (post 32) it replaces:
 *   logo | primary navigation (desktop) or menu button (≤1024) | "call us" + phone + Facebook (≥768).
 */
export function Header() {
  const logo = images.logo;
  return (
    <header className={styles.header}>
      <div className={styles.logoCol}>
        <Link href="/" className={styles.logo} aria-label={`${site.name} – home`}>
          <Image src={logo.src} alt="" width={logo.width} height={logo.height} sizes="180px" priority />
        </Link>
      </div>

      <div className={styles.navCol}>
        <MainNav />
        <MobileNav />
      </div>

      <div className={styles.callCol}>
        <span className={styles.callLabel}>call us</span>
        <a className={styles.phone} href={site.phoneHref}>
          <Icon name="phone" size={14} className={styles.phoneIcon} />
          <span>{site.phone}</span>
        </a>
        <a
          className={styles.facebook}
          href={site.facebookHeader}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tony's Ice Cream on Facebook (opens in a new tab)"
        >
          <Icon name="facebook" size={16} />
        </a>
      </div>
    </header>
  );
}
