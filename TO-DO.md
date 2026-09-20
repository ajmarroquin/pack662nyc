## Maybe in the future

decide if we want to get redirect emails so we can use things like `info@pack662nyc.com` or `cubmaster@pack662nyc.com`

## Correct the Akela Handbook

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