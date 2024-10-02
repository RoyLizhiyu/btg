"use client";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";
import { useLazySearchTracksQuery } from "@/services/searchTracksApi";
import { setAudioUrl } from "./store/audioSlice";
import { useCallback } from "react";
import { Bpm, Genre, Key } from "@/types";

export const useFetchTrack = () => {
  const dispatch = useAppDispatch();
  const { key, genre, bpm } = useAppSelector((state) => state.trackMeta);
  const [fetchTrack] = useLazySearchTracksQuery();
  const fetch = useCallback(
    (meta?: { propKey?: Key; propGenre?: Genre; propBpm?: Bpm }) => {
      fetchTrack(
        meta
          ? { key: meta.propKey, genre: meta.propGenre, bpm: meta.propBpm }
          : { key, genre, bpm }
      ).then(({ data }) => {
        if (data) {
          dispatch(setAudioUrl(data.audioSrc));
        }
      });
    },
    [fetchTrack, key, genre, bpm, dispatch]
  );
  return { fetch };
};
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
