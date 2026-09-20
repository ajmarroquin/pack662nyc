#!/usr/bin/env node
/**
 * RULE 4 ENFORCEMENT: no unfilled placeholders on a live site.
 *
 * This used to be a reporting script. It wrote CONTENT-TODO.md listing every
 * `TODO:` still in the tree, which was the right tool while the site was being
 * written: placeholders were expected, and a visible yellow box on a page
 * nobody could reach was a useful reminder.
 *
 * The site is live now, so that calculation inverts. A placeholder no longer
 * reminds the pack of anything; it renders a yellow TODO box in front of a
 * parent deciding whether to join. Reporting is not enough any more, so this
 * fails the build instead.
 *
 * The machinery that renders placeholders is deliberately left in place. It is
 * the right way to add a field whose value nobody has yet, and this check is
 * what stops one reaching production: fill it, or do not ship it.
 *
 * Run locally: npm run no-placeholders
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

/** Files whose job is to describe placeholders rather than contain them. */
const SKIP = new Set([
  'README.md',
  'CONTENT.md',
  'TO-DO.md',
  'src/content.config.ts',
  'src/components/Todo.astro',
  'src/components/Field.astro',
  'scripts/check-no-placeholders.mjs',
]);

/** `key: "TODO: ..."` in frontmatter or TypeScript, and wrapped values. */
const FIELD = /^\s*([A-Za-z_][\w.]*)\s*:\s*['"]TODO:\s*(.*?)['"],?\s*$/;
const BARE = /^\s*['"]TODO:\s*(.*?)['"],?\s*$/;
const KEY_ONLY = /^\s*([A-Za-z_][\w.]*)\s*:\s*$/;

const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean)
  .filter((f) => /\.(md|ts|astro)$/.test(f))
  .filter((f) => !SKIP.has(f))
  .filter((f) => existsSync(f))
  .sort();

const found = [];

for (const file of files) {
  let lastField = null;
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      // Comments discuss placeholders; they are not placeholders.
      const t = line.trim();
      if (t.startsWith('*') || t.startsWith('//') || t.startsWith('/*') || t.startsWith('#')) return;

      const k = KEY_ONLY.exec(line);
      if (k) {
        lastField = k[1];
        return;
      }
      const m = FIELD.exec(line);
      if (m) {
        lastField = m[1];
        found.push({ file, line: i + 1, field: m[1], prompt: m[2] });
        return;
      }
      const b = BARE.exec(line);
      if (b) found.push({ file, line: i + 1, field: lastField ?? '(continued)', prompt: b[1] });
    });
}

if (found.length > 0) {
  console.error('');
  console.error('  BLOCKED: unfilled placeholders would ship to the live site');
  console.error('  ' + '-'.repeat(60));
  for (const f of found) {
    console.error(`  ${f.file}:${f.line}  ${f.field}`);
    console.error(`      needs: ${f.prompt}`);
  }
  console.error('');
  console.error('  pack662nyc.com is live. Each of these renders as a yellow TODO');
  console.error('  box on the page, in front of a parent deciding whether to join.');
  console.error('');
  console.error('  Fill it in, or leave the field out until you can.');
  console.error('');
  console.error(`  ${found.length} placeholder(s).`);
  console.error('');
  process.exit(1);
}

console.log(`  OK: no placeholders among ${files.length} content and source files.`);
