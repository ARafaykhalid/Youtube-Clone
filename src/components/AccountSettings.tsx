import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile, updateUserSettings } from '@/data/userData';
import { 
  User, 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  Languages, 
  HelpCircle,
  Shield,
  FileVideo,
  UserCog
} from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Switch } from './ui/switch';

interface AccountSettingsProps {
  onClose: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ onClose }) => {
  const { theme, setTheme } = useTheme();
  const userData = getUserProfile();
  const [settings, setSettings] = useState(userData.settings);
  
  // Update theme when dark mode setting changes
  useEffect(() => {
    setTheme(settings.darkMode ? 'dark' : 'light');
  }, [settings.darkMode, setTheme]);
  
  const handleSettingChange = (setting: keyof typeof settings, value: boolean) => {
    setSettings(prev => {
      const newSettings = { ...prev, [setting]: value };
      // Save settings to user data
      updateUserSettings(newSettings);
      return newSettings;
    });
  };
  
  return (
    <div className="absolute top-14 right-4 w-80 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
      {/* User Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center">
          <img 
            src={userData.profilePicture} 
            alt={userData.displayName}
            className="h-10 w-10 rounded-full mr-3"
            onError={(e) => {
              const initial = userData.displayName.charAt(0).toUpperCase();
              const colors = ["4285F4", "DB4437", "F4B400", "0F9D58"];
              const colorIndex = userData.username.length % colors.length;
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${initial}&background=${colors[colorIndex]}&color=fff&size=40`;
            }}
          />
          <div>
            <h4 className="font-medium">{userData.displayName}</h4>
            <p className="text-sm text-muted-foreground">@{userData.username}</p>
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link 
            to="/my-channel"
            className="w-full py-1.5 px-3 text-sm text-center rounded-full bg-primary text-primary-foreground font-medium"
            onClick={onClose}
          >
            My Channel
          </Link>
          <Link 
            to="/channel/edit" 
            className="w-full py-1.5 px-3 text-sm text-center rounded-full bg-muted hover:bg-muted/80 font-medium"
            onClick={onClose}
          >
            Edit Channel
          </Link>
        </div>
      </div>
      
      {/* Menu items */}
      <div className="py-1">
        <MenuItem icon={<User className="h-4 w-4" />} label="Your channel" 
          to="/my-channel" onClick={onClose}
        />
        <MenuItem icon={<FileVideo className="h-4 w-4" />} label="Your videos" 
          to="/your-videos" onClick={onClose}
        />
        <MenuItem icon={<UserCog className="h-4 w-4" />} label="Settings" 
          to="/channel/edit?tab=settings" onClick={onClose}
        />
      </div>
      
      <div className="py-1 border-t">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            {theme === 'dark' ? (
              <Moon className="h-4 w-4 mr-3" />
            ) : (
              <Sun className="h-4 w-4 mr-3" />
            )}
            <span className="text-sm">Dark theme</span>
          </div>
          <Switch 
            checked={settings.darkMode}
            onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
          />
        </div>
        
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-4 w-4 mr-3" />
            <span className="text-sm">Restricted Mode</span>
          </div>
          <Switch 
            checked={settings.restrictedMode}
            onCheckedChange={(checked) => handleSettingChange('restrictedMode', checked)}
          />
        </div>
        
        <MenuItem icon={<Languages className="h-4 w-4" />} label="Language: English" to="#" />
        <MenuItem icon={<HelpCircle className="h-4 w-4" />} label="Help" to="#" />
      </div>
      
      <div className="py-1 border-t">
        <MenuItem 
          icon={<LogOut className="h-4 w-4" />} 
          label="Sign out" 
          to="#"
          onClick={() => {
            // This is a demo so we don't actually sign out, just close the menu
            onClose();
          }}
        />
      </div>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, to, onClick }) => {
  return (
    <Link 
      to={to}
      className="flex items-center px-4 py-2 hover:bg-muted w-full"
      onClick={onClick}
    >
      <span className="mr-3 text-muted-foreground">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
};

export default AccountSettings;
