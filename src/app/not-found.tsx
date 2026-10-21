import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageBanner } from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <PageBanner title="Page not found" />
      <section style={{ padding: "100px 30px", textAlign: "center" }}>
        <p style={{ maxWidth: 560, margin: "0 auto 40px", fontSize: 22, lineHeight: "36px" }}>
          Sorry, we couldn’t find that page. Head back to the home page or get in touch for ice cream van hire.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Button href="/">Home</Button>
          <Button href="/contact/">Contact</Button>
        </div>
      </section>
    </>
  );
}
