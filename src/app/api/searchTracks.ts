import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { key, genre, bpm } = req.query;
  if (!key || !genre || !bpm) {
    return res.status(400).json({ error: "Missing key, genre, or bpm" });
  }

  try {
    // Search Youtube for videos
    const searchQuery = `Backing Track ${genre} ${key} ${bpm}`;
    const youtubeSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      searchQuery
    )}&type=video&key=${process.env.YOUTUBE_API_KEY}&maxResults=10`;
    const youtubeResponse = await axios.get(youtubeSearchUrl);
    const video = youtubeResponse.data.items;
    console.log(video);

    if (video?.length === 0) {
      return res
        .status(404)
        .json({ error: "No backing track found for the selected criteria" });
    }

    
  } catch (error) {}
}
