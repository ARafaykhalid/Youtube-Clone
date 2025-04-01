
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '@/data/videos';

interface RelatedVideosProps {
  videos: Video[];
}

const RelatedVideos: React.FC<RelatedVideosProps> = ({ videos }) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-lg mb-2">Related Videos</h3>
      {videos.map((video) => (
        <RelatedVideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

interface RelatedVideoCardProps {
  video: Video;
}

const RelatedVideoCard: React.FC<RelatedVideoCardProps> = ({ video }) => {
  return (
    <Link to={`/watch/${video.id}`} className="flex group">
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-40 md:w-48">
        <div className="aspect-video rounded-lg overflow-hidden">
          <img 
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
            {video.duration}
          </div>
        </div>
      </div>
      
      {/* Video Info */}
      <div className="ml-2 flex-grow">
        <h4 className="text-sm font-medium line-clamp-2 text-left">
          {video.title}
        </h4>
        <p className="text-xs text-gray-600 mt-1 text-left">
          {video.channelName}
        </p>
        <p className="text-xs text-gray-600 text-left">
          {video.views} • {video.timestamp}
        </p>
      </div>
    </Link>
  );
};

export default RelatedVideos;
