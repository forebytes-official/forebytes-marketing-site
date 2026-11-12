import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { contrast } from "@/lib/contrast";

const css = readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");
const token = (name: string) => {
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token --color-${name} not found in globals.css`);
  return m[1];
};

// WCAG 2.2 AA: 4.5:1 for normal text, 3:1 for large text and for UI components.
describe("colour contrast (WCAG AA)", () => {
  it.each([
    ["cream text on the primary button", token("bg"), token("accent-strong"), 4.5],
    ["cream text on the primary button when hovered", token("bg"), token("accent-700"), 4.5],
    ["body text on the page", token("text"), token("bg"), 4.5],
    ["footer text on the dark footer", token("accent-200"), token("accent-900"), 4.5],
    ["dark text on the cream waitlist button", token("accent-900"), token("bg"), 4.5],
    ["large cream text on the terracotta circle (bold, 19px+)", token("bg"), token("accent"), 3],
    ["the focus ring against the page", token("text"), token("bg"), 3],
  ])("%s", (_label, fg, bg, min) => {
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(min);
  });
});
