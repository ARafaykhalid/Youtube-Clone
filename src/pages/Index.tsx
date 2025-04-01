import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoGrid from '@/components/VideoGrid';
import { videos } from '@/data/videos';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IndexProps {
  category?: string;
}

const Index: React.FC<IndexProps> = ({ category }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { channelName } = useParams<{ channelName: string }>();
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [pageTitle, setPageTitle] = useState('Home');
  
  useEffect(() => {
    // Filter videos based on category
    if (category === 'explore') {
      setFilteredVideos(videos);
      setPageTitle('Explore');
    } else if (category === 'subscriptions') {
      setFilteredVideos(videos.slice(0, 6));
      setPageTitle('Subscriptions');
    } else if (category === 'movies') {
      setFilteredVideos(videos.filter(v => v.category === 'movie' || v.category === 'entertainment'));
      setPageTitle('Movies & TV');
    } else if (category === 'gaming') {
      setFilteredVideos(videos.filter(v => v.category === 'gaming'));
      setPageTitle('Gaming');
    } else if (category === 'music') {
      setFilteredVideos(videos.filter(v => v.category === 'music'));
      setPageTitle('Music');
    } else if (category === 'news') {
      setFilteredVideos(videos.filter(v => v.category === 'news'));
      setPageTitle('News');
    } else if (category === 'sports') {
      setFilteredVideos(videos.filter(v => v.category === 'sports'));
      setPageTitle('Sports');
    } else if (category === 'learning') {
      setFilteredVideos(videos.filter(v => v.category === 'education' || v.category === 'science'));
      setPageTitle('Learning');
    } else if (category === 'channel' && channelName) {
      // If we're on a channel page
      setFilteredVideos(videos.slice(0, 8)); // Just simulate channel videos
      setPageTitle(channelName);
    } else {
      // Default home page
      setFilteredVideos(videos);
      setPageTitle('Home');
    }
  }, [category, channelName]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      {/* Main Content */}
      <main 
        className={cn(
          "pt-20 pb-12 transition-all duration-300",
          sidebarOpen ? "ml-60" : "ml-[72px]"
        )}
      >
        {category === 'channel' && channelName ? (
          <>
            {/* Channel Header */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6">
              <div className="flex items-center">
                <img 
                  src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`} 
                  alt={channelName} 
                  className="w-20 h-20 rounded-full mr-6"
                />
                <div>
                  <h1 className="text-2xl font-bold">{channelName}</h1>
                  <p className="text-gray-600 dark:text-gray-400">1.2M subscribers</p>
                </div>
                <Button className="ml-auto rounded-full bg-black text-white dark:bg-white dark:text-black">
                  Subscribe
                </Button>
              </div>
            </div>
            
            {/* Channel Videos */}
            <div className="px-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Uploads</h2>
              <VideoGrid videos={filteredVideos} />
            </div>
          </>
        ) : (
          <>
            {/* Category Pills - Only show on Home and Explore */}
            {(category === undefined || category === 'explore') && (
              <div className="px-4 mb-6 overflow-x-auto flex gap-2 pb-2">
                <Button variant="secondary" className="rounded-full text-sm font-medium whitespace-nowrap bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                  All
                </Button>
                <Button variant="outline" className="rounded-full text-sm font-medium whitespace-nowrap">
                  Music
                </Button>
                <Button variant="outline" className="rounded-full text-sm font-medium whitespace-nowrap">
                  Gaming
                </Button>
                <Button variant="outline" className="rounded-full text-sm font-medium whitespace-nowrap">
                  Web Development
                </Button>
                <Button variant="outline" className="rounded-full text-sm font-medium whitespace-nowrap">
                  JavaScript
                </Button>
                <Button variant="outline" className="rounded-full text-sm font-medium whitespace-nowrap">
                  React
                </Button>
                <Button variant="outline" className="rounded-full text-sm font-medium whitespace-nowrap">
                  Computer Science
                </Button>
                <Button variant="outline" className="rounded-full text-sm font-medium whitespace-nowrap">
                  UI Design
                </Button>
                <Button variant="outline" className="rounded-full text-sm font-medium whitespace-nowrap">
                  Algorithms
                </Button>
              </div>
            )}
            
            {/* Videos Grid */}
            <div className="px-4">
              <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>
              <VideoGrid videos={filteredVideos} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
