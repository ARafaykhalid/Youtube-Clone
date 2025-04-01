import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '@/data/videos';

interface RelatedVideosProps {
  videos: Video[];
}

const RelatedVideos: React.FC<RelatedVideosProps> = ({ videos }) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-lg mb-4">Related videos</h3>
      {videos.slice(0, 10).map((video) => (
        <div key={video.id} className="flex gap-2">
          {/* Thumbnail */}
          <Link to={`/watch/${video.id}`} className="flex-shrink-0 w-40 h-24 relative">
            <img 
              src={video.thumbnailUrl} 
              alt={video.title} 
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/160x90?text=Video+Unavailable';
              }}
            />
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
              {video.duration}
            </div>
          </Link>
          
          {/* Video info */}
          <div className="flex flex-col flex-1 text-left">
            <Link to={`/watch/${video.id}`} className="text-sm font-medium line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400">
              {video.title}
            </Link>
            <Link 
              to={`/channel/${encodeURIComponent(video.channelName)}`} 
              className="text-xs text-gray-600 dark:text-gray-400 mt-1 hover:text-gray-900 dark:hover:text-gray-200"
            >
              {video.channelName}
            </Link>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {video.views} • {video.timestamp}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedVideos;
