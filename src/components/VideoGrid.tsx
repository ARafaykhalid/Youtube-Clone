import React from 'react';
import VideoCard from './VideoCard';
import { Video } from '@/data/videos';

interface VideoGridProps {
  videos: Video[];
  title?: string;
  loading?: boolean;
  error?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, title, loading, error }) => {
  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
