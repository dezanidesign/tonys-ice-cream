import { scrollingWords } from "@/lib/content";
import styles from "./ScrollingText.module.css";

/**
 * Big outlined marquee ("Healthy · Taste · Enjoy · Fresh") – the theme's slider-scrolling widget:
 * four identical strips, each translating by -100% over 25s (seamless loop). The original sat on a
 * YouTube background video (Catera demo footage), replaced here by a plain dark panel – see notes.
 */
export function ScrollingText() {
  return (
    <section className={styles.section} aria-label="Healthy, Taste, Enjoy, Fresh">
      <div className={styles.wrapper} aria-hidden="true">
        {[0, 1, 2, 3].map((strip) => (
          <div key={strip} className={styles.strip}>
            {scrollingWords.map((word) => (
              <div key={word} className={styles.item}>
                <span className={styles.leaf} />
                <span className={styles.word}>{word}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="sr-only">Healthy. Taste. Enjoy. Fresh.</p>
    </section>
  );
}
