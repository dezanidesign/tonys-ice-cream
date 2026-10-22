import Image from "next/image";
import type { SiteImage } from "@/lib/images";
import styles from "./Photo.module.css";

/**
 * Renders a registry image at its intended aspect ratio with object-fit: cover, so the crop is
 * identical whatever size the source file is (the real
 * file turns out to be).
 */
export function Photo({
  img,
  sizes,
  priority = false,
  className = "",
  fit = "cover",
  position = "center",
}: {
  img: SiteImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  fit?: "cover" | "contain";
  position?: string;
}) {
  return (
    <span className={`${styles.photo} ${className}`} style={{ aspectRatio: `${img.width} / ${img.height}` }}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: fit, objectPosition: position }}
      />
    </span>
  );
}
