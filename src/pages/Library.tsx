import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoGrid from '@/components/VideoGrid';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MoreVertical, Clock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { longVideos } from '@/data/longVideos';
import { saveLikedVideo } from '@/data/videos';
import { toast } from 'sonner';

interface LibraryProps {
  tab?: string;
}

const Library: React.FC<LibraryProps> = ({ tab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('history');
  const [savedVideos, setSavedVideos] = useState(longVideos.slice(0, 0));
  const [likedVideos, setLikedVideos] = useState(longVideos.slice(0, 0));
  const [loading, setLoading] = useState({
    saved: true,
    liked: true,
    history: true
  });
  
  // Fetch saved videos
  const fetchSavedVideos = () => {
    setLoading(prev => ({ ...prev, saved: true }));
    try {
      const savedData = localStorage.getItem('youtube-clone-saved-videos');
      if (savedData) {
        const ids = JSON.parse(savedData) as string[];
        if (ids.length > 0) {
          const videosToShow = longVideos.filter(v => ids.includes(v.id));
          setSavedVideos(videosToShow);
        } else {
          setSavedVideos([]);
        }
      } else {
        setSavedVideos([]);
      }
    } catch (e) {
      console.error('Failed to parse saved videos', e);
      toast.error('Failed to load saved videos');
      setSavedVideos([]);
    } finally {
      setLoading(prev => ({ ...prev, saved: false }));
    }
  };
  
  // Fetch liked videos
  const fetchLikedVideos = () => {
    setLoading(prev => ({ ...prev, liked: true }));
    try {
      const likedData = localStorage.getItem('youtube-clone-liked-videos');
      if (likedData) {
        const ids = JSON.parse(likedData) as string[];
        if (ids.length > 0) {
          const videosToShow = longVideos.filter(v => ids.includes(v.id));
          setLikedVideos(videosToShow);
        } else {
          setLikedVideos([]);
        }
      } else {
        setLikedVideos([]);
      }
    } catch (e) {
      console.error('Failed to parse liked videos', e);
      toast.error('Failed to load liked videos');
      setLikedVideos([]);
    } finally {
      setLoading(prev => ({ ...prev, liked: false }));
    }
  };
  
  // Load data based on active tab
  useEffect(() => {
    fetchSavedVideos();
    fetchLikedVideos();
    
    // Set loading state for history to false after a delay to simulate loading
    setTimeout(() => {
      setLoading(prev => ({ ...prev, history: false }));
    }, 500);
  }, []);
  
  // Handle tab change from URL parameters
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

  // Remove a video from Watch Later
  const removeFromWatchLater = (videoId: string) => {
    try {
      const savedData = localStorage.getItem('youtube-clone-saved-videos') || '[]';
      const ids = JSON.parse(savedData) as string[];
      const updatedIds = ids.filter(id => id !== videoId);
      localStorage.setItem('youtube-clone-saved-videos', JSON.stringify(updatedIds));
      setSavedVideos(prev => prev.filter(v => v.id !== videoId));
      toast.success('Removed from Watch Later');
    } catch (e) {
      console.error('Failed to remove video from Watch Later', e);
      toast.error('Failed to remove video');
    }
  };
  
  // Remove a video from Liked Videos
  const removeFromLiked = (videoId: string) => {
    try {
      saveLikedVideo(videoId, false);
      setLikedVideos(prev => prev.filter(v => v.id !== videoId));
      toast.success('Removed from Liked Videos');
    } catch (e) {
      console.error('Failed to remove video from Liked Videos', e);
      toast.error('Failed to remove video');
    }
  };

  // Simulate watched videos for history tab - replace with actual history when available
  const watchedVideos = longVideos.slice(0, 4);
  
  // Get user videos from user data
  const getUserVideos = () => {
    try {
      // Try to get user specific videos from localStorage if they exist
      const userData = localStorage.getItem('youtube-clone-user-data');
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData.userVideos && Array.isArray(parsedData.userVideos) && parsedData.userVideos.length > 0) {
          return parsedData.userVideos;
        }
      }
      // Return empty array if no videos found
      return [];
    } catch (e) {
      console.error('Failed to get user videos', e);
      return [];
    }
  };
  
  // Actual user videos
  const userVideos = getUserVideos();

  // Loading component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
      <p className="text-muted-foreground">Loading videos...</p>
    </div>
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
              {loading.history ? <LoadingState /> : <VideoGrid videos={watchedVideos} />}
            </TabsContent>
            
            <TabsContent value="liked">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Liked Videos</h2>
                {likedVideos.length > 0 && (
                  <Button variant="outline" size="sm" onClick={() => {
                    localStorage.removeItem('youtube-clone-liked-videos');
                    setLikedVideos([]);
                    toast.success('All liked videos removed');
                  }}>
                    Clear All
                  </Button>
                )}
              </div>
              
              {loading.liked ? (
                <LoadingState />
              ) : likedVideos.length > 0 ? (
                <VideoGrid videos={likedVideos} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Videos you like will appear here</p>
                  <Button asChild className="mt-2">
                    <Link to="/">Browse videos</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Watch Later</h2>
                {savedVideos.length > 0 && (
                  <Button variant="outline" size="sm" onClick={() => {
                    localStorage.removeItem('youtube-clone-saved-videos');
                    setSavedVideos([]);
                    toast.success('Watch Later list cleared');
                  }}>
                    Clear All
                  </Button>
                )}
              </div>
              
              {loading.saved ? (
                <LoadingState />
              ) : savedVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedVideos.map((video) => (
                    <div key={video.id} className="flex flex-col group">
                      <Link to={`/watch/${video.id}`} className="relative">
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                          <img 
                            src={video.thumbnailUrl} 
                            alt={video.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/480x270?text=Video+Thumbnail';
                            }}
                          />
                          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                            {video.duration}
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="h-7 w-7 rounded-full bg-red-600"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeFromWatchLater(video.id);
                              }}
                            >
                              <Clock className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </Link>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 pt-1">
                          <Link to={`/channel/${encodeURIComponent(video.channelName)}`}>
                            <img 
                              src={video.channelImageUrl} 
                              alt={video.channelName} 
                              className="w-9 h-9 rounded-full object-cover"
                              onError={(e) => {
                                const initial = video.channelName.charAt(0).toUpperCase();
                                const colors = ["4285F4", "DB4437", "F4B400", "0F9D58"];
                                const colorIndex = video.channelName.length % colors.length;
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${initial}&background=${colors[colorIndex]}&color=fff&size=36`;
                              }}
                            />
                          </Link>
                        </div>
                        <div className="flex-1">
                          <Link to={`/watch/${video.id}`}>
                            <h3 className="text-sm font-medium line-clamp-2 text-left">{video.title}</h3>
                          </Link>
                          <div className="flex flex-col text-xs text-gray-600 dark:text-gray-400 text-left">
                            <Link to={`/channel/${encodeURIComponent(video.channelName)}`} className="hover:text-black dark:hover:text-white">
                              {video.channelName}
                            </Link>
                            <span>{video.views} • {video.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Videos you save will appear here</p>
                  <Button asChild className="mt-2">
                    <Link to="/">Browse videos</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="your-videos" className="pb-8">
              <div className="flex flex-col mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Your Videos</h2>
                  <div className="flex gap-2">
                    <Link to="/channel/edit">
                      <Button variant="outline" size="sm">
                        Edit Channel
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
                
                {loading.saved ? (
                  <LoadingState />
                ) : userVideos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {userVideos.map((video) => (
                      <div key={video.id} className="flex flex-col">
                        <Link to={`/watch/${video.id}`} className="group">
                          <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                            <img 
                              src={video.thumbnailUrl} 
                              alt={video.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/480x270?text=Video+Thumbnail';
                              }}
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
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
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
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      You haven't uploaded any videos yet
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm max-w-md text-center mb-4">
                      Your uploaded videos will appear here. Start creating content by uploading your first video.
                    </p>
                    <Button 
                      variant="default" 
                      className="mt-2"
                      onClick={() => {
                        toast.info('Video upload functionality coming soon!');
                      }}
                    >
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
