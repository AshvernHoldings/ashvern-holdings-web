# Ashvern Bold Signature Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current one-page layout's neutral-ground/text-led design with a full-bleed photographic hero, a recurring amber "seal arc" brand shape, and a minimal overlay nav — while leaving the contact form's logic, all legally-sensitive copy, and the footer address byte-identical to `master`.

**Architecture:** Single Next.js page (`app/page.tsx`) restyled via `app/globals.css`. No new components beyond one small inline-SVG shape and one tiny client-side scroll listener for the nav. No new dependencies, no new routes, no backend changes.

**Tech Stack:** Next.js (App Router), Tailwind (already configured via `@theme inline` in `globals.css`), `next/font/google` (Archivo + Inter), plain CSS for all motion (reusing the existing `.reveal` / `animation-timeline: view()` pattern already on `master`).

**Spec:** `docs/superpowers/specs/2026-09-04-ashvern-landing-redesign-bold.md`

## Global Constraints

- No new npm dependencies (spec "Dependencies").
- Article VII blockquote text byte-identical to `master` (spec "What does not change").
- Investor Relations non-solicitation paragraph byte-identical to `master`.
- Ridgepoint Dispatch "in formation" wording byte-identical to `master`.
- Footer address ("2330 Scenic Hwy S, Snellville, GA 30078") and copyright line byte-identical to `master`.
- IR contact stays `investing@ashvernholdings.com`.
- `app/api/contact/route.ts`, `app/contact-form.tsx` submission logic, and `supabase/schema.sql` untouched — only `contact-form.tsx`'s JSX class names/styling may change.
- All motion respects `prefers-reduced-motion` (CSS media query, same pattern as the existing `.reveal` class).
- Seal-arc brand shape: flat-filled quarter-circle, `#D98A2B`, large (~35–45vw) bleeding off the hero's top-right corner, small (~80–120px) repeated in one corner of every other section and the footer.

---

## File Structure

- **Modify `app/globals.css`** — replace the navy-corporate token set and section styles with the new palette (`#14120E` near-black ground, `#D98A2B` amber accent, white/off-white text), Archivo/Inter font variables, hero/nav/section layout rules, the seal-arc SVG's positioning classes, and the nav scroll-state class. Keeps the existing `.reveal` keyframes/rule untouched.
- **Modify `app/layout.tsx`** — swap the font import from Inter-only to Archivo + Inter via `next/font/google`, exposing both as CSS variables.
- **Modify `app/page.tsx`** — restructure markup: hero section with `skyline-hero.jpg`, nav, headline, seal arc, scroll cue; About section with `tower-facade.webp` background; Subsidiaries/Investor Relations/Contact sections on the near-black ground; footer with a small seal arc. Content strings for the constrained blocks copied verbatim from the current `master` version already read during brainstorming.
- **Create `app/seal-arc.tsx`** — a tiny presentational component rendering the inline SVG quarter-circle, taking a `size` prop (`"large" | "small"`) so hero and repeated corner instances share one implementation instead of duplicating markup six times.
- **Create `app/nav-scroll.tsx`** — a tiny client component (`"use client"`) that toggles a `scrolled` class on the nav element past a scroll threshold. No new dependency — a single `useEffect` + `scroll` listener.
- **Modify `app/contact-form.tsx`** — only class names / inline styles to match the new dark palette; no changes to the `fetch`/`useState`/validation logic.
- **No change to** `app/api/contact/route.ts`, `supabase/schema.sql`, `public/img/city-hero.webp` (left unused but present), `public/img/tower-facade.webp` (reused), `public/img/skyline-hero.jpg` (already added and committed).

---

## Task 1: Fonts and design tokens

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: CSS custom properties `--font-display` (Archivo) and `--font-sans` (Inter) available globally; color tokens `--ink` (`#14120E`), `--white` (`#F7F5F0`), `--amber` (`#D98A2B`) available globally for later tasks' class rules.

- [ ] **Step 1: Update `app/layout.tsx` to load Archivo + Inter**

Replace the current single `Inter` import with both fonts, each exposed as a CSS variable:

