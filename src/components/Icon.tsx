import { iconPaths } from "@/lib/icon-paths";

/** Tiny inline-SVG icon set (replaces the Catera icon font). Decorative unless a title is given. */
type StrokeName =
  | "arrowRight"
  | "arrowUp"
  | "phone"
  | "mail"
  | "marker"
  | "plus"
  | "close"
  | "chevronLeft"
  | "chevronRight";
type FillName = keyof typeof iconPaths | "quote";
export type IconName = StrokeName | FillName;

const strokes: Record<StrokeName, React.ReactNode> = {
  arrowRight: <path d="M3 12h17M14 5l7 7-7 7" />,
  arrowUp: <path d="M12 21V4M5 11l7-7 7 7" />,
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </>
  ),
  marker: (
    <>
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  plus: <path d="M12 4v16M4 12h16" />,
  close: <path d="M5 5l14 14M19 5 5 19" />,
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  chevronRight: <path d="m9 5 7 7-7 7" />,
};

export function Icon({
  name,
  size = "1em",
  title,
  strokeWidth = 2,
  className,
}: {
  name: IconName;
  size?: number | string;
  title?: string;
  strokeWidth?: number;
  className?: string;
}) {
  const a11y = title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };
  if (name === "quote") {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" className={className} {...a11y}>
        <path
          d="M10 6C5.6 6 2 9.6 2 14v12h12V14H8c0-1.1.9-2 2-2V6zm16 0c-4.4 0-8 3.6-8 8v12h12V14h-6c0-1.1.9-2 2-2V6z"
          transform="rotate(180 16 16)"
        />
      </svg>
    );
  }
  if (name in iconPaths) {
    const p = iconPaths[name as keyof typeof iconPaths];
    return (
      <svg viewBox={p.viewBox} width={size} height={size} fill="currentColor" className={className} {...a11y}>
        <path d={p.d} />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...a11y}
    >
      {strokes[name as StrokeName]}
    </svg>
  );
}
