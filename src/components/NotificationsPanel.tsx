import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { Button } from './ui/button';
import { 
  Notification, 
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications
} from '@/data/notifications';

interface NotificationsPanelProps {
  onClose: () => void;
  onUpdate?: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ onClose, onUpdate }) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  
  React.useEffect(() => {
    // Get notifications when component mounts
    setNotifications(getNotifications());
  }, []);

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    // Update local state to reflect changes
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
    // Call onUpdate if provided
    if (onUpdate) onUpdate();
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
    // Update local state
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    // Call onUpdate if provided
    if (onUpdate) onUpdate();
  };

  const handleDeleteNotification = (notificationId: string) => {
    deleteNotification(notificationId);
    // Update local state
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
    // Call onUpdate if provided
    if (onUpdate) onUpdate();
  };

  const handleClearAll = () => {
    clearAllNotifications();
    // Update local state
    setNotifications([]);
    // Call onUpdate if provided
    if (onUpdate) onUpdate();
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'upload':
        return '📹';
      case 'comment':
        return '💬';
      case 'subscription':
        return '📢';
      case 'recommendation':
        return '🎯';
      case 'update':
        return '🎉';
      default:
        return '🔔';
    }
  };

  // Get correct video URL based on notification type
  const getVideoUrl = (notification: Notification) => {
    if (!notification.videoId) return '';
    
    // If it's a shorts notification, use shorts URL
    if (notification.type === 'upload' && notification.message.toLowerCase().includes('short')) {
      return `/shorts/${notification.videoId}`;
    }
    
    // For regular videos, use video URL
    return `/video/${notification.videoId}`;
  };

  return (
    <div className="absolute top-14 right-0 w-80 sm:w-96 bg-background border border-border rounded-lg shadow-lg z-50 max-h-[80vh] overflow-auto">
      <div className="sticky top-0 flex items-center justify-between p-4 border-b bg-background z-10">
        <h3 className="font-medium text-lg">Notifications</h3>
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleMarkAllAsRead}
            title="Mark all as read"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearAll}
            title="Clear all notifications"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            title="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Bell className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-600 dark:text-gray-400">No notifications</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            We'll notify you when something arrives
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`flex p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors relative ${
                !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
              }`}
            >
              <div className="flex-shrink-0 mr-3">
                {notification.channelImageUrl ? (
                  <img 
                    src={notification.channelImageUrl} 
                    alt={notification.channelName} 
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${notification.channelName.charAt(0)}&background=random&color=fff&size=40`;
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                {notification.videoId ? (
                  <Link 
                    to={getVideoUrl(notification)} 
                    onClick={() => {
                      handleMarkAsRead(notification.id);
                      onClose();
                    }}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-lg mr-2">{getNotificationIcon(notification.type)}</span>
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification.timestamp}</span>
                    </div>
                  </Link>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <span className="text-lg mr-2">{getNotificationIcon(notification.type)}</span>
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification.timestamp}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col ml-2 gap-1">
                {!notification.isRead && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => handleMarkAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <div className="bg-blue-500 rounded-full h-2 w-2"></div>
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDeleteNotification(notification.id);
                  }}
                  title="Remove"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel; 