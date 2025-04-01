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
          />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
            {video.duration}
          </div>
        </div>
        <div className="flex mt-2">
          <div className="flex-shrink-0 mr-3">
            <img 
              src={video.channelImageUrl} 
              alt={video.channelName} 
              className="w-9 h-9 rounded-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-base font-medium line-clamp-2 text-left text-foreground">
              {video.title}
            </h3>
            <div className="flex flex-col text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {video.channelName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {video.views} • {video.timestamp}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
