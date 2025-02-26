"use client";
import { useLazySearchTracksQuery } from "@/services/searchTracksApi";
import React from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setAudioUrl } from "@/lib/store/audioSlice";
import { Button } from "@nextui-org/button";
import { setBpm, setGenre, setKey } from "@/lib/store/trackMetaSlice";
import { BPM, GENRES, KEYS } from "@/constants";
import { Bpm, Genre, Key } from "@/types";

const FeelingLuckyButton = ({
  fetchTrack,
  isFetching,
}: {
  fetchTrack: ReturnType<typeof useLazySearchTracksQuery>[0];
  isFetching: boolean;
}) => {
  const dispatch = useAppDispatch();
  const handleFeelingLucky = () => {
    const randomKey = KEYS[Math.floor(Math.random() * KEYS.length)];
    const randomGenre = GENRES[Math.floor(Math.random() * GENRES.length)];
    const randomBPM = BPM[Math.floor(Math.random() * BPM.length)];
    dispatch(setBpm(randomBPM as Bpm));
    dispatch(setGenre(randomGenre as Genre));
    dispatch(setKey(randomKey as Key));
    fetchTrack({ key: randomKey, genre: randomGenre, bpm: randomBPM }).then(
      ({ data }) => {
        if (data) {
          dispatch(setAudioUrl(data.audioSrc));
        }
      }
    );
  };
  return (
    <div className="m-0 flex items-center justify-center">
      <Button
        onClick={handleFeelingLucky}
        color="danger"
        isLoading={isFetching}
        size="lg"
        className="text-md text-white w-full sm:w-auto px-6 py-3"
        variant="shadow"
      >
        {isFetching ? "" : "I'm Feeling Lucky"}
      </Button>
    </div>
  );
};

export default FeelingLuckyButton;
