import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// `z` from 'astro:content' is deprecated and removed in Astro 8. Import it
// from 'astro/zod' so this file survives the next major without a change.
import { z } from 'astro/zod';

/**
 * RULE 3, enforced structurally rather than by review.
 *
 * Two things pass: the pack's shared mailbox, and any address on the pack
 * domain. A volunteer's own address fails the build, so it can never reach
 * production because somebody skimmed a pull request on a phone.
 *
 * The shared mailbox is what the pack uses today. Four people read it, so
 * nothing waits on one person, and it is nobody's personal address, which is
 * what rule 3 is actually protecting. The pack domain stays permitted because
 * addresses there would come back the moment the domain has a mail provider
 * again; it lost forwarding when its nameservers moved to Vercel.
 *
 * Adding a second shared mailbox here is fine. Adding someone's own is not,
 * whatever the reason seems to be at the time.
 */
const PACK_MAILBOX = 'cubscout662@gmail.com';

const packEmail = z
  .string()
  .refine(
    (v) => v === PACK_MAILBOX || /^[a-z0-9._-]+@pack662nyc\.com$/.test(v),
    `Leader email must be the pack's shared mailbox (${PACK_MAILBOX}) or an address on pack662nyc.com. A volunteer's own address must not be published on this site.`,
  );

/**
 * Placeholders are literal `TODO:` strings and are expected to render. The
 * schema permits them everywhere so the site builds before content exists;
 * CONTENT-TODO.md tracks what is still outstanding.
 */
const leaders = defineCollection({
  loader: glob({ base: './src/content/leaders', pattern: '**/*.md' }),
  schema: z.object({
    role: z.string().min(1),
    name: z.string().min(1),
    email: packEmail.optional(),
    bio: z.string().optional(),
    order: z.number().int().default(99),
    draft: z.boolean().default(false),
  }),
});

const faqs = defineCollection({
  loader: glob({ base: './src/content/faqs', pattern: '**/*.md' }),
  schema: z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
    /**
     * Links rendered under the answer. Answers are plain text on purpose, so
     * that nobody can put markup in a content file, but some answers are only
     * useful if the reader can act on them without hunting for the page.
     */
    links: z
      .array(
        z.object({
          label: z.string().min(1),
          url: z.string().refine(
            (v) => /^(https?:\/\/\S+|\/\S*)$/.test(v),
            'FAQ link url must be an absolute http(s) URL or a site-relative path.',
          ),
        }),
      )
      .optional(),
    category: z.enum(['Joining', 'Meetings', 'Cost', 'Uniform', 'Outdoors', 'General']).default('General'),
    order: z.number().int().default(99),
    draft: z.boolean().default(false),
  }),
});

const links = defineCollection({
  loader: glob({ base: './src/content/links', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    // Either a real absolute URL or an unfilled placeholder. Once a link is
    // filled in, a typo'd URL fails the build rather than shipping a dead link.
    url: z
      .string()
      .refine(
        (v) => v.startsWith('TODO:') || /^https?:\/\/\S+$/.test(v),
        'Link url must be an absolute http(s) URL, or a literal TODO: placeholder.',
      ),
    description: z.string().optional(),
    category: z.enum([
      'Start here',
      'Forms and paperwork',
      'Scouting America',
      'Gear and uniform',
      'Camping and outdoors',
      'After Cub Scouts',
    ]),
    order: z.number().int().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { leaders, faqs, links };
