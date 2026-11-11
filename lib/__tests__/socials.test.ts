import { describe, expect, it } from "vitest";
import { activeSocials, allSocials, SOCIAL_URLS } from "@/lib/socials";

const none = { instagram: "", tiktok: "", x: "", threads: "", linkedin: "", youtube: "" };

describe("activeSocials", () => {
  it("shows nothing while every profile is empty", () => {
    expect(activeSocials(none)).toEqual([]);
  });

  it("keeps only https URLs, in display order", () => {
    const got = activeSocials({ ...none, youtube: " https://youtube.com/@forebytes ", instagram: "https://instagram.com/forebytes", x: "x.com/forebytes", tiktok: "http://tiktok.com/@forebytes", linkedin: "javascript:alert(1)" });
    expect(got).toEqual([
      { key: "instagram", label: "Instagram", url: "https://instagram.com/forebytes" },
      { key: "youtube", label: "YouTube", url: "https://youtube.com/@forebytes" },
    ]);
  });

  it("always lists all six networks for the icon row, with null for unset or unsafe URLs", () => {
    const got = allSocials({ ...none, x: "https://x.com/forebytes", linkedin: "javascript:alert(1)" });
    expect(got.map((s) => s.key)).toEqual(["instagram", "tiktok", "x", "threads", "linkedin", "youtube"]);
    expect(got.find((s) => s.key === "x")?.url).toBe("https://x.com/forebytes");
    expect(got.filter((s) => s.url === null)).toHaveLength(5);
  });

  it("covers all six networks", () => {
    expect(Object.keys(SOCIAL_URLS).sort()).toEqual(["instagram", "linkedin", "threads", "tiktok", "x", "youtube"]);
  });
});

describe("social icons", () => {
  it("has an icon for every network", async () => {
    const { SOCIAL_ICON_PATHS } = await import("@/lib/social-icons");
    for (const s of allSocials()) expect(SOCIAL_ICON_PATHS[s.key]).toMatch(/^M/);
  });
});
