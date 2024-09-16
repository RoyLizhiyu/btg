import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AudioState {
  audioUrl: string | undefined;
}

const initialState: AudioState = {
  audioUrl: undefined,
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setAudioUrl: (state, action: PayloadAction<string | undefined>) => {
      state.audioUrl = action.payload;
    },
  },
});

export const { setAudioUrl } = audioSlice.actions;
export default audioSlice.reducer;
