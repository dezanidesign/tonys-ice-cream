import "server-only";
import type { Enquiry } from "./enquiry";
import { site } from "./site";

export class DeliveryNotConfigured extends Error {
  constructor() {
    super("Enquiry delivery is not configured (set RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL).");
  }
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * The ONLY place that talks to an e-mail provider. Currently Resend's REST API (no SDK needed).
 * To use another provider (SendGrid, Postmark, Formspree, SMTP relay…) replace the body of this function
 * – the form, validation and API route do not change.
 *
 * Required environment variables (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY       API key from https://resend.com
 *   ENQUIRY_TO_EMAIL     where enquiries are delivered (e.g. tonysicecreams@gmail.com)
 *   ENQUIRY_FROM_EMAIL   verified sender, e.g. "Tony's Ice Cream <enquiries@tonysicecream.co.uk>"
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!apiKey || !to || !from) throw new DeliveryNotConfigured();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: enquiry.email,
      subject: `New quote request from ${enquiry.name} – ${site.name} website`,
      text: `Name: ${enquiry.name}\nEmail: ${enquiry.email}\n\n${enquiry.message || "(no message)"}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(enquiry.name)}<br><strong>Email:</strong> ${escapeHtml(
        enquiry.email,
      )}</p><p>${escapeHtml(enquiry.message || "(no message)").replace(/\n/g, "<br>")}</p>`,
    }),
  });
  if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
}
