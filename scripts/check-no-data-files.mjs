#!/usr/bin/env node
/**
 * RULE 1 ENFORCEMENT: no roster data in this repository, in any format.
 *
 * This is the only mistake in this repo with no undo. A public repository's
 * commit history survives deleting the file: once a spreadsheet of children's
 * names and parents' phone numbers is pushed, it is published permanently,
 * and rewriting history does not reach forks, clones, or caches.
 *
 * .gitignore is a convenience and is routinely defeated by `git add -f`.
 * This check runs in CI on every pull request and push and fails the build,
 * which is the part that actually holds.
 *
 * It scans files TRACKED BY GIT, not the working tree, so node_modules and
 * build output cannot produce a false positive.
 *
 * Run locally: npm run no-data-files
 */

import { execFileSync } from 'node:child_process';

/** Extensions that carry tabular data. Roster exports are always one of these. */
const BANNED_EXTENSIONS = [
  'csv',
  'tsv',
  'xlsx',
  'xls',
  'xlsm',
  'xlsb',
  'ods',
  'numbers',
  'dbf',
  'mdb',
  'accdb',
  'sqlite',
  'sqlite3',
  'db',
  'vcf',
];

/**
 * Filenames that suggest roster data whatever the extension. A file called
 * `roster.txt` or `pack-directory.json` is the same problem as a .csv.
 */
const SUSPICIOUS_NAME = /(roster|directory|membership|contact[-_ ]?list|attendance|emergency[-_ ]?contact|scoutbook[-_ ]?export|parents?[-_ ]?list|youth[-_ ]?list)/i;

/** Paths allowed to mention the banned words, because they are the rules themselves. */
const ALLOWLIST = new Set([
  '.gitignore',
  'README.md',
  'CONTENT.md',
  'TO-DO.md',
  'CONTENT-TODO.md',
  'scripts/check-no-data-files.mjs',
  '.github/workflows/ci.yml',
]);

const extensionPattern = new RegExp(`\\.(${BANNED_EXTENSIONS.join('|')})$`, 'i');

function trackedFiles() {
  const out = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' });
  return out.split('\0').filter(Boolean);
}

const files = trackedFiles();
const violations = [];

for (const file of files) {
  if (ALLOWLIST.has(file)) continue;

  if (extensionPattern.test(file)) {
    violations.push({ file, why: 'data file extension' });
    continue;
  }

  const basename = file.split('/').pop() ?? file;
  if (SUSPICIOUS_NAME.test(basename)) {
    violations.push({ file, why: 'filename suggests roster or contact data' });
  }
}

if (violations.length > 0) {
  console.error('');
  console.error('  BLOCKED: files that may contain roster or member data');
  console.error('  ' + '-'.repeat(60));
  for (const v of violations) {
    console.error(`  ${v.file}`);
    console.error(`      reason: ${v.why}`);
  }
  console.error('');
  console.error('  This repository is PUBLIC. Roster data, member contact information,');
  console.error('  and youth names must never be committed here in any format.');
  console.error('');
  console.error('  Commit history survives deleting the file. There is no undo.');
  console.error('');
  console.error('  If this file is genuinely not member data, rename it, or add it to');
  console.error('  ALLOWLIST in scripts/check-no-data-files.mjs with a note saying why.');
  console.error('');
  console.error(`  ${violations.length} file(s) blocked.`);
  console.error('');
  process.exit(1);
}

console.log(`  OK: no data files among ${files.length} tracked files.`);
