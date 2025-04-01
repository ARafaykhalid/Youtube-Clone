import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CommentSection from '@/components/CommentSection';
import RelatedVideos from '@/components/RelatedVideos';
import VideoPlayerComponent from '@/components/VideoPlayer';
import { getVideoById, getRelatedVideos, comments, isChannelSubscribed, toggleChannelSubscription, saveLikedVideo, videos, type Video } from '@/data/videos';
import { getLongVideosById } from '@/data/longVideos';
import { getShortsById, type ShortsVideo } from '@/data/shortsVideos';
import { ThumbsUp, ThumbsDown, Share2, Save, MoreHorizontal, Users, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import defaultAvatar from "@/assets/images/default-avatar.svg";

// Combine the properties of Video and ShortsVideo
type MergedVideo = {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelName: string;
  channelImageUrl: string;
  views: string;
  timestamp: string;
  duration: string;
  videoId: string;
  likes: number;
  description: string;
  isSubscribed?: boolean;
  category?: string;
  isLiked?: boolean;
  isShort?: boolean;
  dislikes: number;
  comments?: number;
  isVerified?: boolean;
  isLive?: boolean;
  isNewVideo?: boolean;
};

const VideoPlayer = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [youtubeDescription, setYoutubeDescription] = useState('');
  
  // Find the video using multiple strategies
  const findVideo = (): MergedVideo | null => {
    if (!videoId) return null;
    
    // Strategy 1: Direct match by id
    let foundVideo = getVideoById(videoId);
    if (foundVideo) return foundVideo;
    
    // Strategy 2: Check long videos
    foundVideo = getLongVideosById(videoId);
    if (foundVideo) return foundVideo;
    
    // Strategy 3: Check shorts videos
    const shortsVideo = getShortsById(videoId);
    if (shortsVideo) {
      // Convert shorts video to the merged type
      return {
        ...shortsVideo,
        dislikes: 0,
        description: shortsVideo.description || `Short video by ${shortsVideo.channelName}`
      };
    }
    
    // Strategy 4: Check by YouTube videoId
    foundVideo = videos.find(v => v.videoId === videoId);
    if (foundVideo) return foundVideo;
    
    // If we're coming from a link with /watch/ try to use that ID format to find the video
    if (location.pathname.includes('/watch/')) {
      // This might be a YouTube video ID, so search by that
      foundVideo = videos.find(v => v.videoId === videoId);
      if (foundVideo) return foundVideo;
    }
    
    return null;
  };
  
  const video = findVideo();
  const relatedVideos = video ? getRelatedVideos(video.id, 8) : [];
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Auto close sidebar on the video page for better viewing experience
    setSidebarOpen(false);
    
    // Reset states when video changes
    if (video) {
      setSubscribed(isChannelSubscribed(video.channelName));
      setLiked(video.isLiked || false);
      setDisliked(false);
      setSaved(false);
      
      // Check if video is saved in localStorage
      try {
        const savedVideosJson = localStorage.getItem('youtube-clone-saved-videos') || '[]';
        const savedVideoIds = JSON.parse(savedVideosJson) as string[];
        setSaved(savedVideoIds.includes(video.id));
      } catch (e) {
        console.error('Failed to check saved videos', e);
      }
      
      // Fetch YouTube video description if available
      fetchYoutubeVideoInfo(video.videoId);
      
      // Update page title
      document.title = `${video.title} - YouTube Clone`;
    }
    
    return () => {
      // Reset title when unmounting
      document.title = 'YouTube Clone';
    };
  }, [videoId, video]);

  const fetchYoutubeVideoInfo = async (youtubeId: string) => {
    try {
      // In a real app, you would fetch this from YouTube's API
      // For this demo, we're just using the existing description
      setYoutubeDescription(video?.description || '');
    } catch (error) {
      console.error('Error fetching YouTube video info:', error);
    }
  };

  if (!video) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Video not found</h2>
          <p className="mb-6">The video you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubscribe = () => {
    toggleChannelSubscription(video.channelName, !subscribed);
    setSubscribed(!subscribed);
    
    if (!subscribed) {
      toast.success(`Subscribed to ${video.channelName}`);
    } else {
      toast.info(`Unsubscribed from ${video.channelName}`);
    }
  };

  const likeVideo = () => {
    if (!disliked) {
      const newLikedState = !liked;
      setLiked(newLikedState);
      // Persist like status
      if (video) {
        saveLikedVideo(video.id, newLikedState);
      }
    } else {
      setLiked(true);
      setDisliked(false);
      // Persist like status
      if (video) {
        saveLikedVideo(video.id, true);
      }
    }
    if (!liked) {
      toast.success("Added to liked videos");
    }
  };

  const dislikeVideo = () => {
    if (!liked) {
      setDisliked(!disliked);
    } else {
      setDisliked(true);
      setLiked(false);
      // Remove from liked videos
      if (video) {
        saveLikedVideo(video.id, false);
      }
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    
    try {
      // Get existing saved videos
      const savedVideosJson = localStorage.getItem('youtube-clone-saved-videos') || '[]';
      const savedVideoIds = JSON.parse(savedVideosJson) as string[];
      
      if (!saved) {
        // Add to watch later if not already saved
        if (!savedVideoIds.includes(video.id)) {
          savedVideoIds.push(video.id);
          localStorage.setItem('youtube-clone-saved-videos', JSON.stringify(savedVideoIds));
        }
        toast.success('Video saved to Watch Later');
      } else {
        // Remove from watch later
        const updatedIds = savedVideoIds.filter(id => id !== video.id);
        localStorage.setItem('youtube-clone-saved-videos', JSON.stringify(updatedIds));
        toast.info('Video removed from Watch Later');
      }
    } catch (e) {
      console.error('Failed to update saved videos', e);
      toast.error('Failed to update saved videos');
    }
  };

  const handleShare = () => {
    // Generate a shareable link using the videoId property if available
    const shareUrl = video.videoId 
      ? `${window.location.origin}/video/${video.videoId}`
      : window.location.href;
    
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard');
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Ensure we're using the YouTube videoId for embedding
  const embedVideoId = video.videoId || video.id;
  
  // Get safe dislikes value - some videos might not have this property
  const videoDislikesCount = video.dislikes || 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      {/* Main Content */}
      <main 
        className={cn(
          "pt-16 pb-12 transition-all duration-300",
          sidebarOpen ? "ml-60" : "ml-[72px]"
        )}
      >
        <div className="flex flex-col lg:flex-row px-4 lg:px-6 gap-6">
          {/* Left Side - Video Player and Info */}
          <div className="lg:w-[68%]">
            {/* Video Player */}
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <iframe 
                src={`https://www.youtube.com/embed/${embedVideoId}?autoplay=1&rel=0&modestbranding=1`} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            {/* Video Info */}
            <div className="mt-4">
              <h1 className="text-xl font-medium text-left">{video.title}</h1>
              
              {/* Channel and Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pb-4 border-b dark:border-gray-700">
                <div className="flex items-center">
                  <Link 
                    to={`/channel/${encodeURIComponent(video.channelName)}`}
                    className="flex items-center"
                  >
                    <img
                      src={video.channelImageUrl}
                      alt={video.channelName}
                      className="w-10 h-10 rounded-full mr-3"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = defaultAvatar;
                      }}
                    />
                    <div className="mr-4">
                      <h3 className="font-medium text-left">{video.channelName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-left">1.2M subscribers</p>
                    </div>
                  </Link>
                  <Button
                    onClick={handleSubscribe}
                    className={cn(
                      "rounded-full text-sm font-medium",
                      subscribed 
                        ? "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600" 
                        : "bg-red-600 text-white hover:bg-red-700"
                    )}
                  >
                    {subscribed ? (
                      <span className="flex items-center">
                        <Bell className="h-4 w-4 mr-1" />
                        Subscribed
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </div>
                
                <div className="flex mt-4 sm:mt-0 space-x-2">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn(
                        "flex items-center gap-1 rounded-full", 
                        liked && "text-blue-500 bg-blue-500/10 dark:bg-blue-950/30 hover:bg-blue-500/20 dark:hover:bg-blue-950/40"
                      )} 
                      onClick={likeVideo}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{(video.likes + (liked ? 1 : 0)).toLocaleString()}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn(
                        "flex items-center gap-1 rounded-full",
                        disliked && "text-gray-500 bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-200/70 dark:hover:bg-gray-800/70"
                      )} 
                      onClick={dislikeVideo}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="rounded-full py-1 px-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    <span className="text-sm">Share</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "rounded-full py-1 px-3 bg-gray-100 dark:bg-gray-800",
                      saved ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    )}
                    onClick={handleSave}
                  >
                    <Save className="h-4 w-4 mr-1" />
                    <span className="text-sm">{saved ? "Saved" : "Save"}</span>
                  </Button>
                  
                  <Button variant="ghost" className="rounded-full p-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 sm:flex hidden">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Video Description */}
              <div className="mt-4 bg-secondary dark:bg-gray-800 p-3 rounded-xl text-left">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium">{video.views}</span>
                  <span>•</span>
                  <span>{video.timestamp}</span>
                </div>
                <div className="description-container">
                  <p className={cn(
                    "text-sm whitespace-pre-line", 
                    showFullDescription ? "" : "line-clamp-2"
                  )}>
                    {youtubeDescription || video.description}
                  </p>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <button 
                    className="text-sm font-medium text-muted-foreground flex items-center cursor-pointer"
                    onClick={toggleDescription}
                    aria-expanded={showFullDescription}
                  >
                    {showFullDescription ? (
                      <>Show less <ChevronUp className="h-4 w-4 ml-1" /></>
                    ) : (
                      <>Show more <ChevronDown className="h-4 w-4 ml-1" /></>
                    )}
                  </button>
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.videoId}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View on YouTube
                  </a>
                </div>
              </div>
              
              {/* Comment Section */}
              <CommentSection 
                comments={comments} 
                totalComments={comments.length} 
                videoId={video.id}
              />
            </div>
          </div>
          
          {/* Right Side - Related Videos */}
          <div className="lg:w-[32%]">
            <RelatedVideos videos={relatedVideos} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPlayer;
