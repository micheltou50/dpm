# MWorx Group website (dpm) — AI Handoff

**Date of last update:** 2026-10-25
**Based on:** `main` @ `5d06752` (2026-05-25)
**Updated by:** Claude (initial documentation audit)

## Latest known development status

The site is complete as a static marketing site for MWorx Group, built for `https://mworxgroup.com.au`. Netlify site `mtmco` serves that domain. The last change was on 2026-05-25 and nothing has changed since. See `docs/AI_CONTEXT.md` for the architecture.

## Recently completed features

- **2026-05-25 — Tracking and SEO pass** (`05fdebe`, `3a277fd`, `5d06752`)
  - GTM on all pages, with the real container `GTM-KJ46XDCM` wired in.
  - Open Graph and Twitter Card meta, `sitemap.xml`, `robots.txt`.
  - Branded `404.html`, schema.org `Organization` JSON-LD on the home page, PNG favicons and apple-touch-icon.
  - Privacy policy updated to disclose Netlify, Google (GTM/GA4/Ads) and Microsoft 365.
- **2026-05-25 — Forms moved back to Netlify Forms** (`c8fc933`). FormSubmit.co had an outage. All three forms (`contact`, `planning-portal-enquiry`, `design-documentation-enquiry`) now use Netlify Forms with a honeypot.
- **2026-05-25 — Inline AJAX enquiry forms and conversion events** on `planning-portal.html` and `design-documentation.html` (`b372218`, `bd408d7`). Adds `mworx_lead_submit` dataLayer events, `data-track` CTA attributes and a clarification of the $400 lodgement scope.
- **2026-05-25 — Positioning copy fix** (`64ad26d`). Removed "accepted first time" claims.
- **2026-05-11 — Services split** into `design-documentation.html` and `planning-portal.html`, with a mega-menu nav (`3da00e3`).
- **2026-05-10 — Rebrand to MWorx Group** (`e803b33`, `f489521`). Added the SVG logos, the emerald accent and `netlify.toml` security headers. Simplified the contact form (`7785a3a`). Several Netlify Forms 404 fixes followed (`7be8443`, `d881853`), then a temporary switch to FormSubmit.co (`1a7eb42`).
- **2026-05-06 — Initial site and rebrand to MT Management** (`f2f16af` … `386cda7`).

## Current work in progress

None. The only branch is `main` and there are no open PRs.

## Outstanding bugs

- **Stale social/favicon image:** `logo.png` (used for `og:image`, `twitter:image`, PNG favicons and the JSON-LD `logo`) is still the MT Management monogram added in `386cda7`. The rebrand in `e803b33` replaced the header logos with SVGs but did not replace this PNG.
- **Misleading GTM comments:** every page still carries the comment "replace GTM-KJ46XDCM with your real container ID". The real ID is already in place.
- **No canonical tags:** internal links use `/page.html` while the sitemap and `og:url` use `/page`. **Unverified** whether Netlify Pretty URLs redirects these to one form.
- **404 page relative asset paths** (`404.html`): it may render unstyled for nested missing URLs. **Unverified**, inferred from code.

## Planned changes

There is no roadmap or TODO in the repo. Commit `05fdebe` planned wiring `mworx_lead_submit` to a Google Ads conversion inside GTM. That work happens in GTM, not in this repo, and its status is **Unverified**.

## Important decisions made

- Netlify Forms (on-platform storage) over FormSubmit.co (`c8fc933`).
- Conversion events fire only after a confirmed successful form POST (`b372218`, `c8fc933`).
- Legal entity MT Management Pty Ltd, trading as MWorx Group (`e803b33`).
- Copy must not promise "accepted first time" outcomes (`64ad26d`).
- Plain static HTML with no build step.

## Pending tests

There is no automated test suite. Manual checks needed:

- Submit each of the three forms on the live domain. Confirm each appears in Netlify Forms (`mtmco`) and the notification email arrives.
- With GTM Preview mode, confirm the `mworx_lead_submit` event fires on the two landing-page forms and that the Google Ads conversion tag fires.
- Check that `/services` and `/services.html` both resolve and that only one is indexed.
- Visit a nested non-existent URL (for example `/a/b`) and check the 404 page styling.

## Recommended next development tasks

1. Replace `logo.png` with an MWorx Group PNG (at least 1200×630 for `og:image`, plus square favicon sizes). Update the `og:image`, `twitter:image`, favicon `<link>` tags and JSON-LD to match.
2. Add `<link rel="canonical" href="https://mworxgroup.com.au/<page>">` to each indexable page. Consider switching internal links to extensionless URLs to match the sitemap.
3. Make `404.html` asset and nav links root-absolute (`/styles.css`, `/logo.svg`, `/site.js`, `/index.html` and so on).
4. Remove the stale "replace GTM-KJ46XDCM…" comments from all 9 pages.
5. Optionally push a `mworx_lead_submit` event for the general contact form (for example on `thanks.html`, or switch it to the same AJAX pattern) so all leads are tracked the same way.
6. Add a short README describing deploy (Netlify `mtmco`) and the form names.

## Update log
- 2026-10-25 — Initial AI_CONTEXT/AI_HANDOFF created from codebase audit.
