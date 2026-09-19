import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// `z` from 'astro:content' is deprecated and removed in Astro 8. Import it
// from 'astro/zod' so this file survives the next major without a change.
import { z } from 'astro/zod';

/**
 * RULE 3, enforced structurally rather than by review.
 *
 * Only role addresses on the pack domain may appear on this site. A personal
 * address in a leader entry fails the build, so it can never reach production
 * because somebody skimmed a pull request on a phone.
 */
const roleEmail = z
  .string()
  .regex(
    /^[a-z0-9._-]+@pack662nyc\.com$/,
    'Leader email must be a role address on pack662nyc.com (e.g. cubmaster@pack662nyc.com). Personal addresses are not permitted on this site.',
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
    email: roleEmail.optional(),
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
    ]),
    order: z.number().int().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { leaders, faqs, links };
