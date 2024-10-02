"use client";
import { useAppDispatch, useAppSelector, useFetchTrack } from "@/lib/hooks";
import { setAudioUrl, setPlaying } from "@/lib/store/audioSlice";
import { useLazySearchTracksQuery } from "@/services/searchTracksApi";
import React from "react";
import ReactHowler from "react-howler";
import PlayPauseButton from "./play-pause-button";
import ShuffleButton from "./shuffle-button";
import RepeatButton from "./repeat-button";

const TrackPlayer = () => {
  const { audioUrl, playing, loop } = useAppSelector((s) => s.audio);
  const [volume, setVolume] = React.useState(1);
  const [duration, setDuration] = React.useState(0); // To store the duration of the track
  const [seek, setSeek] = React.useState(0); // Current seek position
  const [isSeeking, setIsSeeking] = React.useState(false);
  const dispatch = useAppDispatch();
  const howlerRef = React.useRef<ReactHowler>(null);
  const { key, genre, bpm } = useAppSelector((state) => state.trackMeta);
  const { fetch } = useFetchTrack();
  const handleSeekingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeek(parseFloat(e.target.value));
    setIsSeeking(true);
  };
  const loopRef = React.useRef(loop);
  const keyRef = React.useRef(key);
  const genreRef = React.useRef(genre);
  const bpmRef = React.useRef(bpm);
  React.useEffect(() => {
    loopRef.current = loop;
    keyRef.current = key;
    genreRef.current = genre;
    bpmRef.current = bpm;
  }, [bpm, genre, key, loop]);

  const handleLoad = () => {
    dispatch(setPlaying(true));
    setSeek(0);
    if (howlerRef.current) {
      setDuration(howlerRef.current.duration());
    }
  };
  const handleMouseUpSeek = () => {
    if (howlerRef.current) {
      howlerRef.current.seek(seek);
    }
    setIsSeeking(false);
  };

  React.useEffect(() => {
    if (howlerRef.current && playing) {
      const interval = setInterval(() => {
        if (!isSeeking) {
          setSeek(howlerRef.current?.seek() || 0); // Update seek position if not manually seeking
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [playing, isSeeking]);
  return (
    <>
      {audioUrl && (
        <div>
          <ReactHowler
            src={audioUrl}
            playing={playing}
            format="mp3"
            volume={volume}
            onEnd={() => {
              if (loopRef.current) {
                setSeek(0);
              } else {
                dispatch(setPlaying(false));
                fetch({
                  propKey: keyRef.current,
                  propBpm: bpmRef.current,
                  propGenre: genreRef.current,
                });
              }
            }}
            ref={howlerRef}
            onLoad={handleLoad}
          />
        </div>
      )}
      <PlayPauseButton />
      <ShuffleButton />
      <RepeatButton />
      <div className="seek">
        <label>
          Seek:
          <span className="slider-container">
            <input
              type="range"
              min="0"
              max={duration.toFixed(2)}
              step=".01"
              value={seek.toFixed(2)}
              onChange={handleSeekingChange}
              onMouseUp={handleMouseUpSeek}
            />
          </span>
        </label>
      </div>
    </>
  );
};

export default TrackPlayer;
