import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { PageBanner } from "@/components/PageBanner";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { about, aboutTestimonials } from "@/lib/content";
import { images } from "@/lib/images";
import styles from "./about.module.css";

export const metadata: Metadata = pageMetadata({
  title: "About Us", // "About Us – Tony's Ice Cream" on the archived page
  description:
    "Tony's Ice Cream has been delivering ice creams for over 25 years – every scoop tells a story of flavour, quality and tradition.",
  path: "/about-us/",
});

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" />

      <section className={styles.intro} aria-labelledby="about-title">
        <Image
          className={styles.introBg}
          src={images.aboutIntro.src}
          alt=""
          fill
          sizes="960px"
          unoptimized
        />
        <div className={styles.card}>
          <SectionHeading
            as="h2"
            align="left"
            size="xl"
            ornaments={false}
            title={<span id="about-title">{about.title}</span>}
            className={styles.heading}
          />
          {about.paragraphs.map((p) => (
            <p key={p} className={styles.text}>
              {p}
            </p>
          ))}
          <Button href={about.cta.href} variant="link">
            {about.cta.label}
          </Button>
        </div>
      </section>

      <section className={styles.testimonials} aria-labelledby="testimonials-title">
        <SectionHeading
          subtitle={about.testimonials.subtitle}
          title={<span id="testimonials-title">{about.testimonials.title}</span>}
          className={styles.testiHeading}
        />
        <div className={styles.testiWrap}>
          <Testimonials items={aboutTestimonials} label="Customer testimonials" centered arrows />
        </div>
      </section>

      <section className={styles.closing}>
        <Image className={styles.closingBg} src={images.aboutClosing.src} alt="" fill sizes="100vw" />
        <span className={styles.closingVeil} aria-hidden="true" />
        <SectionHeading
          as="h2"
          size="xxl"
          ornaments={false}
          subtitle={about.closing.subtitle}
          title={<Link href="/contact/">{about.closing.title}</Link>}
          className={styles.closingHeading}
        />
      </section>
    </>
  );
}
