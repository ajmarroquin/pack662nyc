# pack662nyc.com

The public website for Cub Scout Pack 662, New York City.

Astro, TypeScript, plain CSS, no client JavaScript, statically generated and
deployed on Vercel.

**Status: launched!**
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

### 3. A pack address, never a volunteer's own

The pack uses one shared mailbox, `cubscout662@gmail.com`, which four leaders
read. It is not anybody's personal address, so publishing it exposes no
volunteer to scrapers, and it keeps working when a role changes hands. That is
what this rule is for.

Enforced in the content schema (`src/content.config.ts`), not just in review: a
leader entry carrying someone's own address fails the build. The pack domain
also passes, for whenever `pack662nyc.com` has mail again.

It does not today. The three `@pack662nyc.com` forwards were Namecheap's, and
Namecheap's email forwarding rides on the MX records it serves. Moving the
domain's nameservers to Vercel stopped it serving them, so the forwards went
with them. Getting those addresses back means a mail provider with MX records
in Vercel's DNS, or moving the nameservers back to Namecheap and adding
Vercel's A and CNAME records there instead.

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
| `npm run no-placeholders` | Rule 4 check, the same one CI runs |

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

## Contributing

Anyone in the pack can suggest a change. Most of what needs changing is text,
and changing text does not require knowing anything about code.

**Before anything else, read [the four rules](#the-four-rules).** Rule 1 is the
one that matters most: nothing resembling a roster, a contact list, or a
spreadsheet of families goes in this repository, ever, in any format. This
repository is public and its history cannot be scrubbed.

### Fixing a typo or updating text, without installing anything

1. Find the page on the site and note what is wrong.
2. In this repository, open the matching file:
   - Meeting time, address, cost, council: `src/data/site.ts`
   - A leader: `src/content/leaders/`
   - An FAQ answer: `src/content/faqs/`
   - A resource link: `src/content/links/`
   - Page wording: `src/pages/`, one file per page
3. Click the pencil icon to edit it in the browser.
4. At the bottom, choose **Create a new branch for this commit and start a pull
   request**, describe what you changed in a sentence, and submit.

CI runs on the pull request. If it goes green, the change is safe to merge. If
it goes red, open the failed check; the error says which file and what is wrong
with it, in words rather than a stack trace.

### Adding a leader, an FAQ, or a link

Copy an existing file in the relevant folder, rename it, and edit the fields at
the top. The fields are fixed and validated:

- A leader's `email`, if you add one at all, **must** be the pack's shared
  mailbox. A volunteer's own address fails the build. This is deliberate: a
  shared mailbox keeps working when someone hands the job on, and a personal
  address on a public site gets scraped. The leader cards currently carry no
  addresses at all, which is the pack's preference.
- An FAQ `category` must be one of Joining, Meetings, Cost, Uniform, Outdoors,
  General.
- A link `category` must be one of Start here, Forms and paperwork, Scouting
  America, Gear and uniform, Camping and outdoors.
- `order` controls position within a section. Lower is higher up. Leave gaps of
  10 so things can be slotted in later without renumbering everything.

A malformed entry fails the build rather than rendering an empty block on the
live site. That is the point: a broken pull request is a minor annoyance, and a
blank space on the join page is a family that did not join.

### Working on it locally

```bash
git clone https://github.com/ajmarroquin/pack662nyc.git
cd pack662nyc
npm install
npm run dev
```

Before opening a pull request:

```bash
npm run build           # must pass; CI runs exactly this
npm run no-data-files   # rule 1 check
```

### What to put in a pull request

One change per pull request where you can manage it, and a sentence saying what
changed and why. "Fixed the meeting time, it moved to 6:45 in September" is a
complete description. Screenshots help for anything visual.

### What not to add

No authentication, no roster data, no member-only content, and nothing that
stores a submission. This site is static files and a `mailto:` link, and it
stays that way. Anything needing a login or a database belongs in the separate
member tool at its own subdomain.

No photographs of youth, and no youth last names, in content or in captions.

No analytics, trackers, or embedded third-party scripts without discussing it
first. The site currently ships zero client JavaScript, which is why it loads
instantly on a phone with one bar.

### Who to ask

Open an issue, or email
[cubscout662@gmail.com](mailto:cubscout662@gmail.com). If you are not sure whether
something belongs on the site, ask before writing it; that is faster for
everyone than writing it and finding out in review.

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
