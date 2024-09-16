import axios from "axios";
import { NextApiResponse } from "next";
import fs, { Stats } from "fs";
import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";
import { BPM_MAP, GENRES_MAP, KEYS_MAP } from "@/constants";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const genre = searchParams.get("genre");
  const bpm = searchParams.get("bpm");

  // If any of the required parameters are missing
  if (!key || !genre || !bpm) {
    return new NextResponse(
      JSON.stringify({ error: "Missing key, genre, or bpm" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Search Youtube for videos using the search query
  const searchQuery = `Backing Track ${GENRES_MAP[genre as Genre]} ${
    KEYS_MAP[key as Key]
  } ${BPM_MAP[bpm as Bpm]}`;
  const youtubeSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    searchQuery
  )}&type=video&key=${process.env.YOUTUBE_API_KEY}&maxResults=5`;

  const youtubeResponse = await axios.get(youtubeSearchUrl);
  const videos = youtubeResponse.data.items;

  // If no videos are found
  if (!videos || videos.length === 0) {
    return new NextResponse(
      JSON.stringify({ error: "No backing track found" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Randomly select a video
  //TODO: Make sure the random selected video is the correct key.
  const randomIndex = Math.floor(Math.random() * videos.length);
  const selectedVideo = videos[randomIndex];
  const videoUrl = `https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`;
  console.log(searchQuery);
  console.log(videoUrl);
  try {
    const stream = ytdl(videoUrl, {
      filter: "audioonly",
    });

    const headers = new Headers();
    headers.set("Content-Type", "audio/mpeg");
    headers.set(
      "Content-Disposition",
      `attachment; filename="${key}-${genre}-${bpm}.mp3"`
    );

    return new Response(stream as any, {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error streaming audio" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};
