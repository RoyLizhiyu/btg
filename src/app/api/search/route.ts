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
    expirationDate: 1756076919.496523,
    hostOnly: false,
    httpOnly: true,
    name: "VISITOR_PRIVACY_METADATA",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value: "CgJDQRIEGgAgKQ%3D%3D",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1775672067.793387,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000uQgc-dc5Ytq5gpXlqpDI8Eb3IkGl5GzGNfkckWdx7cSR9usUWBq6vviLF23U6s0YNYh0dgACgYKAc8SARISFQHGX2MispfdUiNmP1xnD01mrV5F8RoVAUF8yKqBDGkCT8KfD63jUFS2zKZy0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1774020228.28137,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDTS",
    path: "/",
    sameSite: undefined,
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjEB7pHptT_BzV7ZOzSMZpoIpJGxXzKTuntCHLmugXfipL6h1OZtCLw9ANxNcfo2opmAEAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1775672067.793231,
    hostOnly: false,
    httpOnly: false,
    name: "SAPISID",
    path: "/",
    sameSite: undefined,
    secure: true,
    session: false,
    storeId: null,
    value: "R2ffU_tLOF28J5xo/Aiz9DthvznfFbxJB3",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1774020235.99813,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDCC",
    path: "/",
    sameSite: undefined,
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzXSe6CCqarpj3Yv8lFW7XjbyqXsbvoC-87pBP4Btk-GbPE7kXR9wVhtvvMjdJS85VSEPhg",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1775672067.793202,
    hostOnly: false,
    httpOnly: true,
    name: "SSID",
    path: "/",
    sameSite: undefined,
    secure: true,
    session: false,
    storeId: null,
    value: "ASTJEriZTPgHib06o",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1775672067.793244,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-1PAPISID",
    path: "/",
    sameSite: undefined,
    secure: true,
    session: false,
    storeId: null,
    value: "R2ffU_tLOF28J5xo/Aiz9DthvznfFbxJB3",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1775672067.793375,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSID",
    path: "/",
    sameSite: undefined,
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000uQgc-dc5Ytq5gpXlqpDI8Eb3IkGl5GzGNfkckWdx7cSR9usUJ-D202VDFBi6or0az_iVZQACgYKAQcSARISFQHGX2MiZgHufpJ_KymyMuv_BderZhoVAUF8yKqkNHFNckTlFSFoYxSD2htj0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1775672067.793257,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-3PAPISID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value: "R2ffU_tLOF28J5xo/Aiz9DthvznfFbxJB3",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1774020235.998146,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDCC",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzVqygEV-_WhNDbJ6GpzO8VBIaTT2X8guEfWAbhBqDF4NQmAnDhaYq_NOgh4x0fi3a0SGjw",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1774020228.281431,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDTS",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjEB7pHptT_BzV7ZOzSMZpoIpJGxXzKTuntCHLmugXfipL6h1OZtCLw9ANxNcfo2opmAEAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1777044229.377314,
    hostOnly: false,
    httpOnly: true,
    name: "LOGIN_INFO",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AFmmF2swRAIgN6HgtANZf3eOUdonJnjEmZB8yuyHQxJLTjqpRkcGj-ICICjVNpn2EQnQVj0L3pxirXoa9ziHM-OoC_8N5UBrcD8z:QUQ3MjNmd3dCY0Yta1ZOU193SDFsVXlRSm1zR1dTQ2s4S0hJc3NXVjJBUUJsSzMwRzhORjU2UF82bmlBTkttbUI2UWM3S0JOOTU2bERIWnBhY3Z5OUdIZ3ZnTjVkdmdEdmd2eVZLalBxMmxJM25jZlZCS25LbVEybG5QTDFsRFBPb0FHXzcxYkhST1R1X1lUbGFKTW9pUzZaUkRVekRjVDBR",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1777044231.729802,
    hostOnly: false,
    httpOnly: false,
    name: "PREF",
    path: "/",
    sameSite: undefined,
    secure: true,
    session: false,
    storeId: null,
    value:
      "f6=40000400&volume=7&f7=4150&tz=America.Toronto&guide_collapsed=false&repeat=NONE&autoplay=true&f4=4000000&f5=20000",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1756076919.49647,
    hostOnly: false,
    httpOnly: true,
    name: "VISITOR_INFO1_LIVE",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value: "86TwmN_I2kc",
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

    ytdl.createAgent(cookies, agentOptions);
    const stream = ytdl(videoUrl, {
      quality: "highestaudio",
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
    console.log({ error });
    return new Response(JSON.stringify({ error: "Error streaming audio" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
