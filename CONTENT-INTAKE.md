# Content intake for pack662nyc.com

**What this is:** every piece of writing the site needs, in one place, so nothing
gets missed. Fill it in however is fastest. Bullet fragments, half sentences, and
"ask Dave about this one" are all fine. A later session maps your notes into the
site and cleans up the prose.

**What this is not:** a request for polished copy. Do not spend time on wording.
Getting the facts down is the whole job; the writing is somebody else's problem.

## How to fill it in

Answer under each `>` prompt. Leave anything you do not know blank and write
`UNKNOWN` next to it so it is visible rather than silently skipped. If a question
does not apply to Pack 662, write `N/A` and why.

Every **Example** below is a *shape*, not content. The names, times, and dollar
figures in them are invented and belong to no real pack. Do not copy them.

## Four things that must not go in here

1. **No roster data.** No spreadsheets, no lists of families, no phone numbers,
   no home addresses. Not in this file, not attached to it, not anywhere in this
   repository. It is public, and commit history survives deleting the file.
2. **No youth last names**, ever, including in future photo captions.
3. **No youth photographs.** Committing an image to a public repo publishes it
   permanently and there is no taking it back.
4. **Role email addresses only** (`cubmaster@pack662nyc.com`, etc.). Never a
   personal address. The build enforces this and will fail if one appears.

Meeting time and location are fine to publish, because they are already on
BeAScout. Where the pack is *right now*, on any given day, never is.

---

# 1. Sitewide

These appear on more than one page.

### `site.tagline` -- `src/data/site.ts`

> One sentence: who is this pack for? This is the first line a parent reads and
> the line Google shows under the search result.

- Length: 60 to 120 characters. Longer gets cut off in search results.
- **Example shape:** `A Cub Scout pack for kids in kindergarten through fifth grade on the Upper West Side.`

**Your answer:**

```

```

### `site.intro` -- `src/data/site.ts`

> Two sentences under the tagline. What does the pack actually do, and who
> already belongs to it? Write it for a parent who has never heard of Cub Scouting.

- Length: 150 to 260 characters total. It sits in a hero block and wraps badly past that.
- **Example shape:** `We are about forty families from six local schools. Kids learn to cook, camp, build things and find their way around the city, and every Scout does it alongside a grown-up from their own family.`

**Your answer:**

```

```

---

# 2. Home page (`/`)

The home page pulls entirely from `site.tagline`, `site.intro`, and the meeting
block below. Nothing else to supply here.

One decision to make:

> The home page has one main button. It currently reads "Join Pack 662" and
> points at the join page. Should it instead point straight at BeAScout, or at
> emailing the Cubmaster?

**Your answer:**

```

```

---

# 3. Meetings page (`/meetings`)

All fields in `src/data/site.ts` under `site.meeting`.

### `schedule`

> What day and time do you meet, and how often? Include whether it stops over
> the summer.

- Length: one line, under 100 characters.
- **Example shape:** `Second and fourth Thursday, 6:30 to 7:45 p.m., September through May.`

**Your answer:**

```

```

### `locationName`

> What is the building called? The name a parent would say out loud.

- **Example shape:** `Riverside Community Center, Room 2B`

**Your answer:**

```

```

### `streetAddress`, `addressLocality`, `postalCode`

> Street address, neighborhood or borough, and ZIP. This also feeds the
> structured data that puts the pack in "cub scouts near me" results, so it is
> worth getting exactly right.

- **Example shape:** street `120 West 88th Street` / locality `New York` / ZIP `10024`
- Region is already set to `NY`.

**Your answer:**

```
Street:
Locality:
ZIP:
```

### `arrivalNotes`

> A first-time visitor is standing outside with a six-year-old. Which door? Is
> there a buzzer? Do they go up? Is there a desk to sign in at? This is the
> single most useful sentence on the page and almost every pack site omits it.

- Length: one to three sentences.
- **Example shape:** `Use the side entrance on 88th, not the main doors. Buzz 2B and someone will come down. We are on the second floor; there is an elevator to the left of the stairs.`

