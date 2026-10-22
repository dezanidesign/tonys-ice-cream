import Image from "next/image";
import { homeTestimonials, stats } from "@/lib/content";
import { images, theme } from "@/lib/images";
import { Counter } from "./Counter";
import { Testimonials } from "./Testimonials";
import styles from "./StatsTestimonials.module.css";

/**
 * Elementor container #6605a3b: a two-column band under the hero – green "stats" panel with the
 * animated counters on the left (rounded bottom-right corner, wave artwork), testimonial carousel
 * on the cream background on the right.
 */
export function StatsTestimonials() {
  const decor = images.statsDecor;
  return (
    <section className={styles.band} aria-label="Why choose Tony's">
      <div className={styles.stats} style={{ backgroundImage: `url(${theme.statsWaves})` }}>
        {decor.src && (
          <Image className={styles.decor} src={decor.src} alt="" width={decor.width} height={decor.height} sizes="500px" />
        )}
        {stats.map((s, i) => (
          <div key={s.label} className={i === 0 ? styles.stat1 : styles.stat}>
            <Counter value={s.value} suffix={s.suffix} label={s.label} />
          </div>
        ))}
      </div>
      <div className={styles.quotes}>
        <Testimonials items={homeTestimonials} label="Customer testimonials" />
      </div>
    </section>
  );
}
