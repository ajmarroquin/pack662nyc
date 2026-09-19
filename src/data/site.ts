/**
 * Every scalar fact the site needs, in one place.
 *
 * Values here come from what the pack supplied: its BeAScout listing, the
 * 2026-2027 Pack Yearly Outline, and the pack's own welcome email. Anything
 * still unknown is a literal `TODO:` string that renders visibly on the page,
 * because a plausible guess survives review and a loud placeholder does not.
 *
 * Grep for `TODO:` or run `npm run content:todo` for what is still outstanding.
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

  /** One sentence. Home hero and the fallback meta description. */
  tagline:
    'A Cub Scout pack for kids in kindergarten through fifth grade, meeting Thursday evenings on the Upper East Side.',

  /** Two sentences. The first thing a parent reads. */
  intro:
    'We are a family pack of about seventy Scouts, boys and girls, split into dens by grade. Parents stay with their Scout rather than dropping off, which is the part most families end up liking most.',

  meeting: {
    schedule: 'Every Thursday, 6:00 to 7:00 p.m., September through June.',
    locationName: 'Brick Presbyterian Church, Watson Hall',
    streetAddress: '62 East 92nd Street',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10128',
    /** Entrance, buzzer, which door. Parents ask this first. */
    arrivalNotes:
      'Use the school entrance at 62 East 92nd Street, between Park and Madison, and come to Watson Hall. If it is your first time, say so at the door and someone will walk you in.',
    /** Subway lines, bus, parking. */
    gettingThere: 'TODO: nearest subway lines and stops, and anything worth knowing about parking',
    /** How the pack actually reaches families about trips and one-off events. */
    communication:
      'Weekly updates from your den leader, a monthly update from the Cubmaster, and the pack calendar in Scoutbook.',
  },

  /**
   * RULE 3: role addresses only, never a personal address, in content or in
   * commits. These are forwards on the pack domain.
   *
   * NOT YET CONFIRMED LIVE. The pack's working contact address is currently a
   * personal mailbox, which cannot go on this site: the content schema rejects
   * it and rule 3 forbids it. Confirm these three forwards resolve before the
   * site goes live, or a parent emails a dead address. See CONTENT-INTAKE.md.
   */
  email: {
    info: 'info@pack662nyc.com',
    cubmaster: 'cubmaster@pack662nyc.com',
    committeeChair: 'committeechair@pack662nyc.com',
  },

  /** The pack's own unit page on BeAScout. */
  beAScoutUrl:
    'https://beascout.scouting.org/search?zip=%2210128%22&radius=10&selectedUnitId=659bd3c6-4f85-4100-a932-d24527070149',

  /**
   * Scouting America's registration form for this unit.
   *
   * Two different URLs are in circulation for this: this one, from the pack's
   * Linktree, which shares a unit id with the BeAScout listing, and an older
   * `VES/OnlineReg` link from the pack's welcome email. Confirm which is
   * canonical before launch; a dead registration link is the worst one to get
   * wrong.
   */
  registrationUrl:
    'https://my.scouting.org/online-registration/659bd3c6-4f85-4100-a932-d24527070149/applicant-type',

  /**
   * Two separate charges, deliberately shown separately: the Scouting America
   * membership goes to the national organisation and renews on the anniversary
   * of joining, and pack dues are the pack's own and run from September.
   */
  cost: {
    membership: '$145',
    dues: '$120',
    amount: '$145 to join Scouting America, plus $120 a year in pack dues.',
    covers:
      'The $145 registers your child with Scouting America for a year and renews on the date you joined. The $120 is the pack’s own dues, which run from September and cover awards, badges and pack program costs. Uniform and handbook are separate.',
    assistance:
      'TODO: how a family asks about financial assistance, and who they ask (CONTENT-INTAKE.md, Join > cost.assistance)',
  },

  council: {
    name: 'Greater New York Councils, BSA',
    number: '640',
    phone: '(212) 242-1100',
    address: '155 East 56th Street, Floor 2, New York, NY 10022',
    url: 'https://nycscouting.org',
  },

  /**
   * This site's source. Public on purpose: a parent who wants to fix a typo
   * should be able to see exactly what the site is and propose the change.
   */
  repoUrl: 'https://github.com/ajmarroquin/pack662nyc',
} as const;

/** Rendered as a one-line postal address where the full block is too heavy. */
export function meetingAddressLine(): string {
  const m = site.meeting;
  return [m.locationName, m.streetAddress, `${m.addressLocality}, ${m.addressRegion} ${m.postalCode}`]
    .filter(Boolean)
    .join(' · ');
}
