import styles from "./SectionHeading.module.css";

type Props = {
  title: React.ReactNode;
  subtitle?: string;
  as?: "h1" | "h2";
  /** xxl = 100px display (section titles) · xl = 34px · lg = 24px */
  size?: "xxl" | "xl" | "lg";
  align?: "center" | "left";
  /** The leaf ornaments either side of the sub-title (".heading-icon-effects-yes"). */
  ornaments?: boolean;
  className?: string;
  /** "light" = white text for dark backgrounds. */
  tone?: "default" | "light";
};

export function SectionHeading({
  title,
  subtitle,
  as: Tag = "h2",
  size = "xxl",
  align = "center",
  ornaments = true,
  className = "",
  tone = "default",
}: Props) {
  return (
    <div
      className={`${styles.heading} ${styles[size]} ${align === "center" ? styles.center : ""} ${
        tone === "light" ? styles.light : ""
      } ${className}`}
    >
      {subtitle && <div className={`${styles.sub} ${ornaments ? styles.ornaments : ""}`}>{subtitle}</div>}
      <Tag className={styles.title}>{title}</Tag>
    </div>
  );
}
