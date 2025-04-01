import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoGrid from "@/components/VideoGrid";
import { getUserProfile, updateUserProfile } from "@/data/userData";
import { getUserVideos, type Video } from "@/data/videos";
import { PencilIcon, ShareIcon, UploadIcon } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const MyChannel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userProfile, setUserProfile] = useState(getUserProfile());
  const [userVideos, setUserVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // Load user videos from local storage
    const videos = getUserVideos();
    setUserVideos(videos);
    
    // Refresh user profile data
    setUserProfile(getUserProfile());
    
    // Auto-close sidebar on mobile
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Initial check
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    setLoading(false);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEditChannel = () => {
    navigate("/channel/edit");
  };

  const handleUpload = () => {
    navigate("/upload");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Channel link copied to clipboard!");
  };

  // Placeholder data for tabs that aren't implemented yet
  const handleTabChange = (value: string) => {
    if (value !== "videos" && value !== "about") {
      toast.info(`${value.charAt(0).toUpperCase() + value.slice(1)} tab coming soon!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`pt-14 pb-12 transition-all duration-300 ${
          isSidebarOpen ? "ml-0 md:ml-60" : "ml-0 md:ml-[72px]"
        }`}>
          <div className="flex justify-center items-center min-h-[80vh]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <main className={`pt-14 pb-12 transition-all duration-300 ${
        isSidebarOpen ? "ml-0 md:ml-60" : "ml-0 md:ml-[72px]"
      }`}>
        {/* Channel Banner */}
        <div className="relative w-full h-28 sm:h-40 bg-gradient-to-r from-blue-500 to-purple-600 mb-16 sm:mb-16">
          {userProfile.bannerUrl && (
            <img 
              src={userProfile.bannerUrl}
              alt="Channel Banner"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          
          {/* Channel Avatar */}
          <div className="absolute -bottom-10 sm:-bottom-12 left-4 sm:left-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden bg-gray-200 dark:bg-gray-700 z-10">
            {userProfile.profilePicture ? (
              <img 
                src={userProfile.profilePicture} 
                alt={userProfile.displayName || "User"} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // If image fails to load, create a placeholder with initials
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const initials = (userProfile.displayName || "User").split(" ")
                      .map(n => n[0])
                      .join("")
                      .toUpperCase()
                      .substring(0, 2);
                    
                    const div = document.createElement("div");
                    div.className = "w-full h-full flex items-center justify-center text-xl font-bold text-white";
                    div.textContent = initials;
                    parent.appendChild(div);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl font-bold text-white">
                {(userProfile.displayName || "User").split(" ")
                  .map(n => n[0])
                  .join("")
                  .toUpperCase()
                  .substring(0, 2)}
              </div>
            )}
          </div>
        </div>
        
        {/* Channel Info */}
        <div className="px-4 sm:px-8 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end">
            <div className="mb-4 sm:mb-0 pt-2 sm:pt-0">
              <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-white">{userProfile.displayName || "My Channel"}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                @{userProfile.username || "username"} • {userVideos.length} videos • {userProfile.subscribers || 0} subscribers
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="rounded-full text-xs"
              >
                <ShareIcon className="mr-1 h-3 w-3" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleEditChannel}
                className="rounded-full text-xs flex-grow sm:flex-grow-0"
              >
                <PencilIcon className="mr-1 h-3 w-3" />
                Customize Channel
              </Button>
              <Button 
                size="sm" 
                onClick={handleUpload}
                className="rounded-full text-xs flex-grow sm:flex-grow-0 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <UploadIcon className="mr-1 h-3 w-3" />
                Upload
              </Button>
            </div>
          </div>
        </div>
        
        {/* Channel Tabs */}
        <div className="mt-6 px-4 sm:px-8">
          <Tabs defaultValue="videos" onValueChange={handleTabChange}>
            <div className="border-b border-gray-200 dark:border-gray-700">
              <TabsList className="mb-0 w-full sm:w-auto flex overflow-x-auto bg-transparent">
                <TabsTrigger value="videos" className="flex-1 sm:flex-none text-sm font-medium pb-3 pt-1 px-1 sm:px-4">Videos</TabsTrigger>
                <TabsTrigger value="playlists" className="flex-1 sm:flex-none text-sm font-medium pb-3 pt-1 px-1 sm:px-4">Playlists</TabsTrigger>
                <TabsTrigger value="community" className="flex-1 sm:flex-none text-sm font-medium pb-3 pt-1 px-1 sm:px-4">Community</TabsTrigger>
                <TabsTrigger value="about" className="flex-1 sm:flex-none text-sm font-medium pb-3 pt-1 px-1 sm:px-4">About</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="videos" className="pt-6">
              {userVideos.length > 0 ? (
                <VideoGrid videos={userVideos} />
              ) : (
                <div className="flex flex-col items-center justify-center py-24 px-4 min-h-[50vh]">
                  <h3 className="text-xl text-black dark:text-white font-semibold mb-2">No videos yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">Your uploaded videos will appear here</p>
                  <Button 
                    onClick={handleUpload} 
                    variant="outline"
                    className="rounded-full px-6 py-2 flex items-center font-medium"
                  >
                    <UploadIcon className="mr-2 h-5 w-5" />
                    Upload Video
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="about">
              <div className="max-w-3xl py-4">
                <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Description</h3>
                <p className="mb-6 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                  {userProfile.description || userProfile.bio || "No description yet. Edit your channel to add a description."}
                </p>
                
                <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Details</h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><span className="text-gray-600 dark:text-gray-400">Joined: </span>
                    {userProfile.joinDate ? new Date(userProfile.joinDate).toLocaleDateString() : "Unknown"}
                  </p>
                  <p><span className="text-gray-600 dark:text-gray-400">Total views: </span>
                    {userProfile.totalViews?.toLocaleString() || "0"}
                  </p>
                  <p><span className="text-gray-600 dark:text-gray-400">Location: </span>
                    {userProfile.location || "Not specified"}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MyChannel; 