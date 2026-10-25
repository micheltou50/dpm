# MWorx Group website (dpm) — AI Context

> Shared context for AI assistants (Claude, ChatGPT/Codex). Describes what is true in the code at the commit below. Anything not confirmed in the code is marked **Unverified**.

| | |
|---|---|
| Repository | micheltou50/dpm (public) |
| Default branch | main |
| Verified against | `5d06752` (2026-05-25) |
| Last reviewed | 2026-10-25 |
| Related repos | None verified from code |

## 1. Purpose

Static marketing website for **MWorx Group**, a design and project consultancy offering two services: design documentation (DA / CDC / CC drawings) and NSW Planning Portal lodgement. The legal entity shown in the footer, the privacy policy and the schema.org markup is **MT Management Pty Ltd** (trading as MWorx Group).

The site is built for the domain **https://mworxgroup.com.au**: every absolute URL in the code uses it (`sitemap.xml`, `robots.txt`, `og:url` and `og:image` meta tags, and the JSON-LD in `index.html`).

The repo name `dpm` is historical. Git history shows the brand went from "DPM" to "MT Management" (commit `36a44cd`, 2026-05-06) to "MWorx Group" (commit `e803b33`, 2026-05-10).

## 2. Technology stack

- Hand-written HTML5 pages, one shared stylesheet (`styles.css`) and one small vanilla JS file (`site.js`).
- No build step, framework, package manager or `package.json`. There is no templating either, so the header, nav, footer and GTM snippet are copied into every page.
- Google Fonts: Familjen Grotesk, Inter and JetBrains Mono.
- Hosting and form handling: Netlify, with Netlify Forms.
- Analytics and ads: Google Tag Manager container `GTM-KJ46XDCM` on all 9 pages.

## 3. System architecture

```
Browser ──► Netlify CDN (serves repo root as-is, headers from netlify.toml)
   │
   ├─ contact.html form ──POST /thanks──► Netlify Forms ("contact") ──► redirect to thanks page
   ├─ planning-portal.html form ─fetch POST /─► Netlify Forms ("planning-portal-enquiry") ─┐
   ├─ design-documentation.html form ─fetch POST /─► Netlify Forms ("design-documentation-enquiry")
   │                                                     on success: dataLayer.push(mworx_lead_submit)
   └─ every page loads GTM (GTM-KJ46XDCM) ──► GA4 / Google Ads tags (configured in GTM, not in repo)
```

## 4. Repository layout

| Path | Purpose |
|---|---|
| `index.html` | Home page. The only page with schema.org `Organization` JSON-LD. |
| `services.html` | "What We Do" hub: service cards, approval pathways and an FAQ. |
| `design-documentation.html` | Service landing page with an inline AJAX enquiry form (`#enquire`). |
| `planning-portal.html` | Service landing page with the fee table and an inline AJAX enquiry form (`#enquire`). |
| `about.html` | "Who We Are" page. |
| `contact.html` | General contact form (non-AJAX Netlify Form). |
| `privacy.html` | Privacy policy, last updated 25 May 2026. It discloses Netlify, Google (GTM / GA4 / Ads) and Microsoft 365 as processors. |
| `thanks.html` | Thank-you page for the contact form (`noindex`). |
| `404.html` | Custom not-found page (`noindex`). Netlify serves it for unmatched URLs. |
| `site.js` | Reveal-on-scroll, hero reveal, mobile nav toggle and the "What We Do" mega-menu (desktop hover, mobile tap). |
| `styles.css` | All styles. Design tokens are on `:root` (accent `#0F9E6E`, fonts, max width). |
| `logo.svg`, `logo-light.svg`, `logo-full.svg` | MWorx Group logo: dark, light (footer) and full lockup. |
| `logo.png` | 1024×1024 PNG used for `og:image`, `twitter:image`, PNG favicons, the apple-touch-icon and the JSON-LD logo. It still shows the older **MT Management monogram** (added in `386cda7`), not the MWorx logo. |
| `sitemap.xml`, `robots.txt` | SEO files (see §5). |
| `netlify.toml` | Security headers only. There is no build or redirect config. |

