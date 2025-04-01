import React from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut, Moon, Sun, HelpCircle } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/hooks/use-theme';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface AccountSettingsProps {
  onClose: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ onClose }) => {
  const { theme, setTheme } = useTheme();
  
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark' | 'system');
    
    const themeLabel = value === 'system' 
      ? 'System' 
      : `${value.charAt(0).toUpperCase() + value.slice(1)}`;
    
    toast(`${themeLabel} mode activated`);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-transparent" 
      onClick={handleOutsideClick}
    >
      <div className="absolute top-14 right-4 w-80 bg-background border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* User info */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage 
                src="https://github.com/shadcn.png" 
                alt="User profile"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40x40?text=User';
                }}
              />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">Your Name</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">example@email.com</p>
            </div>
          </div>
          <Link 
            to="/account" 
            className="mt-3 block text-sm text-blue-600 dark:text-blue-400 hover:underline"
            onClick={onClose}
          >
            Manage your Google Account
          </Link>
        </div>
        
        {/* Menu items */}
        <div className="py-2">
          <MenuItem icon={<User className="h-5 w-5" />} text="Your channel" to="/channel/Your%20Name" onClick={onClose} />
          <MenuItem icon={<Settings className="h-5 w-5" />} text="Settings" to="/settings" onClick={onClose} />
          
          {/* Theme toggle */}
          <button 
            className="w-full flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 mr-3 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 mr-3 text-gray-700 dark:text-gray-300" />
            )}
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
          
          <MenuItem icon={<HelpCircle className="h-5 w-5" />} text="Help" to="/help" onClick={onClose} />
          <MenuItem icon={<LogOut className="h-5 w-5" />} text="Sign out" to="/logout" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, to, onClick }) => {
  return (
    <Link 
      to={to} 
      className="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={onClick}
    >
      <span className="mr-3 text-gray-700 dark:text-gray-300">{icon}</span>
      <span>{text}</span>
    </Link>
  );
};

export default AccountSettings;
