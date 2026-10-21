"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";
import styles from "./Header.module.css";

/** Desktop primary navigation (visible ≥1025px). Client component only for the active-link state. */
export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className={styles.mainNav} aria-label="Primary">
      <ul>
        {nav.map((item) => {
          const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link href={item.href} aria-current={current ? "page" : undefined}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
