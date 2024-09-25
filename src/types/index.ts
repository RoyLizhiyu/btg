export type Key =
  | "c"
  | "g"
  | "d"
  | "a"
  | "e"
  | "b"
  | "gb"
  | "db"
  | "ab"
  | "eb"
  | "bb"
  | "f"
  | "am"
  | "em"
  | "bm"
  | "f#m"
  | "c#m"
  | "g#m"
  | "ebm"
  | "bbm"
  | "fm"
  | "cm"
  | "gm"
  | "dm";

export type Genre =
  | "jazz"
  | "rock"
  | "rnb"
  | "neoSoul"
  | "funk"
  | "blues"
  | "Ballad";

export type Bpm = "slow" | "medium" | "fast";
export type Track = {
  key: Key;
  genre: Genre;
  bpm: Bpm;
};
