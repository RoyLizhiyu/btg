"use client";
import { useLazySearchTracksQuery } from "@/services/searchTracksApi";
import React, { useEffect, useState } from "react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { BPM, GENRES, KEYS } from "@/constants";
import { useAppDispatch } from "@/lib/hooks";
import { setAudioUrl } from "@/lib/store/audioSlice";
const SubmitButton = () => {
  const [fetchTrack] = useLazySearchTracksQuery();
  const dispatch = useAppDispatch();
  const [musicMeta, setMusicMeta] = useState({
    key: "C major",
    genre: "Pop",
    bpm: "Fast",
  });
  const handleSubmit = () => {
    fetchTrack(musicMeta).then(({ data }) => {
      if (data) {
        dispatch(setAudioUrl(data.audioSrc));
      }
    });
  };

  const handleChange = (field: string, e: any) => {
    setMusicMeta((meta) => ({
      ...meta,
      [field]: e.target.value,
    }));
  };
  return (
    <>
      <div>
        <Select
          label="Key"
          color="primary"
          value={musicMeta.key}
          onChange={(e) => handleChange("key", e)}
        >
          {KEYS.map((key) => (
            <SelectItem color="primary" key={key}>
              {key}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div>
        <Select label="genre" onChange={(e) => handleChange("genre", e)}>
          {GENRES.map((key) => (
            <SelectItem key={key}>{key}</SelectItem>
          ))}
        </Select>
      </div>
      <div>
        <Select label="BPM" onChange={(e) => handleChange("bpm", e)}>
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
