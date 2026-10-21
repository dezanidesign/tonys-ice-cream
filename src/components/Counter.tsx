"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Counter.module.css";

/**
 * Elementor-style counter: counts up from 0 over 2 seconds once it scrolls into view.
 * The finished value is exposed to assistive tech / no-JS readers via the visually hidden text.
 */
export function Counter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    let raf = 0;
    const duration = 2000;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setShown(Math.round(value * t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div className={styles.counter}>
      <span className="sr-only">
        {value.toLocaleString("en-GB")}
        {suffix} {label}
      </span>
      <div className={styles.number} aria-hidden="true">
        <span ref={ref}>{shown.toLocaleString("en-GB")}</span>
        <span className={styles.suffix}>{suffix}</span>
      </div>
      <div className={styles.title} aria-hidden="true">
        {label}
      </div>
    </div>
  );
}
