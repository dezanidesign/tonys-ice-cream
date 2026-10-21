import { eventCards } from "@/lib/content";
import { eventImages } from "@/lib/images";
import { Photo } from "./Photo";
import styles from "./EventCards.module.css";

/**
 * Corporate / Festivals / Weddings & Birthdays / School Events cards (Elementor container #748c53f).
 * Present in the archived markup but hidden on every breakpoint – rendered only when
 * SECTIONS.eventCards is enabled in src/lib/sections.ts.
 */
export function EventCards() {
  return (
    <section className={styles.section} aria-label="Events we cater">
      <ul className={styles.grid}>
        {eventCards.map((card) => (
          <li key={card.key} className={styles.card}>
            <h3 className={styles.title}>{card.title}</h3>
            <div className={card.key === "weddings" || card.key === "festivals" ? styles.archFlip : styles.arch}>
              <Photo img={eventImages[card.key]} sizes="(max-width: 767px) 90vw, 460px" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
