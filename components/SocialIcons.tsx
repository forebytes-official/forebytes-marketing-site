import { useId } from "react";
import { allSocials } from "@/lib/socials";
import { INSTAGRAM_GRADIENT, SOCIAL_BRAND_COLORS, SOCIAL_ICON_PATHS } from "@/lib/social-icons";

/**
 * The six social icons. They take the surrounding text colour (so one row works on the dark footer
 * and the cream About page) until hovered or focused, when the icon turns its brand colour on a white
 * circle. An icon with no URL yet renders as a plain, unclickable mark so the layout is final before
 * the accounts exist.
 */
export default function SocialIcons({ className = "", size = 22 }: { className?: string; size?: number }) {
  const gradientId = useId();
  return (
    <ul aria-label="Forebytes on social media" className={`m-0 flex list-none flex-wrap items-center gap-1 p-0 ${className}`}>
      {allSocials().map((s) => {
        const icon = (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden focusable="false">
            {s.key === "instagram" && (
              <defs>
                <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
                  {INSTAGRAM_GRADIENT.map(([offset, color]) => <stop key={offset} offset={offset} stopColor={color} />)}
                </linearGradient>
              </defs>
            )}
            <path d={SOCIAL_ICON_PATHS[s.key]} style={s.key === "instagram" ? { ["--ig-fill" as string]: `url(#${gradientId})` } : undefined} />
          </svg>
        );
        const box = "grid size-10 place-items-center rounded-full";
        return (
          <li key={s.key}>
            {s.url ? (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Forebytes on ${s.label} (opens in a new tab)`}
                title={s.label}
                data-social={s.key}
                style={{ ["--brand" as string]: SOCIAL_BRAND_COLORS[s.key] }}
                className={`social-link ${box}`}
              >
                {icon}
              </a>
            ) : (
              <span title={`${s.label} (coming soon)`} className={`${box} opacity-60`}>
                {icon}
                <span className="sr-only">{s.label}, coming soon</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
