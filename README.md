# Petroleum Academia

Three static pages: `/`, `/tools/`, `/courses/`. Plain HTML, CSS and JavaScript; no build dependencies, backend, analytics or cookies. Noto Kufi Arabic is self-hosted with its license in `assets/fonts/`. Language choice is stored locally in the visitor’s browser.

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

```powershell
git status
git add index.html tools courses data assets tests config.js shared.js script.js language.js catalog.js styles.css vercel.json sitemap.xml robots.txt README.md .gitignore
git commit -m "Update Petroleum Academia content"
git push origin main
```

For initial deployment, import the repository in Vercel (**Add New → Project**). Use framework **Other**, repository root, empty build command and output directory `.`. The static settings are included in `vercel.json`. No environment variables are needed. Confirm the linked repository and production branch `main` in **Settings → Git**. Production branch pushes trigger deployments; other branches can receive previews.

After pushing, find the matching commit under Vercel **Deployments** and wait for **Ready**. Visit and refresh `/`, `/tools/`, `/courses/` directly. Real directory `index.html` files serve all routes without a backend or SPA fallback. Check mobile navigation, language switching and real external destinations.

Add `petroleumacademia.com` under **Settings → Domains**. Copy the exact DNS types and values Vercel displays to the domain provider, preserving unrelated mail records. Wait for verification and HTTPS. Optionally add `www` with a redirect to the apex domain. Canonical URLs, social metadata, robots and sitemap already use this domain.

Official guidance: https://vercel.com/docs/git/vercel-for-github

## Checks

Run `node --test tests/catalog.test.cjs` for publishing, text safety, optional fields, URLs, language updates and failure states. Browser-check all routes at 320, 390, 768 and 1440 px. Refresh after editing JSON.
