import Link from "next/link";
import styles from "./Button.module.css";
import { Icon } from "./Icon";

type Props = {
  href: string;
  children: React.ReactNode;
  /** "pill" = standard Catera button; "link" = text button with the expanding accent circle (About page). */
  variant?: "pill" | "link";
  className?: string;
};

export function Button({ href, children, variant = "pill", className = "" }: Props) {
  return (
    <Link href={href} className={`${styles.btn} ${variant === "link" ? styles.link : styles.pill} ${className}`}>
      <span className={styles.text}>{children}</span>
      <span className={styles.icon}>
        <Icon name="arrowRight" size="1.15em" />
      </span>
    </Link>
  );
}