## 5. Key features and how they work

**Navigation.** Every page has the same header markup. "What We Do" opens a mega-menu linking the two service pages. Internal links use `.html` file names (for example `href="contact.html"`). Pages also show a floating "Enquire" CTA.

**Enquiry forms (Netlify Forms).** All forms use `data-netlify="true"`, a hidden `form-name` input and a honeypot field `bot-field` (`data-netlify-honeypot`, hidden with the `.hp` class).

| Form name | Page | Submit method | Fields |
|---|---|---|---|
| `contact` | `contact.html` | Normal POST, `action="/thanks"` | name, email, service, phone, location, message |
| `planning-portal-enquiry` | `planning-portal.html` | `fetch('/')`, urlencoded | name, phone, email, project_address, help_needed, application_type, documents_ready, council_or_certifier, message |
| `design-documentation-enquiry` | `design-documentation.html` | `fetch('/')`, urlencoded | name, phone, email, project_address, project_type, stage, help_needed, message |

The two AJAX forms are handled by inline `<script>` blocks at the bottom of their pages. They validate with `checkValidity()`, then show inline success or error states. Failures are logged to the console with the HTTP status and response body.

**Conversion tracking.** When an AJAX form submits successfully, the inline script:
- pushes `{event: 'mworx_lead_submit', form_location, help_needed, application_type, documents_ready, project_type, stage}` to `window.dataLayer`;
- dispatches a `mworx_lead_submit` `CustomEvent` on `window`.

`form_location` is `planning_portal` or `design_documentation`. The general contact form pushes no event; it just redirects to `/thanks`.

CTAs on the two landing pages carry `data-track="cta"`, `data-cta-location`, `data-cta-type` (`form` or `call`) and `data-cta-page` attributes. No script in the repo reads them, so they are presumably meant for GTM click triggers (**Unverified**).

**SEO.**
- Every page has a unique `<title>` and meta description.
- The 7 indexable pages have Open Graph and Twitter Card tags with absolute `https://mworxgroup.com.au/...` URLs.
- `sitemap.xml` lists those 7 pages with extensionless URLs (for example `/services`).
- `robots.txt` allows everything except `/thanks` and declares the sitemap.
- `thanks.html` and `404.html` have `<meta name="robots" content="noindex">`.
- `index.html` has `Organization` JSON-LD.
- There is **no `<link rel="canonical">`** on any page.

## 6. Data model and Supabase integration

Not applicable. The site has no database or backend. Form submissions are stored by Netlify Forms.

## 7. External integrations and APIs

| Service | Used for | Where | Env vars |
|---|---|---|---|
| Netlify Forms | Storing enquiry submissions. Per `privacy.html`, they are also forwarded to the business email. | `data-netlify` forms in `contact.html`, `planning-portal.html`, `design-documentation.html` | none |
| Google Tag Manager `GTM-KJ46XDCM` | Loads GA4 and Google Ads conversion tracking (per `privacy.html`) | Head snippet and `<noscript>` iframe in all 9 HTML files | none |
| Google Fonts | Web fonts | `<link>` in every page head | none |

Email notification routing and the tags inside the GTM container are configured outside the repo (**Unverified**).

## 8. Important business rules

- **Brand vs. legal entity.** The trading name is "MWorx Group". The legal entity is "MT Management Pty Ltd" (footer copyright, `privacy.html`, JSON-LD `legalName`).
- **Planning Portal pricing** is hard-coded in `planning-portal.html`. It includes the flat lodgement fee (from $400) and a list of add-on fees.
  - The $400 fee covers lodgement only, where documents are ready. Drawings, reports, planning advice, coordination and S4.55 modifications are quoted separately.
  - The page states that no GST is charged because MWorx Group is not currently registered for GST. Update this if GST registration changes.
