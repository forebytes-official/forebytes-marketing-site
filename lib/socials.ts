/**
 * Forebytes' social profiles. Paste each full profile URL (https://...) between the quotes.
 *
 * On the site, all six icons always show; an icon becomes a link once its URL is filled in, and
 * stays a plain, unclickable icon until then. The welcome email and structured data list only the
 * filled ones, so nothing outside the site ever points at a missing profile.
 */
export const SOCIAL_URLS: Record<SocialKey, string> = {
  instagram: "",
  tiktok: "",
  x: "",
  threads: "",
  linkedin: "",
  youtube: "",
};

export type SocialKey = "instagram" | "tiktok" | "x" | "threads" | "linkedin" | "youtube";

const LABELS: Record<SocialKey, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  x: "X",
  threads: "Threads",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

const ORDER: SocialKey[] = ["instagram", "tiktok", "x", "threads", "linkedin", "youtube"];

export type Social = { key: SocialKey; label: string; url: string };
export type SocialSlot = { key: SocialKey; label: string; url: string | null };

function validUrl(raw: string): string | null {
  const url = raw.trim();
  try {
    return new URL(url).protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

/** Every network in display order, with its URL or null if not set (or not a valid https URL). */
export function allSocials(urls: Readonly<Record<SocialKey, string>> = SOCIAL_URLS): SocialSlot[] {
  return ORDER.map((key) => ({ key, label: LABELS[key], url: validUrl(urls[key]) }));
}

/** Only the profiles that have a valid https URL, in display order. */
export function activeSocials(urls: Readonly<Record<SocialKey, string>> = SOCIAL_URLS): Social[] {
  return allSocials(urls).flatMap((s) => (s.url ? [{ ...s, url: s.url }] : []));
}
