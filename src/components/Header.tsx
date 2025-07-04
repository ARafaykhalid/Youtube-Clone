import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Video, User, Sun, Moon, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useTheme } from '@/hooks/use-theme';
import AccountSettings from './AccountSettings';
import NotificationsPanel from './NotificationsPanel';
import { longVideos } from '@/data/longVideos';
import { shortsVideos } from '@/data/shortsVideos';
import { 
  getUnreadNotificationsCount, 
  initializeNotifications 
} from '@/data/notifications';
import { getUserProfile } from '@/data/userData';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const accountSettingsRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const userProfile = getUserProfile();

  // Initialize notifications when component mounts
  useEffect(() => {
    initializeNotifications();
    updateNotificationCount();
    
    // Check for new notifications periodically
    const interval = setInterval(() => {
      updateNotificationCount();
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);
  
  // Update notification count
  const updateNotificationCount = () => {
    setUnreadNotifications(getUnreadNotificationsCount());
  };

  // Handle clicks outside search suggestions, notifications panel, and account settings
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchSuggestions(false);
      }
      
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node) && showNotifications) {
        setShowNotifications(false);
      }
      
      if (accountSettingsRef.current && !accountSettingsRef.current.contains(e.target as Node) && showAccountSettings) {
        setShowAccountSettings(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications, showAccountSettings]);

  // Generate search suggestions when typing
  useEffect(() => {
    if (searchQuery.length > 1) {
      // Combine videos from both long videos and shorts
      const allVideos = [...longVideos, ...shortsVideos];
      
      const filteredSuggestions = allVideos
        .filter(video => 
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.channelName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(video => video.title)
        .slice(0, 6);
      
      // Add some common YouTube search patterns
      const extraSuggestions = [
        `${searchQuery} tutorial`,
        `${searchQuery} review`,
        `how to ${searchQuery}`,
      ].filter(s => s.toLowerCase() !== searchQuery.toLowerCase());
      
      const allSuggestions = [...new Set([...filteredSuggestions, ...extraSuggestions])].slice(0, 6);
      setSearchSuggestions(allSuggestions);
      setShowSearchSuggestions(allSuggestions.length > 0);
    } else {
      setShowSearchSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchSuggestions(false);
      setShowMobileSearch(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setShowSearchSuggestions(false);
    setShowMobileSearch(false);
  };

  const toggleAccountSettings = () => {
    setShowAccountSettings(!showAccountSettings);
    // Close notifications if it's open
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Close account settings if it's open
    if (showAccountSettings) setShowAccountSettings(false);
    // Reset unread count when opening notifications
    if (!showNotifications) {
      updateNotificationCount();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-background z-50 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-2 sm:px-4">
      {/* Left section - Logo and menu */}
      {!showMobileSearch ? (
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center">
            <svg viewBox="0 0 90 20" width="90" height="20" className={theme === 'dark' ? 'fill-white' : 'fill-black'}>
              <g>
                <path 
                  d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" 
                  fill="#FF0000"
                ></path>
                <path 
                  d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" 
                  fill="white"
                ></path>
              </g>
              <g className={theme === 'dark' ? 'fill-white' : 'fill-black'}>
                <path d="M34.6024 13.0036L31.3945 1.41846H34.1932L35.3174 6.6701C35.6043 7.96361 35.8136 9.06662 35.95 9.97913H36.0323C36.1264 9.32532 36.3381 8.22937 36.665 6.68892L37.8291 1.41846H40.6278L37.3799 13.0036V18.561H34.6001V13.0036H34.6024Z"></path>
                <path d="M41.4697 18.1937C40.9053 17.8127 40.5031 17.22 40.2632 16.4157C40.0257 15.6114 39.9058 14.5437 39.9058 13.2078V11.3898C39.9058 10.0422 40.0422 8.95805 40.315 8.14196C40.5878 7.32588 41.0135 6.72851 41.592 6.35457C42.1706 5.98063 42.9302 5.79248 43.871 5.79248C44.7976 5.79248 45.5384 5.98298 46.0981 6.36398C46.6555 6.74497 47.0647 7.34234 47.3234 8.15137C47.5821 8.96275 47.7115 10.0422 47.7115 11.3898V13.2078C47.7115 14.5437 47.5845 15.6161 47.3329 16.4251C47.0812 17.2365 46.672 17.8292 46.1075 18.2031C45.5431 18.5771 44.7764 18.7652 43.8098 18.7652C42.8126 18.7675 42.0342 18.5747 41.4697 18.1937ZM44.6353 16.2323C44.7905 15.8231 44.8705 15.1575 44.8705 14.2309V10.3292C44.8705 9.43077 44.7929 8.77225 44.6353 8.35833C44.4777 7.94206 44.2026 7.7351 43.8074 7.7351C43.4265 7.7351 43.156 7.94206 43.0008 8.35833C42.8432 8.77461 42.7656 9.43077 42.7656 10.3292V14.2309C42.7656 15.1575 42.8408 15.8254 42.9914 16.2323C43.1419 16.6415 43.4123 16.8461 43.8074 16.8461C44.2026 16.8461 44.4777 16.6415 44.6353 16.2323Z"></path>
                <path d="M56.8154 18.5634H54.6094L54.3648 17.03H54.3037C53.7039 18.1871 52.8055 18.7656 51.6061 18.7656C50.7759 18.7656 50.1621 18.4928 49.767 17.9496C49.3719 17.4039 49.1743 16.5526 49.1743 15.3955V6.03751H51.9942V15.2308C51.9942 15.7906 52.0553 16.188 52.1776 16.4256C52.2999 16.6631 52.5045 16.783 52.7914 16.783C53.036 16.783 53.2712 16.7078 53.497 16.5573C53.7228 16.4068 53.8874 16.2162 53.9979 15.9858V6.03516H56.8154V18.5634Z"></path>
                <path d="M64.4755 3.68758H61.6768V18.5629H58.9181V3.68758H56.1194V1.42041H64.4755V3.68758Z"></path>
                <path d="M71.2768 18.5634H69.0708L68.8262 17.03H68.7651C68.1654 18.1871 67.267 18.7656 66.0675 18.7656C65.2373 18.7656 64.6235 18.4928 64.2284 17.9496C63.8333 17.4039 63.6357 16.5526 63.6357 15.3955V6.03751H66.4556V15.2308C66.4556 15.7906 66.5167 16.188 66.639 16.4256C66.7613 16.6631 66.9659 16.783 67.2529 16.783C67.4974 16.783 67.7326 16.7078 67.9584 16.5573C68.1842 16.4068 68.3488 16.2162 68.4593 15.9858V6.03516H71.2768V18.5634Z"></path>
                <path d="M80.609 8.0387C80.4373 7.24849 80.1621 6.67699 79.7812 6.32186C79.4002 5.96674 78.8757 5.79035 78.2078 5.79035C77.6904 5.79035 77.2059 5.93616 76.7567 6.23014C76.3075 6.52412 75.9594 6.90747 75.7148 7.38489H75.6937V0.785645H72.9773V18.5608H75.3056L75.5925 17.3755H75.6537C75.8724 17.7988 76.1993 18.1304 76.6344 18.3774C77.0695 18.622 77.554 18.7443 78.0855 18.7443C79.038 18.7443 79.7412 18.3045 80.1904 17.4272C80.6396 16.5476 80.8653 15.1765 80.8653 13.3092V11.3266C80.8653 9.92722 80.7783 8.82892 80.609 8.0387ZM78.0243 13.1492C78.0243 14.0617 77.9867 14.7767 77.9114 15.2941C77.8362 15.8115 77.7115 16.1808 77.5328 16.3971C77.3564 16.6158 77.1165 16.724 76.8178 16.724C76.585 16.724 76.371 16.6699 76.1734 16.5594C75.9759 16.4512 75.816 16.2866 75.6937 16.0702V8.96062C75.7877 8.6196 75.9524 8.34209 76.1852 8.12337C76.4157 7.90465 76.6697 7.79646 76.9401 7.79646C77.2271 7.79646 77.4481 7.90935 77.6034 8.13278C77.7609 8.35855 77.8691 8.73485 77.9303 9.26636C77.9914 9.79787 78.022 10.5528 78.022 11.5335V13.1492H78.0243Z"></path>
                <path d="M84.8657 13.8712C84.8657 14.6755 84.8892 15.2776 84.9363 15.6798C84.9833 16.0819 85.0821 16.3736 85.2326 16.5594C85.3831 16.7428 85.6136 16.8345 85.9264 16.8345C86.3474 16.8345 86.639 16.6699 86.8003 16.343C86.9617 16.0161 87.0421 15.4705 87.0421 14.7085V14.3298H89.4817V14.7872C89.4817 16.2864 89.0512 17.4394 88.1904 18.2451C87.3295 19.0508 86.0706 19.4536 84.4139 19.4536C82.5563 19.4536 81.2368 18.9035 80.4609 17.8011C79.6851 16.6987 79.2988 15.1304 79.2988 13.0937V11.2266C79.2988 9.12421 79.6898 7.52175 80.4703 6.41276C81.2508 5.30377 82.5657 4.74905 84.4139 4.74905C85.3432 4.74905 86.1667 4.92543 86.8828 5.27591C87.599 5.62639 88.1575 6.18215 88.5585 6.9393C88.9619 7.69646 89.1637 8.67526 89.1637 9.8717V11.4025H84.9886V13.8712H84.8657ZM85.2326 7.96811C85.0845 8.14449 84.9886 8.43377 84.9363 8.83593C84.8839 9.2381 84.8657 9.84722 84.8657 10.6657V9.04542H86.9283V10.6657C86.9283 9.86133 86.9071 9.25221 86.8647 8.83593C86.8224 8.41966 86.7341 8.12803 86.5929 7.95635C86.4516 7.78702 86.1969 7.7 85.8264 7.7C85.4634 7.70235 85.3009 7.79173 85.2326 7.96811Z"></path>
              </g>
            </svg>
          </Link>
        </div>
      ) : null}

      {/* Middle section - Search */}
      <div 
        ref={searchRef} 
        className={`${
          showMobileSearch ? 'flex w-full justify-between items-center' : 'hidden md:flex'
        } relative items-center flex-1 mx-2 sm:mx-6 max-w-xl`}
      >
        {showMobileSearch && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2" 
            onClick={() => setShowMobileSearch(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}

        <form onSubmit={handleSearch} className="flex w-full">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search"
              className="w-full rounded-l-full rounded-r-none pr-10 focus-visible:ring-0 border-gray-300 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchSuggestions.length > 0) {
                  setShowSearchSuggestions(true);
                }
              }}
              autoFocus={showMobileSearch}
            />
            {searchQuery && (
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className="absolute top-1/2 right-2 transform -translate-y-1/2 h-4 w-4 p-0 text-gray-500"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Button 
            type="submit" 
            variant="outline" 
            className="rounded-l-none rounded-r-full border-l-0 px-5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        {/* Search suggestions */}
        {showSearchSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg z-50">
            {searchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Search className="h-4 w-4 mr-3 text-gray-500" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right section - Icons */}
      <div className="flex items-center space-x-1 sm:space-x-3">
        {!showMobileSearch && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowMobileSearch(true)}
            className="md:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>
        )}
        
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="hidden sm:flex">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="hidden sm:flex"
          onClick={() => {
            // Upload button functionality
            window.open('/my-channel', '_self');
          }}
        >
          <Video className="h-5 w-5" />
        </Button>
        
        <div ref={notificationsRef} className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:flex relative" 
            onClick={toggleNotifications}
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotifications > 9 ? '9+' : unreadNotifications}
              </span>
            )}
          </Button>
          {showNotifications && (
            <NotificationsPanel 
              onClose={() => setShowNotifications(false)} 
              onUpdate={updateNotificationCount}
            />
          )}
        </div>
        
        <div ref={accountSettingsRef} className="relative">
          <Button variant="ghost" size="icon" onClick={toggleAccountSettings} className="p-0 h-10 w-10">
            <div className="relative h-8 w-8">
              <Avatar className="h-8 w-8">
                <AvatarImage 
                  src={userProfile.profilePicture} 
                  alt={userProfile.displayName}
                  onError={(e) => {
                    // If image fails to load, create a placeholder with initials
                    const initial = userProfile.displayName.charAt(0).toUpperCase();
                    const colors = ["4285F4", "DB4437", "F4B400", "0F9D58"];
                    const colorIndex = userProfile.username.length % colors.length;
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${initial}&background=${colors[colorIndex]}&color=fff&size=40`;
                  }}
                />
                <AvatarFallback>
                  {(userProfile.displayName || "User").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </Button>
          {showAccountSettings && <AccountSettings onClose={() => setShowAccountSettings(false)} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
