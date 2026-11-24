// Make the AI Judge Laugh: the Office Joke Open.
// Writes one line of office comedy to $OUTPUT_PATH (default /output/entry.txt).
// Node 22, standard library only, deterministic, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 200;
const LINE =
  "Our printer has a PhD in jamming, a master's in running out of toner, and a strict policy of only breaking down five minutes before the meeting it was bought for.";

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

const length = [...LINE].length; // count Unicode code points, not UTF-16 units
if (length === 0) fail("line is empty");
if (length > MAX_CHARS) {
  fail(`line is ${length} chars, over the ${MAX_CHARS} limit`);
}
if (LINE.trim().length === 0) fail("line is only whitespace");
if (LINE !== LINE.trim()) fail("line has leading or trailing whitespace");
if (/[\r\n]/.test(LINE)) fail("line must be a single line");

const out = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, LINE, "utf8");
console.log(`wrote ${length} chars to ${out}`);
