import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendWelcomeEmail, WELCOME_SUBJECT, welcomeHtml, welcomeText } from "@/lib/waitlist-welcome";

const env = { ...process.env };
beforeEach(() => {
  delete process.env.BREVO_API_KEY;
  delete process.env.WAITLIST_NOTIFY_FROM;
});
afterEach(() => {
  process.env = { ...env };
  vi.unstubAllGlobals();
});

describe("sendWelcomeEmail", () => {
  it("does nothing when Brevo is not configured", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await sendWelcomeEmail("a@b.com");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends the welcome email to the signup, with replies going to support", async () => {
    process.env.BREVO_API_KEY = "brevo-key";
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 201 });
    vi.stubGlobal("fetch", fetchMock);
    await sendWelcomeEmail("aoife@example.com");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.brevo.com/v3/smtp/email");
    const body = JSON.parse(init.body);
    expect(body.to).toEqual([{ email: "aoife@example.com" }]);
    expect(body.sender.email).toBe("noreply@forebytes.com");
    expect(body.replyTo).toEqual({ email: "support@forebytes.com" });
    expect(body.subject).toBe(WELCOME_SUBJECT);
    expect(body.textContent).toBe(welcomeText());
    expect(body.htmlContent).toBe(welcomeHtml());
  });

  it("tells people how to leave the list and links the privacy policy", () => {
    for (const copy of [welcomeText(), welcomeHtml()]) {
      expect(copy).toContain("support@forebytes.com");
      expect(copy).toContain("/privacy");
    }
  });

  it("leaves out the follow line until a social profile is set, then lists it", () => {
    expect(welcomeText([])).not.toContain("Want a peek");
    expect(welcomeHtml([])).not.toContain("Want a peek");
    const ig = [{ key: "instagram" as const, label: "Instagram", url: "https://instagram.com/forebytes" }];
    expect(welcomeText(ig)).toContain("Instagram: https://instagram.com/forebytes");
    expect(welcomeHtml(ig)).toContain('href="https://instagram.com/forebytes"');
  });

  it("throws when Brevo rejects the request, so the caller can log it", async () => {
    process.env.BREVO_API_KEY = "k";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 400 }));
    await expect(sendWelcomeEmail("a@b.com")).rejects.toThrow("400");
  });
});
