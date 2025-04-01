import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Video } from '@/data/longVideos';

interface VideoCardProps {
  video: Video;
  className?: string;
  aspectRatio?: 'square' | 'video';
  width?: 'full' | 'auto';
}

const VideoCard = ({ 
  video, 
  className, 
  aspectRatio = 'video',
  width = 'full'
}: VideoCardProps) => {
  const urlParams = new URLSearchParams(window.location.search);
  const layout = urlParams.get('layout') || 'grid';
  
  return (
    <div className={cn(
      "group flex flex-col overflow-hidden", 
      layout === 'list' ? "flex-row gap-4" : "", 
      width === 'full' ? "w-full" : "w-auto",
      className
    )}>
      <Link 
        to={`/watch/${video.id}`}
        className={cn(
          "overflow-hidden rounded-xl bg-muted",
          layout === 'list' ? "w-64" : "",
          aspectRatio === 'square' ? "aspect-square" : "aspect-video"
        )}
      >
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className={cn(
            "h-full w-full object-cover transition-all hover:scale-105",
            aspectRatio === 'square' ? "aspect-square" : "aspect-video"
          )}
          onError={(e) => {
            // Set a placeholder image if the thumbnail fails to load
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/480x270?text=Video+Thumbnail';
            // Prevent infinite error loop
            (e.target as HTMLImageElement).onerror = null;
          }}
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
      </Link>
      <div className="flex gap-3 pt-3">
        <div className="flex-shrink-0">
          <Link to={`/channel/${encodeURIComponent(video.channelName)}`}>
            <img 
              src={video.channelImageUrl} 
              alt={video.channelName} 
              className="h-9 w-9 rounded-full object-cover"
              onError={(e) => {
                // Generate a colored avatar with the channel initial
                const initial = video.channelName.charAt(0).toUpperCase();
                const colors = ["4285F4", "DB4437", "F4B400", "0F9D58"];
                const colorIndex = video.channelName.length % colors.length;
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${initial}&background=${colors[colorIndex]}&color=fff&size=36`;
                // Prevent infinite error loop
                (e.target as HTMLImageElement).onerror = null;
              }}
            />
          </Link>
        </div>
        <div className="flex-1 space-y-1 text-sm">
          <h3 className="font-medium leading-tight line-clamp-2 text-left">{video.title}</h3>
          <div className="flex flex-col text-xs text-muted-foreground text-left">
            <Link 
              to={`/channel/${encodeURIComponent(video.channelName)}`}
              className="hover:text-primary"
            >
              {video.channelName}
            </Link>
            <div className="flex flex-wrap gap-x-1">
              <span>{video.views}</span>
              <span>•</span>
              <span>{video.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
