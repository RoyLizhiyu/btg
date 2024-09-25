import { Bpm, Genre, Key, Track } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Track = {
  key: "c",
  genre: "jazz",
  bpm: "medium",
};
export const trackMetaSlice = createSlice({
  name: "trackMeta",
  initialState,
  reducers: {
    setKey: (state, action: PayloadAction<Key>) => {
      state.key = action.payload;
    },
    setGenre: (state, action: PayloadAction<Genre>) => {
      state.genre = action.payload;
    },
    setBpm: (state, action: PayloadAction<Bpm>) => {
      state.bpm = action.payload;
    },
  },
});

export const { setKey, setGenre, setBpm } = trackMetaSlice.actions;
export default trackMetaSlice.reducer;
