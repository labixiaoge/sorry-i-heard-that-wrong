// Sorry, I Heard That Wrong — make.fun bounty
// u-kiencx-sorry-i-heard-that-wrong-1858c729
//
// The entry is exactly one line: the apology a smart speaker gives its
// owner after mishearing them. This program writes that line to
// /output/entry.txt.
//
// The line: "Sorry — I heard 'dim the lights' as 'dine the lights,' so I
// have eaten all six bulbs and enrolled myself in a hearing test."
//
// Why: "dim" -> "dine" is a fresh mishearing (not a song title, not a name),
// the twist escalates in one beat (the speaker literally ate the bulbs),
// and the closer — a smart speaker enrolling itself in a hearing test —
// is the device diagnosing its own ears, which is exactly the voice the
// judge brief asks for. 123 characters, well inside the 140 cap.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "Sorry \u2014 I heard 'dim the lights' as 'dine the lights,' so I have eaten all six bulbs and enrolled myself in a hearing test.";
const OUT_PATH = process.env.MAKEFUN_OUTPUT_DIR
  ? join(process.env.MAKEFUN_OUTPUT_DIR, "entry.txt")
  : (process.env.OUTPUT_PATH ?? "/output/entry.txt");

// No trailing newline: the file must hold exactly the one line, so the
// gate sees 123 characters, not 124.
mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, LINE, "utf8");
// Verify what was actually written: re-read and compare byte for byte.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== LINE) {
  throw new Error("verification failed: entry.txt does not match the line");
}
