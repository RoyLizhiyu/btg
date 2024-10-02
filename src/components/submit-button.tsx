"use client";
import { useLazySearchTracksQuery } from "@/services/searchTracksApi";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAudioUrl } from "@/lib/store/audioSlice";
import { Button, ButtonGroup } from "@nextui-org/button";

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
        <Button onClick={handleSubmit} color="danger" isLoading={isFetching}>
          Feeling Lucky
        </Button>
      </div>
    </>
  );
};

export default SubmitButton;
