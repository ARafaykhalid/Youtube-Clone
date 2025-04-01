import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { cn } from '@/lib/utils';
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/use-theme';
import { shortsVideos, ShortsVideo, getRelatedShorts } from '@/data/shortsVideos';
import { saveLikedVideo } from '@/data/videos';

const Shorts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [disliked, setDisliked] = useState<Record<string, boolean>>({});
  const [shorts, setShorts] = useState<ShortsVideo[]>([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    // Initialize with randomized shorts videos
    const randomizedShorts = [...shortsVideos].sort(() => 0.5 - Math.random());
    setShorts(randomizedShorts);
    
    // Load liked videos from localStorage
    try {
      const likedVideosJson = localStorage.getItem('youtube-clone-liked-videos');
      if (likedVideosJson) {
        const likedVideoIds = JSON.parse(likedVideosJson) as string[];
        
        // Initialize liked state for shorts
        const initialLikedState: Record<string, boolean> = {};
        randomizedShorts.forEach(short => {
          initialLikedState[short.id] = likedVideoIds.includes(short.id);
        });
        
        setLiked(initialLikedState);
      }
    } catch (e) {
      console.error('Failed to load liked videos', e);
    }
    
    // Auto close sidebar for better shorts viewing experience
    setSidebarOpen(false);
    
    // Show construction toast
    toast.info(
      "Shorts functionality is under construction! Feel free to contribute to this feature.", 
      { 
        duration: 5000,
        position: "top-center",
        icon: "🚧"
      }
    );
    
    return () => {
      // Clean up any shorts-specific classes or modifications
    };
  }, []);

  // Effect to handle theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('shorts-viewing-mode', true);
    
    return () => {
      document.documentElement.classList.toggle('shorts-viewing-mode', false);
    };
  }, []);

  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'k') {
        handlePreviousShort();
      } else if (e.key === 'ArrowDown' || e.key === 'j') {
        handleNextShort();
      } else if (e.key === 'c') {
        toggleCommentForm();
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
      setShowCommentForm(false);
    }
  };

  const handlePreviousShort = () => {
    if (currentShortIndex > 0) {
      setCurrentShortIndex(prev => prev - 1);
      setShowCommentForm(false);
    }
  };
  
  const handleLike = (id: string) => {
    const wasDisliked = disliked[id];
    const isCurrentlyLiked = liked[id];
    
    // Toggle like status
    setLiked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    // Update in localStorage
    saveLikedVideo(id, !isCurrentlyLiked);
    
    if (wasDisliked) {
      setDisliked(prev => ({
        ...prev,
        [id]: false
      }));
    }
    
    if (!isCurrentlyLiked) {
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
      
      // Remove from liked videos in localStorage
      saveLikedVideo(id, false);
    }
  };
  
  const handleShare = () => {
    if (shorts.length > 0 && shorts[currentShortIndex]) {
      navigator.clipboard.writeText(`https://youtube.com/shorts/${shorts[currentShortIndex].videoId}`);
      toast.success('Link copied to clipboard');
    }
  };

  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      toast.success('Comment posted!');
      setCommentText('');
      setShowCommentForm(false);
    }
  };

  // Adding wheel event to navigate between shorts
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      handleNextShort();
    } else {
      handlePreviousShort();
    }
  };

  // Make sure we have shorts before rendering
  if (shorts.length === 0) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme === 'dark' ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  const currentShort = shorts[currentShortIndex];

  // Check ShortsVideo type for comments property
  const defaultComments = 0;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <main 
        className={cn(
          "fixed top-14 left-0 right-0 bottom-0 flex justify-center items-center",
          theme === 'dark' ? "bg-black" : "bg-white",
          sidebarOpen ? "pl-60" : "pl-[72px]"
        )}
        onWheel={handleWheel}
        ref={containerRef}
      >
        <div className="relative h-full flex flex-col justify-center items-center">
          {/* Navigation indicators */}
          <div className="fixed top-1/2 right-5 transform -translate-y-1/2 flex flex-col gap-2 z-30">
            {shorts.slice(0, 15).map((_, idx) => (
              <div 
                key={`indicator-${idx}`}
                className={`w-1 h-6 rounded-full cursor-pointer ${
                  idx === currentShortIndex 
                    ? (theme === 'dark' ? 'bg-white' : 'bg-black') 
                    : (theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300')
                }`}
                onClick={() => setCurrentShortIndex(idx)}
              />
            ))}
            {shorts.length > 15 && (
              <div className={`text-xs mt-2 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>+{shorts.length - 15}</div>
            )}
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
              className={`absolute top-1/2 left-4 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity ${
                theme === 'dark' ? 'bg-gray-800/40' : 'bg-gray-200/40'
              }`}
              onClick={handlePreviousShort}
              disabled={currentShortIndex === 0}
            >
              <ChevronUp className="h-6 w-6" />
            </button>
            
            <button 
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity ${
                theme === 'dark' ? 'bg-gray-800/40' : 'bg-gray-200/40'
              }`}
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
                    const channelInitial = currentShort.channelName.charAt(0).toUpperCase();
                    const colors = ["4285F4", "DB4437", "F4B400", "0F9D58", "4285F4", "DB4437"];
                    const colorIndex = currentShort.channelName.length % colors.length;
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${channelInitial}&background=${colors[colorIndex]}&color=fff&size=32`;
                    (e.target as HTMLImageElement).onerror = null;
                  }}
                />
                <span className="font-medium text-sm text-white">{currentShort.channelName}</span>
                <Button 
                  variant="outline" 
                  className="ml-3 h-8 bg-transparent border border-white/30 hover:bg-white/10 text-white text-xs rounded-full px-3"
                  onClick={() => {
                    // Subscribe logic would go here
                    toast.success(`Subscribed to ${currentShort.channelName}`);
                  }}
                >
                  Subscribe
                </Button>
              </div>
            </div>
            
            {/* Interaction buttons */}
            <div className="absolute right-4 bottom-16 flex flex-col gap-5 items-center z-20">
              <button 
                className={`group flex flex-col items-center ${liked[currentShort.id] ? 'text-blue-500' : 'text-white'}`}
                onClick={() => handleLike(currentShort.id)}
              >
                <div className="bg-gray-800 bg-opacity-60 rounded-full p-3 mb-1 group-hover:bg-gray-700">
                  <ThumbsUp className="h-5 w-5" />
                </div>
                <span className="text-xs">{currentShort.likes}</span>
              </button>
              
              <button 
                className={`group flex flex-col items-center ${disliked[currentShort.id] ? 'text-blue-500' : 'text-white'}`}
                onClick={() => handleDislike(currentShort.id)}
              >
                <div className="bg-gray-800 bg-opacity-60 rounded-full p-3 mb-1 group-hover:bg-gray-700">
                  <ThumbsDown className="h-5 w-5" />
                </div>
                <span className="text-xs">Dislike</span>
              </button>
              
              <button 
                className="group flex flex-col items-center text-white"
                onClick={toggleCommentForm}
              >
                <div className="bg-gray-800 bg-opacity-60 rounded-full p-3 mb-1 group-hover:bg-gray-700">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="text-xs">{currentShort.comments || defaultComments}</span>
              </button>
              
              <button 
                className="group flex flex-col items-center text-white"
                onClick={handleShare}
              >
                <div className="bg-gray-800 bg-opacity-60 rounded-full p-3 mb-1 group-hover:bg-gray-700">
                  <Share2 className="h-5 w-5" />
                </div>
                <span className="text-xs">Share</span>
              </button>
            </div>
          </div>
          
          {/* Comment form */}
          {showCommentForm && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-end justify-center z-40">
              <div 
                className={`w-full max-w-lg rounded-t-xl p-4 ${
                  theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                } animate-slide-up`}
              >
                <h3 className={`font-bold text-lg mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  {currentShort.comments || defaultComments} Comments
                </h3>
                <form onSubmit={handleCommentSubmit}>
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className={`w-full p-3 rounded-lg mb-3 ${
                      theme === 'dark' 
                        ? 'bg-gray-800 text-white border-gray-700' 
                        : 'bg-gray-100 text-black border-gray-300'
                    } border outline-none`}
                    placeholder="Add a comment..."
                    rows={3}
                  />
                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant={theme === 'dark' ? 'outline' : 'secondary'}
                      onClick={() => setShowCommentForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={!commentText.trim()}
                      variant="default"
                    >
                      Comment
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Add CSS for animations */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Shorts;
