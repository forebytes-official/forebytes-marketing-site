"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type State = "idle" | "loading" | "done" | "error";

export default function WaitlistForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [badEmail, setBadEmail] = useState(false);
  const done = useRef<HTMLDivElement>(null);

  // The form disappears on success, so move focus to the confirmation instead of dropping it on <body>.
  useEffect(() => {
    if (state === "done") done.current?.focus();
  }, [state]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState("loading");
    setBadEmail(false);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), company: form.get("company") }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBadEmail(res.status === 422);
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  return (
    <>
      {/* Always in the page, so screen readers reliably announce the confirmation when it appears. */}
      <div ref={done} role="status" tabIndex={-1} className={state === "done" ? "font-heading text-[32px]" : "sr-only"}>
        {state === "done" ? "You're on the list. Talk soon." : ""}
      </div>
      {state !== "done" && (
        <form onSubmit={onSubmit} className="flex flex-wrap justify-center gap-2.5" noValidate={false}>
          <label className="sr-only" htmlFor="wl-email">Email address</label>
          <input
            id="wl-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            aria-invalid={badEmail || undefined}
            aria-describedby={state === "error" ? "wl-error" : undefined}
            className="input !text-[17px]"
            style={{ minWidth: "min(320px,80vw)", width: "auto" }}
          />
          {/* honeypot */}
          <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
          <button type="submit" disabled={state === "loading"} className="btn !bg-bg !text-accent-900 hover:!bg-accent-100 !px-7 !py-3.5 !text-[17px]">
            {state === "loading" ? "Joining…" : "Join the waitlist"}
          </button>
          {state === "error" && <p id="wl-error" role="alert" className="basis-full text-[19px] font-bold">{error}</p>}
        </form>
      )}
    </>
  );
}
