# Launch status

**The site is ready. Nothing in this repository is blocking it.**

Zero placeholders, all nine pages written, and mobile Lighthouse scores 100 on
performance, accessibility, best practices and SEO across all eight indexed
pages. The `noindex` tag, the `Disallow: /` and the construction banner are all
gone, so the site is indexable the moment DNS resolves.

Run `npm run content:todo` any time for the current placeholder count. It is
generated from the source, so it cannot overstate how finished the site is.

---

## In flight

### Point DNS

In Namecheap: delete both existing redirect records, add exactly the records
Vercel displays, keep the apex canonical with `www` redirecting to it, then
confirm HTTPS resolves.

### Then update BeAScout

Set the unit record's website field to `https://pack662nyc.com`, so BeAScout
becomes a door into the site rather than the destination. Do this after DNS
resolves, not before.

---

## Changed under us

### The `@pack662nyc.com` addresses are gone

Moving the domain's nameservers to Vercel ended Namecheap's email forwarding,
because that forwarding rides on the MX records Namecheap serves and it no
longer serves them. All three role addresses stopped existing at that moment.

The site now uses `cubscout662@gmail.com`, a shared mailbox that AJ, Naomi,
Josh and Jigar all read. This is better than what it replaced, not a
concession: four people see every message instead of one, so nothing waits on
somebody being free, and the silent-forward-failure risk that was on this list
is gone with the forwards.

Every route into that inbox pre-fills a subject line, so one address can still
be triaged at a glance.

If addresses on the pack domain are ever wanted back, it needs a mail provider
with MX records in Vercel's DNS, or the nameservers moved back to Namecheap
with Vercel's A and CNAME records added there instead. Nothing about the site
depends on that decision.

## Not blocking, worth doing

### Correct the Akela Handbook

The site disagrees with it in three places, and the site is right:

| | Handbook says | Correct |
| --- | --- | --- |
| Address | 66 E 92nd St | **62** |
| Registration | $85 national + $25 council | **$145 combined** |
| Lions uniform | shirt, hat | **shirt, hat, neckerchief, belt** |

### Decide what to do about the handbook's leadership table

The handbook sits at `src/content/links/akela-handbook.md` with `draft: true`,
so it does not render. Its Current Leadership section is a table of twenty
volunteers' full names and personal email addresses. Fine in a document handed
to families; publishing the link on an indexed page hands twenty mailboxes to
scrapers, and it is not the pack's call to make for sixteen den leaders without
asking them.

Either ask those people, or split the table out and publish the rest.

### Activity links will go stale

`activity-day-fall.md` and `activity-day-spring.md` are dated 2026 and 2027.
They are correct now and will not be forever. Same for `pack-calendar.md`.
Worth a look each September.

### Leader bios

The four people in `src/content/leaders/` have roles and names. The cards read
fine without a bio, but two sentences each would be better: what they do for
the pack and one human detail. No youth names.

### Everything under "When someone else joins"

Branch protection, CODEOWNERS, issue templates, splitting the README's
Contributing section into `CONTRIBUTING.md`, Dependabot. Deferred until a
second person contributes; adding them now is overhead without benefit.

---

## Done

- All nine pages written, zero placeholders
- Fourteen FAQs answered
- Eleven resource links, all live
- Mobile Lighthouse 100 / 100 / 100 / 100 on all eight indexed pages
- Zero client JavaScript, nothing fetched from a third party: the font is
  self-hosted, the illustration and icons are inline SVG
- Roster-data guard runs first in CI, verified to fail the build on a
  force-added CSV
- Leaders schema rejects any address that is not the pack's shared mailbox
  or on `pack662nyc.com`, verified in both directions
- Secret scanning and push protection on, confirmed in the browser. The API
  does not expose this setting, so do not expect to check it programmatically
- Repository settings all applied: `main` default, squash-only merges,
  auto-delete on, Wiki, Projects and Discussions off
- All site contact goes to one shared mailbox that four leaders read
- Friederike removed from the BeAScout listing
- Production deploys green from `main` on every merge
