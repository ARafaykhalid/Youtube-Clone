import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CommentSection from '@/components/CommentSection';
import RelatedVideos from '@/components/RelatedVideos';
import VideoPlayerComponent from '@/components/VideoPlayer';
import { getVideoById, getRelatedVideos, comments } from '@/data/videos';
import { ThumbsUp, ThumbsDown, Share2, Save, MoreHorizontal, Users, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const VideoPlayer = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  
  const video = getVideoById(videoId || '');
  const relatedVideos = getRelatedVideos(videoId || '');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Auto close sidebar on the video page for better viewing experience
    setSidebarOpen(false);
  }, [videoId]);

  if (!video) {
    return <div>Video not found</div>;
  }

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
    
    if (!subscribed) {
      toast.success(`Subscribed to ${video.channelName}`);
    } else {
      toast.info(`Unsubscribed from ${video.channelName}`);
    }
  };

  const handleLike = () => {
    if (disliked) setDisliked(false);
    setLiked(!liked);
    
    if (!liked) {
      toast.success('Added to liked videos');
    }
  };

  const handleDislike = () => {
    if (liked) setLiked(false);
    setDisliked(!disliked);
  };

  const handleSave = () => {
    setSaved(!saved);
    
    if (!saved) {
      toast.success('Video saved to Watch Later');
    } else {
      toast.info('Video removed from Watch Later');
    }
  };

  const handleShare = () => {
    // Copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

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
                src={`https://www.youtube.com/embed/${videoId}`} 
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
                  <img
                    src={video.channelImageUrl}
                    alt={video.channelName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="mr-4">
                    <h3 className="font-medium text-left">{video.channelName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-left">1.2M subscribers</p>
                  </div>
                  <Button
                    onClick={handleSubscribe}
                    className={cn(
                      "rounded-full text-sm font-medium",
                      subscribed 
                        ? "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600" 
                        : "bg-black text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
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
                  <div className="flex rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "rounded-r-none py-1 px-3",
                        liked ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                      )}
                      onClick={handleLike}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">{liked ? video.likes + 1 : video.likes}</span>
                    </Button>
                    <div className="border-r border-gray-300 dark:border-gray-600 h-full"></div>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "rounded-l-none py-1 px-3",
                        disliked ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                      )}
                      onClick={handleDislike}
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
                <p className={cn("text-sm", showFullDescription ? "" : "line-clamp-2")}>
                  {video.description}
                </p>
                <button 
                  className="text-sm font-medium mt-2 text-muted-foreground flex items-center"
                  onClick={toggleDescription}
                >
                  {showFullDescription ? (
                    <>Show less <ChevronUp className="h-4 w-4 ml-1" /></>
                  ) : (
                    <>Show more <ChevronDown className="h-4 w-4 ml-1" /></>
                  )}
                </button>
              </div>
              
              {/* Comments Section */}
              <div className="mt-6">
                <h3 className="font-medium text-lg mb-4 text-foreground">{comments.length} Comments</h3>
                
                {/* Comment Input */}
                <div className="flex mb-6">
                  <img 
                    src="https://randomuser.me/api/portraits/men/85.jpg" 
                    alt="Your profile" 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="flex-grow">
                    {!showCommentForm ? (
                      <div 
                        className="w-full p-2 border-b border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 cursor-pointer"
                        onClick={() => setShowCommentForm(true)}
                      >
                        Add a comment...
                      </div>
                    ) : (
                      <form onSubmit={(e) => { 
                        e.preventDefault();
                        toast.success('Comment submitted!');
                        setShowCommentForm(false);
                      }} 
                      className="w-full">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          autoFocus
                          className="w-full p-2 border-b border-gray-300 dark:border-gray-700 focus:border-b-2 focus:border-gray-800 dark:focus:border-gray-400 outline-none bg-transparent text-foreground"
                        />
                        <div className="flex justify-end mt-2 space-x-2">
                          <button 
                            type="button" 
                            className="px-3 py-1 text-sm font-medium rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => setShowCommentForm(false)}
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            className="px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                          >
                            Comment
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
                
                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex">
                      <img 
                        src={comment.profilePic} 
                        alt={comment.username} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium text-sm text-foreground">{comment.username}</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{comment.timestamp}</span>
                        </div>
                        <p className="mt-1 text-sm text-foreground">{comment.content}</p>
                        <div className="flex items-center mt-1 space-x-4">
                          <button className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span className="text-xs">{comment.likes}</span>
                          </button>
                          <button className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                            <ThumbsDown className="h-4 w-4" />
                          </button>
                          <button className="text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