```tsx
import { Archivo, Inter } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});
```

Apply both variable classes on `<body>` (or `<html>`, matching whatever the current file does) — e.g. `className={`${archivo.variable} ${inter.variable}`}`.

- [ ] **Step 2: Replace the token block in `app/globals.css`**

Replace the existing `:root { --navy: ...; }` block (the dark-navy palette) with:

```css
:root {
  --ink: #14120e;          /* page background, non-hero sections */
  --ink-card: #1c1a14;     /* raised surfaces: form fields */
  --white: #f7f5f0;        /* headings, hero type — warm white */
  --text: #d9d6cd;         /* body copy on --ink */
  --muted: #9b9587;        /* eyebrow, cite, footer secondary */
  --line: rgba(247, 245, 240, 0.12);
  --line-strong: rgba(247, 245, 240, 0.2);
  --amber: #d98a2b;        /* seal arc, links, focus rings, buttons */
  --error: #e8837a;
  --scrim: rgba(10, 9, 7, 0.6);

  --measure: 40rem;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);

  --font-display: var(--font-display), Georgia, serif;
  --font-body: var(--font-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  color-scheme: dark;
}

@theme inline {
  --color-ink: var(--ink);
  --color-white: var(--white);
  --color-text: var(--text);
  --color-muted: var(--muted);
  --color-line: var(--line);
  --color-amber: var(--amber);
  --font-display: var(--font-display);
  --font-body: var(--font-body);
}
```

Update the `body` rule's `background`/`color`/`font-family` to use `--ink`, `--text`, `--font-body` in place of the old `--navy`/`--text`/`--font-sans` names. Update `::selection` to use `--amber`/`--ink` in place of `--accent`/`--navy`.

