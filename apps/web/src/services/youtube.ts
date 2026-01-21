// src/lib/youtube.ts

// Interfaces for YouTube API Responses

export interface YouTubeThumbnails {
  medium: {
    url: string;
    width?: number;
    height?: number;
  };
}

export interface YouTubeSnippet {
  title: string;
  channelTitle: string;
  thumbnails: YouTubeThumbnails;
}

export interface YouTubeContentDetails {
  duration: string;
}

export interface YouTubeVideoItem {
  id: string;
  snippet: YouTubeSnippet;
  contentDetails: YouTubeContentDetails;
}

export interface FormattedVideo {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  duration: string;
}

/**
 * Searches YouTube for music videos with strict duration filtering.
 *
 * Rules (Intended):
 * - Must be between 1 and 10 minutes long
 * - Must be categorized as Music (CategoryId: 10)
 *
 * @param query - The search term
 * @returns Array of video objects with normalized duration
 *
 * @deprecated The YOUTUBE_API_KEY has been removed from this repository.
 * This function currently returns an empty array to prevent runtime errors.
 * Re-enable integration by restoring the key in environment variables and uncommenting the logic.
 */
export async function searchYouTube(_query: string): Promise<FormattedVideo[]> {
  // YOUTUBE_API_KEY removed as per request. Returning empty array.
  return [];
}
