# What is left before pack662nyc.com goes live

Last reviewed 20 September 2026. Five things block launch, and none of them is
large. Ordered by what to do first.

Run `npm run content:todo` any time for the current placeholder count; that
file is generated from the source and cannot go stale.

---

## 1. Three resource links, or drop them

**Whose: the pack. Five minutes either way.**

These are the only placeholders left in the whole site. All three are on
Resources, which is the page parents bookmark, and each renders as a yellow
`TODO:` box.

| File | What is missing |
| --- | --- |
| `src/content/links/camp-registration.md` | Council camp registration URL, and one line on when a parent needs it |
| `src/content/links/uniform-guide.md` | Uniform placement guide URL, and one line |
| `src/content/links/scouting-america.md` | The Scouting America page you send families to for the program overview |

**Recommendation: delete these three files and launch with eight links.** A
Resources page with eight good links and nothing broken beats one with eight
good links and three yellow boxes. Links are additive; nobody misses a link
they never saw, and adding one later is a two-minute pull request.

Send the URLs instead if you would rather have all eleven on day one.

---

## 2. Send a test email to each of the three role addresses

**Whose: the pack. Five minutes.**

The Namecheap forwards exist. Configured is not the same as delivering, and
the failure is silent: a correctly configured forward still gets dropped by
the destination's spam filter, and you find out when a family says they never
heard back.

Send one message to each and confirm it arrives:

- [ ] `info@pack662nyc.com`
- [ ] `cubmaster@pack662nyc.com`
- [ ] `committeechair@pack662nyc.com`

These three addresses are on every page of the site, so a silent failure here
costs more than anything else on this list.

---

## 3. Turn on secret scanning with push protection

**Whose: the pack. Two minutes. GitHub Settings, Code security.**

This is rule 2 of the four, and it has never been confirmed on. The API does
not expose the setting to this session, so it has to be checked in the browser.
It is free on public repositories and there is no reason it is off.

While you are on that screen, the rest of the settings table audits as:

| Setting | State |
| --- | --- |
| Default branch `main` | correct |
| Wiki, Projects, Discussions | off, correct |
| Auto-delete head branches | on, correct |
| Secret scanning + push protection | **unverified, check this** |
| Merge style | squash, merge and rebase are all enabled; squash-only was the intent |

The merge-style one is cosmetic. The secret scanning one is not.

---

## 4. Flip the three launch switches

**Whose: Claude, one commit. Do this last, after 1 to 3.**

Three things currently keep the site out of search results and tell visitors it
is unfinished. They come out together, in one change, and only once the content
above is settled.

- `src/layouts/BaseLayout.astro`: remove `<meta name="robots" content="noindex, nofollow">`
- `public/robots.txt`: remove `Disallow: /`
- `src/layouts/BaseLayout.astro`: set `contentIncomplete = false` to drop the construction banner

SEO score goes from 66 to 100 the moment the first two are gone. That has been
verified by serving the same build with the tag stripped, so it is not a guess.

---

## 5. Point DNS, then update BeAScout

**Whose: the pack. This is the irreversible-feeling one, so it goes last.**

Right now `pack662nyc.com` redirects to the BeAScout page, which is a working
web presence. Do not replace that until 1 to 4 are done.

In Namecheap:

1. Delete both existing redirect records
2. Add exactly the records Vercel displays
3. Keep the apex canonical, with `www` redirecting to it
4. Confirm HTTPS resolves

Then, and only then, set the BeAScout unit record's website field to
`https://pack662nyc.com`, so BeAScout becomes a door into the site rather than
the destination.

---

# Not blocking launch

Worth doing, but the site can go live without any of it.

### Correct the Akela Handbook

The pack has confirmed three places where it is wrong, and the site now
disagrees with it on all three:

| | Handbook says | Correct |
| --- | --- | --- |
| Address | 66 E 92nd St | **62** |
| Registration | $85 national + $25 council | **$145 combined** |
| Lions uniform | shirt, hat | **shirt, hat, neckerchief, belt** |

### Decide what to do about the handbook's leadership table

The handbook is in the repo at `src/content/links/akela-handbook.md` with
`draft: true`, so it does not render. Its Current Leadership section is a table
of twenty volunteers' full names and personal email addresses. That is fine in
a document handed to families. Publishing the link on a public, indexed page
hands twenty mailboxes to scrapers, and it is not the pack's call to make on
sixteen den leaders' behalf without asking them.

Two ways forward: ask those people, or split the leadership table out of the
handbook and publish the rest.

### Leader bios

`src/content/leaders/` has four people with roles and names. Each has a `bio`
field that is still a placeholder, and the cards read fine without one. Two
sentences each: what they do for the pack and one human detail. No youth names.

### Everything under "When someone else joins"

Branch protection, CODEOWNERS, issue templates, splitting the README's
Contributing section into its own `CONTRIBUTING.md`, and Dependabot. The README
lists these. They are deliberately deferred until a second person contributes,
and adding them now is overhead without benefit.

---

## What is already done

So nobody redoes it:

- All nine pages written. Home, Meetings, Join, Leadership, FAQ, Contact,
  About and 404 carry no placeholders at all
- Twelve of fourteen FAQs answered; the other two were dropped as duplicates
- Mobile Lighthouse 100 performance, 100 accessibility, 100 best practices on
  all eight indexed pages
- Zero client JavaScript, 188 KB total, no third-party requests
- The roster-data guard runs first in CI and is verified to fail the build on a
  force-added CSV
- The leaders schema rejects any address that is not on `pack662nyc.com`
- Role address forwards configured in Namecheap
- Friederike removed from the BeAScout listing
- Production deploys green from `main` on every merge
