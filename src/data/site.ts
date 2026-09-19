/**
 * Every scalar fact the site needs, in one file.
 *
 * NOTHING HERE IS REAL. Each value is a literal `TODO:` string that renders
 * visibly on the page. This session had no access to pack information, and
 * invented-but-plausible content is worse than a blank because it survives
 * review. See CONTENT-INTAKE.md for what each field wants.
 *
 * A later session replaces these strings. Grep for `TODO:` to find the rest.
 */

export const TODO = 'TODO:' as const;

/** True when a value is still an unfilled placeholder. */
export function isTodo(value: string | undefined | null): boolean {
  return typeof value === 'string' && value.trim().startsWith(TODO);
}

export const site = {
  name: 'Cub Scout Pack 662',
  shortName: 'Pack 662',
  city: 'New York, NY',
  url: 'https://pack662nyc.com',

  /** One sentence. Appears in the home hero and as the fallback meta description. */
  tagline: 'TODO: one-sentence description of the pack (see CONTENT-INTAKE.md, Home > tagline)',

  /** Two sentences, max ~240 characters. The first thing a parent reads. */
  intro:
    'TODO: two sentences on who the pack is and who it is for (CONTENT-INTAKE.md, Home > intro)',

  meeting: {
    /** e.g. "Every other Wednesday during the school year" */
    schedule: 'TODO: recurring meeting day and time (CONTENT-INTAKE.md, Meetings > schedule)',
    /** Venue name only. */
    locationName: 'TODO: meeting venue name (CONTENT-INTAKE.md, Meetings > locationName)',
    streetAddress: 'TODO: street address',
    addressLocality: 'TODO: neighborhood or city',
    addressRegion: 'NY',
    postalCode: 'TODO: ZIP',
    /** Entrance, buzzer, which door, stairs vs elevator. Parents ask this first. */
    arrivalNotes: 'TODO: how to find the entrance on a first visit (CONTENT-INTAKE.md, Meetings > arrivalNotes)',
    /** Subway lines, bus, parking. */
    gettingThere: 'TODO: nearest subway lines and parking notes',
    /** How the pack actually reaches families about trips and one-off events. */
    communication: 'TODO: how families hear about trips and events (CONTENT-INTAKE.md, Meetings > communication)',
  },

  /**
   * RULE 3: role addresses only, never a personal address, in content or in
   * commits. These are Namecheap forwards on the pack domain.
   */
  email: {
    info: 'info@pack662nyc.com',
    cubmaster: 'cubmaster@pack662nyc.com',
    committeeChair: 'committeechair@pack662nyc.com',
  },

  /** The formal join path. Scouting America's own unit page for Pack 662. */
  beAScoutUrl: 'TODO: BeAScout unit page URL (CONTENT-INTAKE.md, Join > beAScoutUrl)',

  /** Annual cost. Do not guess this number; it changes yearly and varies by council. */
  cost: {
    amount: 'TODO: total annual cost per Scout, as a dollar figure',
    covers: 'TODO: what that figure covers (CONTENT-INTAKE.md, Join > cost.covers)',
    assistance: 'TODO: how a family asks about financial assistance',
  },

  /**
   * This site's source. Public on purpose: a parent who wants to fix a typo
   * should be able to see exactly what the site is and propose the change.
   * Linked from the footer.
   */
  repoUrl: 'https://github.com/ajmarroquin/pack662nyc',

  council: {
    name: 'TODO: council name (CONTENT-INTAKE.md, Resources > council)',
    url: 'TODO: council website URL',
  },
} as const;

/** Rendered as a one-line postal address wherever the full block is too heavy. */
export function meetingAddressLine(): string {
  const m = site.meeting;
  return [m.locationName, m.streetAddress, `${m.addressLocality}, ${m.addressRegion} ${m.postalCode}`]
    .filter(Boolean)
    .join(' · ');
}
