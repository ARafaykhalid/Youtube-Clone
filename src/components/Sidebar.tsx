import React from 'react';
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
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <aside className={cn(
      "fixed top-14 left-0 h-full bg-sidebar z-20 transition-all duration-300",
      isOpen ? "w-60" : "w-[72px]"
    )}>
      <div className="overflow-y-auto h-full pb-20">
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
            <MenuItem to="/library?tab=saved" icon={<Clock />} label="Watch later" isOpen={isOpen} isActive={location.pathname === "/library" && location.search.includes("saved")} />
            <MenuItem to="/library?tab=liked" icon={<ThumbsUp />} label="Liked videos" isOpen={isOpen} isActive={location.pathname === "/library" && location.search.includes("liked")} />
          </div>

          {/* Divider */}
          {isOpen && <div className="mx-4 my-2 border-t border-gray-200 dark:border-gray-700"></div>}

          {/* Subscriptions - Only show if sidebar is open */}
          {isOpen && (
            <div className="mb-4">
              <h3 className="px-4 mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">SUBSCRIPTIONS</h3>
              <ChannelMenuItem channelName="CodeMaster" imageUrl="https://randomuser.me/api/portraits/men/32.jpg" isOpen={isOpen} />
              <ChannelMenuItem channelName="JS Tutorials" imageUrl="https://randomuser.me/api/portraits/women/44.jpg" isOpen={isOpen} />
              <ChannelMenuItem channelName="WebDev Pro" imageUrl="https://randomuser.me/api/portraits/women/68.jpg" isOpen={isOpen} />
              <ChannelMenuItem channelName="Design Masters" imageUrl="https://randomuser.me/api/portraits/men/51.jpg" isOpen={isOpen} />
            </div>
          )}

          {/* Divider */}
          {isOpen && <div className="mx-4 my-2 border-t border-gray-200 dark:border-gray-700"></div>}

          {/* Explore Section */}
          {isOpen && (
            <div className="mb-4">
              <h3 className="px-4 mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">EXPLORE</h3>
              <MenuItem to="/movies" icon={<Film />} label="Movies & TV" isOpen={isOpen} isActive={isActive("/movies")} />
              <MenuItem to="/gaming" icon={<Gamepad2 />} label="Gaming" isOpen={isOpen} isActive={isActive("/gaming")} />
              <MenuItem to="/news" icon={<Newspaper />} label="News" isOpen={isOpen} isActive={isActive("/news")} />
              <MenuItem to="/sports" icon={<Trophy />} label="Sports" isOpen={isOpen} isActive={isActive("/sports")} />
              <MenuItem to="/learning" icon={<Lightbulb />} label="Learning" isOpen={isOpen} isActive={isActive("/learning")} />
              <MenuItem to="/music" icon={<Music />} label="Music" isOpen={isOpen} isActive={isActive("/music")} />
            </div>
          )}
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
}

const MenuItem: React.FC<MenuItemProps> = ({ to, icon, label, isOpen, isActive }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center py-2 px-4 rounded-md my-1",
        isActive 
          ? "bg-gray-100 dark:bg-gray-800" 
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
    >
      <span className={cn(
        "text-gray-700 dark:text-gray-300",
        isActive && "font-semibold"
      )}>{icon}</span>
      {isOpen && (
        <span className={cn(
          "ml-5 text-sm text-gray-700 dark:text-gray-300",
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
    <Link to={`/channel/${channelName}`} className="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md my-1">
      <img src={imageUrl} alt={channelName} className="w-6 h-6 rounded-full object-cover" />
      {isOpen && <span className="ml-5 text-sm font-medium text-gray-700 dark:text-gray-300">{channelName}</span>}
    </Link>
  );
};

export default Sidebar;
