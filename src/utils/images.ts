/**
 * Utility functions for handling images and fallbacks
 */

// Import local assets
import defaultThumbnail from '@/assets/images/default-thumbnail.svg';
import defaultAvatar from '@/assets/images/default-avatar.svg';
import defaultBanner from '@/assets/images/default-banner.svg'; 

/**
 * Handles image errors by providing fallbacks
 * @param event - The error event from an image
 * @param fallbackType - Type of fallback to use
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackType: 'avatar' | 'thumbnail' | 'banner' = 'avatar'
): void => {
  const image = event.currentTarget;
  
  // Prevent infinite error loops
  image.onerror = null;
  
  // Use appropriate fallback based on type
  switch (fallbackType) {
    case 'thumbnail':
      image.src = defaultThumbnail;
      break;
    case 'banner':
      image.src = defaultBanner;
      break;
    case 'avatar':
    default:
      image.src = defaultAvatar;
      break;
  }
};

/**
 * Fallback thumbnail image URLs to try in sequence
 */
export const FALLBACK_THUMBNAILS = [
  defaultThumbnail
];

/**
 * Generates an avatar URL for a channel based on name
 * @param name - The channel name 
 * @param size - The desired image size
 * @returns A URL to a placeholder avatar
 */
export const generateAvatarUrl = (name: string, size: number = 120): string => {
  try {
    // Just return our default avatar image
    return defaultAvatar;
  } catch (e) {
    return defaultAvatar;
  }
};

/**
 * Determines if a URL is an external URL or a relative path
 * @param url - The URL to check
 * @returns True if the URL is external
 */
export const isExternalUrl = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://');
};

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * @param url - The YouTube URL
 * @returns The video ID or null if not found
 */
export const extractYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

/**
 * Generates a YouTube thumbnail URL from a video ID
 * @param videoId - The YouTube video ID
 * @param quality - The desired quality
 * @returns A URL to the YouTube thumbnail
 */
export const getYouTubeThumbnailUrl = (
  videoId: string, 
  quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'mqdefault'
): string => {
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}; 