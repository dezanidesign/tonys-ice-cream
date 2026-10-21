import { eventsIntro } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import styles from "./EventsIntro.module.css";

/** "what we do – Events We Cater" heading + intro paragraph (Elementor container #c2c3232). */
export function EventsIntro() {
  return (
    <section id="events" className={styles.section} aria-labelledby="events-title">
      <SectionHeading
        subtitle={eventsIntro.subtitle}
        title={<span id="events-title">{eventsIntro.title}</span>}
        className={styles.heading}
      />
      <p className={styles.text}>{eventsIntro.text}</p>
    </section>
  );
}
