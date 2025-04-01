import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '@/data/videos';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="flex flex-col">
      <Link to={`/watch/${video.id}`} className="group">
        <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/480x270?text=Video+Unavailable';
            }}
          />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
            {video.duration}
          </div>
        </div>
      </Link>
      <div className="flex mt-2">
        <div className="flex-shrink-0 mr-3">
          <Link 
            to={`/channel/${encodeURIComponent(video.channelName)}`}
            onClick={(e) => e.stopPropagation()}
            className="block"
          >
            <img 
              src={video.channelImageUrl} 
              alt={video.channelName} 
              className="w-9 h-9 rounded-full channel-avatar object-cover hover:opacity-90 transition-opacity"
              onError={(e) => {
                const initial = video.channelName.charAt(0).toUpperCase();
                const colors = ["4285F4", "DB4437", "F4B400", "0F9D58", "4285F4", "DB4437"];
                const colorIndex = video.channelName.length % colors.length;
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${initial}&background=${colors[colorIndex]}&color=fff&size=36`;
                (e.target as HTMLImageElement).onerror = null;
              }}
            />
          </Link>
        </div>
        <div className="flex-grow">
          <Link to={`/watch/${video.id}`}>
            <h3 className="text-base font-medium line-clamp-2 text-left text-gray-900 dark:text-white">
              {video.title}
            </h3>
          </Link>
          <div className="flex flex-col text-left">
            <Link 
              to={`/channel/${encodeURIComponent(video.channelName)}`}
              className="text-sm text-gray-600 dark:text-gray-400 mt-1 hover:text-gray-900 dark:hover:text-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {video.channelName}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {video.views} • {video.timestamp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
