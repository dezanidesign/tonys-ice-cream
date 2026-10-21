"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/content";
import { Icon } from "./Icon";
import styles from "./Testimonials.module.css";

/**
 * Testimonial carousel ("layout-1", pagination style 2): one slide at a time, 500ms slide transition,
 * autoplay every 5s that pauses on hover/focus, round dot pagination. Autoplay is disabled for
 * visitors who prefer reduced motion.
 */
export function Testimonials({
  items,
  label = "Testimonials",
  centered = false,
  arrows = false,
}: {
  items: Testimonial[];
  label?: string;
  /** About-page variant ("layout-3"): centred text and previous/next buttons beside the carousel. */
  centered?: boolean;
  arrows?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Let the viewport follow the active slide's height (the tallest quote would otherwise leave a big gap
  // under the short ones). Falls back to the tallest slide before JS runs.
  useLayoutEffect(() => {
    const measure = () => setHeight(slideRefs.current[index]?.offsetHeight);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [index]);

  const go = useCallback((i: number) => setIndex(((i % items.length) + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (paused || reduced || items.length < 2) return;
    const id = window.setTimeout(() => go(index + 1), 5000);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, items.length, go]);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${centered ? styles.centered : ""}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className={styles.viewport} style={height ? { height } : undefined}>
        <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }} aria-live={paused || reduced ? "polite" : "off"}>
          {items.map((t, i) => (
            <div
              key={t.name + i}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              aria-hidden={i !== index}
              inert={i !== index}
            >
              <span className={styles.icon} aria-hidden="true">
                <Icon name="quote" size="1em" />
              </span>
              <blockquote className={styles.quote}>
                <p>“{t.quote}”</p>
              </blockquote>
              <div className={styles.caption}>
                <span className={styles.name}>{t.href ? <a href={t.href} target="_blank" rel="noopener noreferrer">{t.name}</a> : t.name}</span>
                {t.role && <span className={styles.job}>{t.role}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {arrows && items.length > 1 && (
        <>
          <button type="button" className={`${styles.arrow} ${styles.prev}`} aria-label="Previous testimonial" onClick={() => go(index - 1)}>
            <Icon name="chevronLeft" size={13} />
          </button>
          <button type="button" className={`${styles.arrow} ${styles.next}`} aria-label="Next testimonial" onClick={() => go(index + 1)}>
            <Icon name="chevronRight" size={13} />
          </button>
        </>
      )}

      {items.length > 1 && (
        <div className={styles.pagination}>
          {items.map((t, i) => (
            <button
              key={t.name + i}
              type="button"
              className={`${styles.bullet} ${i === index ? styles.active : ""}`}
              aria-label={`Show testimonial ${i + 1} of ${items.length}`}
              aria-current={i === index}
              onClick={() => go(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
