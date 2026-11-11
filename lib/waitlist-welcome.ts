import { SITE } from "@/lib/site";
import { activeSocials, type Social } from "@/lib/socials";

/**
 * The welcome email a new waitlist signup receives. Built as plain strings so the copy is easy to
 * edit and testable without sending anything. The "follow along" line only appears once at least
 * one profile is filled in lib/socials.ts.
 */
export const WELCOME_SUBJECT = "You're on the Forebytes waitlist";

const support = SITE.emails.support;

export function welcomeText(socials: Social[] = activeSocials()): string {
  const follow = socials.length
    ? `\nWant a peek before then? We share what we're building, and the dishes we can't stop thinking about, here:\n${socials.map((s) => `${s.label}: ${s.url}`).join("\n")}\n`
    : "";
  return `Hi there,

Thanks for joining the Forebytes waitlist. You're in.

We built Forebytes because "where should we eat?" is the easy question. The hard one is "what should I order?" So we made an app that answers it:

- Ratings for individual dishes, not just restaurants, so you know what's actually good on the menu.
- Menus with prices and nutrition, on a live map of what's around you.
- Real 3D models of dishes, built from scans of the actual food, that you can place on your own table in AR before you order.

We're starting in Dublin. When the app is ready, you'll be among the first to know, and we'll send you the link to download it.

Until then we'll keep your inbox quiet. You'll only hear from us when there's something worth telling you.
${follow}
See it before you bite it,
The Forebytes team

P.S. What's the one dish in Dublin you'd tell everyone to order? Hit reply and tell us. We read every one.

--
You're getting this because this address was signed up at forebytes.com.
Not you, or changed your mind? Reply to this email or write to ${support} and we'll take you off the list.
Privacy policy: ${SITE.url}/privacy`;
}

const p = (html: string) => `<p style="margin:0 0 16px">${html}</p>`;
const li = (html: string) => `<li style="margin:0 0 8px">${html}</li>`;
const link = (url: string, text: string) => `<a href="${url}" style="color:#c67139">${text}</a>`;

export function welcomeHtml(socials: Social[] = activeSocials()): string {
  const follow = socials.length
    ? p(`Want a peek before then? We share what we&rsquo;re building, and the dishes we can&rsquo;t stop thinking about, on ${socials.map((s) => link(s.url, s.label)).join(" &middot; ")}.`)
    : "";
  return `<!doctype html>
<html lang="en"><body style="margin:0;padding:24px;background:#ffffff;color:#1a1a1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55">
<div style="max-width:520px;margin:0 auto">
${p("Hi there,")}
${p("Thanks for joining the Forebytes waitlist. You&rsquo;re in.")}
${p("We built Forebytes because &ldquo;where should we eat?&rdquo; is the easy question. The hard one is &ldquo;what should I order?&rdquo; So we made an app that answers it:")}
<ul style="margin:0 0 16px;padding-left:20px">
${li("<b>Ratings for individual dishes</b>, not just restaurants, so you know what&rsquo;s actually good on the menu.")}
${li("<b>Menus with prices and nutrition</b>, on a live map of what&rsquo;s around you.")}
${li("<b>Real 3D models of dishes</b>, built from scans of the actual food, that you can place on your own table in AR before you order.")}
</ul>
${p("We&rsquo;re starting in Dublin. When the app is ready, you&rsquo;ll be among the first to know, and we&rsquo;ll send you the link to download it.")}
${p("Until then we&rsquo;ll keep your inbox quiet. You&rsquo;ll only hear from us when there&rsquo;s something worth telling you.")}
${follow}
${p("See it before you bite it,<br>The Forebytes team")}
${p("<i>P.S. What&rsquo;s the one dish in Dublin you&rsquo;d tell everyone to order? Hit reply and tell us. We read every one.</i>")}
<hr style="border:0;border-top:1px solid #e5e5e5;margin:24px 0 16px">
<p style="margin:0;font-size:13px;color:#6b6b6b">You&rsquo;re getting this because this address was signed up at forebytes.com. Not you, or changed your mind? Reply to this email or write to <a href="mailto:${support}" style="color:#6b6b6b">${support}</a> and we&rsquo;ll take you off the list. <a href="${SITE.url}/privacy" style="color:#6b6b6b">Privacy policy</a>.</p>
</div>
</body></html>`;
}

/**
 * Send the welcome email through Brevo's transactional API. Replies go to support, so "reply to
 * unsubscribe" (and the P.S.) reach a person. Optional like the team alert: with no BREVO_API_KEY it
 * does nothing. Failures throw so the caller can log them; the caller must never let this fail the signup.
 */
export async function sendWelcomeEmail(email: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return;

  const from = process.env.WAITLIST_NOTIFY_FROM ?? "noreply@forebytes.com";
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      sender: { name: "Forebytes", email: from },
      replyTo: { email: support },
      to: [{ email }],
      subject: WELCOME_SUBJECT,
      textContent: welcomeText(),
      htmlContent: welcomeHtml(),
    }),
  });
  if (!res.ok) throw new Error(`Brevo welcome email failed: ${res.status}`);
}
