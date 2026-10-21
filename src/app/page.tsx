import type { Metadata } from "next";
import { EventCards } from "@/components/EventCards";
import { EventsIntro } from "@/components/EventsIntro";
import { Guarantee } from "@/components/Guarantee";
import { Hero } from "@/components/Hero";
import { ScrollingText } from "@/components/ScrollingText";
import { StatsTestimonials } from "@/components/StatsTestimonials";
import { SECTIONS } from "@/lib/sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  // Exactly the title of the archived homepage
  title: { absolute: site.title },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsTestimonials />
      <EventsIntro />
      {SECTIONS.eventCards && <EventCards />}
      <Guarantee />
      <ScrollingText />
    </>
  );
}
