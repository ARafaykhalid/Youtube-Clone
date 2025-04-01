import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoGrid from '@/components/VideoGrid';
import { videos } from '@/data/videos';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';

interface LibraryProps {
  tab?: string;
}

const Library: React.FC<LibraryProps> = ({ tab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('history');
  const [savedVideos, setSavedVideos] = useState(videos.slice(3, 6));
  
  useEffect(() => {
    // Retrieve saved videos from localStorage if available
    const savedData = localStorage.getItem('youtube-clone-saved-videos');
    if (savedData) {
      try {
        const ids = JSON.parse(savedData) as string[];
        const videosToShow = videos.filter(v => ids.includes(v.id));
        if (videosToShow.length > 0) {
          setSavedVideos(videosToShow);
        }
      } catch (e) {
        console.error('Failed to parse saved videos', e);
      }
    }
  }, []);
  
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
              {savedVideos.length > 0 ? (
                <VideoGrid videos={savedVideos} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Videos you save will appear here</p>
                  <Button asChild className="mt-2">
                    <a href="/">Browse videos</a>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="your-videos" className="pb-8">
              <div className="flex flex-col mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Your Videos</h2>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                
                {videos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {videos.slice(0, 6).map((video) => (
                      <div key={video.id} className="flex flex-col">
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
                        </Link>
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <Link to={`/watch/${video.id}`}>
                              <h3 className="text-sm font-medium line-clamp-2 text-left">{video.title}</h3>
                            </Link>
                            <div className="flex flex-col text-left">
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {video.views} • {video.timestamp}
                              </p>
                              <div className="flex items-center mt-1 text-xs text-gray-600 dark:text-gray-400">
                                <span className={`w-2 h-2 rounded-full ${video.category === 'public' ? 'bg-green-500' : 'bg-gray-500'} mr-1`}></span>
                                Public
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">
                      No videos uploaded yet.
                    </p>
                    <Button variant="default" className="mt-4">
                      Upload a video
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Library;
