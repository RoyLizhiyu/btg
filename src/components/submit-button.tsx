"use client";
import { useLazySearchTracksQuery } from "@/services/searchTracksApi";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAudioUrl } from "@/lib/store/audioSlice";
import { Button, ButtonGroup } from "@nextui-org/button";
import { setBpm, setGenre, setKey } from "@/lib/store/trackMetaSlice";
import { BPM, GENRES, KEYS } from "@/constants";
import { Bpm, Genre, Key } from "@/types";

const SubmitButton = ({
  fetchTrack,
  isFetching,
}: {
  fetchTrack: ReturnType<typeof useLazySearchTracksQuery>[0];
  isFetching: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { key, genre, bpm } = useAppSelector((state) => state.trackMeta);
  const handleSubmit = () => {
    fetchTrack({ key, genre, bpm }).then(({ data }) => {
      if (data) {
        dispatch(setAudioUrl(data.audioSrc));
      }
    });
  };
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
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <Button onClick={handleSubmit} color="success" isLoading={isFetching}>
          Submit
        </Button>
        <Button
          onClick={handleFeelingLucky}
          color="danger"
          isLoading={isFetching}
        >
          Feeling Lucky
        </Button>
      </div>
    </>
  );
};

export default SubmitButton;
