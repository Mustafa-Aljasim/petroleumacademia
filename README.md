# Petroleum Academia

Six static pages: `/`, `/tools/`, `/courses/`, `/resources/`, `/upcoming/`, `/contact/`. Plain HTML, CSS and JavaScript; no build dependencies, website backend, analytics or cookies. Contact delivery uses Formspree after account setup. Noto Kufi Arabic is self-hosted with its license in `assets/fonts/`. Language choice is stored locally in the visitor’s browser.

## Preview locally

Run `python -m http.server 8080` in this folder. Open http://localhost:8080/, http://localhost:8080/tools/ and http://localhost:8080/courses/. Use HTTP, not `file://`, for JSON loading. Stop with Ctrl+C.

## Add, edit, hide or remove a tool

Edit the array in `data/tools.json`. An unpublished sample is included. Replace the example below with actual content and a real URL before publishing:

```json
[
  {
    "published": true,
    "title": "Your actual tool title",
    "description": "Optional description",
    "url": "https://example.com/your-tool",
    "title_ar": "عنوان الأداة",
    "description_ar": "وصف اختياري"
  }
]
```

**Add:** insert another object, separated by a comma. **Edit:** change its fields. **Hide:** set `"published": false`. **Remove:** delete the object and any extra comma. A tool needs a title and absolute HTTP/HTTPS URL. Invalid URLs cause that tool to be omitted. Description and Arabic fields are optional. The example.com URL is documentation only.

## Add or update a course or lecture

Edit `data/courses.json` using the same add/edit/hide/remove steps:

```json
[
  {
    "published": true,
    "title": "Your actual course title",
    "description": "Optional overview",
    "instructor": "Actual instructor name",
    "format": "Online lecture",
    "date": "Dates to be announced",
    "price": "Contact us for pricing",
    "status": "Upcoming",
    "url": "https://example.com/your-registration-page",
    "buttonLabel": "Learn More",
    "title_ar": "عنوان الدورة",
    "buttonLabel_ar": "اعرف المزيد"
  }
]
```

Replace illustrative values and URL with real details before publishing. Only `published` (boolean) and a nonempty title are required. Empty optional fields disappear. Date and price are exact display text. Status supports `Available`, `Upcoming`, `Registration Closed`, or custom wording. Only valid HTTP/HTTPS URLs produce buttons; the default button label is `View Details`. A closed status does not disable a supplied URL: clear it to remove the button, or label it `View Course`. All text fields support optional `_ar` translations; omitted translations fall back to original text.

Use valid JSON: double quotes, commas between objects, no comments or trailing commas. Content is rendered as text, never HTML. Unsafe protocols and URLs containing credentials are rejected. Empty lists show a friendly message. Invalid JSON, invalid required fields or network failures show a clear error.

## Edit contacts, social links and text

All contacts and social URLs live in `config.js`. Change `social.linkedin`, `social.instagram`, etc.; set unused values to `''` to hide them. Example contact structure:

```js
email: 'your-real-address@your-domain.com',
phone: { label: 'Your display number', href: 'tel:+964XXXXXXXXXX' }
```

Replace those examples with real details. Current Telegram, email, LinkedIn, Instagram and phone settings have been preserved. Confirm the country code for international calls.

Page text: `index.html`, `tools/index.html`, `courses/index.html`. Shared navigation/footer links: `shared.js` (each HTML file also contains a fallback shell). Shared design: `styles.css`. Page translations: `language.js`; keep dictionary keys aligned with English text. Catalogue UI translations: `catalog.js`. Listings belong only in the two JSON files.

## GitHub → Vercel

Repository: https://github.com/Mustafa-Aljasim/petroleumacademia

Live site: https://petroleumacademia.vercel.app/

Vercel project: https://vercel.com/mustafa-aljasims-projects/petroleumacademia

The repository is connected and the production branch is `main`. The first production deployment succeeded on October 13, 2026. Direct visits and refreshes on all three routes were verified.

```powershell
git status
git add index.html tools courses data assets tests config.js shared.js script.js language.js catalog.js styles.css vercel.json sitemap.xml robots.txt README.md .gitignore
git commit -m "Update Petroleum Academia content"
git push origin main
```

For initial deployment, import the repository in Vercel (**Add New → Project**). Use framework **Other**, repository root, empty build command and output directory `.`. The static settings are included in `vercel.json`. No environment variables are needed. Confirm the linked repository and production branch `main` in **Settings → Git**. Production branch pushes trigger deployments; other branches can receive previews.

After pushing, find the matching commit under Vercel **Deployments** and wait for **Ready**. Visit and refresh `/`, `/tools/`, `/courses/` directly. Real directory `index.html` files serve all routes without a backend or SPA fallback. Check mobile navigation, language switching and real external destinations.