Leave the `.reveal` / `@keyframes reveal` block (lines ~354-370 in the current file) completely untouched.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds with no CSS/type errors (no leftover reference to the removed `--navy`/`--accent`/`--navy-card` variable names — grep for them if the build doesn't surface it).

Run: `grep -rn "\-\-navy\|\-\-accent\b" app/`
Expected: no matches outside of comments.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "Bold Signature: swap fonts to Archivo/Inter, replace navy palette with ink/amber tokens"
```

---

## Task 2: Seal-arc component

**Files:**
- Create: `app/seal-arc.tsx`
- Modify: `app/globals.css` (positioning classes only)

**Interfaces:**
- Consumes: `--amber` token from Task 1.
- Produces: `<SealArc size="large" corner="top-right" />` and `<SealArc size="small" corner="..." />`, importable from `./seal-arc`, for use in Task 3.

- [ ] **Step 1: Write the component**

```tsx
// app/seal-arc.tsx
type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export default function SealArc({
  size,
  corner,
}: {
  size: "large" | "small";
  corner: Corner;
}) {
  return (
    <svg
      className={`seal-arc seal-arc--${size} seal-arc--${corner}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0,0 H100 V100 A100,100 0 0 0 0,0 Z" fill="var(--amber)" />
    </svg>
  );
}
```

(The path draws a square minus a quarter-circle bite, which — combined with `overflow: hidden` on a corner-anchored, off-viewport-bleeding box in CSS — reads as a flat quarter-circle bleeding from that corner. Simpler alternative used here: the path itself just fills the box, and the "arc" look comes from the box being circular via `border-radius` — see Step 2.)

Actually, simplify per Step 2's approach: the SVG only needs to be a plain filled circle; the corner-bleed "quarter visible" effect comes from CSS positioning (a full circle positioned so only one quadrant is inside the viewport/section). Replace the `<path>` above with:

```tsx
<circle cx="50" cy="50" r="50" fill="var(--amber)" />
```

- [ ] **Step 2: Add positioning CSS to `app/globals.css`**

```css
.seal-arc {
  position: absolute;
  pointer-events: none;
  z-index: 1;
}

.seal-arc--large {
  width: 40vw;
  height: 40vw;
  max-width: 640px;
  max-height: 640px;
}

.seal-arc--small {
  width: 100px;
  height: 100px;
}

.seal-arc--top-right {
  top: 0;
  right: 0;
  transform: translate(35%, -35%);
}

.seal-arc--top-left {
  top: 0;
  left: 0;
  transform: translate(-35%, -35%);
}

.seal-arc--bottom-right {
  bottom: 0;
  right: 0;
  transform: translate(35%, 35%);
}

.seal-arc--bottom-left {
  bottom: 0;
  left: 0;
  transform: translate(-35%, 35%);
}

@media (prefers-reduced-motion: no-preference) {
  .seal-arc--large {
    animation: seal-in 400ms var(--ease-out) 150ms both;
  }
}

@keyframes seal-in {
  from {
    opacity: 0;
    transform: translate(35%, -35%) scale(0.85);
  }
  to {
    opacity: 1;
    transform: translate(35%, -35%) scale(1);
  }
}
```

`seal-in`'s end-state transform must match whichever corner the large arc is actually placed in (currently only used at `top-right` per the spec, so the two share the same `translate(35%, -35%)` — if a future large arc ever anchors a different corner, this keyframe needs a matching variant rather than reuse).

Any section that positions a `SealArc` needs `position: relative; overflow: hidden;` so the circle visibly bleeds off that section's edge rather than the whole page. `.hero` and `.section--photo` already get this in Task 4. Task 4 also adds it to the plain `.section` rule (line ~93 in the current file) and the `footer` rule (line ~334) so the Subsidiaries/Investor Relations/Contact sections and the footer clip their small arcs correctly too — see Task 4 Step 3.

- [ ] **Step 3: Verify visually**

Run: `npm run dev`, open the dev server, temporarily drop `<SealArc size="large" corner="top-right" />` into any section with `position: relative; overflow: hidden;` and confirm a quarter-circle amber shape bleeds off that corner. Remove the temporary drop-in before continuing (Task 3 places it properly).

- [ ] **Step 4: Commit**

```bash
git add app/seal-arc.tsx app/globals.css
git commit -m "Bold Signature: add SealArc brand-shape component"
```

---

## Task 3: Nav + scroll-state script

**Files:**
- Create: `app/nav-scroll.tsx`
- Modify: `app/globals.css` (nav styles)

**Interfaces:**
- Produces: `<NavScroll />` client component, importable from `./nav-scroll`, for use in Task 4. It renders nothing visible itself — see Step 1 for why it's structured as a class-toggler rather than a wrapper.

- [ ] **Step 1: Write the scroll-state component**

```tsx
// app/nav-scroll.tsx
"use client";

import { useEffect } from "react";

export default function NavScroll() {
  useEffect(() => {
    const nav = document.querySelector("nav.site-nav");
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle("site-nav--scrolled", window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
```

- [ ] **Step 2: Add nav CSS to `app/globals.css`**

```css
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: transparent;
  transition: background 150ms var(--ease-out), backdrop-filter 150ms var(--ease-out);
}

.site-nav--scrolled {
  background: rgba(20, 18, 14, 0.85);
  backdrop-filter: blur(8px);
}

.site-nav .wordmark {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--white);
  text-decoration: none;
}

.site-nav .links {
  display: none;
  gap: 1.75rem;
}

.site-nav .links a {
  color: var(--white);
  font-size: 0.9rem;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 150ms var(--ease-out);
}

.site-nav .links a:hover,
.site-nav .links a:focus-visible {
  border-color: var(--amber);
}

@media (min-width: 52rem) {
  .site-nav .links {
    display: flex;
  }
  .site-nav .links--mobile-only {
    display: none;
  }
}

.site-nav .links--mobile-only {
  display: flex;
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds; no unused-import or client/server boundary errors (the `"use client"` directive on `nav-scroll.tsx` is required since it uses `useEffect`).

- [ ] **Step 4: Commit**

```bash
git add app/nav-scroll.tsx app/globals.css
git commit -m "Bold Signature: add minimal overlay nav with scroll crossfade"
```

---

## Task 4: Page restructure

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css` (hero/section layout rules)

**Interfaces:**
- Consumes: `SealArc` from Task 2, `NavScroll` from Task 3, tokens from Task 1.

- [ ] **Step 1: Read the current `master` copy blocks one more time before editing**

Run: `git show master:app/page.tsx`
Confirm the exact text of: the hero eyebrow/description paragraph, the Article VII blockquote + citation, the Ridgepoint Dispatch entry, the Investor Relations paragraphs, and the footer block. These get carried over verbatim into the new markup below — do not paraphrase them while restructuring.

- [ ] **Step 2: Rewrite `app/page.tsx`**

```tsx
import Image from "next/image";
import ContactForm from "./contact-form";
import SealArc from "./seal-arc";
import NavScroll from "./nav-scroll";
import towerFacade from "../public/img/tower-facade.webp";
import skylineHero from "../public/img/skyline-hero.jpg";

const IR_EMAIL = "investing@ashvernholdings.com";

export default function Home() {
  return (
    <main>
      <NavScroll />
      <nav className="site-nav" aria-label="Primary">
        <a className="wordmark" href="#hero-title">
          Ashvern Holdings
        </a>
        <div className="links">
          <a href="#purpose-title">About</a>
          <a href="#subs-title">Subsidiaries</a>
          <a href="#ir-title">Investor Relations</a>
          <a href="#contact-title">Contact</a>
        </div>
        <div className="links links--mobile-only">
          <a href="#contact-title">Contact</a>
        </div>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <Image
          src={skylineHero}
          alt="San Francisco skyline at sunset, seen from a hillside overlook, the Transamerica Pyramid at center"
          fill
          sizes="100vw"
          priority
          className="hero-image"
        />
        <SealArc size="large" corner="top-right" />
        <div className="hero-content">
          <p className="eyebrow">Holding Company &middot; Georgia</p>
          <h1 id="hero-title">Ashvern Holdings, Inc.</h1>
          <p className="lede measure">
            Ashvern Holdings, Inc. is a privately held Georgia corporation that
            owns and oversees equity interests in a group of operating
            subsidiaries. It does not sell products or services itself; its work is
            ownership, governance, and the long-term direction of the companies it
            holds.
          </p>
        </div>
      </section>

      <section className="section section--photo reveal" aria-labelledby="purpose-title">
        <Image
          src={towerFacade}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="section-bg"
        />
        <SealArc size="small" corner="bottom-right" />
        <div className="section-content">
          <p className="eyebrow">Purpose</p>
          <h2 id="purpose-title">Why the company exists</h2>
          <div className="measure" style={{ marginTop: "1.4rem" }}>
            <p>
              The company&rsquo;s purpose is stated in Article VII of its Articles
              of Incorporation:
            </p>
            <blockquote>
              <p>
                &ldquo;The Corporation is organized to acquire, hold, and manage
                equity interests in subsidiary companies, and to engage in any
                lawful act or activity for which corporations may be organized
                under the Georgia Business Corporation Code.&rdquo;
              </p>
              <span className="cite">
                Articles of Incorporation of Ashvern Holdings, Inc., Article VII
              </span>
            </blockquote>
            <p>
              In practice, Ashvern Holdings, Inc. holds the ownership stake in each
              subsidiary and sets policy at the parent level &mdash; how the group
              is governed, how capital is allocated, and which businesses it takes
              on. Each subsidiary keeps its own management and runs its own
              operations. New subsidiaries are formed or acquired only when they
              fit that structure.
            </p>
          </div>
        </div>
      </section>

      <section className="section reveal" aria-labelledby="subs-title">
        <SealArc size="small" corner="top-left" />
        <p className="eyebrow">Subsidiaries</p>
        <h2 id="subs-title">Companies held by Ashvern</h2>
        <p className="measure" style={{ marginTop: "1.4rem" }}>
          One company is currently planned as a subsidiary of Ashvern Holdings,
          Inc.
        </p>
        <div className="entry measure" style={{ marginTop: "1.5rem" }}>
          <div className="entry-head">
            <h3>Ridgepoint Dispatch</h3>
            <span className="status">In formation</span>
          </div>
          <p>
            A dispatch-services company planned as a wholly owned subsidiary of
            Ashvern Holdings, Inc. It has not yet been separately incorporated
            and is not operating. This section will be updated once its formation
            is complete.
          </p>
        </div>
      </section>

      <section className="section reveal" aria-labelledby="ir-title">
        <SealArc size="small" corner="top-right" />
        <p className="eyebrow">Investor Relations</p>
        <h2 id="ir-title">Information for investors</h2>
        <div className="measure" style={{ marginTop: "1.4rem" }}>
          <p>
            Ashvern Holdings, Inc. is a privately held company. Nothing on this
            website is an offer to sell, or a solicitation of an offer to buy,
            any security, and no investment is being offered here.
          </p>
          <p>
            Investors who wish to reach the company may write to{" "}
            <a href={`mailto:${IR_EMAIL}`}>{IR_EMAIL}</a>. Correspondence
            is read and answered directly.
          </p>
        </div>
      </section>

      <section className="section reveal" aria-labelledby="contact-title">
        <SealArc size="small" corner="bottom-left" />
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title">Get in touch</h2>
        <p className="measure" style={{ marginTop: "1.4rem" }}>
          General correspondence can be sent with the form below, or by mail to
          the address in the footer.
        </p>
        <div className="measure" style={{ marginTop: "1.75rem" }}>
          <ContactForm />
        </div>
      </section>

      <footer>
        <SealArc size="small" corner="bottom-right" />
        <p className="name">Ashvern Holdings, Inc.</p>
        <p>Incorporated in the State of Georgia.</p>
        <p>2330 Scenic Hwy S, Snellville, GA 30078</p>
        <p style={{ marginTop: "0.9rem" }}>
          &copy; {new Date().getFullYear()} Ashvern Holdings, Inc. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
```

- [ ] **Step 3: Add hero/section layout CSS to `app/globals.css`**

```css
.hero {
  position: relative;
  min-height: 100dvh;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.hero-image {
  object-fit: cover;
  z-index: -1;
}

@media (prefers-reduced-motion: no-preference) {
  .hero-image {
    animation: hero-image-in 500ms var(--ease-out) both;
  }
  .hero-content > * {
    animation: hero-text-in 400ms var(--ease-out) 120ms both;
  }
}

@keyframes hero-image-in {
  from {
    opacity: 0;
    transform: scale(1.03);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes hero-text-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 4rem 1.5rem 5rem;
  background: linear-gradient(to top, var(--scrim), transparent 60%);
  width: 100%;
}

.hero-content h1 {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  color: var(--white);
  margin: 0.3em 0 0;
  line-height: 1.02;
}

.hero-content .eyebrow {
  color: var(--white);
  opacity: 0.85;
}

.hero-content .lede {
  color: var(--white);
  margin-top: 1.2rem;
}

.section--photo {
  position: relative;
  overflow: hidden;
}

.section--photo .section-bg {
  object-fit: cover;
  z-index: -2;
}

.section--photo::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(17, 15, 11, 0.82);
  z-index: -1;
}

.section--photo .section-content {
  position: relative;
  z-index: 1;
}
```

Add `position: relative; overflow: hidden;` to the existing `.section` rule (`app/globals.css:93`) and the existing `footer` rule (`app/globals.css:334`) — both currently plain block rules with padding/max-width, neither sets a `position`, so this is a pure addition, not a rewrite. This is what makes the small `SealArc` instances in the Subsidiaries, Investor Relations, Contact, and footer clip to a quarter-circle at each section's own edge instead of escaping into neighboring sections.

- [ ] **Step 4: Verify byte-identical constrained text**

Run:
```bash
git diff master -- app/page.tsx
```
Manually confirm in the diff that the Article VII blockquote paragraph, its citation `<span>`, the Ridgepoint Dispatch paragraph, both Investor Relations paragraphs, and the footer's three `<p>` lines (address + copyright) appear with **no character changes** — only surrounding JSX (wrapper elements, class names, added `SealArc`/image siblings) should differ.

- [ ] **Step 5: Verify build and run dev server**

Run: `npm run build`
Expected: succeeds.

Run: `npm run dev`, open in a browser at both a mobile width (375px) and a wide desktop width (1440px+). Confirm: hero photo fills the viewport, headline is legible over the sky area, seal arc bleeds off the hero's top-right corner and reappears (smaller) in each later section and the footer, nav is transparent over the hero and gains a dark background once scrolled past it.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/globals.css
git commit -m "Bold Signature: restructure page into full-bleed hero + seal-arc sections"
```

---

## Task 5: Contact form re-skin

**Files:**
- Modify: `app/contact-form.tsx` (class names / inline styles only)

**Interfaces:**
- Consumes: `--ink-card`, `--amber`, `--white`, `--error` tokens from Task 1.
- No change to props, state, or the function that submits to `/api/contact`.

- [ ] **Step 1: Read the current file**

Run: `git show master:app/contact-form.tsx`
Identify every class name referencing the old palette (e.g. anything implying `navy-card`/light-paper styling) versus the actual submit/validation logic, which must not change.

- [ ] **Step 2: Update only the style-bearing class names/inline styles**

Swap field backgrounds to `var(--ink-card)`, borders to `var(--line)`, focus rings to `var(--amber)`, text to `var(--text)`/`var(--white)`, and error text to `var(--error)` — either via existing CSS custom properties already picked up automatically (if the current file uses the token names rather than hardcoded hex) or via a small addition to `app/globals.css` for the form's specific classes if it uses its own hardcoded colors. Leave every `useState`, `fetch(...)`, and validation branch untouched.

- [ ] **Step 3: Verify no logic changed**

Run: `git diff master -- app/contact-form.tsx`
Confirm every changed line is a class name, a `style={{ ... }}` color value, or JSX attribute ordering — no changed function bodies, no changed `fetch` call, no changed field names.

- [ ] **Step 4: Commit**

```bash
git add app/contact-form.tsx
git commit -m "Bold Signature: re-skin contact form to dark/amber palette"
```

---

## Task 6: End-to-end verification

**Files:** none (verification only — see spec's "Verification plan")

- [ ] **Step 1: Confirm constrained content is byte-identical**

Run:
```bash
git diff master -- app/page.tsx | grep -A2 -B2 "Article VII\|Corporation is organized\|Ridgepoint Dispatch\|In formation\|investing@ashvernholdings\|Scenic Hwy\|All rights"
```
Expected: every one of those lines appears unchanged (no `+`/`-` pair with a text difference — only surrounding structural diff lines nearby).

- [ ] **Step 2: Full contact-form test against real Supabase + Resend**

Run: `npm run dev` with real `.env.local` keys present (same keys used in the original build).
Submit the form via browser automation (fill name/email/message, submit).
Confirm: a new row appears in Supabase `contact_submissions` (query via REST with the service key), and Resend reports the notification email sent. Then delete the test row.

- [ ] **Step 3: Screenshots**

Capture screenshots at 375px and 1440px+ of the hero and at least one lower section, confirming legibility of white text over the photo and correct seal-arc placement in both.

- [ ] **Step 4: Reduced-motion check**

In the browser, enable "prefers reduced motion" (via devtools rendering emulation or OS setting) and reload. Confirm the `.reveal` sections no longer animate and appear immediately in their final state (per the existing CSS rule, unchanged from `master`).

- [ ] **Step 5: Final build**

Run: `npm run build`
Expected: clean build, no errors or warnings introduced by this work.

- [ ] **Step 6: Write build/status doc and commit**

Create `BUILD_PLAN.md` (or update if one already exists on this branch) summarizing: what was built, verification results from Steps 1-5, and a placeholder line for the Netlify deploy-preview URL to fill in after pushing. Commit it.

```bash
git add BUILD_PLAN.md
git commit -m "docs: record Bold Signature build status and verification results"
```

- [ ] **Step 7: Push branch and get the deploy-preview URL**

Run: `git push -u origin redesign/bold-signature`
Then check Netlify (or the PR checks, if a PR is opened) for the deploy-preview URL, and record it in `BUILD_PLAN.md` in a follow-up commit. Do not merge to `master`.
