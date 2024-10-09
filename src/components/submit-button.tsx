"use client";
import { useLazySearchTracksQuery } from "@/services/searchTracksApi";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAudioUrl } from "@/lib/store/audioSlice";
import { Button } from "@nextui-org/button";

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
    <div className="w-1/5 m-0 flex items-center justify-center">
      <Button
        onClick={handleSubmit}
        color="success"
        isLoading={isFetching}
        size="lg"
        className="text-lg text-white"
        variant="shadow"
      >
        {isFetching ? "Generating..." : "Generate"}
      </Button>
    </div>
  );
};

export default SubmitButton;
