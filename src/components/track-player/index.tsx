"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAudioUrl } from "@/lib/store/audioSlice";
import { useLazySearchTracksQuery } from "@/services/searchTracksApi";
import React from "react";
import ReactHowler from "react-howler";
const TrackPlayer = () => {
  const audioUrl = useAppSelector((s) => s.audio.audioUrl);
  const [playing, setPlaying] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const [loop, setLoop] = React.useState(false);
  const [duration, setDuration] = React.useState(0); // To store the duration of the track
  const [seek, setSeek] = React.useState(0); // Current seek position
  const [isSeeking, setIsSeeking] = React.useState(false);
  const [fetchTrack] = useLazySearchTracksQuery();
  const dispatch = useAppDispatch();
  const howlerRef = React.useRef<ReactHowler>(null);
  const playNextTrack = () => {
    setPlaying(false);
    // swap mock with global music meta data store
    const mock = {
      key: "d",
      genre: "Ballad",
      bpm: "fast",
    };
    fetchTrack(mock).then(({ data }) => {
      if (data) {
        dispatch(setAudioUrl(data.audioSrc));
      }
    });
  };
  const handleSeekingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeek(parseFloat(e.target.value));
    setIsSeeking(true);
  };
  const handleLoad = () => {
    setPlaying(true);
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
            onEnd={playNextTrack}
            ref={howlerRef}
            onLoad={handleLoad}
            loop={loop}
          />
        </div>
      )}
      <div>
        <button onClick={() => setPlaying(!playing)}>Play</button>
      </div>
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
