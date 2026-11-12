"use client";

import { useSyncExternalStore } from "react";

const KEY = "forebytes.motion";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  return () => observer.disconnect();
}
const paused = () => document.documentElement.dataset.motion === "paused";

/**
 * "Pause animations": stops the endless background loops, the marquee and the rotating headline word
 * (WCAG 2.2.2, Pause, Stop, Hide). The choice is kept in localStorage and re-applied by the inline
 * script in app/layout.tsx. The state lives on <html data-motion>, so every toggle on the page stays in sync.
 *
 * "skip" is a keyboard shortcut: hidden until it is tabbed to, right after "Skip to content".
 */
export default function MotionToggle({ variant }: { variant: "footer" | "skip" }) {
  const isPaused = useSyncExternalStore(subscribe, paused, () => false);

  function toggle() {
    const next = isPaused ? "running" : "paused";
    document.documentElement.dataset.motion = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
  }

  const label = isPaused ? "Resume animations" : "Pause animations";
  return variant === "skip" ? (
    <button type="button" onClick={toggle} className="skip-link" style={{ left: 190 }}>{label}</button>
  ) : (
    <button type="button" onClick={toggle} className="foot-link cursor-pointer underline underline-offset-4">{label}</button>
  );
}
