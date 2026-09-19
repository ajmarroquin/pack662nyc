# pack662nyc.com

The public website for Cub Scout Pack 662, New York City.

Astro, TypeScript, plain CSS, no client JavaScript, statically generated and
deployed on Vercel.

**Status: content is placeholder.** Every unwritten field renders as a visible
`TODO:` box. The site is deliberately not indexed and DNS is not pointed at it.
See [CONTENT-INTAKE.md](CONTENT-INTAKE.md).

---

## The four rules

These are permanent. Everything else in this repository is a preference; these
are not, because a public repository's commit history survives deleting the file.

### 1. No roster data, in any format, ever

No CSV, no spreadsheet, no list of families, no phone numbers, no home
addresses, no Scoutbook export. Not in a branch, not in a commit that gets
reverted, not "temporarily".

This is the only mistake in this repository with no undo. Once it is pushed it
is published, and rewriting history does not reach forks, clones, or caches.

Two things enforce it:

- `.gitignore` blocks the common extensions and anything named `roster*`.
- `scripts/check-no-data-files.mjs` runs in CI on every pull request and push
  and **fails the build** if a data file is tracked. `.gitignore` is a
  convenience that `git add -f` defeats; this is the part that holds.

Run it locally any time: `npm run no-data-files`

### 2. Secret scanning with push protection stays on

GitHub setting, free on public repositories. See "Repository settings" below.

### 3. Role email addresses only

`cubmaster@pack662nyc.com`, `committeechair@pack662nyc.com`,
`info@pack662nyc.com`. Never a personal address, in content or in commit
metadata.

This is enforced in the content schema (`src/content.config.ts`), not just in
review: a leader entry with a personal address fails the build.

### 4. No invented content

If a fact is not known, it is a literal `TODO:` string that renders on the page.
A plausible guess is worse than a blank, because it survives review and nobody
catches it later.

### And, quietly

- **No youth last names anywhere**, including future photo captions.
- **No youth photographs in this repository at all.** Committing an image to a
  public repo publishes it permanently.
- Meeting time and location are fine to publish; they are already on BeAScout.
  Where the pack is *right now* never is.

### Not in this repository, ever

No authentication, no roster data, no member-only content, nothing that stores a
submission. This site is static files with a `mailto:` link and no backend. The
member tool is a **separate repository at a subdomain**, and it stays separate.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check, then build to dist/
npm run preview    # serve the built site
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run check` | Astro and TypeScript diagnostics |
| `npm run no-data-files` | Rule 1 check, the same one CI runs |
| `npm run content:todo` | Regenerates `CONTENT-TODO.md` from the source |

Node 22.

---

## Layout

```
src/
  data/site.ts            Every sitewide fact, all placeholders for now
  content.config.ts       Zod schemas for the three content collections
  content/
    leaders/              One markdown file per leader
    faqs/                 One per question
    links/                One per resource link
  layouts/BaseLayout.astro  Head, nav, footer, JSON-LD
  components/             Todo and Field, for rendering placeholders
  pages/                  One file per route
  styles/global.css       All of the CSS
public/robots.txt
scripts/                  The two guard and generator scripts
```

### Adding content

Scalar facts (meeting time, address, cost) live in `src/data/site.ts`.

Repeating things are markdown files in `src/content/`. Copy an existing file and
edit the frontmatter. A malformed entry **fails the build** rather than
rendering an empty block on the live site, which matters when the eventual
editors are parents who will not read a stack trace.

---

## Going live

**DNS is not pointed at this site, on purpose.** The domain currently redirects
to the pack's BeAScout page, which is a working web presence. A live site
reading `TODO: meeting location` is worse than that redirect, and a parent who
lands on it forms an impression you do not get to redo.

Point DNS only once Home, Meetings, Join, and Resources carry real text.

When that time comes, in one change:

1. Fill the content. `npm run content:todo` must report zero placeholders.
2. Remove `<meta name="robots" content="noindex, nofollow">` from
   `src/layouts/BaseLayout.astro`.
3. Remove `Disallow: /` from `public/robots.txt`.
4. Set `contentIncomplete = false` in `src/layouts/BaseLayout.astro` to drop the
   construction banner.

Then, in Namecheap:

5. Delete both existing redirect records.
6. Add exactly the records Vercel displays. Keep the apex canonical with `www`
   redirecting to it.
7. Confirm HTTPS resolves.
8. Update the BeAScout unit record's website field to `https://pack662nyc.com`,
   so BeAScout becomes a door into the site rather than the destination.

---

## Repository settings

Set these in GitHub's web interface; they are not in version control.

| Setting | Value |
|---|---|
| Default branch | `main`, only branch |
| Secret scanning + push protection | **On** (Settings, Code security) |
| Wiki, Projects, Discussions | Off |
| Merge style | Squash only |
| Auto-delete head branches | On |
| Actions token permissions | Read-only (Settings, Actions, General) |

The repository lives under the maintainer's personal account and transfers to a
pack-owned organization later. Transfer preserves history, issues, and pull
requests, and GitHub redirects the old URL, so deferring costs almost nothing.

---

## When someone else joins

Deliberately deferred until a second person contributes, then added in one
sitting. Recorded here so it is not forgotten:

- [ ] Branch protection on `main`: require the CI check, require a pull request
- [ ] `CODEOWNERS`
- [ ] Issue templates, including one for "content needs updating"
- [ ] `CONTRIBUTING.md`, covering the four rules above before anything else
- [ ] Dependabot for npm and GitHub Actions

Until then the overhead outruns the benefit on a single-maintainer repository.

---

## Licence

Code is MIT, see [LICENSE](LICENSE).

Pack text, imagery, and branding are **not** licensed for reuse, and Scouting
America's marks belong to Scouting America. See [CONTENT.md](CONTENT.md).
