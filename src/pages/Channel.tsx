import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Video, videos, isChannelSubscribed, toggleChannelSubscription } from "@/data/videos";
import { shortsVideos, ShortsVideo } from "@/data/shortsVideos";
import Sidebar from "@/components/Sidebar";
import VideoGrid from "@/components/VideoGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { ConstructionButton } from "@/components/ui/construction-button";
import { BellIcon, CheckIcon, ExternalLinkIcon, Share2 } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import { getUserProfile } from "@/data/userData";

interface ChannelInfo {
  name: string;
  image: string;
  banner: string;
  subscribers: string;
  videoCount: number;
  description?: string;
  color: string;
  youtubeId?: string;
}

// Known channel mapping to their YouTube channel IDs
const knownChannelIds: Record<string, string> = {
  "Fireship": "UCsBjURrPoezykLs9EqgamOA",
  "Kevin Powell": "UCJZv4d5rbIKd4QHMPkcABCw",
  "Web Dev Simplified": "UCFbNIlppjAuEX4znoulh0Cw",
  "ThePrimeagen": "UC8ENHE5xdFSwx71u3fDH5Xw",
  "Traversy Media": "UC29ju8bIPH5as8OGnQzwJyA",
  "JavaScript Mastery": "UCmXmlB4-HJytD7wek0Uo97A",
  "freeCodeCamp.org": "UC8butISFwT-Wl7EV0hUK0BQ",
  "Marques Brownlee": "UCBJycsmduvYEL83R_U4JriQ",
};

// Function to get Channel ID by name
const getChannelYoutubeId = (name: string): string | undefined => {
  if (knownChannelIds[name]) {
    return knownChannelIds[name];
  }
  return undefined;
};

// Function to get channel image from YouTube (via public API that doesn't require auth)
const getYouTubeChannelImage = (channelId: string): string => {
  return `https://yt3.googleusercontent.com/ytc/${channelId}=s176-c-k-c0x00ffffff-no-rj`;
};

const fallbackThumbnails = [
  "https://i.ytimg.com/vi/default/mqdefault.jpg",
  "https://i.ytimg.com/vi/default/maxresdefault.jpg",
  "https://via.placeholder.com/1200x720/333333/ffffff?text=Video+Thumbnail"
];

