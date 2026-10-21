"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav } from "@/lib/site";
import { Icon } from "./Icon";
import styles from "./MobileNav.module.css";

/**
 * Off-canvas menu (≤1024px): 330px white panel sliding in from the left over a 70% black overlay,
 * as in the Catera theme. Adds Escape-to-close, focus management and background inert-ing.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Close after navigating
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Menu</span>
        <span className={styles.bars} aria-hidden="true">
          <span className={styles.bar1} />
          <span className={styles.bar2} />
          <span className={styles.bar3} />
        </span>
      </button>

      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`} onClick={close} aria-hidden="true" />

      <div
        id="mobile-menu"
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={close}>
          <span className="sr-only">Close menu</span>
          <Icon name="close" size={20} />
        </button>
        <div>
          <div className={styles.tabs}>
            <span className={styles.tab}>Main Menu</span>
          </div>
          <nav className={styles.menu} aria-label="Mobile">
            <ul>
              {nav.map((item) => {
                const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={current ? "page" : undefined}>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
