import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { cn } from '@/lib/utils';
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/use-theme';

// Real YouTube Shorts IDs that are confirmed working
const SHORTS_VIDEO_IDS = [
  'YMWUi1GRC3E', // YouTube Shorts from official channels  
  'jWe-B-8TX2I',
  '8TXxZi5f_dA',
  '3-Xq_Zz3nPA', 
  'Gu6z6kIukgg',
  'Ydr5iXIXGAQ',
  'ohtiLmhGJJs',
  'u9Mv98Gr5pY',
  '_sYFY6AsMh4'
];

interface ShortVideo {
  id: string;
  videoId: string;
  title: string;
  channelName: string;
  channelImageUrl: string;
  likes: number;
}

const Shorts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [disliked, setDisliked] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // Create shorts data with real YouTube IDs
  const shorts: ShortVideo[] = SHORTS_VIDEO_IDS.map((videoId, index) => ({
    id: `short-${index}`,
    videoId,
    title: [
      "Amazing trick you need to see! #shorts",
      "You won't believe what happens next #viral",
      "This cooking hack will save you time #cooking",
      "New dance trend everyone's trying #dance",
      "Life hack that actually works #lifehack",
      "The most satisfying video you'll see today #satisfying",
      "How to make this in under a minute #diy",
      "This pet is adorable! #cute #animals",
      "Mind-blowing magic trick revealed #magic"
    ][index % 9],
    channelName: [
      "Fun Shorts",
      "Trending Now",
      "Quick Tips",
      "Dance Masters",
      "Life Hacks",
      "Satisfying Clips",
      "DIY Masters",
      "Animal Kingdom",
      "Magic Revealed"
    ][index % 9],
    channelImageUrl: `https://i.pravatar.cc/150?img=${30 + index}`,
    likes: Math.floor(Math.random() * 50000) + 5000
  }));
  
  const currentShort = shorts[currentShortIndex];
  
  useEffect(() => {
    // Auto close sidebar for better shorts viewing experience
    setSidebarOpen(false);
    
    // Set body background to black in shorts mode
    document.body.classList.add('shorts-mode');
    
    return () => {
      document.body.classList.remove('shorts-mode');
    };
  }, []);

  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'k') {
        handlePreviousShort();
      } else if (e.key === 'ArrowDown' || e.key === 'j') {
        handleNextShort();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentShortIndex]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNextShort = () => {
    if (currentShortIndex < shorts.length - 1) {
      setCurrentShortIndex(prev => prev + 1);
    }
  };

  const handlePreviousShort = () => {
    if (currentShortIndex > 0) {
      setCurrentShortIndex(prev => prev - 1);
    }
  };
  
  const handleLike = (id: string) => {
    const wasDisliked = disliked[id];
    
    setLiked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    if (wasDisliked) {
      setDisliked(prev => ({
        ...prev,
        [id]: false
      }));
    }
    
    if (!liked[id]) {
      toast.success('You liked this Short');
    }
  };
  
  const handleDislike = (id: string) => {
    const wasLiked = liked[id];
    
    setDisliked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    if (wasLiked) {
      setLiked(prev => ({
        ...prev,
        [id]: false
      }));
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(`https://youtube.com/shorts/${currentShort.videoId}`);
    toast.success('Link copied to clipboard');
  };

  // Adding wheel event to navigate between shorts
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      handleNextShort();
    } else {
      handlePreviousShort();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <main 
        className={cn(
          "fixed top-14 left-0 right-0 bottom-0 flex justify-center items-center bg-black",
          sidebarOpen ? "pl-60" : "pl-[72px]"
        )}
        onWheel={handleWheel}
        ref={containerRef}
      >
        <div className="relative h-full flex flex-col justify-center items-center">
          {/* Navigation indicators */}
          <div className="fixed top-1/2 right-5 transform -translate-y-1/2 flex flex-col gap-2 z-30">
            {shorts.map((_, idx) => (
              <div 
                key={`indicator-${idx}`}
                className={`w-1 h-6 rounded-full cursor-pointer ${idx === currentShortIndex ? 'bg-white' : 'bg-gray-600'}`}
                onClick={() => setCurrentShortIndex(idx)}
              />
            ))}
          </div>
          
          {/* Shorts player */}
          <div className="aspect-[9/16] h-[85vh] max-h-[85vh] bg-black rounded-xl overflow-hidden shadow-lg relative">
            <iframe 
              src={`https://www.youtube.com/embed/${currentShort.videoId}?autoplay=1&loop=1&controls=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&fs=0&color=white&mute=0&origin=${window.location.origin}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 10 }}
            ></iframe>
            
            {/* Navigation arrows */}
            <button 
              className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-gray-800/40 w-10 h-10 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              onClick={handlePreviousShort}
              disabled={currentShortIndex === 0}
            >
              <ChevronUp className="h-6 w-6" />
            </button>
            
            <button 
              className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-gray-800/40 w-10 h-10 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              onClick={handleNextShort}
              disabled={currentShortIndex === shorts.length - 1}
            >
              <ChevronDown className="h-6 w-6" />
            </button>
            
            {/* Title and channel */}
            <div className="absolute bottom-16 left-4 right-20 z-20 pointer-events-none">
              <h3 className="font-bold text-lg line-clamp-2 text-white">{currentShort.title}</h3>
              <div className="flex items-center mt-3 pointer-events-auto">
                <img 
                  src={currentShort.channelImageUrl} 
                  alt={currentShort.channelName}
                  className="w-8 h-8 rounded-full mr-3"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32x32?text=Channel';
                  }}
                />
                <span className="font-medium text-sm text-white">{currentShort.channelName}</span>
                <Button 
                  variant="outline" 
                  className="ml-3 h-8 bg-transparent border border-white/30 hover:bg-white/10 text-white text-xs rounded-full px-3"
                >
                  Subscribe
                </Button>
              </div>
            </div>
            
            {/* Interactions */}
            <div className="absolute right-4 bottom-16 z-20 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "bg-gray-800/60 text-white rounded-full hover:bg-gray-700/80 w-12 h-12",
                    liked[currentShort.id] && "text-red-500 bg-red-500/10"
                  )}
                  onClick={() => handleLike(currentShort.id)}
                >
                  <ThumbsUp className="h-6 w-6" />
                </Button>
                <span className="text-white text-xs mt-1">{
                  liked[currentShort.id] 
                    ? (currentShort.likes + 1).toLocaleString() 
                    : currentShort.likes.toLocaleString()
                }</span>
              </div>
              
              <div className="flex flex-col items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "bg-gray-800/60 text-white rounded-full hover:bg-gray-700/80 w-12 h-12",
                    disliked[currentShort.id] && "text-gray-400 bg-gray-700/50"
                  )}
                  onClick={() => handleDislike(currentShort.id)}
                >
                  <ThumbsDown className="h-6 w-6" />
                </Button>
                <span className="text-white text-xs mt-1">Dislike</span>
              </div>
              
              <div className="flex flex-col items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-gray-800/60 text-white rounded-full hover:bg-gray-700/80 w-12 h-12"
                >
                  <MessageSquare className="h-6 w-6" />
                </Button>
                <span className="text-white text-xs mt-1">Comment</span>
              </div>
              
              <div className="flex flex-col items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-gray-800/60 text-white rounded-full hover:bg-gray-700/80 w-12 h-12"
                  onClick={handleShare}
                >
                  <Share2 className="h-6 w-6" />
                </Button>
                <span className="text-white text-xs mt-1">Share</span>
              </div>
            </div>
          </div>
          
          {/* Current short indicator */}
          <div className="mt-4 text-sm text-gray-400">
            Short {currentShortIndex + 1} of {shorts.length}
          </div>
        </div>
      </main>
      
      {/* Add style for shorts mode */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body.shorts-mode {
              background-color: #000;
              color: #fff;
            }
            body.shorts-mode .dark {
              background-color: #000;
            }
          `
        }}
      />
    </div>
  );
};

export default Shorts;
