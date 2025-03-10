import { searchTracksApi } from "@/services/searchTracksApi";
import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./audioSlice";
import trackMetaReducer from "./trackMetaSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      [searchTracksApi.reducerPath]: searchTracksApi.reducer,
      audio: audioReducer,
      trackMeta: trackMetaReducer,
    },
    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare().concat(searchTracksApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
