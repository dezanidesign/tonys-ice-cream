import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { PageBanner } from "@/components/PageBanner";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Contact", // "Contact – Tony's Ice Cream" on the archived page
  description:
    "Tell us about your event and we'll get back to you with a quote for ice cream van hire. Call +44 7834 015445 or email tonysicecreams@gmail.com.",
  path: "/contact/",
});

export default function ContactPage() {
  const a = site.address;
  return (
    <>
      <PageBanner title="Contact" />

      <section className={styles.intro}>
        <div className={`boxed ${styles.introInner}`}>
          <div className={styles.introText}>
            <h2 className={styles.introTitle}>{contact.heading}</h2>
            <p>{contact.intro}</p>
          </div>
        </div>
      </section>

      <section className={styles.main}>
        <div className={styles.white} aria-hidden="true" />
        <div className={`boxed ${styles.row}`}>
          <div className={styles.card}>
            <h2 className={styles.formTitle}>{contact.formHeading}</h2>
            <ContactForm phone={site.phone} email={site.email} />
          </div>

          <div className={styles.details}>
            <h2 className={styles.detailsTitle}>{contact.detailsHeading}</h2>
            <address className={styles.list}>
              <div className={`${styles.item} ${styles.office}`}>
                <span className={styles.icon}>
                  <Icon name="marker" size={24} />
                </span>
                <div>
                  <h3 className={styles.itemTitle}>Office</h3>
                  <p className={styles.itemText}>
                    {a.street}, {a.locality} {a.region}, {a.postalCode}, United Kingdom
                  </p>
                </div>
              </div>
              <div className={styles.item}>
                <span className={styles.icon}>
                  <Icon name="phone" size={24} />
                </span>
                <div>
                  <h3 className={styles.itemTitle}>phone</h3>
                  <p className={`${styles.itemText} ${styles.phone}`}>
                    <a href={site.phoneHref}>{site.phone}</a>
                  </p>
                </div>
              </div>
              <div className={styles.item}>
                <span className={styles.icon}>
                  <Icon name="mail" size={21} />
                </span>
                <div>
                  <h3 className={styles.itemTitle}>email</h3>
                  <p className={styles.itemText}>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </p>
                </div>
              </div>
            </address>
          </div>
        </div>

        <div className={`boxed ${styles.map}`}>
          <iframe
            src={site.mapEmbed}
            title={`Map showing ${a.postalCode}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}
