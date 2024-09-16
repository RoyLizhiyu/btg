type Key =
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

type Genre = "jazz" | "rock" | "rnb" | "neoSoul" | "funk" | "blues" | "Ballad";

type Bpm = "slow" | "medium" | "fast";
type Track = {
  key: Key;
  genre: Genre;
  bpm: Bpm;
};
