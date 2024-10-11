//@ts-nocheck
import axios from "axios";
import { NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";
import { BPM_MAP, GENRES_MAP, KEYS_MAP } from "@/constants";
import { Bpm, Genre, Key } from "@/types";
const cookies = [
  {
    domain: ".youtube.com",
    expirationDate: 1734699047.425723,
    hostOnly: false,
    httpOnly: true,
    name: "VISITOR_PRIVACY_METADATA",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value: "CgJJThIEGgAgFQ%3D%3D",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753843246.988344,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000lAiRYLcUFLl1n_vbSYs-s5uA379kVmZJxHYwq2PM-p07Goh3ktmeBHzicFxLrrY1jCdjlwACgYKARcSARYSFQHGX2MiNb2Mx4Pr-cG_Ivo65bMH5hoVAUF8yKp3jkY9Jv3ItdkQSld95BFt0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753099072.203414,
    hostOnly: false,
    httpOnly: false,
    name: "SIDCC",
    path: "/",
    sameSite: null,
    secure: false,
    session: false,
    storeId: null,
    value:
      "AKEyXzVeovZmi0iygdiNNgCZBGpCOtZ9R-fUcmrVSRPMrQU2WxrHSqKVxaWJFOVDStW-oPFsuPM",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753843246.988103,
    hostOnly: false,
    httpOnly: false,
    name: "SID",
    path: "/",
    sameSite: null,
    secure: false,
    session: false,
    storeId: null,
    value:
      "g.a000lAiRYLcUFLl1n_vbSYs-s5uA379kVmZJxHYwq2PM-p07Goh3y8nsdlb_JaqkHthkxMnbwAACgYKAQISARYSFQHGX2Mi2vUgMvRqJypXXNzjnbJ_uhoVAUF8yKqAbwAcc_-I0WocMh6heEHt0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753098906.306531,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDTS",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjEB4E2dkcYM_plcHBj5Odp2bAiEbylHSnLtdOLcc6vgQOh1jAq9OSyOH6L_GLkJyW2TEAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753843246.987618,
    hostOnly: false,
    httpOnly: false,
    name: "SAPISID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "M1Lxb6wlz_oBu8mO/Ao5xpgrvY1S8-KIsT",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753099072.203546,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDCC",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzW0R3j84NqXUjz2h4f3X0UP4loVzBj3k_QBunt4U7TvPIqXw46303UA9MO4zDxporquGsM",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753843246.98744,
    hostOnly: false,
    httpOnly: true,
    name: "SSID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "A84rc3yLtVTFVbKSW",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753119987,
    hostOnly: false,
    httpOnly: false,
    name: "wide",
    path: "/",
    sameSite: null,
    secure: false,
    session: false,
    storeId: null,
    value: "1",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753843246.987718,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-1PAPISID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value: "M1Lxb6wlz_oBu8mO/Ao5xpgrvY1S8-KIsT",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753843246.988277,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSID",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000lAiRYLcUFLl1n_vbSYs-s5uA379kVmZJxHYwq2PM-p07Goh3o_9JmjGGrq8lBBZf5b-c-gACgYKAb0SARYSFQHGX2MiF1ROLmavW09Vr6BkJXlqoRoVAUF8yKqpSu2LueIn6aQb-EdLT4qe0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753843246.987783,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-3PAPISID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value: "M1Lxb6wlz_oBu8mO/Ao5xpgrvY1S8-KIsT",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753099072.203611,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDCC",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzWHJRs7uh7lphIjlAP2rOlN6M829zbFctsMnvFRJZ19lqSGzcrV4_HWNFyK0WmHwHvdIc0",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753098906.306734,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDTS",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjEB4E2dkcYM_plcHBj5Odp2bAiEbylHSnLtdOLcc6vgQOh1jAq9OSyOH6L_GLkJyW2TEAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1732181052.322853,
    hostOnly: false,
    httpOnly: false,
    name: "_ga",
    path: "/",
    sameSite: null,
    secure: false,
    session: false,
    storeId: null,
    value: "GA1.1.1790027701.1697620831",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1732181052.342756,
    hostOnly: false,
    httpOnly: false,
    name: "_ga_VCGEPY40VB",
    path: "/",
    sameSite: null,
    secure: false,
    session: false,
    storeId: null,
    value: "GS1.1.1697620831.1.1.1697621052.0.0.0",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753843246.9875,
    hostOnly: false,
    httpOnly: false,
    name: "APISID",
    path: "/",
    sameSite: null,
    secure: false,
    session: false,
    storeId: null,
    value: "iiwZ67wEWBtL2law/A4ujmP22CU4hRC_KQ",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1753843246.987296,
    hostOnly: false,
    httpOnly: true,
    name: "HSID",
    path: "/",
    sameSite: null,
    secure: false,
    session: false,
    storeId: null,
    value: "AMg8iawsbtS2k1mSN",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1747373578.653288,
    hostOnly: false,
    httpOnly: true,
    name: "LOGIN_INFO",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AFmmF2swRQIhAN3FryU-BMwWaJTqVWkdvvR9vj8wi2-vzQapNCAPk5mWAiA0DuK68j5YHyrk179E7R2iNQo8mLKOevd2ziHZvybvYQ:QUQ3MjNmd1dkMW95TWpzek5Ga1pHMkJhREN3OVJsQlZjY2xRdEhHcE5jT1owQWF0UWU2OTQ5OHMzZGt4ZGc3dU1vcDUtcm5Rblducm85ZWlremtVSjF1b0RUSUtxbE5vUmdURVB3cG9oLXJack44MkZBQW5pSWNxRUNyaEh0dW5DNTNkenZuM3g1cjNzbk5MRkZuVVlOemVuSmhGeWJSVDh3",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1756123075.024899,
    hostOnly: false,
    httpOnly: false,
    name: "PREF",
    path: "/",
    sameSite: null,
    secure: true,
    session: false,
    storeId: null,
    value:
      "f6=40000400&f7=4150&tz=Asia.Calcutta&f4=4000000&repeat=NONE&volume=27&autoplay=true",
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
