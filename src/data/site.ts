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
    'We are a family pack of about seventy Scouts, boys and girls, split into dens by grade. A parent or guardian comes along rather than dropping off, and that turns out to be the part most families like best.',

  meeting: {
    schedule: 'Every Thursday, 6:00 to 7:00 p.m., September through June.',
    locationName: 'Brick Presbyterian Church, Watson Hall',
    // Confirmed by the pack against the Brick Church School map pin. The Akela
    // Handbook says 66; the handbook is the one that is wrong.
    streetAddress: '62 East 92nd Street',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10128',
    /** Entrance, buzzer, which door. Parents ask this first. */
    arrivalNotes:
      'Use the East 92nd Street entrance, between Park and Madison. Reception will greet you and point you downstairs to Watson Hall. If it is your first visit, say so at the door and someone will walk you in.',
    /** Where the pack goes when the weather is good. */
    outdoors:
      'When the weather allows we meet outdoors, usually at the East Pinetum in Central Park, sometimes at the East Meadow.',
    /** How the pack actually reaches families about trips and one-off events. */
    communication:
      'A pack WhatsApp group and one for your den, a weekly email from your den leader, a monthly email from pack leadership, and the calendar in Scoutbook. There is also an open committee meeting every month.',
  },

  /**
   * RULE 3: role addresses only, never a personal address, in content or in
   * commits.
   *
   * All three are configured as Namecheap forwards on the pack domain,
   * pointing at the current role-holders' own mailboxes. That split is the
   * whole point: the personal address does the work and never appears, and
   * when a volunteer hands the role on, the forward changes and nothing here
   * does.
   *
   * Configured is not the same as delivering. Send a test to each one before
   * launch; a forward can be set up correctly and still be eaten by the
   * destination's spam filter.
   */
  email: {
    info: 'info@pack662nyc.com',
    cubmaster: 'cubmaster@pack662nyc.com',
    committeeChair: 'committeechair@pack662nyc.com',
  },

  /**
   * The pack's unit page on BeAScout. This is the "I have questions" door:
   * it carries a Request More Information button that reaches the pack
   * without publishing anybody's mailbox.
   */
  beAScoutUrl: 'https://beascout.scouting.org/units/659bd3c6-4f85-4100-a932-d24527070149',

  /**
   * The registration door. Confirmed by the pack as the link to send someone
   * who has decided to join, which settles an earlier ambiguity between two
   * my.scouting.org URLs that were both in circulation.
   */
  registrationUrl:
    'https://beascout.scouting.org/registration?unitId=659bd3c6-4f85-4100-a932-d24527070149',

  /**
   * Two separate charges, deliberately shown separately: the Scouting America
   * membership goes to the national organisation and renews on the anniversary
   * of joining, and pack dues are the pack's own and run from September.
   */
  /**
   * Two charges going to two places, plus per-event costs.
   *
   * The Akela Handbook itemises registration as $85 national plus $25 council.
   * The pack confirms $145 is the current combined figure and that the
   * handbook needs updating, so BeAScout's number is the one used here.
   */
  cost: {
    registration: '$145 a year',
    dues: '$120 a year',
    activityFees: '$5 to $75 per event',
    /** Dues are prorated for families joining after September. */
    proration:
      'Pack dues are prorated for anyone joining mid-year: you pay for the share of the year that is left, so joining in the middle means half.',
    assistance:
      'Cost should never be the reason a child cannot join. Ask a Cubmaster and it is handled quietly. Families who can pay more than the dues are welcome to, and the difference sponsors another Scout.',
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
