import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoGrid from '@/components/VideoGrid';
import { videos, subscribedChannels } from '@/data/videos';
import { longVideos } from '@/data/longVideos';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Reverse mapping from URL path to category display name
  const reverseCategories: Record<string, string> = Object.entries(categoryMap).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [value.toLowerCase()]: key
    }),
    {}
  );

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    try {
      // Extract category from URL path
      let urlCategory = params.category || category || '';
      
      // If we're at root path, it should be 'All'
      if (location.pathname === '/') {
        urlCategory = '';
      }
      
      // Basic route handling for special paths
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
        // Get the display name from our mapping
        const displayName = reverseCategories[urlCategory.toLowerCase()] || 
                      urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1);
        
        // Try multiple ways to match categories:
        // 1. Direct match with URL category
        // 2. Match with display name
        // 3. Case insensitive match
        const categoryVideos = longVideos.filter(video => {
          if (!video.category) return false;
          
          const videoCategory = video.category.toLowerCase();
          return videoCategory === urlCategory.toLowerCase() ||
                 videoCategory === displayName.toLowerCase();
        });
        
        if (categoryVideos.length > 0) {
          setFilteredVideos(categoryVideos);
        } else {
          setFilteredVideos([]);
          console.warn(`No videos found for category: ${urlCategory}`);
        }
        
        // Set the page title
        setPageTitle(displayName);
        
        // Set active chip based on category
        const matchingChip = Object.keys(categoryMap).find(
          key => key.toLowerCase() === displayName.toLowerCase() || 
                 categoryMap[key].toLowerCase() === urlCategory.toLowerCase()
        );
        
        setActiveChip(matchingChip || 'All');
      } else {
        // Default to showing all videos
        setFilteredVideos(longVideos);
        setPageTitle('Home');
        setActiveChip('All');
      }
    } catch (err) {
      console.error('Error filtering videos:', err);
      setError('Something went wrong. Please try again.');
      setFilteredVideos([]);
      toast.error('Error loading videos');
    } finally {
      setLoading(false);
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
          sidebarOpen ? 'ml-60' : 'ml-[72px]',
          'md:ml-[72px] lg:ml-[72px]',
          sidebarOpen && 'md:ml-60 lg:ml-60'
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
          
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading videos...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <h2 className="text-xl font-medium mb-2 text-red-500">{error}</h2>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          ) : filteredVideos.length > 0 ? (
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
