import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import LegalPage from "@/components/LegalPage";
import { Item } from "@/components/legal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({ title: "Privacy policy", description: "What Forebytes collects, why, and the rights you have over it.", path: "/privacy" });

const mail = <a href={`mailto:${SITE.emails.support}`}>{SITE.emails.support}</a>;

export default function Privacy() {
  return (
    <LegalPage
      tone="sage"
      tag="Last updated 2 November 2026"
      title="Privacy"
      accentWord="policy."
      intro="What Forebytes collects, why, and the rights you have over it."
      preamble={
        <p>
          This policy explains what information Forebytes collects when you use the app, why, and what rights you have over it. Forebytes is built for a European user base and is designed around the EU General Data Protection Regulation (GDPR) from the ground up, not retrofitted onto it: our database is hosted in the EU, and account deletion genuinely erases your data rather than just hiding it.
        </p>
      }
      sections={[
        {
          id: "controller",
          title: "Who is responsible for your data",
          body: (
            <>
              <p>{SITE.company.legalName} (&quot;Forebytes&quot;, &quot;we&quot;, &quot;us&quot;), company number {SITE.company.number}, registered in {SITE.company.country}, is the data controller for the personal data described in this policy.</p>
              <p>Questions about your data, or this policy: {mail}</p>
            </>
          ),
        },
        {
          id: "collect",
          title: "What we collect, and why",
          body: (
            <>
              <Item title="Account information">
                <p>Email address, username, and a hashed password (we never see or store your password in plain text), collected when you sign up. If you sign in with Apple or Google instead, we receive only the minimum identifier and email those services pass us. We never see your Apple or Google password.</p>
                <p><b>Why:</b> to create and secure your account, and to let you sign back in. <b>Legal basis:</b> necessary to provide the service you&apos;ve signed up for.</p>
              </Item>
              <Item title="Profile information">
                <p>Display name, username, an optional avatar photo, and whether your account is private or public.</p>
                <p><b>Why:</b> so other users can recognise and (if you allow it) follow you. <b>Legal basis:</b> necessary to provide the service.</p>
              </Item>
              <Item title="Location">
                <p>Your device&apos;s location, while you have the discover map open.</p>
                <p><b>Why:</b> to show you restaurants near you. This is used live to query nearby places; it is not stored or retained once your session ends. <b>Legal basis:</b> necessary to provide the feature you&apos;ve opened.</p>
              </Item>
              <Item title="Content you create">
                <p>Restaurant and dish ratings, written reviews, lists of places you&apos;ve saved or want to try, and restaurants and dishes you contribute.</p>
                <p><b>Why:</b> this is the substance of the app, it&apos;s what you&apos;re here to do, and it&apos;s what other users see when they look up a restaurant or dish. <b>Legal basis:</b> necessary to provide the service.</p>
              </Item>
              <Item title="AR submissions (dish photos and scans)">
                <p>When you submit a dish for AR, what happens depends on your phone. On a LiDAR iPhone, the scan is built and processed on the device; nothing but the finished 3D model ever leaves your phone. On any other iPhone, you submit a few guided photos instead: faces are blurred and location data is stripped from the photo on your device, and the dish is cut out of its background, before anything leaves your phone. The photo is then checked against the dish by Anthropic (confirming it&apos;s a genuine match and estimating its size), and the 3D model itself is built by Meshy. Every submission, from either path, is reviewed by a moderator before it goes live.</p>
                <p>Submitted photos are deleted once moderation is complete, whether the submission is approved or rejected. An approved 3D model is kept for as long as the dish listing it belongs to exists.</p>
                <p><b>Why:</b> to build and verify the AR model you&apos;re contributing. <b>Legal basis:</b> necessary to provide the feature you&apos;ve chosen to use.</p>
              </Item>
              <Item title="Social connections">
                <p>Who you follow, who follows you, and (if your account is private) pending follow requests.</p>
                <p><b>Why:</b> to build your feed and control who sees your activity. <b>Legal basis:</b> necessary to provide the service.</p>
              </Item>
              <Item title="Device and notification data">
                <p>A device token used to deliver push notifications, and your notification preferences (which kinds of notifications you want).</p>
                <p><b>Why:</b> so we can tell you about things like a new follower or an approved dish submission, if you&apos;ve chosen to receive them. You can turn notifications off entirely in Settings. <b>Legal basis:</b> your consent, given when you allow notifications.</p>
              </Item>
              <Item title="Analytics">
                <p>We use PostHog to understand how people use the app: which screens get opened, which features get used, and what fails. These events are tied to your account id, never to your email address, display name, written reviews, or anything you&apos;ve typed into a search box.</p>
                <p><b>Why:</b> to find out what&apos;s broken and what isn&apos;t used, so we can fix and improve the app. <b>Legal basis:</b> our legitimate interest in keeping the app working and improving it.</p>
              </Item>
              <Item title="Error reports">
                <p>We use Sentry to catch crashes and bugs, including some technical context (like which screen and what operation) to help us fix them.</p>
                <p><b>Why:</b> so problems get found and fixed, ideally before you notice them twice. <b>Legal basis:</b> our legitimate interest in keeping the app working.</p>
              </Item>
            </>
          ),
        },
        {
          id: "share",
          title: "Who we share it with",
          body: (
            <>
              <p>We don&apos;t sell your data, to anyone, ever. We do use a small number of other companies to actually run the service, each only for what they need:</p>
              <ul>
                <li><b>Supabase:</b> our database, authentication and file storage, hosted in the EU. This holds the bulk of your account and content data.</li>
                <li><b>Mapbox:</b> provides the map and restaurant search results.</li>
                <li><b>Google (Places API):</b> fills in restaurant photos that Mapbox doesn&apos;t provide.</li>
                <li><b>Anthropic:</b> checks that a submitted AR photo matches the dish and estimates its size, for submissions that aren&apos;t a LiDAR scan.</li>
                <li><b>Meshy:</b> builds the 3D model from a verified AR photo, for submissions that aren&apos;t a LiDAR scan.</li>
                <li><b>Expo:</b> delivers push notifications to your device.</li>
                <li><b>PostHog:</b> product analytics, EU-hosted.</li>
                <li><b>Sentry:</b> error and crash reporting, EU-hosted.</li>
                <li><b>Brevo:</b> sends transactional emails (sign-up confirmation, password reset, security notices). We do not use this for marketing emails.</li>
              </ul>
              <p>Supabase, PostHog, Sentry, and Brevo are all EU-hosted or EU-based companies. Mapbox, Google (for restaurant photos), Anthropic, and Meshy are US companies; where their processing involves data leaving the EU, this is covered by standard contractual clauses, the standard legal mechanism for that kind of transfer.</p>
              <p>We may also disclose information if required by law, or to protect the safety of our users.</p>
            </>
          ),
        },
        {
          id: "moderation",
          title: "Moderation",
          body: (
            <>
              <p>When you report a restaurant, dish, review, or user, we store that report. A moderator reviewing it can see the content or account that was reported and who submitted it, so they can look into both sides of it.</p>
              <p>AR submissions go through the same kind of review before they go live (see &quot;AR submissions&quot; above).</p>
            </>
          ),
        },
        {
          id: "keep",
          title: "How long we keep it",
          body: (
            <>
              <p>We keep your account data for as long as your account exists. If you delete your account (Settings &gt; Delete Account), this is a genuine deletion, not a flag: your profile, ratings, reviews, and personal data are removed from our database, not merely hidden.</p>
              <p>One exception, by design: if you contributed a restaurant, a dish, a menu item, or a photo, that content stays on the platform after your account is deleted, with your name disconnected from it. Those contributions describe real restaurants that exist independently of you, and other people&apos;s reviews and the app&apos;s own data depend on them still being there. Your personal connection to that contribution is removed; the contribution itself is not.</p>
            </>
          ),
        },
        {
          id: "rights",
          title: "Your rights",
          body: (
            <>
              <p>Under GDPR, you have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Correct inaccurate data (you can do most of this yourself, in Profile &gt; Edit)</li>
                <li>Erase your data (Settings &gt; Delete Account, which is a real, immediate erasure)</li>
                <li>Port your data to another service</li>
                <li>Object to or restrict certain processing</li>
                <li>Withdraw consent, where we rely on it</li>
              </ul>
              <p>Access and portability requests are currently handled manually: email {mail} and we&apos;ll get you what you&apos;re asking for. There isn&apos;t yet a self-serve &quot;export my data&quot; button in the app itself.</p>
              <p>To exercise any of these rights, email {mail}. We&apos;ll respond within the timeframe GDPR requires (generally one month).</p>
              <p>You also have the right to lodge a complaint with your local data protection authority. In Ireland this is the Data Protection Commission (<a href="https://www.dataprotection.ie" rel="noopener noreferrer">www.dataprotection.ie</a>).</p>
            </>
          ),
        },
        {
          id: "children",
          title: "Children",
          body: <p>Forebytes is not intended for anyone under 16. We don&apos;t knowingly collect data from children under this age.</p>,
        },
        {
          id: "security",
          title: "Security",
          body: <p>Your data is protected by access controls at the database level (every table enforces row-level security, meaning even a bug in our own code can&apos;t expose one user&apos;s private data to another by accident), and data in transit is encrypted. No system is perfectly secure, but this is designed in from the start, not bolted on.</p>,
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: <p>We&apos;ll update the date at the top of this page if this policy changes, and notify you in-app for any change that meaningfully affects your rights.</p>,
        },
      ]}
    />
  );
}
