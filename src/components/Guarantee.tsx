import Image from "next/image";
import { guarantee } from "@/lib/content";
import { images, theme } from "@/lib/images";
import { SECTIONS } from "@/lib/sections";
import { site } from "@/lib/site";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHeading } from "./SectionHeading";
import styles from "./Guarantee.module.css";

/** "why tony's – Satisfaction Guaranteed": three icon boxes, photo, call-us line and quote button (container #c5b68a0). */
export function Guarantee() {
  const decor = images.satisfactionDecor;
  return (
    <section
      className={styles.section}
      style={SECTIONS.guaranteeFoodBackdrop ? { backgroundImage: `url(${theme.guaranteedWaves})` } : undefined}
      aria-labelledby="guarantee-title"
    >
      <div className={styles.inner}>
        <SectionHeading
          subtitle={guarantee.subtitle}
          title={<span id="guarantee-title">{guarantee.title}</span>}
          className={styles.heading}
        />
        {decor.src && (
          <Image className={styles.decor} src={decor.src} alt="" width={370} height={294} />
        )}

        <ul className={styles.row}>
          {guarantee.items.map((item) => (
            <li key={item.title} className={styles.box}>
              <span className={styles.icon}>
                <Icon name={item.icon} size={70} />
              </span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.text}</p>
            </li>
          ))}
        </ul>

        <div className={styles.photo}>
          <Photo img={images.satisfaction} sizes="(max-width: 600px) 100vw, 561px" />
        </div>

        <p className={styles.call}>
          {guarantee.callText}{" "}
          <a href={site.phoneHref} className={styles.phone}>
            {site.phone}
          </a>{" "}
          for more information.
        </p>
        <div className={styles.cta}>
          <Button href={guarantee.cta.href}>{guarantee.cta.label}</Button>
        </div>
      </div>
    </section>
  );
}
