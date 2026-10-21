/** Shared (browser + server) validation for the "Leave your message" form. */

export type Enquiry = { name: string; email: string; message: string };
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Mirrors the original Contact Form 7 form: name* and email* required, message optional. */
export function validateEnquiry(input: Partial<Record<keyof Enquiry, unknown>>): {
  data: Enquiry;
  errors: EnquiryErrors;
} {
  const data: Enquiry = {
    name: typeof input.name === "string" ? input.name.trim() : "",
    email: typeof input.email === "string" ? input.email.trim() : "",
    message: typeof input.message === "string" ? input.message.trim() : "",
  };
  const errors: EnquiryErrors = {};
  if (!data.name) errors.name = "Please enter your name.";
  else if (data.name.length > 120) errors.name = "That name is too long.";
  if (!data.email) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(data.email) || data.email.length > 200) errors.email = "Please enter a valid email address.";
  if (data.message.length > 5000) errors.message = "Please keep your message under 5,000 characters.";
  return { data, errors };
}
