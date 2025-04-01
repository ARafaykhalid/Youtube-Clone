import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoGrid from '@/components/VideoGrid';
import { videos } from '@/data/videos';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LibraryProps {
  tab?: string;
}

const Library: React.FC<LibraryProps> = ({ tab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('history');
  
  useEffect(() => {
    // Determine the active tab from props, URL params, or default to history
    const queryTab = searchParams.get('tab');
    
    if (tab === 'your-videos') {
      setActiveTab('your-videos');
    } else if (queryTab === 'liked') {
      setActiveTab('liked');
    } else if (queryTab === 'saved') {
      setActiveTab('saved');
    } else if (queryTab === 'history') {
      setActiveTab('history');
    }
  }, [tab, searchParams]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Simulate watched videos for history tab
  const watchedVideos = videos.slice(0, 4);
  // Simulate liked videos
  const likedVideos = [videos[1], videos[3], videos[5]];
  // Simulate your videos
  const yourVideos = videos.slice(2, 5);

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
          <h1 className="text-2xl font-bold mb-6">Library</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="liked">Liked Videos</TabsTrigger>
              <TabsTrigger value="saved">Watch Later</TabsTrigger>
              <TabsTrigger value="your-videos">Your Videos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history">
              <h2 className="text-lg font-medium mb-4">Watch History</h2>
              <VideoGrid videos={watchedVideos} />
            </TabsContent>
            
            <TabsContent value="liked">
              <h2 className="text-lg font-medium mb-4">Liked Videos</h2>
              <VideoGrid videos={likedVideos} />
            </TabsContent>
            
            <TabsContent value="saved">
              <h2 className="text-lg font-medium mb-4">Watch Later</h2>
              {videos.length > 0 ? (
                <VideoGrid videos={videos.slice(3, 6)} />
              ) : (
                <p className="text-muted-foreground">Videos you save will appear here.</p>
              )}
            </TabsContent>
            
            <TabsContent value="your-videos">
              <h2 className="text-lg font-medium mb-4">Your Videos</h2>
              <VideoGrid videos={yourVideos} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Library;
