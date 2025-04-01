import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  PlaySquare, 
  Clock, 
  ThumbsUp, 
  History,
  Library,
  Film,
  Music,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Flame,
  Code,
  Bot,
  Smartphone,
  Palette,
  Sparkles,
  Microscope,
  Utensils,
  Plane,
  Dumbbell,
  Camera,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { subscribedChannels } from '@/data/videos';
import { toast } from 'sonner';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  // Close sidebar on navigation for mobile
  useEffect(() => {
    // This is just a mock implementation since we can't directly modify the isOpen prop
    // The actual parent component should handle this
    const isMobile = window.innerWidth < 768;
    if (isMobile && isOpen) {
      // We'd ideally call a setter here, but this is just a placeholder
      // This effect is more for documentation of what should happen
    }
  }, [location.pathname, isOpen]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleUnimplementedCategory = () => {
    toast.info("This category is under construction. You can contribute to this feature!");
  };
  
  return (
    <aside className={cn(
      "fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-background z-30 transition-all duration-300 shadow-md md:shadow-none",
      isOpen ? "w-60 translate-x-0" : "w-[72px] translate-x-0 md:translate-x-0 -translate-x-full"
    )}>
      <div className="overflow-y-auto h-full pb-24 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        <div className="py-2 px-1">
          {/* Main Navigation */}
          <div className="mb-4">
            <MenuItem to="/" icon={<Home />} label="Home" isOpen={isOpen} isActive={isActive("/")} />
            <MenuItem to="/explore" icon={<Compass />} label="Explore" isOpen={isOpen} isActive={isActive("/explore")} />
            <MenuItem to="/shorts" icon={<Flame />} label="Shorts" isOpen={isOpen} isActive={isActive("/shorts")} />
            <MenuItem to="/subscriptions" icon={<PlaySquare />} label="Subscriptions" isOpen={isOpen} isActive={isActive("/subscriptions")} />
          </div>

          {/* Divider */}
          {isOpen && <div className="mx-4 my-2 border-t border-gray-200 dark:border-gray-700"></div>}

          {/* Library Section */}
          <div className="mb-4">
            <MenuItem to="/library" icon={<Library />} label="Library" isOpen={isOpen} isActive={isActive("/library")} />
            <MenuItem to="/library?tab=history" icon={<History />} label="History" isOpen={isOpen} isActive={location.pathname === "/library" && location.search.includes("history")} />
            <MenuItem to="/your-videos" icon={<PlaySquare />} label="Your videos" isOpen={isOpen} isActive={isActive("/your-videos")} />
            <MenuItem to="/my-channel" icon={<User />} label="Your channel" isOpen={isOpen} isActive={isActive("/my-channel")} />
            <MenuItem to="/library?tab=saved" icon={<Clock />} label="Watch later" isOpen={isOpen} isActive={location.pathname === "/library" && location.search.includes("saved")} />
            <MenuItem to="/library?tab=liked" icon={<ThumbsUp />} label="Liked videos" isOpen={isOpen} isActive={location.pathname === "/library" && location.search.includes("liked")} />
          </div>

          {/* Divider */}
          {isOpen && <div className="mx-4 my-2 border-t border-gray-200 dark:border-gray-700"></div>}

          {/* Subscriptions - Only show names if sidebar is open */}
          <div className="mb-4">
            {isOpen && <h3 className="px-4 mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">SUBSCRIPTIONS</h3>}
            {subscribedChannels.map((channel, index) => (
              <ChannelMenuItem 
                key={index}
                channelName={channel.name} 
                imageUrl={channel.imageUrl} 
                isOpen={isOpen} 
              />
            ))}
            {subscribedChannels.length === 0 && isOpen && (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No subscriptions yet
              </div>
            )}
          </div>

          {/* Divider */}
          {isOpen && <div className="mx-4 my-2 border-t border-gray-200 dark:border-gray-700"></div>}

          {/* Explore Section */}
          <div className="mb-4">
            {isOpen && <h3 className="px-4 mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">EXPLORE</h3>}
            <MenuItem to="/movies" icon={<Film />} label="Movies & TV" isOpen={isOpen} isActive={isActive("/movies")} />
            <MenuItem to="/gaming" icon={<Gamepad2 />} label="Gaming" isOpen={isOpen} isActive={isActive("/gaming")} />
            <MenuItem to="/news" icon={<Newspaper />} label="News" isOpen={isOpen} isActive={isActive("/news")} />
            <MenuItem to="/sports" icon={<Trophy />} label="Sports" isOpen={isOpen} isActive={isActive("/sports")} />
            <MenuItem to="/learning" icon={<Lightbulb />} label="Learning" isOpen={isOpen} isActive={isActive("/learning")} />
            <MenuItem to="/music" icon={<Music />} label="Music" isOpen={isOpen} isActive={isActive("/music")} />
            <MenuItem to="/coding" icon={<Code />} label="Coding" isOpen={isOpen} isActive={isActive("/coding")} />
            <MenuItem to="/tech" icon={<Smartphone />} label="Tech" isOpen={isOpen} isActive={isActive("/tech")} />
            <MenuItem to="/design" icon={<Palette />} label="Design" isOpen={isOpen} isActive={isActive("/design")} />
            <MenuItem to="/entertainment" icon={<Sparkles />} label="Entertainment" isOpen={isOpen} isActive={isActive("/entertainment")} />
            <MenuItem to="/science" icon={<Microscope />} label="Science" isOpen={isOpen} isActive={isActive("/science")} />
            <MenuItem to="/cooking" icon={<Utensils />} label="Cooking" isOpen={isOpen} isActive={isActive("/cooking")} />
            <MenuItem to="/travel" icon={<Plane />} label="Travel" isOpen={isOpen} isActive={isActive("/travel")} />
            <MenuItem to="/fitness" icon={<Dumbbell />} label="Fitness" isOpen={isOpen} isActive={isActive("/fitness")} />
            <MenuItem to="/photography" icon={<Camera />} label="Photography" isOpen={isOpen} isActive={isActive("/photography")} />
          </div>
        </div>
      </div>
    </aside>
  );
};

