# Accessibility (WCAG 2.2 AA)

The site is built to meet WCAG 2.2 level AA. This is what that means in the code, and how to keep it true.

## What is in place

- **Keyboard:** everything works without a mouse. "Skip to content" and "Pause animations" are the first two
  tab stops. One `<main id="main">` per page, `<nav>` landmarks for the header and footer.
- **Focus:** a two-tone ring (dark line plus a cream band) on every focusable element, so it shows on cream,
  terracotta and the dark footer (`app/organic.css`). `scroll-padding-top` keeps a focused link clear of the fixed nav.
- **Contrast:** normal text is at least 4.5:1, large text and icons at least 3:1.
  Buttons with cream text use `--color-accent-strong` (`#9a582c`), not `--color-accent` (`#c67139`, only 3.0:1).
  `lib/__tests__/contrast.test.ts` fails if a token drifts below the line.
- **Motion:** `prefers-reduced-motion` is honoured (no smooth-scroll, rotator or word reveal). Visitors can also
  pause the endless loops, the marquee and the rotating headline word with "Pause animations" (WCAG 2.2.2). The choice
  is remembered. Pinned scroll scenes move only when the visitor scrolls, which WCAG does not treat as auto-moving.
- **Screen readers:** decorative art and the phone mockups are `aria-hidden`; the rotating word has a plain-text
  equivalent; the waitlist confirmation lives in a persistent live region and takes focus when it appears; links that
  open a new tab say so; icon-only links have names.
- **Links** inside running text are underlined, so they do not depend on colour.
- **Zoom and reflow:** the viewport allows pinch zoom, and layouts reflow down to 320px.

## Known exemptions

- The phone mockups on the home page recreate the app's screens, including its own muted greys. They are
  illustrations (`aria-hidden`) and every fact they show is also in the page text, so their internal text is exempt
  from the contrast rule (WCAG 1.4.3, "incidental" text in a picture). Automated checkers still flag it.
- Automated checkers also flag text caught **mid-animation**: the rotating headline word while it flips, the Story
  steps while they cross-fade as you scroll, and the signup block while it fades in. Each is fully readable once
  settled; the settled state of every Story step and the signup block was checked and passes.
- The "Menus are flat photos and guesses..." sentence lights up word by word as you scroll through it, starting at
  14% strength. Every word reaches full contrast, and visitors who prefer reduced motion (or have no JavaScript) get
  the whole sentence at full strength straight away. If this is ever judged too faint, raise the starting opacity in
  `.reveal-word` (`app/globals.css`).
- The big terracotta call-to-action circle carries cream text at 3.0:1, so its copy is bold and at least 19px,
  which WCAG treats as large text (3:1).

## Checking a change

```sh
npm test                      # includes the contrast guard
npm run build && npx next start -p 4173
npx lighthouse http://localhost:4173/ --only-categories=accessibility --chrome-flags="--headless=new"
```

Automated tools find roughly a third of real problems. Before a big change also tab through the page, zoom to 200%,
and try a screen reader (VoiceOver on macOS: Cmd+F5). Conformance is a claim that needs a person to confirm it; an
independent audit is the way to back it up before an accessibility statement is published.
