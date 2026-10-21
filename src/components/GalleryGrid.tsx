"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteImage } from "@/lib/images";
import { Icon } from "./Icon";
import styles from "./GalleryGrid.module.css";

type Props = {
  images: SiteImage[];
  /** Filter labels – the archived page had "All photos" and one group, "Truck and Events", both holding all 11 photos. */
  filters: { id: string; label: string }[];
};

/**
 * Masonry gallery (3 / 2 / 1 columns, 30px gaps, 20px radius) with the theme's dark hover veil + white
 * "+" button, filter pills and a lightbox (replaces Isotope + Magnific Popup).
 */
export function GalleryGrid({ images, filters }: Props) {
  const [active, setActive] = useState(filters[0]?.id);
  const [open, setOpen] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    triggerRef.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  return (
    <>
      {filters.length > 1 && (
        <ul className={styles.filters} aria-label="Filter photos">
          {filters.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                className={`${styles.filter} ${active === f.id ? styles.filterActive : ""}`}
                aria-pressed={active === f.id}
                onClick={() => setActive(f.id)}
              >
                {f.label}
                <span className="sr-only"> ({images.length} photos)</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <ul className={styles.grid}>
        {images.map((img, i) => (
          <li key={img.original} className={styles.item}>
            <button
              type="button"
              className={styles.thumb}
              aria-label={`Open photo ${i + 1} of ${images.length}`}
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpen(i);
              }}
            >
              <span className={styles.frame} style={{ aspectRatio: `${img.width} / ${img.height}` }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 880px) 50vw, 33vw"
                  unoptimized={img.src.endsWith(".svg")}
                  style={{ objectFit: "cover" }}
                  loading={i < 3 ? "eager" : "lazy"}
                />
              </span>
              <span className={styles.veil} aria-hidden="true" />
              <span className={styles.plus} aria-hidden="true">
                <Icon name="plus" size={22} strokeWidth={1.75} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && <Lightbox images={images} index={open} onClose={close} onStep={step} />}
    </>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onStep,
}: {
  images: SiteImage[];
  index: number;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const img = images[index];

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  return (
    <div ref={ref} className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
      <button type="button" className={`${styles.lbBtn} ${styles.lbClose}`} onClick={onClose} aria-label="Close">
        <Icon name="close" size={22} />
      </button>
      <button
        type="button"
        className={`${styles.lbBtn} ${styles.lbPrev}`}
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        aria-label="Previous photo"
      >
        <Icon name="chevronLeft" size={22} />
      </button>
      <div className={styles.lbStage} onClick={(e) => e.stopPropagation()}>
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes="90vw"
          unoptimized={img.src.endsWith(".svg")}
          className={styles.lbImage}
        />
        <p className={styles.lbCount} aria-live="polite">
          {index + 1} / {images.length}
        </p>
      </div>
      <button
        type="button"
        className={`${styles.lbBtn} ${styles.lbNext}`}
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        aria-label="Next photo"
      >
        <Icon name="chevronRight" size={22} />
      </button>
    </div>
  );
}
