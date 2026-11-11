import { describe, expect, it } from "vitest";
import { activeSocials, SOCIAL_URLS } from "@/lib/socials";

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

  it("covers all six networks", () => {
    expect(Object.keys(SOCIAL_URLS).sort()).toEqual(["instagram", "linkedin", "threads", "tiktok", "x", "youtube"]);
  });
});
