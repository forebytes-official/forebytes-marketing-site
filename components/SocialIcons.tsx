import { allSocials } from "@/lib/socials";
import { SOCIAL_ICON_PATHS } from "@/lib/social-icons";

/**
 * The six social icons. Colour comes from the parent (currentColor), so the same row works on the
 * dark footer and the cream About page. An icon with no URL yet renders as a plain, unclickable
 * mark so the layout is final before the accounts exist.
 */
export default function SocialIcons({ className = "", size = 22 }: { className?: string; size?: number }) {
  return (
    <ul aria-label="Forebytes on social media" className={`m-0 flex list-none flex-wrap items-center gap-1 p-0 ${className}`}>
      {allSocials().map((s) => {
        const icon = (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden focusable="false">
            <path d={SOCIAL_ICON_PATHS[s.key]} />
          </svg>
        );
        const box = "grid size-10 place-items-center rounded-full";
        return (
          <li key={s.key}>
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Forebytes on ${s.label}`} title={s.label} className={`${box} transition-[color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-current/10`}>
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
