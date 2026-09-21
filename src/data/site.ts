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
    'We are a family pack of about seventy boys and girls, split into dens by grade to work on adventures and earn their rank badges! As a family pack, parent or guardian comes along rather than dropping off, allowing for growth of the whole family.',

  meeting: {
    schedule: 'Most Thursdays, 6:00 to 7:00 p.m., September through June.',
    locationName: 'Brick Presbyterian Church, Watson Hall',
    streetAddress: '62 East 92nd Street',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10128',
    /**
     * The neighborhood in words, which a postal address does not give you.
     *
     * A parent searching for a pack types a neighborhood, not a zip code, and
     * until this line existed the words "Upper East Side" appeared exactly
     * once on the whole site and "Carnegie Hill" not at all. Both are true of
     * 62 East 92nd Street; this is the page that answers "where", so this is
     * where they belong.
     */
    neighborhood: 'Carnegie Hill, on the Upper East Side',
    /** Entrance, buzzer, which door. Parents ask this first. */
    arrivalNotes:
      'Use the East 92nd Street entrance, between Park and Madison. Reception will greet you and point you downstairs to Watson Hall.',
    /** Where the pack goes when the weather is good. */
    outdoors:
      'When the weather allows we may meet outdoors, usually at the East Pinetum in Central Park, sometimes at the East Meadow.',
    /** How the pack actually reaches families about trips and one-off events. */
    communication:
      'A pack WhatsApp community with chats for the whole pack and one for your den, a weekly email from your den leader, a monthly email from pack leadership, and the calendar in Scoutbook. There is also an open committee meeting every month.',
  },

  /**
   * RULE 3: a pack address, never a volunteer's own.
   *
   * This is a shared mailbox that AJ, Naomi, Josh and Jigar all read, so
   * nothing waits on one person being free. It replaced three
   * pack662nyc.com forwards, which stopped existing the moment the domain's
   * nameservers moved to Vercel: Namecheap's email forwarding rides on the
   * MX records it serves, and it no longer serves them.
   *
   * It still satisfies what rule 3 is actually for. It belongs to the pack
   * rather than to a person, so no volunteer's mailbox is published for
   * scrapers to harvest, and it keeps working when a role changes hands. The
   * leaders schema enforces that: this address and the pack domain pass,
   * anything else fails the build.
   *
   * If email on pack662nyc.com is ever wanted back, it needs a mail provider
   * with MX records in Vercel's DNS, or the nameservers moved back to
   * Namecheap with Vercel's A and CNAME records added there instead.
   */
  email: {
    pack: 'cubscout662@gmail.com',
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
    activityFees: 'Varies between $5 to $75 per event',
    /** Dues are prorated for families joining after September. */
    proration:
      'Pack dues are prorated for anyone joining mid-year: you pay for the share of the year that is left!',
    assistance:
      'Cost should never be the reason a child cannot join. If you need your dues payment split into multiple payments or full financial assistance, just email us and we can help! Families who can pay more than the dues are welcome to, and the difference supports sponsorship of other Scouts.',
  },

  council: {
    name: 'Greater New York Councils, BSA',
    number: '640',
    phone: '(212) 242-1100',
    address: '155 East 56th Street, Floor 2, New York, NY 10022',
    url: 'https://nycscouting.org',
  },

  /**
   * The Scouts BSA troops most of our Arrow of Light Scouts cross over into.
   * Two units because Scouts BSA troops are single-gender.
   *
   * Hosted by the same church, not chartered by it. Brick stopped chartering
   * the pack; the pack is chartered to the council now. Say hosted.
   *
   * These are here rather than inline so a parent who lands on the wrong unit's
   * site can be pointed at the right one from any page, and so a domain change
   * is one edit.
   *
   * NOTE: the pack gave troop662nyc.com; Google and DuckDuckGo both index
   * troop662nyc.org. Using the indexed one. Worth a click to confirm.
   */
  partnerTroops: [
    {
      name: 'Troop 662',
      forWhom: 'boys',
      label: 'Troop 662 (Boys)',
      url: 'https://troop662nyc.org',
    },
    {
      name: 'Troop 662G',
      forWhom: 'girls',
      label: 'Troop 662G (Girls)',
      url: 'https://www.troop662girlsnyc.com',
    },
  ],

  /** Both troops keep the same night as the pack, an hour later. */
  troopMeeting: 'Thursday evenings, 7:00 to 8:15 p.m.',

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
