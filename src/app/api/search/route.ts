export const runtime = "nodejs";
//@ts-nocheck
import axios from "axios";
import { NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";
import { BPM_MAP, GENRES_MAP, KEYS_MAP } from "@/constants";
import { Bpm, Genre, Key } from "@/types";
const cookies = [
  {
    domain: ".youtube.com",
    expirationDate: 1779572138.977735,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000wAi5DXhNMAd9iLWljbG8coopkSMV7qLs6qAIqE1vwtjXEPWwGQiRDCyEZe2Bd9a74VPLTwACgYKAScSARcSFQHGX2MigLlJSMIt3UHMUscP4dso-BoVAUF8yKp9qug7UfvReRuiFmjqYwLT0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1745013928.567601,
    hostOnly: false,
    httpOnly: true,
    name: "GPS",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "1",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1776548138.977574,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDTS",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjIB7pHptSnkBO8FmzFyNb0fpZ3gyIm8VlSWRcDscYuQqKiI43I5l1VuPd0No5T3wDqzThAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1779572138.977681,
    hostOnly: false,
    httpOnly: false,
    name: "SAPISID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "lBnuZ6lKJh04KkHd/AaZqYRByOLUaOxEmo",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1776548146.332607,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDCC",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzWMPGgIaZ6j-dmj-QjjSKzL1jqg-_lsayulp_xXiYFuEEz8VwtA1rXNZsnwtd3TbFPyUQ",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1779572138.977661,
    hostOnly: false,
    httpOnly: true,
    name: "SSID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "AY9FC97ng1mBanVHH",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1779572138.977692,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-1PAPISID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "lBnuZ6lKJh04KkHd/AaZqYRByOLUaOxEmo",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1779572138.977724,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000wAi5DXhNMAd9iLWljbG8coopkSMV7qLs6qAIqE1vwtjXEPWw5WusTGQccSoCvpBPzD4sLgACgYKAW0SARcSFQHGX2Mi9oDyg-N9VLT13eADV9-zMxoVAUF8yKpq53GiUd8LKnDX_1QdgQtQ0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1779572138.977702,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-3PAPISID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value: "lBnuZ6lKJh04KkHd/AaZqYRByOLUaOxEmo",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1776548146.332627,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDCC",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzXiznT0LilxO4A8Bf45Udx1GKVRNZJtOrk_FJk07ViTjlt7Mn7CiX5cS_NvYzgdRyej",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1776548138.977635,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDTS",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjIB7pHptSnkBO8FmzFyNb0fpZ3gyIm8VlSWRcDscYuQqKiI43I5l1VuPd0No5T3wDqzThAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1779572139.213371,
    hostOnly: false,
    httpOnly: true,
    name: "LOGIN_INFO",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AFmmF2swRQIgdlmbJJ7ZNVh12_e_ECGXpwsNW2EohKdEoxpB3A29ohoCIQDqeVZnYUI7MYp0a9Z0YTkWC8gWN4maw0uSvW8uN-LUNA:QUQ3MjNmemNaalUtRTc3QnZiUTlRRWxQcXJhSWVwcEI4dW9CLVZyeEcyejI1X01GYUNESk5NZTJqSV91YmdjZnQ2bnFRdXF4WmRhZXJFVGRZM2c0ZGpKa3BfZTV2MTYtWktfQTR1aUhOMG1jZTNoVVBTcEoxdm84VjE5N1Z1YkFzejhWLXJMSHh0bGxQdjdBNi1yMFlYUXNYTmcwNm9hQ1hR",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1779572141.599456,
    hostOnly: false,
    httpOnly: false,
    name: "PREF",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "f4=4000000&f6=40000000&tz=America.Toronto",
  },
];
const filterVideos = (videos: any, key: string[]) =>
  videos.filter(
    ({
      snippet,
    }: {
      snippet: {
        title: string;
      };
    }) => {
      const title = snippet.title;
      console.log({ title });
      const containsBacking = title.toLowerCase().includes("backing");
      const containsKey = key.some((k) => {
        // Check if the key is major or minor
        if (k.toLowerCase().includes("minor") || k.includes("m")) {
          // If the key is minor, match "f#m", "f# minor", etc.
          const regex = new RegExp(
            `\\b${k.replace(/m|minor/i, "(m|minor|minor7)")}\\b`,
            "i"
          );
          return regex.test(title);
        } else {
          console.log({ title });
          // If the key is major, ensure "minor" or "m" does NOT follow
          // const regex = new RegExp(`\\b${k}\\b(?!\\s*(minor|m))`, "i");
          const regex = new RegExp(
            `\\b${k}(?:\\s*maj7|\\s*maj|(?!(\\s*minor|m)))\\b`,
            "i"
          );
          return regex.test(title);
        }
      });

      return containsBacking && containsKey;
    }
  );

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
  )}&type=video&key=${
    process.env.NEXT_PUBLIC_YOUTUBE_API
  }&maxResults=10&order=relevance&RegionCode=CA`;

  const youtubeResponse = await axios.get(youtubeSearchUrl);
  const videos = youtubeResponse.data.items;

  // If no videos are found

  // Randomly select a video
  //TODO: Make sure the random selected video is the correct key.
  const filteredVideos = filterVideos(videos, [key, KEYS_MAP[key as Key]]);
  videos.forEach((video: any) => console.log(video.snippet.title));
  console.log("-----------------------------------------------------");
  console.log("-----------------------------------------------------");
  console.log("-----------------------------------------------------");
  console.log({ searchQuery });
  filteredVideos.forEach((video: any) => console.log(video.snippet.title));
  if (!filteredVideos || filteredVideos.length === 0) {
    return new NextResponse(
      JSON.stringify({ error: "No backing track found" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const randomIndex = Math.floor(Math.random() * filteredVideos.length);
  const selectedVideo = filteredVideos[randomIndex];
  const videoUrl = `https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`;
  console.log({ videoUrl });
  try {
    const agentOptions = {
      pipelining: 5,
      maxRedirections: 0,
      localAddress: "127.0.0.1",
    };

    const agent = ytdl.createAgent(cookies as any);
    // const basicInfo = await ytdl.getBasicInfo(videoUrl, { agent });
    // const info = await ytdl.getInfo(videoUrl, { agent });
    // console.log({ basicInfo, info });
    const stream = ytdl(videoUrl, {
      quality: "highestaudio",
      agent,
    });
    console.log({ stream });
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
    console.log({ error });
    return new Response(JSON.stringify({ error: "Error streaming audio" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