Add `petroleumacademia.com` under **Settings → Domains**. Copy the exact DNS types and values Vercel displays to the domain provider, preserving unrelated mail records. Wait for verification and HTTPS. Optionally add `www` with a redirect to the apex domain. Canonical URLs, social metadata, robots and sitemap already use this domain.

`petroleumacademia.com` has already been added to this project's Production environment. Vercel currently requests this record at **Namecheap** (verified October 13, 2026):

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 216.198.79.1 |

Update the existing website A record for `@` to that value; remove conflicting website records for the same host while preserving mail records. Check the project's Domains settings for current values before making changes, then wait for Valid Configuration and HTTPS issuance. `www` has been added with a permanent redirect to the apex; Vercel requested CNAME `www` → `8917d808f1370ffb.vercel-dns-017.com`. Namecheap SSL-proxy HTTPS toggles should be off for these two records so they point directly to Vercel, which provides HTTPS.

Official guidance: https://vercel.com/docs/git/vercel-for-github

## Checks

Run `node --test tests/catalog.test.cjs` for publishing, text safety, optional fields, URLs, language updates and failure states. Browser-check all routes at 320, 390, 768 and 1440 px. Refresh after editing JSON.
# Events and contact updates

The site now has five pages: `/`, `/tools/`, `/courses/`, `/upcoming/`, `/contact/`.

## Events

Edit the array in `data/events.json`, commit and push to `main`. Unpublished sample entries are format examples only and never shown publicly. To add an event, add an object separated by a comma. To edit, change the fields. To hide, set `published` to `false`. To remove, delete the object and its separating comma.

```json
{
  "id": "unique-event-id",
  "topic": "Replace with the actual topic",
  "instructor": "Replace with the actual instructor",
  "description": "Optional description",
  "startAt": "2026-11-20T19:00:00+03:00",
  "endAt": "2026-11-20T20:00:00+03:00",
  "destinationUrl": "https://example.com/replace-with-real-event-link",
  "buttonLabel": "Join event",
  "published": false
}
```

**The dates, names and link above are illustrative, not an actual scheduled event.** `2026-11-20T19:00:00+03:00` means November 20, 2026 at 7 PM Baghdad time. Enter the date and local 24-hour time with `+03:00`. An explicit numeric offset is mandatory; timezone-free timestamps are rejected. Display dates are always converted to `Asia/Baghdad`, regardless of the visitor’s timezone.

Required: unique nonempty `id`, `topic`, `instructor`, valid `startAt`, and `published: true` to show the entry. Supply a real HTTP/HTTPS `destinationUrl`. Optional `endAt` must be later than start; omit it or use `""` for no end. Other text fields support `_ar` counterparts for Arabic. Invalid dates/incomplete entries are skipped with a notice; invalid destination URLs produce no button and a message when the event starts.

Before start, a days/hours/minutes/seconds countdown appears and the destination button is hidden. At start, the status becomes Available now and a valid destination link appears. At end, the status becomes Event ended and the link disappears; past events move to a compact section. Without endAt the valid link stays available after start. Active entries are ordered by start time. Countdown recalculation uses the current device timestamp, including when a tab regains visibility, and never goes negative. Visitors should have an accurate device clock. Screen readers are not notified on every tick.

**This is presentation, not access protection.** JSON and destination URLs are public and can be discovered before the button appears. There is no authentication or protected access.

## Contact submission service

This implementation uses **Formspree**, a hosted submission service, to retain buildless static hosting. No Vercel functions, environment variables or frontend API keys are required.

1. Create/sign in to your Formspree account and create a form.
2. Configure the fixed notification recipient in **Formspree's dashboard** and complete its recipient-email verification. You can use the existing configured Petroleum Academia email or another actual address you own. The visitor cannot select the recipient through this website.
3. Enable the service's spam filtering, restrict submissions to `petroleumacademia.com` and your Vercel hostname if your plan supports domain restrictions, and confirm the service's plan/quota suits your needs. The form includes the `_gotcha` honeypot. No third-party tracking scripts are loaded by the website.
4. Copy the public endpoint (e.g. `https://formspree.io/f/YOUR_REAL_FORM_ID`) into `contactFormEndpoint` in `config.js`. Replace the entire example with the actual endpoint. This form ID is public, not a credential; never add dashboard/API keys to frontend files.
5. Push the change and send a deliberate test message. Verify acceptance on the page, the submission in Formspree, and delivery to the configured recipient. Formspree acceptance confirms receipt by the service, not inbox delivery. Configure email notifications/Reply-To using the `email` field in Formspree.

