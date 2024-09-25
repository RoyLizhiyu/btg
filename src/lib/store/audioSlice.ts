import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AudioState {
  audioUrl: string | undefined;
  playing: boolean;
  loop: boolean;
}

const initialState: AudioState = {
  audioUrl: undefined,
  playing: false,
  loop: false,
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setAudioUrl: (state, action: PayloadAction<string | undefined>) => {
      state.audioUrl = action.payload;
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
    setLoop: (state, action: PayloadAction<boolean>) => {
      state.loop = action.payload;
    },
  },
});

export const { setAudioUrl, setPlaying, setLoop } = audioSlice.actions;
export default audioSlice.reducer;
