import Image from "next/image";
import { eventCards } from "@/lib/content";
import { eventImages } from "@/lib/images";
import { Photo } from "./Photo";
import styles from "./EventCards.module.css";

/**
 * Corporate / Festivals / Weddings & Birthdays / School Events cards (Elementor container #748c53f).
 * Each card is the event photo full-bleed behind a 50% black veil, with the same photo cropped into an arch
 * (round top for Corporate / School Events, round bottom for Festivals / Weddings & Birthdays), as in Tony's CSS.
 * Present in the archived markup but hidden on every breakpoint – rendered only when SECTIONS.eventCards is on.
 */
const archDown = new Set(["festivals", "weddings"]);

export function EventCards() {
  return (
    <section className={styles.section} aria-label="Events we cater">
      <ul className={styles.grid}>
        {eventCards.map((card) => {
          const img = eventImages[card.key];
          return (
            <li key={card.key} className={styles.card}>
              <Image className={styles.bg} src={img.src} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" />
              <span className={styles.veil} aria-hidden="true" />
              <h3 className={styles.title}>{card.title}</h3>
              <div className={archDown.has(card.key) ? styles.archFlip : styles.arch}>
                <Photo img={img} sizes="(max-width: 767px) 90vw, 460px" />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
