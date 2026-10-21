import Image from "next/image";
import Link from "next/link";
import { hero } from "@/lib/content";
import { images, theme } from "@/lib/images";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import styles from "./Hero.module.css";

/**
 * Home hero – rebuild of the Slider Revolution "Home 1" slide used on the archived site:
 * title / credentials list / "Enquire Now" button sliding in from the left, a large photo sliding in
 * from the right (rounded bottom-left corner), and a slowly rotating badge above the title.
 * Sizes follow the slider's four responsive levels (grid 1920 / 1024 / 778 / 480) – see Hero.module.css.
 */
export function Hero() {
  return (
    <section className={styles.wrap} aria-labelledby="hero-title">
      <div className={styles.hero}>
        {/* photo (right) */}
        <div className={styles.imageMask}>
          <div className={styles.image}>
            <Photo img={images.hero} sizes="(max-width: 777px) 120vw, (max-width: 1239px) 700px, 60vw" priority />
          </div>
        </div>
        <div className={styles.overlay} aria-hidden="true" />

        {/* text (left) */}
        <div className={styles.content}>
          <div className={styles.mask}>
            <div className={`${styles.slideIn} ${styles.badge}`}>
              <span className={styles.dot} aria-hidden="true" />
              <Image
                className={styles.spin}
                src={theme.heroBadge.src}
                alt=""
                width={theme.heroBadge.width}
                height={theme.heroBadge.height}
                priority
              />
            </div>
          </div>

          <div className={styles.mask}>
            <h1 id="hero-title" className={`${styles.slideIn} ${styles.title}`}>
              {hero.titleLines.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < hero.titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
          </div>

          <div className={styles.mask}>
            <ul className={`${styles.slideIn} ${styles.list}`}>
              {hero.points.map((p) => (
                <li key={p}>- {p}</li>
              ))}
            </ul>
          </div>

          <div className={styles.mask}>
            <Link href={hero.cta.href} className={`${styles.slideIn} ${styles.button}`}>
              {hero.cta.label}
              <Icon name="arrowRight" size={24} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
