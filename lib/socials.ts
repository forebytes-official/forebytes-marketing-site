/**
 * Forebytes' social profiles. Paste each full profile URL between the quotes; leave it empty until
 * the account exists. An empty or malformed entry is simply not shown anywhere (footer, About page,
 * welcome email, structured data), so there are never dead links.
 */
export const SOCIAL_URLS = {
  instagram: "",
  tiktok: "",
  x: "",
  threads: "",
  linkedin: "",
  youtube: "",
} as const;

export type SocialKey = keyof typeof SOCIAL_URLS;

const LABELS: Record<SocialKey, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  x: "X",
  threads: "Threads",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

export type Social = { key: SocialKey; label: string; url: string };

/** The profiles that have a valid https URL, in display order. */
export function activeSocials(urls: Readonly<Record<SocialKey, string>> = SOCIAL_URLS): Social[] {
  return (Object.keys(LABELS) as SocialKey[]).flatMap((key) => {
    const url = urls[key].trim();
    try {
      return new URL(url).protocol === "https:" ? [{ key, label: LABELS[key], url }] : [];
    } catch {
      return [];
    }
  });
}
