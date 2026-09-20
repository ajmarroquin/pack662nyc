# pack662nyc.com

The public website for Cub Scout Pack 662, New York City.

Astro, TypeScript, plain CSS, no client JavaScript, statically generated and
deployed on Vercel.

**Status: content is real; launch is pending five small things.** Every page
except Resources is free of placeholders. The site is deliberately not indexed
and DNS is not pointed at it yet.

**[LAUNCH.md](LAUNCH.md) is the list of what is left**, in the order to do it.
Start there.

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
  data/site.ts            Every sitewide fact in one place
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

**DNS is not pointed at this site yet, on purpose.** The domain currently
redirects to the pack's BeAScout page, which is a working web presence. A live
site with visible `TODO:` boxes is worse than that redirect, and a parent who
lands on one forms an impression you do not get to redo.

See **[LAUNCH.md](LAUNCH.md)** for exactly what is left and the order to do it.
The short version: three resource links to supply or drop, a test email to each
role address, then the three launch switches come out in one commit, and DNS
goes last.

An unfilled field is never silently blank. It renders as a yellow `TODO:` box
on the page, and `npm run content:todo` regenerates
[CONTENT-TODO.md](CONTENT-TODO.md) from the source, so that file cannot claim
the site is more finished than it is.

---

## Repository settings

These live in GitHub's web interface, not in version control. All of them are
applied as of 20 September 2026; re-check after any transfer of the repository,
because settings do not always survive one.

| Setting | Value |
|---|---|
| Default branch | `main`, only branch |
| Secret scanning + push protection | On (Settings, Code security) |
| Wiki, Projects, Discussions | Off |
| Merge style | Squash only |
| Auto-delete head branches | On |
| Actions token permissions | Read-only (Settings, Actions, General) |

The workflow in `.github/workflows/ci.yml` also declares `contents: read` for
itself, so CI is read-only whatever the repository default happens to be.

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
- [ ] Split "Contributing" above into a `CONTRIBUTING.md`, which GitHub surfaces
      automatically when someone opens a pull request
- [ ] Dependabot for npm and GitHub Actions

Until then the overhead outruns the benefit on a single-maintainer repository.

---

## Licence

Code is MIT, see [LICENSE](LICENSE).

Pack text, imagery, and branding are **not** licensed for reuse, and Scouting
America's marks belong to Scouting America. See [CONTENT.md](CONTENT.md).
