"use client";
import { useLazySearchTracksQuery } from "@/services/searchTracksApi";
import React, { useEffect, useState } from "react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { BPM, GENRES, KEYS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAudioUrl } from "@/lib/store/audioSlice";
import { setBpm, setGenre, setKey } from "@/lib/store/trackMetaSlice";
import { Bpm, Genre, Key } from "@/types";
const SubmitButton = () => {
  const [fetchTrack] = useLazySearchTracksQuery();
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
      <div>
        <Select
          label="Key"
          color="primary"
          selectedKeys={[key]}
          onChange={(e) => dispatch(setKey(e.target.value as Key))}
        >
          {KEYS.map((key) => (
            <SelectItem color="primary" key={key}>
              {key}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div>
        <Select
          label="genre"
          selectedKeys={[genre]}
          onChange={(e) => dispatch(setGenre(e.target.value as Genre))}
        >
          {GENRES.map((key) => (
            <SelectItem key={key}>{key}</SelectItem>
          ))}
        </Select>
      </div>
      <div>
        <Select
          label="BPM"
          selectedKeys={[bpm]}
          onChange={(e) => dispatch(setBpm(e.target.value as Bpm))}
        >
          {BPM.map((key) => (
            <SelectItem key={key}>{key}</SelectItem>
          ))}
        </Select>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleSubmit}>Feeling Lucky</button>
      </div>
    </>
  );
};

export default SubmitButton;
