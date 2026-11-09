// Golden-master tests: the engine must reproduce the outputs recorded from App_170 exactly.
// Regenerate the golden file ONLY for an intentional calculation change, and review the diff.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { runProjectionEngine, runRSSEngine } from '../src/engine/index.js';
import { DEFAULT_INPUTS } from '../src/inputs/defaults.js';
import { PROFILES, RSS_PROFILES } from './golden/profiles.js';

const golden = JSON.parse(fs.readFileSync(new URL('./golden/engine-v170.json', import.meta.url), 'utf8'));

for (const [name, p] of Object.entries(PROFILES)) {
  test(`main engine — ${name}`, () => {
    const rows = JSON.parse(JSON.stringify(runProjectionEngine({ ...DEFAULT_INPUTS, ...p })));
    assert.deepEqual(rows, golden.main[name]);
  });
}
for (const [name, p] of Object.entries(RSS_PROFILES)) {
  test(`RSS engine — ${name}`, () => {
    const rows = JSON.parse(JSON.stringify(runRSSEngine({ ...DEFAULT_INPUTS, ...p })));
    assert.deepEqual(rows, golden.rss[name]);
  });
}
