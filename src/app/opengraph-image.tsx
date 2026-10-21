import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card. The original site had no Open Graph image; until the real logo / van photo is
 * restored this is a simple on-brand card (primary green, accent peach).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#09574A",
          color: "#fff",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: "#EBC6A4", textTransform: "uppercase", fontFamily: "sans-serif" }}>
          {site.name}
        </div>
        <div style={{ fontSize: 108, lineHeight: 1.05, marginTop: 24 }}>Ice Cream Van Hire For Events</div>
        <div style={{ fontSize: 30, marginTop: 36, color: "#EBC6A4", fontFamily: "sans-serif" }}>
          NCASS member · CRB checked · Fully insured · 5 star rating
        </div>
        <div style={{ fontSize: 30, marginTop: 12, fontFamily: "sans-serif" }}>{site.phone}</div>
      </div>
    ),
    size,
  );
}