The endpoint accepts only HTTPS `formspree.io/f/` URLs. The recipient is maintained in Formspree, while `config.js.email` controls only the displayed direct-email alternative. Changing that address does **not** change the submission recipient. Until a valid endpoint is set, the form is explicitly unavailable and disabled.

Name (100 characters), email (254), subject (160), message (5000) are required, trimmed and checked in the browser. Request type supports Consultation, Course inquiry, Tool support, Other. Formspree applies its server-side service validation and spam controls; client limits/honeypots are not a security boundary. The website shows sending, confirmed-success, validation and failure states, blocks duplicate sends, and preserves text on failure. A 20-second timeout can leave delivery uncertain: check for acceptance before retrying. Success requires an HTTP-success JSON response with `ok: true`.

The privacy note explains that details are used to respond and processed by Formspree. Direct email is an alternative link, never the form submission mechanism. CSP in `vercel.json` permits connections/forms to Formspree; keep this if you edit security headers.

## Preview, check and deploy

```powershell
python -m http.server 8080
```

Visit all five routes, including direct visits/refreshes on `/upcoming/` and `/contact/`. Use HTTP rather than opening files directly. Run `node --test tests/*.test.cjs` for catalogue, countdown and form-state checks. Form success/failure checks use local mocks, not a live email recipient.

```powershell
git add upcoming contact data/events.json shared.js language.js config.js event-model.js events.js contact.js styles.css vercel.json sitemap.xml README.md tests
git commit -m "Update events and contact settings"
git push origin main
```

Vercel automatically deploys main. Keep Other preset, repository root, empty build command and output `.`. No environment variables are needed for this hosted-service approach. Verify the matching commit becomes Ready in Vercel before checking the live routes. See the original README sections for tools/courses, contacts and DNS.
# Home Featured Resource

Edit the single object in `data/featured.json`. The supplied sample is unpublished and has no live URL. All six fields are required to display the card; `type` must be Tool, Course, Lecture or Resource. Use `published: false` to hide it. Example format (replace the illustrative text and URL before publishing):

```json
{
  "published": false,
  "type": "Resource",
  "title": "Your actual resource title",
  "description": "A short description of your resource.",
  "url": "/tools/",
  "buttonLabel": "Explore resource"
}
```

`/tools/` is an existing site page; use the actual internal destination or a complete HTTP/HTTPS URL for your featured item. Set `published` to `true` only when the content is ready. Optional `_ar` counterparts for title, description and buttonLabel supply Arabic copy; otherwise the original text is retained. Content renders as plain text. Missing required content, unsafe URLs and loading failures keep the section hidden. Internal paths must begin with a single `/`; protocol-relative URLs, backslashes and credential-bearing URLs are rejected.

Publish a content change with:

```powershell
git add data/featured.json
git commit -m "Update featured resource"
git push origin main
```

Wait for the matching Git commit to show Ready in Vercel, then refresh Home. Preview locally with the existing HTTP-server instructions. Only Home loads this file and displays the card directly below its hero.
# Optional tool descriptions, categories and labels

Copy and edit this object inside the array in `data/tools.json`. This is an unpublished format example; replace its content and URL with actual tool details before setting `published` to `true`.

```json
{
  "published": false,
  "title": "Your actual tool title",
  "url": "https://example.com/replace-with-real-tool-url",
  "description": "Optional short explanation of the tool.",
  "category": "Reservoir Surveillance",
  "labels": ["Educational", "Requires account"]
}
```

`description`, `category` and `labels` are optional. Omit them, use empty strings, or use `labels: []` to show only the existing title and Open Tool button. Labels must be an array of strings; blank and non-string values are ignored. Only enter labels supported by the actual tool; the site does not infer pricing, account requirements or validation claims. Optional `description_ar`, `category_ar` and `labels_ar` supply Arabic text. All content is rendered as plain text; existing title, URL and publication behavior remain unchanged.

Publish with `git add data/tools.json`, `git commit -m "Update tool details"`, and `git push origin main`. Verify the matching deployment is Ready in Vercel, then refresh `/tools/`.
# Home founder profile

Edit `data/founder.json`. The initial published profile uses the founder text provided by Eng. Mustafa Aljasim, with no invented portrait or LinkedIn URL. Set `published` to `false` to hide it. Name, role and bio are required and render as plain text. Optional `name_ar`, `role_ar` and `bio_ar` supply Arabic copy; otherwise the supplied text remains unchanged.

To add a portrait, put your actual image in `assets/`, for example `assets/founder.jpg`, then set `"photoPath": "/assets/founder.jpg"`. Supported local formats: JPG/JPEG, PNG, WebP, AVIF and GIF. External URLs and filesystem paths are rejected. The image is displayed only after loading successfully, with alternative text using the founder's name. A missing/invalid image leaves the clean text-only card with no broken-image icon. Leave `photoPath` empty for no portrait.