- **Positioning wording rule** (commit `64ad26d`): do not claim applications are "accepted first time" or "right the first time". Use wording such as "documents checked before submission" or "lodged correctly through the portal".
- **Stated response time:** within 2 business days (form footers and the contact page).
- The business email and phone number are hard-coded in the header CTA, contact page, footers, landing-page CTA bands and the JSON-LD. Change them with a find-and-replace across all pages.

## 9. Deployment architecture

- **Hosting:** Netlify. `netlify.toml` has no `[build]` section, so the repo root is published as-is with no build command.
- **Domain:** the code targets `https://mworxgroup.com.au`, and the Netlify site `mtmco` serves `https://mworxgroup.com.au` with forms enabled (verified from Netlify on 2026-10-25). The domain therefore matches.
  - **Unverified:** whether `mtmco` is connected to this GitHub repo for continuous deployment, or deployed manually or by CLI. Netlify did not report the linked repo.
- **Headers** (`netlify.toml`, all paths): `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, microphone and geolocation disabled), and HSTS (1 year, includeSubDomains). There is no Content-Security-Policy.
- **Pretty URLs:** commit `d881853` says Netlify "Pretty URLs" rewrites `.html` paths. The sitemap's extensionless URLs rely on it. It is a Netlify dashboard setting, not in the repo (**Unverified**).
- No CI, tests or scheduled jobs.

## 10. Configuration and environment variables

None. There are no env vars, secrets or config files beyond `netlify.toml`. The GTM container ID is hard-coded in every HTML file.

## 11. Significant design decisions

- **Plain static HTML with no templating.** It is simple to host, but shared markup (nav, footer, GTM, favicons) must be edited in all 9 files.
- **Netlify Forms over FormSubmit.co** (commit `c8fc933`, 2026-05-25). The site briefly used FormSubmit.co (`1a7eb42`, 2026-05-10) because Netlify Forms POSTs returned 404 at the time. It switched back to Netlify Forms after a FormSubmit outage, because submissions are stored in the Netlify dashboard regardless of email delivery.
- **AJAX inline forms on the landing pages** keep users on the page and fire the `mworx_lead_submit` conversion event only after a confirmed `response.ok`.
- **GTM as the single tag container.** GA4 and Ads tags live in GTM, not in the page code.

## 12. Current development status

Live marketing site; the domain matches Netlify site `mtmco` (§9). The last commit was 2026-05-25. There are no branches other than `main` and no open PRs.

## 13. Known limitations

- `logo.png` (social share image, PNG favicons, JSON-LD logo) is the old MT Management monogram, not the MWorx Group logo.
- No `rel="canonical"`. Internal links use `.html` URLs while the sitemap and `og:url` use extensionless URLs, so two URL forms exist for each page.
- `404.html` loads `styles.css`, `logo.svg` and `site.js` with relative paths. For a missing nested path (for example `/a/b`) these would resolve under `/a/` and the page would render unstyled (**Unverified**, inferred from code).
- The contact form does not push a dataLayer event. Conversion tracking for it would need a GTM trigger on the `/thanks` page view (**Unverified** whether one exists).
- The GTM comments in every page still say "replace GTM-KJ46XDCM with your real container ID". They are left over from the placeholder find-and-replace and are misleading.
- No README.

## 14. Planned future improvements

There is no roadmap, TODO or open PR in the repo. Commit `05fdebe` says the `mworx_lead_submit` event should be wired to a Google Ads conversion inside GTM. Whether that has been done is **Unverified**.

## 15. Unverified / open questions

- **Unverified:** whether Netlify site `mtmco` deploys from this repo automatically (the domain match is confirmed; the repo link is not).
- **Unverified:** whether the three Netlify Forms currently receive submissions on the live site, and where notification emails go.
- **Unverified:** which tags and triggers the GTM container `GTM-KJ46XDCM` holds (GA4, Google Ads conversion on `mworx_lead_submit`, CTA click tracking, `/thanks` page view).
- **Unverified:** whether Netlify Pretty URLs is enabled. The sitemap URLs depend on it.