**Your answer:**

```

```

### `gettingThere`

> Nearest subway lines and stops. Buses if people use them. Anything worth
> knowing about parking.

- Length: one or two sentences.
- **Example shape:** `B and C to 86th Street, then three blocks north. The 1 at 86th also works. Street parking is alternate side on Tuesdays.`

**Your answer:**

```

```

### `communication`

> How do families actually hear about trips, campouts and schedule changes?
> Email list, Scoutbook, a group chat, something else?

- Length: one sentence.
- **Example shape:** `By email from your den leader, and on the pack calendar in Scoutbook.`

**Your answer:**

```

```

---

# 4. Join page (`/join`)

### `site.beAScoutUrl` -- `src/data/site.ts`

> The full URL of Pack 662's own unit page on BeAScout. Find it by searching
> your ZIP at beascout.scouting.org and copying the link to the pack's listing.

- **Example shape:** `https://beascout.scouting.org/list/?zip=10024&program%5B%5D=cub_scouts`

**Your answer:**

```

```

### `site.cost.amount`

> What does a family actually pay per Scout for a year? One number if there is
> one, or the pieces if there are several. Do not round it to sound nicer.

- Length: one line.
- **Example shape:** `$220 per Scout for the 2026 to 2027 year.`

**Your answer:**

```

```

### `site.cost.covers`

> What is included in that, and what costs extra? Uniform, handbook, camp fees
> and trip costs are the usual extras.

- Length: one to three sentences.
- **Example shape:** `That covers national and council registration, the pack's own program costs, awards and badges, and Scout Life magazine. Uniform and handbook are separate, and most campouts have a fee of $20 to $40.`

**Your answer:**

```

```

### `site.cost.assistance`

> A family for whom the fee is a real problem: what should they do, and who do
> they talk to? Say it plainly. This sentence is read carefully by the people
> who need it.

- Length: one or two sentences. Name a role address, not a person.
- **Example shape:** `Cost should never be the reason a child cannot join. Email committeechair@pack662nyc.com and it will be handled quietly.`

**Your answer:**

```

```

---

# 5. Leadership page (`/leadership`)

One markdown file per leader in `src/content/leaders/`. Two exist as shells:
`cubmaster.md` and `committee-chair.md`. Add as many as you want to list.

**Role addresses only.** A personal address fails the build. If a role has no
forward set up yet, leave the email line out entirely.

For each person:

### `role`
> Their title in the pack.
> **Example shape:** `Cubmaster` / `Committee Chair` / `Assistant Cubmaster` / `Treasurer`

### `name`
> How they want to be listed. First name and last initial is fine if anyone
> prefers that; it is their call, not the site's.
> **Example shape:** `Marcus R.`

### `email`
> A role address on `pack662nyc.com`, or leave blank.
> **Example shape:** `cubmaster@pack662nyc.com`

### `bio`
> Two sentences. What they do for the pack, and one human thing. No youth last
> names, and no naming their own children.
- Length: 120 to 240 characters. Longer unbalances the cards.
- **Example shape:** `Runs pack meetings and keeps the year moving. Came up through Scouting in Ohio and has been trying to explain snow camping to New Yorkers ever since.`

**Fill in one block per person:**

```
Role:
Name:
Email:
Bio:

Role:
Name:
Email:
Bio:
```

> Which roles should be listed at all? Some packs list everyone; some list three
> people and a general address. What do you want?

**Your answer:**

```

```

---

# 6. Resources page (`/resources`)

One markdown file per link in `src/content/links/`. Eight shells exist. Each
needs a real URL and a one-line description saying when a parent would need it.

Descriptions should be 40 to 110 characters. Longer and the list stops being
scannable, which is the entire point of the page.

| File | Link | URL needed | Description needed |
|---|---|---|---|
| `scoutbook-plus.md` | Scoutbook Plus | | |
| `beascout.md` | Our BeAScout unit page | | |
| `annual-health-record.md` | Annual Health Record | | |
| `council.md` | Our council | | |
| `scouting-america.md` | Scouting America | | |
| `scout-shop.md` | Scout Shop | | |
| `uniform-guide.md` | Uniform placement guide | | |
| `camp-registration.md` | Camp registration | | |

