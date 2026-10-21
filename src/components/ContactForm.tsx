"use client";

import { useEffect, useRef, useState } from "react";
import { validateEnquiry, type EnquiryErrors } from "@/lib/enquiry";
import { Icon } from "./Icon";
import styles from "./ContactForm.module.css";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string };

export function ContactForm({ phone, email }: { phone: string; email: string }) {
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const [focusId, setFocusId] = useState<string | null>(null);

  // Move focus to the first invalid field once the error state has rendered
  useEffect(() => {
    if (focusId) {
      document.getElementById(focusId)?.focus();
      setFocusId(null);
    }
  }, [focusId, errors]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
      website: form.get("website"), // honeypot
    };
    const { errors: found } = validateEnquiry(payload as Record<string, unknown>);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = (["name", "email", "message"] as const).find((k) => found[k]);
      setFocusId(first ? `cf-${first}` : null);
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: EnquiryErrors };
      if (res.ok && json.ok) {
        formRef.current?.reset();
        setStatus({ state: "sent" });
      } else if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        setStatus({ state: "idle" });
      } else if (json.code === "not_configured") {
        setStatus({
          state: "error",
          message: `Sorry, online enquiries aren’t switched on yet. Please call ${phone} or email ${email}.`,
        });
      } else {
        setStatus({
          state: "error",
          message: `Sorry, something went wrong sending your message. Please try again, or call ${phone}.`,
        });
      }
    } catch {
      setStatus({
        state: "error",
        message: `Sorry, we couldn’t reach the server. Please check your connection or call ${phone}.`,
      });
    }
  }

  const sending = status.state === "sending";

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate aria-label="Contact form">
      <div className={styles.field}>
        <label htmlFor="cf-name" className="sr-only">
          Your name (required)
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name *"
          required
          aria-required="true"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "cf-name-err" : undefined}
          className={styles.input}
        />
        {errors.name && (
          <p id="cf-name-err" className={styles.error}>
            {errors.name}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-email" className="sr-only">
          Email (required)
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email *"
          required
          aria-required="true"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "cf-email-err" : undefined}
          className={styles.input}
        />
        {errors.email && (
          <p id="cf-email-err" className={styles.error}>
            {errors.email}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-message" className="sr-only">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={3}
          placeholder="Message"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
          className={`${styles.input} ${styles.textarea}`}
        />
        {errors.message && (
          <p id="cf-message-err" className={styles.error}>
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot – hidden from people and assistive tech, bots fill it in */}
      <div className={styles.trap} aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button type="submit" className={styles.submit} disabled={sending}>
        <span>{sending ? "sending…" : "request quote"}</span>
        <Icon name="arrowRight" size={12} />
      </button>

      <div role="status" aria-live="polite" className={styles.status}>
        {status.state === "sent" && (
          <p className={styles.success}>Thank you – your message has been sent. We’ll be in touch soon.</p>
        )}
        {status.state === "error" && <p className={styles.fail}>{status.message}</p>}
      </div>
    </form>
  );
}
