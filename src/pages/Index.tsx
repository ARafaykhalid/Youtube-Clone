import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoGrid from '@/components/VideoGrid';
import { videos, Video } from '@/data/videos';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IndexProps {
  category?: string;
}

const Index: React.FC<IndexProps> = ({ category }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(videos);
  const [pageTitle, setPageTitle] = useState('Home');
  const [activeChip, setActiveChip] = useState('All');

  // Available category chips
  const categoryChips = [
    'All',
    'Music',
    'Gaming',
    'Programming',
    'Education',
    'Design',
    'News',
    'Sports',
    'Entertainment',
    'Science',
    'Technology',
    'Cooking',
    'Travel',
    'Fitness',
    'Photography'
  ];

  const categoryMap: Record<string, string> = {
    'All': '',
    'Music': 'music',
    'Gaming': 'gaming',
    'Programming': 'education',
    'Education': 'education',
    'Design': 'design',
    'News': 'news',
    'Sports': 'sports',
    'Entertainment': 'movie',
    'Science': 'science',
    'Technology': 'education',
    'Cooking': 'education',
    'Travel': 'entertainment',
    'Fitness': 'sports',
    'Photography': 'design'
  };

  useEffect(() => {
    // Determine the proper category from either props or URL params
    const urlCategory = params.category || category;
    
    if (urlCategory === 'channel') {
      // Handle channel specific content
      const channelName = params.channelName || '';
      const channelVideos = videos.filter(video => 
        video.channelName === decodeURIComponent(channelName)
      );
      setFilteredVideos(channelVideos);
      setPageTitle(`${decodeURIComponent(channelName)}'s Videos`);
    } else if (urlCategory) {
      // Filter by specific category
      const categoryVideos = videos.filter(video => 
        video.category?.toLowerCase() === urlCategory.toLowerCase()
      );
      setFilteredVideos(categoryVideos);
      setPageTitle(urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1));
      
      // Set active chip based on category
      const chipEntries = Object.entries(categoryMap);
      const matchingChip = chipEntries.find(([_, value]) => value.toLowerCase() === urlCategory.toLowerCase());
      if (matchingChip) {
        setActiveChip(matchingChip[0]);
      }
    } else {
      // Default to showing all videos
      setFilteredVideos(videos);
      setPageTitle('Home');
      setActiveChip('All');
    }
  }, [category, params]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCategoryClick = (chip: string) => {
    setActiveChip(chip);
    const categoryValue = categoryMap[chip];
    
    if (chip === 'All') {
      // Navigate to home
      navigate('/');
    } else if (categoryValue) {
      // Navigate to the specific category
      navigate(`/${categoryValue.toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <main 
        className={cn(
          'pt-16 pb-12 transition-all duration-300',
          sidebarOpen ? 'ml-60' : 'ml-[72px]'
        )}
      >
        {category !== 'channel' && (
          <div className="overflow-x-auto px-4 py-3 border-b sticky top-14 bg-background z-10">
            <div className="flex gap-3 min-w-max">
              {categoryChips.map((chip) => (
                <Button
                  key={chip}
                  variant={activeChip === chip ? 'default' : 'outline'}
                  size="sm"
                  className={cn(
                    'rounded-full',
                    activeChip === chip 
                      ? 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                  onClick={() => handleCategoryClick(chip)}
                >
                  {chip}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="px-4 py-6">
          {pageTitle !== 'Home' && (
            <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>
          )}
          
          {filteredVideos.length > 0 ? (
            <VideoGrid videos={filteredVideos} />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <h2 className="text-xl font-medium mb-2">No videos found</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
