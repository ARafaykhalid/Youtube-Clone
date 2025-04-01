/**
 * Formats view count to a readable format
 * @param views View count as string (e.g. "1.2M views")
 * @returns Formatted view count (e.g. "1.2M")
 */
export function formatViewCount(views: string): string {
  // If views is already formatted (e.g. "1.2M views"), just return the number part
  if (views.includes('views')) {
    return views.replace('views', '').trim();
  }
  
  // Try to parse the number
  const num = parseInt(views.replace(/[^\d]/g, ''));
  
  if (isNaN(num)) {
    return views; // Return original if parsing fails
  }
  
  // Format the number
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  } else {
    return num.toString();
  }
}

/**
 * Formats timestamp (e.g. "2 weeks ago") to a more consistent format
 * @param timestamp Timestamp string
 * @returns Formatted timestamp
 */
export function formatTimeAgo(timestamp: string): string {
  // If timestamp already has "ago" in it, return it as is
  if (timestamp.includes('ago')) {
    return timestamp;
  }
  
  // Handle common timestamp formats
  if (timestamp.includes('hour')) {
    return timestamp;
  } else if (timestamp.includes('day')) {
    return timestamp;
  } else if (timestamp.includes('week')) {
    return timestamp;
  } else if (timestamp.includes('month')) {
    return timestamp;
  } else if (timestamp.includes('year')) {
    return timestamp;
  }
  
  // For simple numeric values, assume it's days
  if (/^\d+$/.test(timestamp)) {
    const days = parseInt(timestamp);
    if (days === 1) {
      return '1 day ago';
    } else {
      return `${days} days ago`;
    }
  }
  
  // Return original if we can't parse it
  return timestamp;
} 