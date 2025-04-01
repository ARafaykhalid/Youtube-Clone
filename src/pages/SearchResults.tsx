
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoGrid from '@/components/VideoGrid';
import { videos } from '@/data/videos';
import { cn } from '@/lib/utils';

const SearchResults = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filter videos based on search query
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(query.toLowerCase()) || 
    video.channelName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <main 
        className={cn(
          "pt-20 pb-12 transition-all duration-300",
          sidebarOpen ? "ml-60" : "ml-[72px]"
        )}
      >
        <div className="px-6">
          <h1 className="text-2xl font-bold mb-6">
            Search results for: <span className="text-youtube-red">{query}</span>
          </h1>
          
          {filteredVideos.length > 0 ? (
            <VideoGrid videos={filteredVideos} />
          ) : (
            <p className="text-center py-10">No videos found matching "{query}"</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
