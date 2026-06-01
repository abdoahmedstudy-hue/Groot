# Groot Workspace Website

Static bilingual website for **Groot Workspace**, a co-working and study space in Mansoura, Egypt.

The site includes a public landing page, spaces and booking page, contact/location page, and a lightweight browser-based admin panel for controlling pricing and workspace details.

## Live Repository

GitHub: `https://github.com/abdoahmedstudy-hue/Groot.git`

## Project Overview

Groot Workspace is presented as a flexible workspace for:

- Shared work and study sessions
- Meeting room bookings
- Courses, workshops, and lectures
- Quiet individual focus
- 24/7 workspace use

The website is built with plain HTML, CSS, and JavaScript. It does not require a build step, package manager, framework, or backend server.

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Main landing page, about section, amenities, pricing, and calculator |
| Spaces & Booking | `spaces.html` | Workspace browsing, image gallery, package selection, time picker, WhatsApp booking |
| Contact & Location | `contact.html` | Address, phone, social links, map, landmarks, and contact form |
| Admin Panel | `admin.html` | Price control and workspace control |
| Prototype | `prototype.html` | Prototype/reference screen |

## Main Features

- Arabic and English language toggle
- Responsive layout for desktop, tablet, and mobile
- Interactive workspace gallery
- Compact circular time selector on booking page
- WhatsApp booking message generator
- Contact form saved to local browser state
- Price calculator with synced admin pricing
- Admin panel for pricing and workspace details
- LocalStorage-based shared state across public pages and admin panel
- GEO/AI-search preparation through `llms.txt`, `robots.txt`, and JSON-LD schema

## Pricing Logic

Current pricing rules:

| Duration | Price |
| --- | --- |
| 1 hour | 20 EGP |
| 2 hours | 35 EGP |
| 3 hours | 50 EGP |
| 4 to 8 hours | 65 EGP |
| 9+ hours | 160 EGP |
| Booking starts at 09:00 or later | Full-day price: 160 EGP |

Pricing is controlled in `js/state.js` and can be edited from `admin.html`.

## Admin Panel

Open:

```text
admin.html
```

Default password:

```text
groot2015
```

Admin sections:

- `Price Control`: first hour, extra hour, 8-hour package, full-day price, and full-day start hour
- `Workspace Control`: workspace visibility, names, capacity, load, use case, mood, descriptions, and amenities

Important: this is a static website. The admin panel stores data in the browser using `localStorage`; it is not a server-secured CMS.

## Run Locally

Because this is a static website, you can open `index.html` directly in a browser.

For a local HTTP server, run:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/index.html
```

## File Structure

```text
.
+-- index.html
+-- spaces.html
+-- contact.html
+-- admin.html
+-- prototype.html
+-- llms.txt
+-- robots.txt
+-- assets/
|   +-- images/
+-- css/
|   +-- variables.css
|   +-- base.css
|   +-- components.css
|   +-- layout.css
|   +-- animations.css
|   +-- pages/
+-- js/
    +-- app.js
    +-- state.js
    +-- i18n.js
    +-- home-sync.js
    +-- booking.js
    +-- contact.js
    +-- admin.js
    +-- scroll-animations.js
```

## JavaScript Modules

| File | Role |
| --- | --- |
| `js/app.js` | Shared navigation, toast notifications, utilities |
| `js/state.js` | Central state, default workspace data, pricing logic, localStorage sync |
| `js/i18n.js` | Arabic/English dictionary and language switching |
| `js/home-sync.js` | Home page syncing, pricing calculator, about gallery |
| `js/booking.js` | Spaces page tabs, gallery, package selection, time picker, WhatsApp booking |
| `js/contact.js` | Contact page sync, copy phone, WhatsApp, call, contact form |
| `js/admin.js` | Admin authentication and controls |
| `js/scroll-animations.js` | Reveal animations and animated counters |

## Styling

Global styles are split into:

- `css/variables.css`: design tokens and colors
- `css/base.css`: reset and base typography
- `css/components.css`: buttons, cards, pills, forms, switches, toasts
- `css/layout.css`: shared layout and navigation
- `css/animations.css`: page and scroll animations
- `css/pages/*.css`: page-specific styles

## GEO and SEO Preparation

The project includes:

- `robots.txt` for crawler access
- `llms.txt` for AI-search context
- LocalBusiness JSON-LD schema in `index.html`
- Semantic page sections and structured content
- Bilingual content support

Future GEO work can add:

- Final target keywords
- FAQ schema
- Service schema
- More location-specific landing content
- A generated `sitemap.xml` once the production domain is known

## Deployment

This site can be deployed on any static hosting provider:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any basic web server

For GitHub Pages, serve from the `main` branch root.

## Git Commands

Initial repository:

```bash
git init
git branch -M main
git remote add origin https://github.com/abdoahmedstudy-hue/Groot.git
```

Commit and push updates:

```bash
git add -A
git commit -m "Update website"
git push
```

## Notes

- No build step is required.
- No external JavaScript libraries are required.
- Images live in `assets/images/`.
- The admin login is client-side only and should not be treated as production-grade security.
- Browser state can be reset by clearing `localStorage` for the site.
