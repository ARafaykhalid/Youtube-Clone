
import React from 'react';
import { Moon, Sun, Laptop, User, LogOut, Settings } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const AccountSettings = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark' | 'system');
    
    const themeLabel = value === 'system' 
      ? 'System' 
      : `${value.charAt(0).toUpperCase() + value.slice(1)}`;
    
    toast({
      title: `${themeLabel} mode activated`,
      description: `You've switched to ${value === 'system' ? 'system default' : value} mode.`
    });
  };

  const handleLogout = () => {
    toast({
      title: "Not implemented",
      description: "Logout functionality is not implemented yet."
    });
  };

  return (
    <div className="p-4 bg-background text-foreground">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Account Settings</h3>
        <Settings className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <div className="flex items-center gap-3 py-2">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          <User className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">YouTube User</p>
          <p className="text-sm text-muted-foreground">youtubeuser@example.com</p>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-3">Appearance</h4>
          <RadioGroup 
            value={theme} 
            onValueChange={handleThemeChange}
            className="grid grid-cols-3 gap-2"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-white border flex items-center justify-center dark:border-gray-600">
                <Sun className="h-5 w-5 text-amber-500" />
              </div>
              <RadioGroupItem 
                value="light" 
                id="theme-light" 
                className="sr-only" 
              />
              <Label 
                htmlFor="theme-light"
                className={`text-xs cursor-pointer ${theme === 'light' ? 'font-bold' : ''}`}
              >
                Light
              </Label>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-gray-900 border flex items-center justify-center dark:border-gray-600">
                <Moon className="h-5 w-5 text-gray-200" />
              </div>
              <RadioGroupItem 
                value="dark" 
                id="theme-dark" 
                className="sr-only" 
              />
              <Label 
                htmlFor="theme-dark"
                className={`text-xs cursor-pointer ${theme === 'dark' ? 'font-bold' : ''}`}
              >
                Dark
              </Label>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white to-gray-900 border flex items-center justify-center dark:border-gray-600">
                <Laptop className="h-5 w-5 text-blue-500" />
              </div>
              <RadioGroupItem 
                value="system" 
                id="theme-system" 
                className="sr-only" 
              />
              <Label 
                htmlFor="theme-system"
                className={`text-xs cursor-pointer ${theme === 'system' ? 'font-bold' : ''}`}
              >
                System
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start gap-2" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </Button>
      </div>
    </div>
  );
};

export default AccountSettings;
