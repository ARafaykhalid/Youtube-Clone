import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Video, videos, isChannelSubscribed, toggleChannelSubscription } from "@/data/videos";
import Sidebar from "@/components/Sidebar";
import VideoGrid from "@/components/VideoGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { BellIcon, CheckIcon, ExternalLinkIcon } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";

const Channel = () => {
  const { channelName } = useParams<{ channelName: string }>();
  const [channelVideos, setChannelVideos] = useState<Video[]>([]);
  const [subscriberCount, setSubscriberCount] = useState("0");
  const [channelImg, setChannelImg] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bannerColor, setBannerColor] = useState("#4285F4");
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

  useEffect(() => {
    if (channelName) {
      // Find all videos for this channel
      const decodedChannelName = decodeURIComponent(channelName);
      const filteredVideos = videos.filter(
        (video) => video.channelName === decodedChannelName
      );
      
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
        
        // Set channel image from the first video
        setChannelImg(filteredVideos[0].channelImageUrl);
        
        // Set banner URL
        setBannerUrl(getBannerUrl(decodedChannelName));
        
        // Generate random subscriber count (would come from API in real app)
        const randomSubscribers = Math.floor(Math.random() * 10) + 1;
        setSubscriberCount(`${randomSubscribers}M subscribers`);
        
        // Check if already subscribed
        setIsSubscribed(isChannelSubscribed(decodedChannelName));
        
        // Generate a semi-random banner color based on channel name
        const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#FF9800", "#9C27B0"];
        const colorIndex = decodedChannelName.length % colors.length;
        setBannerColor(colors[colorIndex]);
      }
    }
  }, [channelName]);

  const handleSubscribe = () => {
    if (channelName) {
      const decodedChannelName = decodeURIComponent(channelName);
      toggleChannelSubscription(decodedChannelName, !isSubscribed);
      setIsSubscribed(!isSubscribed);
      
      if (!isSubscribed) {
        toast.success(`Subscribed to ${decodedChannelName}`);
      } else {
        toast.info(`Unsubscribed from ${decodedChannelName}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      
      <main 
        className={`pt-16 pb-12 transition-all duration-300 ${
          isSidebarOpen ? "ml-60" : "ml-[72px]"
        }`}
      >
        {/* Channel Banner */}
        <div className="h-32 sm:h-48 w-full relative overflow-hidden">
          {bannerUrl ? (
            <img 
              src={bannerUrl} 
              alt={`${channelName} banner`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to color banner if image fails to load
                (e.target as HTMLElement).style.backgroundColor = bannerColor;
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div 
              className="h-full w-full" 
              style={{ backgroundColor: bannerColor }}
            ></div>
          )}
        </div>
        
        {/* Channel Header */}
        <div className={`px-6 py-4 relative ${theme === "dark" ? "bg-zinc-900" : "bg-white"} border-b`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              {/* Channel Avatar (positioned over the banner) */}
              <div className="relative -mt-16">
                <img
                  src={channelImg}
                  alt={channelName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x80?text=Channel';
                  }}
                />
              </div>
              
              <div className="flex-1">
                <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {decodeURIComponent(channelName || "")}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {subscriberCount}
                  </p>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {channelVideos.length} videos
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-4 md:mt-0">
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
              {isSubscribed && (
                <Button variant="outline" size="icon" className="rounded-full">
                  <BellIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Channel Content */}
        <div className="px-6">
          <Tabs defaultValue="videos" className="pt-4 pb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="videos">VIDEOS</TabsTrigger>
              <TabsTrigger value="playlists">PLAYLISTS</TabsTrigger>
              <TabsTrigger value="community">COMMUNITY</TabsTrigger>
              <TabsTrigger value="channels">CHANNELS</TabsTrigger>
              <TabsTrigger value="about">ABOUT</TabsTrigger>
            </TabsList>
            
            <TabsContent value="videos" className="pt-2">
              <div className="mb-6 flex justify-between items-center">
                <div className="flex gap-4">
                  <Button variant="outline" className="rounded-lg">
                    Videos
                  </Button>
                  <Button variant="ghost" className="rounded-lg">
                    Live
                  </Button>
                  <Button variant="ghost" className="rounded-lg">
                    Shorts
                  </Button>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Latest
                </div>
              </div>
              
              {channelVideos.length > 0 ? (
                <VideoGrid videos={channelVideos} />
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className={`text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
                    No videos found for this channel.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="playlists" className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <p className={`text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
                  No playlists available.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <p className={`text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
                  No community posts yet.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="channels" className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <p className={`text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
                  This channel hasn't featured any other channels.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
                    Description
                  </h3>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {channelVideos.length > 0 
                      ? `This channel is focused on ${channelVideos[0].category || "various"} content. 
                        Join ${subscriberCount} and discover great videos.`
                      : "Channel information not available."}
                  </p>
                  
                  <div className="mt-8">
                    <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
                      Details
                    </h3>
                    <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      Location: Worldwide
                    </p>
                  </div>
                </div>
                
                <div className="bg-secondary dark:bg-zinc-800 rounded-xl p-4">
                  <h3 className={`text-md font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
                    Stats
                  </h3>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-2`}>
                    Joined: January 2022
                  </p>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-2`}>
                    {subscriberCount}
                  </p>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-4`}>
                    {Math.floor(Math.random() * 10000000).toLocaleString()} views
                  </p>
                  
                  <div className="border-t dark:border-gray-700 pt-4 mt-2">
                    <a 
                      href={`https://youtube.com/channel/${encodeURIComponent(channelName || "")}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>Visit channel on YouTube</span>
                      <ExternalLinkIcon className="h-4 w-4 ml-1" />
                    </a>
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