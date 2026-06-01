# Groot Workspace Site Structure & Sitemap Documentation

This file documents the site architecture and sitemap organization for the Groot workspace platform hosted at [https://abdoahmedstudy-hue.github.io/Groot/](https://abdoahmedstudy-hue.github.io/Groot/).

## Sitemap Summary

- **Sitemap URL:** `https://abdoahmedstudy-hue.github.io/Groot/sitemap.xml`
- **Total Registered URLs:** 4
- **Format:** XML Sitemap 0.9 standard (Google/Bing/Yahoo compliant)
- **Last Modified Date:** 2026-06-01 (Current deploy date)

---

## Crawlable & Indexable Pages

The following pages are public-facing, search-engine indexable, and are included in the sitemap:

| Page URL | Physical File | Content Description | Priority |
|---|---|---|---|
| `/` | `index.html` | Homepage, introducing the Groot platform, services, and main workspace portal. | High (1.0) |
| `/spaces.html` | `spaces.html` | Exploring customized office settings, coworking desks, and digital workspaces. | Medium-High (0.8) |
| `/contact.html` | `contact.html` | Contact form, support desk, email contacts, and office location map. | Medium (0.7) |
| `/prototype.html` | `prototype.html` | Dynamic mockup and interactive prototype for the premium workspace dashboard. | Medium-Low (0.6) |

---

## Excluded Pages (Non-Indexable)

For security, compliance, or utility reasons, the following pages are **excluded** from the sitemap:

| Physical File | Excluded Reason |
|---|---|
| `admin.html` | **Security / Admin Portal:** Excluded to prevent search crawlers from indexing the platform management dashboard. |
| `google4665474f54033e78.html` | **Google Site Verification:** Static validation file with no user-facing content. |

---

## Robots.txt Integration

The `robots.txt` file has been updated to include the standard `Sitemap:` directive pointing directly to the live sitemap URL:

```txt
Sitemap: https://abdoahmedstudy-hue.github.io/Groot/sitemap.xml
```

This guarantees that all major SEO and AI search bots (including Googlebot, GPTBot, ClaudeBot, and PerplexityBot) can automatically locate, parse, and index all your key pages.
