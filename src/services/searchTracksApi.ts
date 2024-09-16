import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchTracksApi = createApi({
  reducerPath: "searchTracksApi",
  tagTypes: ["audioSrc"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    responseHandler: async (response) => {
      if (response.ok) {
        const blob = await response.blob();
        return blob;
      } else {
        throw new Error("Failed to fetch the audio stream.");
      }
    },
  }),
  endpoints: (builder) => ({
    searchTracks: builder.query({
      query: ({ key, genre, bpm }) =>
        `search?key=${encodeURIComponent(key)}&genre=${encodeURIComponent(
          genre
        )}&bpm=${encodeURIComponent(bpm)}`,
      transformResponse: async (response: Blob) => {
        const audioBlob = new Blob([response], { type: "audio/mpeg" });
        const audioSrc = URL.createObjectURL(audioBlob);
        return { audioSrc };
      },
      providesTags: ["audioSrc"],
    }),
  }),
});

export const { useSearchTracksQuery, useLazySearchTracksQuery } =
  searchTracksApi;
