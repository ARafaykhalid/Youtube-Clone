/**
 * Format view count in a user-friendly way
 * @param viewCount - The number of views to format
 * @returns Formatted view count string
 */
export function formatViewCount(viewCount: number | string): string {
  if (typeof viewCount === 'string') {
    // If already formatted, return as is
    if (viewCount.includes('views') || viewCount.includes('view')) {
      return viewCount;
    }
    
    // Try to parse the string to a number
    viewCount = parseInt(viewCount.replace(/,/g, ''), 10);
    if (isNaN(viewCount)) return '0 views';
  }
  
  // Format based on magnitude
  if (viewCount >= 1000000) {
    return `${(viewCount / 1000000).toFixed(1).replace(/\.0$/, '')}M views`;
  } else if (viewCount >= 1000) {
    return `${(viewCount / 1000).toFixed(1).replace(/\.0$/, '')}K views`;
  } else {
    return `${viewCount} views`;
  }
}

/**
 * Format a date relative to the current time (e.g., "2 days ago")
 * @param dateString - The date string to format
 * @returns Formatted relative time string
 */
export function formatRelativeTime(dateString: string): string {
  // If already in relative format, return as is
  if (dateString.includes('ago') || dateString.includes('now')) {
    return dateString;
  }
  
  const date = new Date(dateString);
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffSeconds < 60) {
    return 'Just now';
  } else if (diffSeconds < 3600) {
    const minutes = Math.floor(diffSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffSeconds < 86400) {
    const hours = Math.floor(diffSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffSeconds < 2592000) {
    const days = Math.floor(diffSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (diffSeconds < 31536000) {
    const months = Math.floor(diffSeconds / 2592000);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffSeconds / 31536000);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}

/**
 * Format a duration in seconds to a user-friendly string (e.g., "5:23")
 * @param seconds - The duration in seconds
 * @returns Formatted duration string
 */
export function formatDuration(seconds: number | string): string {
  if (typeof seconds === 'string') {
    // If already formatted (e.g., "5:23"), return as is
    if (seconds.includes(':')) {
      return seconds;
    }
    
    // Try to parse the string to a number
    seconds = parseInt(seconds, 10);
    if (isNaN(seconds)) return '0:00';
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (minutes < 60) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
} 