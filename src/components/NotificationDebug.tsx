import React from 'react';
import { Button } from './ui/button';
import { 
  generateRandomNotification, 
  resetNotificationsToDefault,
  generateTestNotifications,
  markAllNotificationsAsRead,
  clearAllNotifications
} from '@/data/notifications';
import { 
  Bell, 
  Plus, 
  RefreshCw, 
  Trash, 
  Check,
  PlusSquare
} from 'lucide-react';

/**
 * Debug component for testing notification functionality.
 * This component should only be rendered in development or testing environments.
 */
const NotificationDebug: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-zinc-900 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="font-medium text-sm mb-2 flex items-center">
        <Bell className="w-4 h-4 mr-1" />
        Notification Debug
      </h3>
      <div className="flex flex-col gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center justify-start"
          onClick={() => generateRandomNotification()}
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Random
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center justify-start"
          onClick={() => generateTestNotifications(5)}
        >
          <PlusSquare className="w-3 h-3 mr-1" />
          Add 5 Notifications
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center justify-start"
          onClick={() => markAllNotificationsAsRead()}
        >
          <Check className="w-3 h-3 mr-1" />
          Mark All Read
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center justify-start"
          onClick={() => resetNotificationsToDefault()}
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Reset to Default
        </Button>
        
        <Button 
          variant="destructive" 
          size="sm" 
          className="flex items-center justify-start"
          onClick={() => clearAllNotifications()}
        >
          <Trash className="w-3 h-3 mr-1" />
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default NotificationDebug; 