interface MenuItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, icon, label, isOpen, isActive, onClick }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center py-2 px-4 rounded-md my-1",
        isActive 
          ? "bg-gray-100 dark:bg-gray-800" 
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
      onClick={onClick}
    >
      <span className={cn(
        "text-gray-700 dark:text-gray-300",
        isActive && "font-semibold"
      )}>{icon}</span>
      {isOpen && (
        <span className={cn(
          "ml-5 text-sm text-gray-700 dark:text-gray-300 truncate",
          isActive && "font-semibold"
        )}>
          {label}
        </span>
      )}
    </Link>
  );
};

interface ChannelMenuItemProps {
  channelName: string;
  imageUrl: string;
  isOpen: boolean;
}

const ChannelMenuItem: React.FC<ChannelMenuItemProps> = ({ channelName, imageUrl, isOpen }) => {
  return (
    <Link to={`/channel/${encodeURIComponent(channelName)}`} className="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md my-1">
      <img 
        src={imageUrl} 
        alt={channelName} 
        className="w-6 h-6 rounded-full channel-avatar object-cover"
        onError={(e) => {
          const initial = channelName.charAt(0).toUpperCase();
          const colors = ["4285F4", "DB4437", "F4B400", "0F9D58", "4285F4", "DB4437"];
          const colorIndex = channelName.length % colors.length;
          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${initial}&background=${colors[colorIndex]}&color=fff&size=24`;
          (e.target as HTMLImageElement).onerror = null;
        }} 
      />
      {isOpen && <span className="ml-5 text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{channelName}</span>}
    </Link>
  );
};

export default Sidebar;
