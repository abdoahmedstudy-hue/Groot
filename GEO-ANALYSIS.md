# GEO Analysis for Groot Workspace

Last updated: 2026-06-01

## GEO Readiness Score: 82/100

Groot Workspace has a strong static foundation for AI search because key content is available in HTML, the site includes `llms.txt`, crawler access is open for major AI search bots, and the homepage now contains direct FAQ answers with FAQ schema. The main remaining gaps are external authority signals, a production-domain sitemap, and broader service/location content.

## Platform Breakdown

| Platform | Score | Notes |
| --- | ---: | --- |
| Google AI Overviews | 82/100 | Static HTML, LocalBusiness schema, FAQ schema, and clear service/location answers support extraction. |
| ChatGPT Search | 80/100 | `llms.txt`, OpenAI crawler access, and direct answer blocks improve retrievability. |
| Perplexity | 78/100 | Structured facts and FAQ answers help citations; external mentions would improve authority. |
| Claude | 78/100 | Claude crawler access is allowed and the content is readable without JavaScript. |

## AI Crawler Access Status

Allowed in `robots.txt`:

| Crawler | Status |
| --- | --- |
| `GPTBot` | Allowed |
| `OAI-SearchBot` | Allowed |
| `ChatGPT-User` | Allowed |
| `ClaudeBot` | Allowed |
| `Claude-Web` | Allowed |
| `PerplexityBot` | Allowed |
| `Googlebot` | Allowed |
| `*` | Allowed |

## llms.txt Status

Status: Present and improved.

The file now includes:

- A short site description
- Main page map
- Key brand, location, contact, and service facts
- Pricing facts
- A direct answer summary
- Preferred entity and location phrases
- Last updated date

## Brand Mention Analysis

Current local evidence:

- Facebook profile is linked.
- Instagram profile is linked.
- No local evidence of Wikipedia, Wikidata, Reddit, YouTube, or LinkedIn entity pages.

Recommended next actions:

- Keep brand name consistent as `Groot Workspace`.
- Add or update profiles on Google Business Profile, LinkedIn, and YouTube if available.
- Encourage organic mentions using the same entity phrase: `Groot Workspace in Mansoura`.
- Use the same address and phone format across all platforms.

## Passage-Level Citability

Strong extractable passages now exist in:

- `llms.txt` direct answer summary
- Homepage FAQ section
- Pricing table and calculator section
- Contact/location section

Recommended future passage:

Add a 130-160 word "What is Groot Workspace?" paragraph near the top of the homepage when final keywords are ready. It should include the entity, location, services, audience, prices, and contact method in one self-contained block.

## Server-Side Rendering Check

The site is static HTML/CSS/JS. Core page content, navigation labels, FAQ content, contact details, and schema are present in HTML.

Important note:

- Some dynamic details are updated by JavaScript from `localStorage`, but the public pages still include meaningful static fallback content.
- AI crawlers that do not execute JavaScript can still read the main content, FAQ, contact details, schema, and `llms.txt`.

## Schema Recommendations

Already present:

- `LocalBusiness` schema on `index.html`
- `FAQPage` schema on `index.html`

Recommended next:

- Add `WebSite` schema when the production domain is final.
- Add `Service` schema for shared workspace, meeting room, and lecture hall.
- Add `BreadcrumbList` schema when pages are finalized.
- Add `sitemap.xml` when the production URL is known.

## Top 5 Highest-Impact Changes

1. Create a production `sitemap.xml` after the final domain is selected.
2. Add Google Business Profile, LinkedIn, and YouTube links if official profiles exist.
3. Add a 130-160 word definition block on the homepage using final keywords.
4. Add page-level `Service` schema for each workspace type.
5. Build a short FAQ expansion around local intent searches such as "study space in Mansoura" and "meeting room in Mansoura."

## Content Reformatting Suggestions

- Add an answer-first paragraph under the home H1.
- Add service-specific paragraphs for shared workspace, meeting room, lecture hall, and focus corner.
- Add a small local landmark block with the exact address and nearby landmark.
- Add last-updated metadata to public content pages.
- Keep pricing in both visible HTML and `llms.txt` so AI systems can extract it without JavaScript.

