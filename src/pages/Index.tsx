import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoGrid from '@/components/VideoGrid';
import { videos, subscribedChannels } from '@/data/videos';
import { longVideos } from '@/data/longVideos';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IndexProps {
  category?: string;
}

const Index: React.FC<IndexProps> = ({ category }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState(longVideos);
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
    'Programming': 'coding',
    'Education': 'learning',
    'Design': 'design',
    'News': 'news',
    'Sports': 'sports',
    'Entertainment': 'entertainment',
    'Science': 'science',
    'Technology': 'tech',
    'Cooking': 'cooking',
    'Travel': 'travel',
    'Fitness': 'fitness',
    'Photography': 'photography'
  };

  useEffect(() => {
    // Determine the proper category from either props or URL params
    const urlCategory = params.category || category || location.pathname.slice(1);
    
    if (urlCategory === 'subscriptions') {
      // Filter for subscribed channels
      const subscribedVideos = longVideos.filter(video => 
        subscribedChannels.some(channel => channel.name === video.channelName)
      );
      setFilteredVideos(subscribedVideos);
      setPageTitle('Subscriptions');
      setActiveChip('All');
    } else if (urlCategory === 'explore') {
      // For explore page, show a mix of trending videos from different categories
      const exploreVideos = longVideos
        .sort(() => 0.5 - Math.random()) // Randomize for variety
        .slice(0, 24); // Limit to 24 videos
      setFilteredVideos(exploreVideos);
      setPageTitle('Explore');
      setActiveChip('All');
    } else if (urlCategory && urlCategory !== 'channel' && urlCategory !== '/') {
      // Map from URL category to actual category in videos
      const categoryName = Object.entries(categoryMap)
        .find(([_, value]) => value === urlCategory)?.[0] || 
        Object.keys(categoryMap).find(key => key.toLowerCase() === urlCategory.toLowerCase()) || 
        urlCategory;
      
      // If category is "learning", use "Education" for video filtering
      const categoryForFilter = urlCategory === 'learning' ? 'education' : urlCategory;
      
      // Filter by specific category
      const categoryVideos = longVideos.filter(video => {
        if (!video.category) return false;
        
        // Check if video category matches the selected category (case insensitive)
        return video.category.toLowerCase() === categoryForFilter.toLowerCase() ||
               video.category.toLowerCase() === categoryName.toLowerCase();
      });
      
      setFilteredVideos(categoryVideos.length > 0 ? categoryVideos : longVideos.slice(0, 8));
      setPageTitle(categoryName.charAt(0).toUpperCase() + categoryName.slice(1));
      
      // Set active chip based on category
      const matchingChip = Object.entries(categoryMap)
        .find(([_, value]) => value.toLowerCase() === urlCategory.toLowerCase())?.[0] ||
        Object.keys(categoryMap).find(key => key.toLowerCase() === urlCategory.toLowerCase());
      
      if (matchingChip) {
        setActiveChip(matchingChip);
      } else {
        setActiveChip('All');
      }
    } else {
      // Default to showing all videos
      setFilteredVideos(longVideos);
      setPageTitle('Home');
      setActiveChip('All');
    }
  }, [category, params, location.pathname]);

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
                {category === 'subscriptions' 
                  ? "Subscribe to channels to see videos here"
                  : "Try selecting a different category"}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