const Channel = () => {
  const { channelName } = useParams<{ channelName: string }>();
  const navigate = useNavigate();
  const [channelVideos, setChannelVideos] = useState<Video[]>([]);
  const [channelShorts, setChannelShorts] = useState<ShortsVideo[]>([]);
  const [subscriberCount, setSubscriberCount] = useState("0");
  const [channelImg, setChannelImg] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bannerColor, setBannerColor] = useState("#4285F4");
  const [channelDescription, setChannelDescription] = useState<string | undefined>(undefined);
  const [videoFilter, setVideoFilter] = useState<"all" | "shorts" | "live">("all");
  const [youtubeChannelId, setYoutubeChannelId] = useState<string | undefined>(undefined);
  const [isCurrentUserChannel, setIsCurrentUserChannel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Generate a stable banner URL based on channel name for consistency
  const getBannerUrl = (name: string) => {
    // Map of some channels to specific banner images (you could add more)
    const knownChannels: Record<string, string> = {
      "JavaScript Mastery": "https://i.ytimg.com/vi/4F2m91eKmJk/maxresdefault.jpg",
      "freeCodeCamp.org": "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
      "Fireship": "https://i.ytimg.com/vi/TNhaISOUy6Q/maxresdefault.jpg",
      "Kevin Powell": "https://i.ytimg.com/vi/3elGSZSWTbM/maxresdefault.jpg",
      "Marques Brownlee": "https://i.ytimg.com/vi/QgcR5d19cGo/maxresdefault.jpg"
    };

    // Return a known channel banner if available
    if (knownChannels[name]) {
      return knownChannels[name];
    }

    // Otherwise generate a random gradient banner
    const colors = ["4285F4", "EA4335", "FBBC05", "34A853", "FF9800", "9C27B0"];
    const idx = name.length % colors.length;
    const idx2 = (name.length + 2) % colors.length;
    return `https://via.placeholder.com/1200x200/${colors[idx]}/${colors[idx2]}?text=`;
  };

  // Save channel info to localStorage
  const saveChannelInfo = (channelInfo: ChannelInfo) => {
    try {
      // Get existing channels info or initialize empty object
      const channelsData = localStorage.getItem('youtube-clone-channels-data');
      const channels = channelsData ? JSON.parse(channelsData) : {};
      
      // Update this channel's info
      channels[channelInfo.name] = channelInfo;
      
      // Save back to localStorage
      localStorage.setItem('youtube-clone-channels-data', JSON.stringify(channels));
    } catch (e) {
      console.error('Failed to save channel info to localStorage', e);
    }
  };

  // Get channel info from localStorage
  const getChannelInfo = (name: string): ChannelInfo | null => {
    try {
      const channelsData = localStorage.getItem('youtube-clone-channels-data');
      if (channelsData) {
        const channels = JSON.parse(channelsData);
        return channels[name] || null;
      }
    } catch (e) {
      console.error('Failed to get channel info from localStorage', e);
    }
    return null;
  };

  // Handle share button click
  const handleShareChannel = () => {
    if (!channelName) return;
    
    const shareUrl = `${window.location.origin}/channel/${channelName}`;
    if (navigator.share) {
      navigator.share({
        title: `${decodeURIComponent(channelName)} on YouTube Clone`,
        url: shareUrl
      })
      .catch(err => {
        console.error('Share failed:', err);
        // Fallback to clipboard
        navigator.clipboard.writeText(shareUrl);
        toast.success('Channel link copied to clipboard');
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareUrl);
      toast.success('Channel link copied to clipboard');
    }
  };

  useEffect(() => {
    if (channelName) {
      setLoading(true);
      setError(null);
      
      try {
        const decodedChannelName = decodeURIComponent(channelName);
        
        // Check if this is the current user's channel
        const userProfile = getUserProfile();
        const isOwnChannel = userProfile.displayName === decodedChannelName || 
                            userProfile.username === decodedChannelName;
        setIsCurrentUserChannel(isOwnChannel);
        
        // Try to get channel info from localStorage first
        const savedChannelInfo = getChannelInfo(decodedChannelName);
        
        // Get potential YouTube channel ID
        const channelId = getChannelYoutubeId(decodedChannelName);
        setYoutubeChannelId(channelId);
        
        // Find all videos for this channel
        const filteredVideos = videos.filter(
          (video) => video.channelName === decodedChannelName
        );
        
        // Find all shorts for this channel
        const filteredShorts = shortsVideos.filter(
          (short) => short.channelName === decodedChannelName
        );
        
        setChannelShorts(filteredShorts);
        
        if (filteredVideos.length > 0) {
          // Sort videos by timestamp to show newest first
          const sortedVideos = [...filteredVideos].sort((a, b) => {
            if (a.timestamp.includes("year") && !b.timestamp.includes("year")) return 1;
            if (!a.timestamp.includes("year") && b.timestamp.includes("year")) return -1;
            if (a.timestamp.includes("month") && b.timestamp.includes("week")) return 1;
            if (a.timestamp.includes("week") && b.timestamp.includes("month")) return -1;
            if (a.timestamp.includes("month")) {
              const aMonths = parseInt(a.timestamp);
              const bMonths = parseInt(b.timestamp);
              return bMonths - aMonths;
            }
            if (a.timestamp.includes("week")) {
              const aWeeks = parseInt(a.timestamp);
              const bWeeks = parseInt(b.timestamp);
              return bWeeks - aWeeks;
            }
            if (a.timestamp.includes("day")) {
              const aDays = parseInt(a.timestamp);
              const bDays = parseInt(b.timestamp);
              return bDays - aDays;
            }
            return 0;
          });
          
          setChannelVideos(sortedVideos);
          
          if (savedChannelInfo) {
            // Use saved channel data
            setChannelImg(channelId ? getYouTubeChannelImage(channelId) : savedChannelInfo.image);
            setBannerUrl(savedChannelInfo.banner);
            setSubscriberCount(savedChannelInfo.subscribers);
            setBannerColor(savedChannelInfo.color);
            setChannelDescription(savedChannelInfo.description);
          } else {
            // No saved channel info, use first video's channel data
            setChannelImg(filteredVideos[0].channelImageUrl);
            setBannerUrl(getBannerUrl(decodedChannelName));
            
            const randomSubscriberBase = Math.floor(Math.random() * 5) + 1;
            const subscriberUnit = Math.random() > 0.9 ? 'M' : 'K';
            const calculatedSubscriberCount = `${randomSubscriberBase}${subscriberUnit} subscribers`;
            
            setSubscriberCount(calculatedSubscriberCount);
            
            const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            setBannerColor(randomColor);
            
            // Save the generated channel info for future visits
            saveChannelInfo({
              name: decodedChannelName,
              image: filteredVideos[0].channelImageUrl,
              banner: getBannerUrl(decodedChannelName),
              subscribers: calculatedSubscriberCount,
              videoCount: filteredVideos.length,
              color: randomColor,
              youtubeId: channelId
            });
          }
          
          // Check if already subscribed
          setIsSubscribed(isChannelSubscribed(decodedChannelName));
        } else {
          // No videos found for this channel
          if (savedChannelInfo) {
            // We have saved channel info, so use that
            setChannelImg(channelId ? getYouTubeChannelImage(channelId) : savedChannelInfo.image);
            setBannerUrl(savedChannelInfo.banner);
            setSubscriberCount(savedChannelInfo.subscribers);
            setBannerColor(savedChannelInfo.color);
            setChannelDescription(savedChannelInfo.description);
            setIsSubscribed(isChannelSubscribed(decodedChannelName));
          } else if (isOwnChannel) {
            // This is the current user's channel but with no videos
            setChannelImg(userProfile.profilePicture);
            setBannerUrl(userProfile.bannerUrl || "");
            setSubscriberCount(`${userProfile.subscriberCount || 0} subscribers`);
            setBannerColor(userProfile.bannerColor || "#4285F4");
            setChannelDescription(userProfile.description);
          } else {
            // No videos and no saved info, redirect to 404
            setError("Channel not found or has no content");
          }
        }
      } catch (err) {
        console.error("Error loading channel:", err);
        setError("An error occurred while loading channel data");
      } finally {
        setLoading(false);
      }
    }
  }, [channelName, navigate]);

  const handleSubscribe = () => {
    if (channelName) {
      const decodedChannelName = decodeURIComponent(channelName);
      toggleChannelSubscription(decodedChannelName, !isSubscribed);
      setIsSubscribed(!isSubscribed);
      
      // Update subscriber count on subscribe/unsubscribe
      const currentCount = parseInt(subscriberCount.replace(/[^0-9]/g, ''));
      const unit = subscriberCount.includes('M') ? 'M' : 'K';
      let newCount = currentCount;
      
      if (!isSubscribed) {
        // Subscribing - increase subscriber count
        newCount = currentCount + (unit === 'M' ? 0.1 : 1);
        toast.success(`Subscribed to ${decodedChannelName}`);
      } else {
        // Unsubscribing - decrease subscriber count
        newCount = Math.max(0, currentCount - (unit === 'M' ? 0.1 : 1));
        toast.info(`Unsubscribed from ${decodedChannelName}`);
      }
      
      const newSubscriberCount = `${newCount}${unit} subscribers`;
      setSubscriberCount(newSubscriberCount);
      
      // Update the stored channel info
      const savedInfo = getChannelInfo(decodedChannelName);
      if (savedInfo) {
        saveChannelInfo({
          ...savedInfo,
          subscribers: newSubscriberCount
        });
      }
    }
  };

  // Get filtered videos based on the selected filter
  const getFilteredVideos = () => {
    if (videoFilter === "all") {
      return channelVideos;
    } else if (videoFilter === "shorts") {
      // Convert shorts to video format for VideoGrid
      return channelShorts.map(short => ({
        id: short.id,
        title: short.title,
        thumbnailUrl: short.thumbnailUrl,
        channelName: short.channelName,
        channelImageUrl: short.channelImageUrl,
        views: short.views,
        timestamp: short.timestamp,
        duration: short.duration,
        videoId: short.videoId,
        description: short.description || `Shorts video by ${short.channelName}`,
        likes: short.likes,
        dislikes: 0,
        comments: short.comments || 0,
        category: short.category || "shorts",
        isShort: true
      }));
    }
    // For "live" filter, we don't have live videos in our data model yet
    return [];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`pt-14 pb-12 transition-all duration-300 ${
          isSidebarOpen ? "ml-0 md:ml-60" : "ml-0 md:ml-[72px]"
        }`}>
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading channel...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`pt-14 pb-12 transition-all duration-300 ${
          isSidebarOpen ? "ml-0 md:ml-60" : "ml-0 md:ml-[72px]"
        }`}>
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="text-red-500 mb-4 text-xl">{error}</div>
            <Button variant="outline" onClick={() => navigate('/')}>Return to Home</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      
      <main 
        className={`pt-14 pb-12 transition-all duration-300 ${
          isSidebarOpen ? "ml-0 md:ml-60" : "ml-0 md:ml-[72px]"
        }`}
      >
        {/* Channel Banner */}
        <div className="h-32 sm:h-48 w-full relative overflow-hidden">
          {bannerUrl ? (
            <div className="w-full h-full" style={{ backgroundColor: bannerColor }}>
              <img 
                src={bannerUrl} 
                alt={`${channelName} banner`} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Just hide the image and show the background color if it fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                  // Prevent infinite error loops
                  (e.target as HTMLImageElement).onerror = null;
                }}
              />
            </div>
          ) : (
            <div 
              className="h-full w-full" 
              style={{ backgroundColor: bannerColor }}
            ></div>
          )}
        </div>
        
        {/* Channel Header */}
        <div className="px-4 sm:px-6 py-4 relative bg-white dark:bg-zinc-900 border-b">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-end">
              {/* Channel Avatar (positioned over the banner) */}
              <div className="relative -mt-16 z-10">
                <img
                  src={channelImg}
                  alt={channelName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-zinc-900 shadow-md"
                  onError={(e) => {
                    // Use a placeholder with the channel name's first letter
                    const channelInitial = (decodeURIComponent(channelName || "C")).charAt(0).toUpperCase();
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${channelInitial}&background=${bannerColor.replace('#', '')}&color=fff&size=80`;
                    // Prevent infinite error loops
                    (e.target as HTMLImageElement).onerror = null;
                  }}
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-white">
                  {decodeURIComponent(channelName || "")}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {subscriberCount}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {channelVideos.length} videos
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-2 md:mt-0">
              <Button 
                variant="outline" 
                size="sm"
                className="rounded-full"
                onClick={handleShareChannel}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              {!isCurrentUserChannel && (
                <Button 
                  onClick={handleSubscribe} 
                  className={`rounded-full ${isSubscribed 
                    ? 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-zinc-700 dark:text-gray-100 px-4' 
                    : 'bg-red-600 hover:bg-red-700 text-white'}`}
                >
                  {isSubscribed ? (
                    <div className="flex items-center">
                      <CheckIcon className="h-4 w-4 mr-2" />
                      SUBSCRIBED
                    </div>
                  ) : (
                    "SUBSCRIBE"
                  )}
                </Button>
              )}
              {isSubscribed && !isCurrentUserChannel && (
                <Button variant="outline" size="icon" className="rounded-full">
                  <BellIcon className="h-4 w-4" />
                </Button>
              )}
              {isCurrentUserChannel && (
                <Button
                  onClick={() => navigate('/channel/edit')}
                  className="rounded-full"
                  variant="outline"
                >
                  Customize Channel
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Channel Content */}
        <div className="px-4 sm:px-6">
          <Tabs defaultValue="videos" className="pt-4 pb-8">
            <div className="overflow-x-auto">
              <TabsList className="mb-4">
                <TabsTrigger value="videos">VIDEOS</TabsTrigger>
                <TabsTrigger value="playlists">PLAYLISTS</TabsTrigger>
                <TabsTrigger value="community">COMMUNITY</TabsTrigger>
                <TabsTrigger value="channels">CHANNELS</TabsTrigger>
                <TabsTrigger value="about">ABOUT</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="videos" className="pt-2">
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <Button 
                    variant={videoFilter === "all" ? "default" : "outline"} 
                    className="rounded-full text-xs sm:text-sm"
                    onClick={() => setVideoFilter("all")}
                  >
                    Videos
                  </Button>
                  <Button 
                    variant={videoFilter === "live" ? "default" : "outline"} 
                    className="rounded-full text-xs sm:text-sm"
                    onClick={() => {
                      setVideoFilter("live");
                      toast.info("Live functionality is under construction. You can contribute to this feature!");
                    }}
                  >
                    Live
                  </Button>
                  <Button 
                    variant={videoFilter === "shorts" ? "default" : "outline"} 
                    className="rounded-full text-xs sm:text-sm"
                    onClick={() => setVideoFilter("shorts")}
                  >
                    Shorts {channelShorts.length > 0 && `(${channelShorts.length})`}
                  </Button>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                  Latest
                </div>
              </div>
              
              {getFilteredVideos().length > 0 ? (
                <VideoGrid videos={getFilteredVideos()} />
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-lg text-black dark:text-white mb-2">
                    {videoFilter === "all" 
                      ? "No videos found for this channel." 
                      : videoFilter === "shorts" 
                        ? "No shorts found for this channel." 
                        : "No live streams found for this channel."}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try selecting a different content type
                  </p>
                  {isCurrentUserChannel && videoFilter === "all" && (
                    <Button className="mt-4 rounded-full" variant="default" onClick={() => navigate('/upload')}>
                      Upload Videos
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="playlists" className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg text-black dark:text-white">
                  No playlists available.
                </p>
                {isCurrentUserChannel && (
                  <ConstructionButton 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 rounded-full" 
                    featureName="Playlists"
                  >
                    Create Playlist
                  </ConstructionButton>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg text-black dark:text-white">
                  No community posts yet.
                </p>
                {isCurrentUserChannel && (
                  <ConstructionButton 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 rounded-full" 
                    featureName="Community posts"
                  >
                    Create Post
                  </ConstructionButton>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="channels" className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg text-black dark:text-white">
                  This channel hasn't featured any other channels.
                </p>
                {isCurrentUserChannel && (
                  <ConstructionButton 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 rounded-full" 
                    featureName="Featured channels"
                  >
                    Feature Channel
                  </ConstructionButton>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                    Description
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {channelDescription || 
                      (channelVideos.length > 0 
                        ? `This channel is focused on ${channelVideos[0].category || "various"} content. 
                          Join ${subscriberCount} and discover great videos.`
                        : "Channel information not available.")}
                  </p>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                      Details
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Location: Worldwide
                    </p>
                  </div>
                </div>
                
                <div className="bg-secondary dark:bg-zinc-800 rounded-xl p-4">
                  <h3 className="text-md font-semibold mb-4 text-black dark:text-white">
                    Stats
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Joined: January {2010 + (decodeURIComponent(channelName || "").length % 10)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {subscriberCount}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {Math.floor(Math.random() * 10000000).toLocaleString()} views
                  </p>
                  
                  <div className="border-t dark:border-gray-700 pt-4 mt-2">
                    {youtubeChannelId ? (
                      <a 
                        href={`https://youtube.com/channel/${youtubeChannelId}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>Visit channel on YouTube</span>
                        <ExternalLinkIcon className="h-4 w-4 ml-1" />
                      </a>
                    ) : (
                      <a 
                        href={`https://youtube.com/results?search_query=${encodeURIComponent(channelName || "")}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>Search for channel on YouTube</span>
                        <ExternalLinkIcon className="h-4 w-4 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Channel; 