//@ts-nocheck
import axios from "axios";
import { NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";
import { BPM_MAP, GENRES_MAP, KEYS_MAP } from "@/constants";
import { Bpm, Genre, Key } from "@/types";
const cookies = [
  {
    domain: ".youtube.com",
    expirationDate: 1728787808.653452,
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
    expirationDate: 1763232324.564113,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000pAgc-SX-RLvNjfMN0t5-p-BT-_o48zDi1xG_LAVSwuYWx9DWRtqfx2KEcW6uI1p-_ZInrgACgYKAb4SARISFQHGX2Mi6CwSkukrsAN0wngwGCfMLxoVAUF8yKqODjfVpB5GcwG6MXO-lvzg0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1760208917.265236,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDTS",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjIBQlrA-FY1BbmXPI9NHDiQK7B82D5oH71vyEipClcGarI32VcHZBDkYPppd-hEHIo3ghAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1728672933,
    hostOnly: false,
    httpOnly: false,
    name: "CONSISTENCY",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKreu9sKnjKVtBCiwYDOulbUT9dKIMEbTnKKdVuyClAKJsynjDTBMzhUm2NYrlMsctz5SAPb9-EE81xBS54Wickr6ViPZGoLc3RkuQT1plZd2jz7xLQaSGcd2Vo",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1763232324.563993,
    hostOnly: false,
    httpOnly: false,
    name: "SAPISID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "xBLNtzf89OEmXleg/AUluqEAtscwyadkiL",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1760208917.538378,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDCC",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzWnAhsVDvtCWi4Oclpb-DzdAWB2k-QEeAWWt7PFNtbwzUmPuSRbHrCXIRIaGu0gvrabbak",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1763232324.563962,
    hostOnly: false,
    httpOnly: true,
    name: "SSID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "ADuI8YarVFVz2qDQ4",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1763232324.564006,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-1PAPISID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "xBLNtzf89OEmXleg/AUluqEAtscwyadkiL",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1763232324.5641,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000pAgc-SX-RLvNjfMN0t5-p-BT-_o48zDi1xG_LAVSwuYWx9DWDLQDJWKdJGo8mbWIcJIiMwACgYKAfASARISFQHGX2Mi9YEUzgoJS11hl2BTa-3kwhoVAUF8yKrScPLyJLbvkEx4w_FTvBtP0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1763232324.56402,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-3PAPISID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value: "xBLNtzf89OEmXleg/AUluqEAtscwyadkiL",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1760208917.538394,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDCC",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzXKzemGL3gfKnAFXzfoYT6QQ27f9jqutuIsDpB2PAIXTAr9pCBvpdIAxsqKFw4MqbJ3Le4l",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1760208917.265421,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDTS",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjIBQlrA-FY1BbmXPI9NHDiQK7B82D5oH71vyEipClcGarI32VcHZBDkYPppd-hEHIo3ghAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1763232324.453254,
    hostOnly: false,
    httpOnly: true,
    name: "LOGIN_INFO",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AFmmF2swRAIgFimbfh299zbJrjnYsaS6_5g_zM2rHl7Wrw1keI46lG0CIEUaPw4vJE-dvwVzE0eOZb89peDRFCX3zDjgCJ6KTbhC:QUQ3MjNmeHFFUy1WMnlpYmNQd196dXJDaWNVeThneG5ZaDlHUE5yOVBxcFctQlgtUk1TbUZpZDNGQWNVRHg1N25wWk5FWkpQY29ncXVDNF85ZTVpdVhqeVI2a3hKWjZ0Rm9mbExaMVh4T0lsaVBqYVNzMGV6d3RpYUx4YlNCeXo5QTJqTjBOSGRCX2Zic2NSM3pEYU9HSGExYUpDUG42NlZR",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1763232920.193278,
    hostOnly: false,
    httpOnly: false,
    name: "PREF",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "f6=40000400&volume=16&f7=4150&tz=America.Toronto&guide_collapsed=false&repeat=NONE&autoplay=true&f4=4000000&f5=20000",
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
  const agentOptions = {
    headers: {
      referer: "https://www.youtube.com/",
    },
  };

  // agent should be created once if you don't want to change your cookie
  const agent = ytdl.createAgent(cookies, agentOptions);

  const stream = ytdl("https://www.youtube.com/watch?v=5Pa8n4RfF8s", {
    filter: "audioonly",
    agent: agent,
  });

  return new Response(stream as any, {
    status: 200,
  });

  // const { searchParams } = new URL(req.url);
  // const key = searchParams.get("key");
  // const genre = searchParams.get("genre");
  // const bpm = searchParams.get("bpm");

  // // If any of the required parameters are missing
  // if (!key || !genre || !bpm) {
  //   return new NextResponse(
  //     JSON.stringify({ error: "Missing key, genre, or bpm" }),
  //     { status: 400, headers: { "Content-Type": "application/json" } }
  //   );
  // }

  // // Search Youtube for videos using the search query
  // const searchQuery = `Backing Track ${GENRES_MAP[genre as Genre]} ${
  //   KEYS_MAP[key as Key]
  // } ${BPM_MAP[bpm as Bpm]}`;
  // const youtubeSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
  //   searchQuery
  // )}&type=video&key=${
  //   process.env.NEXT_PUBLIC_YOUTUBE_API
  // }&maxResults=10&order=relevance&RegionCode=CA`;

  // const youtubeResponse = await axios.get(youtubeSearchUrl);
  // const videos = youtubeResponse.data.items;

  // // If no videos are found

  // // Randomly select a video
  // //TODO: Make sure the random selected video is the correct key.
  // const filteredVideos = filterVideos(videos, [key, KEYS_MAP[key as Key]]);
  // videos.forEach((video: any) => console.log(video.snippet.title));
  // console.log("-----------------------------------------------------");
  // console.log("-----------------------------------------------------");
  // console.log("-----------------------------------------------------");
  // console.log({ searchQuery });
  // filteredVideos.forEach((video: any) => console.log(video.snippet.title));
  // if (!filteredVideos || filteredVideos.length === 0) {
  //   return new NextResponse(
  //     JSON.stringify({ error: "No backing track found" }),
  //     {
  //       status: 404,
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  // }
  // const randomIndex = Math.floor(Math.random() * filteredVideos.length);
  // const selectedVideo = filteredVideos[randomIndex];
  // const videoUrl = `https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`;
  // console.log({ videoUrl });
  // try {
  //   const stream = ytdl(videoUrl, {
  //     filter: "audioonly",
  //   });

  //   const headers = new Headers();
  //   headers.set("Content-Type", "audio/mpeg");
  //   headers.set(
  //     "Content-Disposition",
  //     `attachment; filename="${key}-${genre}-${bpm}.mp3"`
  //   );

  //   return new Response(stream as any, {
  //     status: 200,
  //     headers,
  //   });
  // } catch (error) {
  //   return new Response(JSON.stringify({ error: "Error streaming audio" }), {
  //     status: 500,
  //     headers: { "Content-Type": "application/json" },
  //   });
  // }
}
