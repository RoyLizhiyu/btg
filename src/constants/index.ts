import { Key } from "@/types";
const KEYS = [
  "c",
  "g",
  "d",
  "a",
  "e",
  "b",
  "gb",
  "db",
  "ab",
  "eb",
  "bb",
  "f",
  "am",
  "em",
  "bm",
  "f#m",
  "c#m",
  "g#m",
  "ebm",
  "bbm",
  "fm",
  "cm",
  "gm",
  "dm",
];

const GENRES = ["jazz", "rock", "rnb", "neoSoul", "funk", "blues", "ballad"];

const BPM = ["slow", "medium", "fast"];

const KEYS_MAP: Record<Key, string> = {
  c: "C Major",
  g: "G Major",
  d: "D Major",
  a: "A Major",
  e: "E Major",
  b: "B Major",
  gb: "Gb Major",
  db: "Db Major",
  ab: "Ab Major",
  eb: "Eb Major",
  bb: "Bb Major",
  f: "F Major",
  am: "A Minor",
  em: "E Minor",
  bm: "B Minor",
  "f#m": "F# Minor",
  "c#m": "C# Minor",
  "g#m": "G# Minor",
  ebm: "Eb Minor",
  bbm: "Bb Minor",
  fm: "F Minor",
  cm: "C Minor",
  gm: "G Minor",
  dm: "D Minor",
};
const GENRES_MAP = {
  jazz: "Jazz",
  rock: "Rock",
  rnb: "R&B",
  neoSoul: "Neo Soul",
  funk: "Funk",
  blues: "Blues",
  ballad: "Ballad",
};

const BPM_MAP = {
  slow: "Slow",
  medium: "Medium",
  fast: "Fast",
};

export { KEYS, GENRES, BPM, KEYS_MAP, GENRES_MAP, BPM_MAP };
