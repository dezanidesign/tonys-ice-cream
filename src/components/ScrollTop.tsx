"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import styles from "./ScrollTop.module.css";

/** The theme's round "back to top" button – scales in after scrolling ~300px, hidden on phones. */
export function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`${styles.top} ${visible ? styles.visible : ""}`}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Icon name="arrowUp" size={15} />
    </button>
  );
}