**Example shape** for one row, so the level of detail is clear:

- URL: `https://advancements.scouting.org/`
- Description: `Sign in to see your Scout's advancement and the pack calendar.`

### `site.council.name` and `site.council.url` -- `src/data/site.ts`

> Which council is Pack 662 in, and what is its website?

**Your answer:**

```
Council name:
Council URL:
```

### Anything missing

> What else do parents ask you for a link to? Anything you find yourself
> emailing the same URL for more than twice a year belongs on this page.

**Your answer:**

```

```

---

# 7. FAQ page (`/faq`)

Fourteen questions exist as shells in `src/content/faqs/`. Each needs an answer.
Answer in whatever length the question deserves; 1 to 4 sentences is typical.

Write these the way you would say them to a parent at pickup. Honest beats
promotional, especially on cost and on how much time it takes.

**Joining**

- `who-can-join.md` -- Who can join Pack 662?
  > Which grades, and is it boys and girls?

  ```

  ```

- `mid-year.md` -- Can we join partway through the year?

  ```

  ```

- `visit-first.md` -- Can we come to a meeting before we sign up?

  ```

  ```

**Meetings**

- `what-is-a-meeting.md` -- What happens at a pack meeting?

  ```

  ```

- `how-often.md` -- How often do you meet?

  ```

  ```

- `parent-time.md` -- How much time does this take from parents?
  > The honest answer. Families find out anyway, and finding out later feels
  > like a bait and switch.

  ```

  ```

**Cost**

- `cost.md` -- What does it cost?

  ```

  ```

- `financial-help.md` -- What if the cost is a problem for our family?

  ```

  ```

**Uniform**

- `uniform-need.md` -- Do we have to buy a uniform?
  > What is actually required, and what can wait?

  ```

  ```

- `uniform-outgrown.md` -- What happens when a uniform is outgrown?

  ```

  ```

**Outdoors**

- `camping.md` -- Do Cub Scouts camp?

  ```

  ```

- `city-outdoors.md` -- How does an outdoors program work in the city?

  ```

  ```

**General**

- `religious.md` -- Is Scouting religious?
  > This gets asked a lot in New York and the national answer is not the same as
  > any given pack's answer. Say what is true of Pack 662.

  ```

  ```

- `safety.md` -- How does the pack keep kids safe?

  ```

  ```

### Questions to add

> What do families actually ask you that is not on this list? Those are worth
> more than any of the above.

**Your answer:**

```

```

---

# 8. Contact page (`/contact`)

No writing needed. The page lists three role addresses and the meeting location,
all pulled from fields above.

One thing to confirm:

> Are all three forwards live in Namecheap: `info@`, `cubmaster@`,
> `committeechair@`? If any is not set up yet, say which, and it comes off the
> page until it is. A published address that bounces is worse than no address.

**Your answer:**

```

```

---

# 9. About Cub Scouting page (`/about`)

This page is already written and needs nothing from you. It describes Scouting
America's Cub Scout program in general, not Pack 662 specifically, so every
statement on it is true of any pack.

> Read it once anyway and flag anything that is wrong, or anything that is true
> nationally but misleading about how Pack 662 runs.

**Your answer:**

```

```

---

# 10. Open questions for whoever fills this in

> Is there anything about this pack a new family would want to know that no
> question above asks about? Its history, its chartered organization, which
> schools it draws from, something it is known for?

**Your answer:**

```

```

> Is there anything that should deliberately stay off a public website?

**Your answer:**

```

```

---

## What happens after this file is filled

1. A session maps these answers into `src/data/site.ts` and the markdown files
   in `src/content/`.
2. `npm run content:todo` regenerates `CONTENT-TODO.md`. It should report zero.
3. The noindex tag, the `Disallow` in `robots.txt`, and the construction banner
   come out, in that same change.
4. DNS gets pointed. Not before. See the README under "Going live".
