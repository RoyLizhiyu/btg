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
    expirationDate: 1777045954.386538,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000uwi5DTd31juJPntNCnVp7tzYBH7OxqgkzeaOGBQPbi01WiArXCJKZw0unzMi2nVrccq7dwACgYKAVwSARcSFQHGX2MiJ-5MfN9O33y-KYbaMchvlhoVAUF8yKohfemUK4iqf9ZsPWaQ_rOX0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1742487723.978752,
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
    expirationDate: 1774021954.386405,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDTS",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjIB7pHptW8W9QW380-Qabqa_DqT1HEZi5nh42EA-QIdvntO_zW8pe47_DZ3VMaEIGjOdBAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1742486557,
    hostOnly: false,
    httpOnly: false,
    name: "CONSISTENCY",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKreu9sqWGACeniqyXoVYXAB4YWATBK9e2bUReieq-0Lgt9wt15-iTRcYVCeSIzi1Jh4lkH6qdy55QF8KWqO9YMSnvxcPDusUyceB9Vcq6k0kkluz5dN2iaC_-DnhddkLpp7c8VvxPtT0jmensJvv8uA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1777045954.386494,
    hostOnly: false,
    httpOnly: false,
    name: "SAPISID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "Zh8bfcpMAwANH0FW/AzbrthdxwcTCmqWaW",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1774022050.910057,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDCC",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzWCp6kgkyov7dcMUUF4YIDiOCshqV2EvFbsJ_AzKHFdRrJas-oV3R9yLHerJQbgqroI",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1777045954.386478,
    hostOnly: false,
    httpOnly: true,
    name: "SSID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "Axwc2AZqLDCz3_BG5",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1777045954.386503,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-1PAPISID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "Zh8bfcpMAwANH0FW/AzbrthdxwcTCmqWaW",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1777045954.386529,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000uwi5DTd31juJPntNCnVp7tzYBH7OxqgkzeaOGBQPbi01WiArmeJT493E_JUXZzapofnZhAACgYKAeQSARcSFQHGX2MiGPPbJXhyy1GRtrcFsZ9BcxoVAUF8yKqmOc5VtPk8NiO9Yn4N97Xw0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1777045954.386512,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-3PAPISID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value: "Zh8bfcpMAwANH0FW/AzbrthdxwcTCmqWaW",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1774022050.910104,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDCC",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzW9s7e9i9G6CZjKBMG-lDviamBOS9cRfgbkwkbOM0KyNaRWnxLRGy0l5-JejuMamYGq",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1774021954.386456,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDTS",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjIB7pHptW8W9QW380-Qabqa_DqT1HEZi5nh42EA-QIdvntO_zW8pe47_DZ3VMaEIGjOdBAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1777045954.63448,
    hostOnly: false,
    httpOnly: true,
    name: "LOGIN_INFO",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AFmmF2swRAIgT6LHIKxtzDHQrnPK4xtwvMzZzDIQFdBH5vfEuLJgtYMCIHAZco9mwZYa1INM_z611CHAqVVLvAyHbhnOpeuaDFlq:QUQ3MjNmeXJIVXlHZFVGbXBlbzVMTnlkY1A3WnZZWGlJV3hoNUVmVGFRTkZfTk51VUpMZ3QtSkdLUElRQkl3Q3hjSU5uVF9OOTczd3VwSjNLRVNReE5PZHoySU9PanRleThZeXQtS1QwRzhkdU1LZDQ5cHFGTnI3cGxSZVZKdFhjRUM5V0IweHRZcE45THlqck5sdUltMkpDSXRPY3pXcmd3",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1777045956.91208,
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
    const basicInfo = await ytdl.getBasicInfo(videoUrl, { agent });
    const info = await ytdl.getInfo(videoUrl, { agent });
    console.log({ basicInfo, info });
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