Set `linkedinUrl` to your actual `https://www.linkedin.com/in/...` profile URL to display Connect on LinkedIn. Leave it empty to omit the button. Only HTTP/HTTPS profile links on linkedin.com or www.linkedin.com are accepted; no profile URL is inferred.

After editing, run `git add data/founder.json assets`, `git commit -m "Update founder profile"`, and `git push origin main`. Wait for the Vercel deployment to be Ready, then refresh Home. The section sits immediately after About; other pages do not load this profile.
# Event calendars and registration

Every published, valid event that has not ended has an Add to Calendar button. It generates an `.ics` download in the browser; no backend or calendar API is needed. Calendar title is the topic, notes contain instructor, description and `https://petroleumacademia.com/upcoming/` so visitors can return for the joining link. The destinationUrl is never included in the file, even after release. Public JSON remains discoverable; calendar support does not add access protection.

Optional event fields:

```json
{
  "durationMinutes": 90,
  "registrationUrl": "",
  "location": ""
}
```

Add these fields to an existing object in `data/events.json`. Use actual registration and location details only; blank values are omitted. A valid HTTP/HTTPS registrationUrl displays View details / Register **before startAt only**. At start, the original joining-link behavior takes over. At end, registration, joining and calendar buttons are omitted. No endAt means joining/calendar remain available after start, as before.

The calendar uses endAt when provided. Otherwise a positive numeric durationMinutes sets its end; an absent or invalid duration defaults to **60 minutes**. This duration affects the calendar only, not the website's event-ended state. Explicit-offset timestamps convert to UTC: the illustrative Baghdad start `2026-11-20T19:00:00+03:00` becomes `20261120T160000Z` in the calendar. It is not an actual scheduled event.

Files use stable UIDs derived from event id plus petroleumacademia.com, escaped text, CRLF line endings and UTF-8-safe folding at 75 octets per physical line per RFC 5545 (https://www.rfc-editor.org/rfc/rfc5545). Keep event ids unchanged when editing the same event. Downloaded calendar entries do not update automatically when JSON changes; visitors must reimport updates (handling duplicate UIDs depends on their calendar app).

Edit `data/events.json`, then commit and push to main using the existing instructions. Check with `node --test tests/calendar.test.cjs tests/events.test.cjs`.
# Free Resources

The sixth page is `/resources/`, with Free Resources in shared navigation/footer. Edit the array in `data/resources.json`. The two included samples are unpublished examples, not actual resources; no download files have been created or uploaded.

Local file example (replace the text and filename with your actual resource):

```json
{
  "id": "unique-local-resource-id",
  "title": "Your actual resource title",
  "description": "Optional description",
  "category": "Optional category",
  "format": "PDF",
  "url": "/downloads/your-file.pdf",
  "buttonLabel": "Download",
  "published": false
}
```

Place your chosen file in `downloads/` (subfolders are allowed), then enter its root-relative `/downloads/...` path. Match capitalization exactly for Vercel. A path can reference only a file inside downloads, with no traversal, backslashes, protocol-relative URLs or query/hash suffixes. Do not enable an entry until its actual file is committed. Local links use a download attribute; no existing files are automatically copied.

External example (replace example.com with the real hosted resource URL):

```json
{
  "id": "unique-external-resource-id",
  "title": "Your actual externally hosted resource",
  "url": "https://example.com/your-real-resource",
  "buttonLabel": "Open Resource",
  "published": false
}
```

Title, unique id, valid URL and `published: true` are required. Description, category, format and buttonLabel are optional; empty fields disappear. Default button wording is Open Resource. Download wording is permitted only for local files or external URLs with a recognizable direct-file extension (XLSX, CSV, PDF, ZIP, etc.); otherwise it falls back to Open Resource. External links open securely in a new tab without forced downloads. Format is display text, not an inferred file or safety claim. Optional `_ar` text fields provide Arabic translations.

**Add:** insert another object separated by a comma. **Edit:** change fields. **Reorder:** move objects within the array; page order follows the file. **Hide:** set published false. **Remove:** delete the object and its separating comma. You can leave an empty array to show the friendly empty state. Invalid entries are skipped; fetch/JSON failures show an error while navigation remains available. All text is rendered literally, never as HTML.

```powershell
git add data/resources.json downloads
git commit -m "Update free resources"
git push origin main
```

Check the matching Vercel deployment is Ready, then directly visit and refresh `/resources/` and test your real file links. Preview locally using the existing HTTP-server command. Files under downloads are public; add only files you intend to distribute.
