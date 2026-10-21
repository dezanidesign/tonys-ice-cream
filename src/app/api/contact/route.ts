import { NextResponse } from "next/server";
import { validateEnquiry } from "@/lib/enquiry";
import { DeliveryNotConfigured, sendEnquiry } from "@/lib/send-enquiry";

export const runtime = "nodejs";

/** POST /api/contact – validates the enquiry and hands it to src/lib/send-enquiry.ts. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots learn nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validateEnquiry(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 422 });
  }

  try {
    await sendEnquiry(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof DeliveryNotConfigured) {
      return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
    }
    console.error("Enquiry delivery failed:", error);
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }
}
