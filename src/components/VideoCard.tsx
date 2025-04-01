import { useState } from "react";
import { cn } from "@/lib/utils";
import { LinkIcon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Video } from "@/data/videos";
import { Link } from "react-router-dom";
import { formatViewCount, formatTimeAgo } from "@/lib/formatters";

// Extended interface for our VideoCardProps
interface VideoCardProps {
  video: Video & { 
    isShort?: boolean;
    isVerified?: boolean;
    isLive?: boolean;
    isNewVideo?: boolean;
  };
  layout?: "grid" | "list";
  aspectRatio?: "portrait" | "video" | "square";
  className?: string;
}

// Fallback images for when thumbnails fail to load
const fallbackThumbnails = [
  "https://i.ytimg.com/vi/default/mqdefault.jpg",
  "https://via.placeholder.com/1200x720/333333/ffffff?text=Video+Not+Found",
  "https://via.placeholder.com/1200x720/111111/ffffff?text=No+Preview+Available"
];

const VideoCard = ({
  video,
  layout = "grid",
  aspectRatio = "video",
  className,
}: VideoCardProps) => {
  const { theme } = useTheme();
  const [thumbnailSrc, setThumbnailSrc] = useState(video.thumbnailUrl);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  
  // Use videoId for opening videos if available, otherwise fallback to id
  const videoLinkId = video.videoId || video.id;
  
  // Different path for shorts vs regular videos
  const videoPath = video.isShort ? `/shorts/${videoLinkId}` : `/video/${videoLinkId}`;

  // Extract video ID from YouTube URL if present
  const getVideoIdFromUrl = (url: string) => {
    // YouTube URLs can have various formats
    const regexPatterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/
    ];
    
    for (const pattern of regexPatterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  };

  // Handle thumbnail load error by trying fallbacks
  const handleThumbnailError = () => {
    // Try to extract video ID and use an alternative YouTube thumbnail format
    const videoId = getVideoIdFromUrl(video.thumbnailUrl) || video.videoId;
    
    if (videoId) {
      // Try different YouTube thumbnail formats
      const youtubeThumbnailFormats = [
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/default.jpg`
      ];
      
      // If we haven't tried all YouTube formats yet, try the next one
      const nextYoutubeFormat = fallbackIndex < youtubeThumbnailFormats.length 
        ? youtubeThumbnailFormats[fallbackIndex] 
        : null;
      
      if (nextYoutubeFormat) {
        setThumbnailSrc(nextYoutubeFormat);
        setFallbackIndex(fallbackIndex + 1);
        return;
      }
    }
    
    // If YouTube formats failed or weren't available, use generic fallbacks
    const genericFallbackIndex = fallbackIndex - (videoId ? 4 : 0);
    if (genericFallbackIndex < fallbackThumbnails.length) {
      setThumbnailSrc(fallbackThumbnails[genericFallbackIndex]);
      setFallbackIndex(fallbackIndex + 1);
    } else {
      // Final fallback to a colored box with the video title
      const titleInitials = video.title
        .split(' ')
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join('');
      
      const videoCategory = video.category || 'video';
      const placeholderUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(titleInitials)}&background=random&color=fff&size=150&bold=true&format=svg&text=${encodeURIComponent(videoCategory)}`;
      
      setThumbnailSrc(placeholderUrl);
      // Prevent further error handling
      setFallbackIndex(99);
    }
  };

  // Determine aspect ratio for shorts
  const finalAspectRatio = video.isShort ? "portrait" : aspectRatio;
  
  // Special class for shorts in grid layout
  const shortsGridClass = (video.isShort && layout === "grid")
    ? "xs:w-[160px] sm:w-[180px] md:w-[220px] mx-auto" 
    : "";

  return (
    <div
      className={cn(
        "group cursor-pointer",
        layout === "grid" ? "space-y-3" : "flex items-start space-x-3",
        video.isShort ? "shorts-video" : "",
        shortsGridClass,
        className
      )}
    >
      <Link 
        to={videoPath}
        className={cn(
          "block relative overflow-hidden rounded-xl",
          (layout === "grid" && video.isShort) ? "w-full max-w-[220px] mx-auto" : ""
        )}
      >
        {/* Thumbnail */}
        <div
          className={cn(
            "overflow-hidden rounded-xl bg-secondary relative",
            layout === "grid" ? "w-full" : "w-36 xs:w-40 sm:w-48",
            finalAspectRatio === "portrait"
              ? "aspect-[9/16]"
              : finalAspectRatio === "square"
              ? "aspect-square"
              : "aspect-video"
          )}
        >
          <img
            src={thumbnailSrc}
            alt={video.title}
            className={cn(
              "h-full w-full transition-all object-cover",
              theme === "dark" ? "brightness-90" : "brightness-100",
              "group-hover:scale-105 duration-300"
            )}
            onError={handleThumbnailError}
          />
          {/* Duration */}
          {video.duration && !video.isShort && (
            <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-[10px] font-medium text-white">
              {video.duration}
            </div>
          )}
          {/* SHORT label */}
          {video.isShort && (
            <div className="absolute bottom-1 left-1 rounded bg-red-600 px-1 py-0.5 text-[10px] font-bold text-white">
              SHORT
            </div>
          )}
        </div>
      </Link>

      {/* Video Info */}
      <div className={layout === "grid" ? "w-full" : "flex-1 min-w-0"}>
        <div className="flex gap-x-3">
          {/* Channel Image (only in grid layout) */}
          {layout === "grid" && !video.isShort && (
            <Link to={`/channel/${encodeURIComponent(video.channelName)}`}>
              <div className="h-9 w-9 flex-shrink-0">
                <img
                  src={video.channelImageUrl}
                  alt={video.channelName}
                  className="rounded-full object-cover h-full w-full"
                  onError={(e) => {
                    const channelInitial = video.channelName.charAt(0).toUpperCase();
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${channelInitial}&background=random&color=fff&size=36`;
                    (e.target as HTMLImageElement).onerror = null;
                  }}
                />
              </div>
            </Link>
          )}

          <div className={cn(
            "space-y-1 flex-1 min-w-0",
            video.isShort ? "text-center px-1" : ""
          )}>
            <Link to={videoPath}>
              <h3 className={cn(
                "font-medium text-xs sm:text-sm line-clamp-2", 
                video.isShort ? "text-center" : ""
              )}>
                {video.title}
              </h3>
            </Link>

            <Link to={`/channel/${encodeURIComponent(video.channelName)}`}>
              <p className="line-clamp-1 text-xs text-muted-foreground flex items-center gap-1 truncate">
                {!video.isShort && video.channelName}
                {video.isShort && (
                  <span className="w-full text-center">@{video.channelName.replace(/\s/g, '')}</span>
                )}
                {video.isVerified && (
                  <span className="text-blue-500 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </p>
            </Link>

            <p className={cn(
              "line-clamp-1 text-xs text-muted-foreground",
              video.isShort ? "text-center" : ""
            )}>
              {formatViewCount(video.views)} views • {formatTimeAgo(video.timestamp)}
            </p>

            {video.isLive && (
              <span className="inline-flex items-center rounded-full border border-red-600 px-2 py-0.5 text-xs font-semibold text-red-600 mt-1">
                LIVE
              </span>
            )}

            {video.isNewVideo && !video.isLive && !video.isShort && (
              <span className="inline-flex items-center rounded-full border border-blue-600 px-2 py-0.5 text-xs font-semibold text-blue-600 mt-1">
                NEW
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
