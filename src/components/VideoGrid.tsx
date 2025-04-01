import React from 'react';
import VideoCard from './VideoCard';
import { Video } from '@/data/videos';

interface VideoGridProps {
  videos: Video[];
  title?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, title }) => {
  if (videos.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No videos to display</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-left text-foreground">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
