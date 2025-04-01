import { toast } from 'sonner';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'upload' | 'comment' | 'subscription' | 'recommendation' | 'update';
  channelName: string;
  channelImageUrl?: string;
  videoId?: string;
}

// Default notifications shown when no saved notifications exist
const defaultNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'New Upload from Fireship',
    message: 'Check out "How to Build a Modern Website"',
    timestamp: '2 hours ago',
    isRead: false,
    type: 'upload',
    channelName: 'Fireship',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj',
    videoId: 'HPz8KIqwlIU'
  },
  {
    id: 'n2',
    title: 'Kevin Powell just uploaded',
    message: 'New CSS tricks to learn now',
    timestamp: '1 day ago',
    isRead: true,
    type: 'upload',
    channelName: 'Kevin Powell',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj',
    videoId: '3elGSZSWTbM'
  },
  {
    id: 'n3',
    title: 'New Short from ThePrimeagen',
    message: 'Quick tip: VSCode shortcuts you need',
    timestamp: '3 days ago',
    isRead: true,
    type: 'upload',
    channelName: 'ThePrimeagen',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKbK_0EEoAFVJI2O-VJ1rNSgGJvSvec9F5gD0-b7=s176-c-k-c0x00ffffff-no-rj',
    videoId: 'l61Hw30ZRZs'
  },
  {
    id: 'n4',
    title: 'Someone replied to your comment',
    message: 'Thanks for the tip! That helped me solve the problem.',
    timestamp: '1 week ago',
    isRead: true,
    type: 'comment',
    channelName: 'JavaScript Mastery',
    channelImageUrl: 'https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
  },
  {
    id: 'n5',
    title: 'You might like this',
    message: 'Based on your recent activity',
    timestamp: '2 days ago',
    isRead: false,
    type: 'recommendation',
    channelName: 'Web Dev Simplified',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s176-c-k-c0x00ffffff-no-rj',
    videoId: '4F2m91eKmJk'
  },
  {
    id: 'n6',
    title: 'New AI shorts video is trending!',
    message: 'Check out this short video from Two Minute Papers',
    timestamp: 'Just now',
    isRead: false,
    type: 'upload',
    channelName: 'Two Minute Papers',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKZxjBPiYCJNQ5xTi3skoXcgZpMfZVjkRZcgeVDg=s176-c-k-c0x00ffffff-no-rj',
    videoId: 'nP-sCrIBjzs'
  },
  {
    id: 'n7',
    title: 'Marques Brownlee just uploaded',
    message: 'New tech review: iPhone 15 Pro Max',
    timestamp: '5 hours ago',
    isRead: false,
    type: 'upload',
    channelName: 'Marques Brownlee',
    channelImageUrl: 'https://yt3.googleusercontent.com/Ikb1C4ih2VMvfjma8OO5b39JnHL2CQcQgksB_I7TM-gGA3ERTY589OIeoYXSgQgkKxJE_PmB=s176-c-k-c0x00ffffff-no-rj',
    videoId: 'IDDmrX0DYQY'
  },
  // New text-focused notifications
  {
    id: 'n8',
    title: 'Important Update from YouTube',
    message: 'We\'ve updated our terms of service. Please review the changes.',
    timestamp: '1 hour ago',
    isRead: false,
    type: 'update',
    channelName: 'YouTube',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKaqRiYjp7fY9JiI5pM4Oy1QFVOG-eKuynrQrD7Lyw=s176-c-k-c0x00ffffff-no-rj'
  },
  {
    id: 'n9',
    title: 'Your comment received 50 likes',
    message: 'Your comment on "How to Build a YouTube Clone" is getting attention',
    timestamp: '3 hours ago',
    isRead: false,
    type: 'comment',
    channelName: 'Fireship',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj',
    videoId: 'HPz8KIqwlIU'
  },
  {
    id: 'n10',
    title: 'Channel membership announcement',
    message: 'Thank you for being a valued subscriber! Check out our new membership perks.',
    timestamp: '1 day ago',
    isRead: false,
    type: 'update',
    channelName: 'Web Dev Simplified',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s176-c-k-c0x00ffffff-no-rj'
  },
  {
    id: 'n11',
    title: 'Live streaming schedule update',
    message: 'ThePrimeagen will be live streaming tomorrow at 3 PM ET - Set a reminder!',
    timestamp: '6 hours ago',
    isRead: false,
    type: 'update',
    channelName: 'ThePrimeagen',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKbK_0EEoAFVJI2O-VJ1rNSgGJvSvec9F5gD0-b7=s176-c-k-c0x00ffffff-no-rj'
  },
  {
    id: 'n12',
    title: 'Your video hit 1,000 views!',
    message: 'Congratulations! Your upload "My First Coding Project" reached 1,000 views.',
    timestamp: '2 days ago',
    isRead: false,
    type: 'update',
    channelName: 'YouTube',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKaqRiYjp7fY9JiI5pM4Oy1QFVOG-eKuynrQrD7Lyw=s176-c-k-c0x00ffffff-no-rj'
  },
  {
    id: 'n13',
    title: 'Creator Studio Tip',
    message: 'Try our new analytics dashboard to track your channel\'s performance in real time.',
    timestamp: '4 days ago',
    isRead: false,
    type: 'update',
    channelName: 'YouTube',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKaqRiYjp7fY9JiI5pM4Oy1QFVOG-eKuynrQrD7Lyw=s176-c-k-c0x00ffffff-no-rj'
  }
];

// New notifications to add when the application starts
const initialNotifications: Omit<Notification, 'id'>[] = [
  {
    title: 'Fireship uploaded a new video',
    message: 'The Future of React.js in 2024',
    timestamp: 'Just now',
    isRead: false,
    type: 'upload',
    channelName: 'Fireship',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj',
    videoId: 'TNhaISOUy6Q'
  },
  {
    title: 'New YouTube Shorts from Kevin Powell',
    message: 'CSS Grid in 60 seconds - must-watch short!',
    timestamp: '3 minutes ago',
    isRead: false,
    type: 'upload',
    channelName: 'Kevin Powell',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj',
    videoId: '_lS-rLUwPwI'
  },
  {
    title: 'YouTube Shorts Feature Update',
    message: 'Shorts are under construction. Feel free to contribute to enhance this feature!',
    timestamp: '1 minute ago',
    isRead: false,
    type: 'update',
    channelName: 'YouTube',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKaqRiYjp7fY9JiI5pM4Oy1QFVOG-eKuynrQrD7Lyw=s176-c-k-c0x00ffffff-no-rj'
  }
];

// Storage key for notifications
const STORAGE_KEY = 'youtube-clone-notifications';

// Current notifications
let notifications: Notification[] = [];

// Type guard to validate a notification object
const isValidNotification = (notification: any): notification is Notification => {
  return (
    notification !== null &&
    typeof notification === 'object' &&
    typeof notification.id === 'string' &&
    typeof notification.title === 'string' &&
    typeof notification.message === 'string' &&
    typeof notification.timestamp === 'string' &&
    typeof notification.isRead === 'boolean' &&
    typeof notification.type === 'string' &&
    ['upload', 'comment', 'subscription', 'recommendation', 'update'].includes(notification.type) &&
    typeof notification.channelName === 'string' &&
    (notification.channelImageUrl === undefined || typeof notification.channelImageUrl === 'string') &&
    (notification.videoId === undefined || typeof notification.videoId === 'string')
  );
};

// Initialize notifications from localStorage or use default
export const initializeNotifications = (): void => {
  try {
    // Try to load from localStorage
    const savedNotifications = localStorage.getItem(STORAGE_KEY);
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        
        if (Array.isArray(parsed)) {
          // Validate each notification using the type guard
          const validNotifications = parsed.filter(isValidNotification);
          
          if (validNotifications.length > 0) {
            notifications = validNotifications;
            
            // Don't add initial notifications if we already have notifications
            return;
          } else {
            console.warn('No valid notifications found in localStorage, using defaults');
          }
        } else {
          console.warn('Stored notifications are not an array, using defaults');
        }
      } catch (parseError) {
        console.error('Failed to parse notifications JSON:', parseError);
      }
    }
  } catch (e) {
    console.error('Failed to load notifications from localStorage', e);
  }
  
  // If we got here, either loading failed or there were no saved/valid notifications
  // Use default notifications
  notifications = [...defaultNotifications];
  
  // Add initial notifications only for first-time users
  initialNotifications.forEach(notification => {
    addNotification(notification);
  });
  
  // Save to localStorage
  saveNotifications();
};

// Save notifications to localStorage
const saveNotifications = (): boolean => {
  if (notifications.length === 0) {
    // Don't save empty notifications array
    return false;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    return true;
  } catch (e) {
    console.error('Failed to save notifications to localStorage', e);
    return false;
  }
};

// Get all notifications
export const getNotifications = (): Notification[] => {
  // Ensure notifications are initialized
  if (notifications.length === 0) {
    initializeNotifications();
  }
  return [...notifications];
};

// Get unread notification count
export const getUnreadNotificationsCount = (): number => {
  // Ensure notifications are initialized
  if (notifications.length === 0) {
    initializeNotifications();
  }
  return notifications.filter(notification => !notification.isRead).length;
};

// Mark a notification as read
export const markNotificationAsRead = (id: string): boolean => {
  if (!id) return false;
  
  const prevUnreadCount = getUnreadNotificationsCount();
  let found = false;
  
  notifications = notifications.map(notification => {
    if (notification.id === id) {
      found = true;
      return { ...notification, isRead: true };
    }
    return notification;
  });
  
  // Only save if we actually found and updated a notification
  if (!found) return false;
  
  const success = saveNotifications();
  
  // Only update UI if the notification was found and saving was successful
  const currentUnreadCount = getUnreadNotificationsCount();
  if (success && prevUnreadCount !== currentUnreadCount) {
    // No need for a toast here as marking as read is a subtle operation
    return true;
  }
  
  return success;
};

// Mark all notifications as read
export const markAllNotificationsAsRead = (): boolean => {
  // If all are already read, nothing to do
  if (getUnreadNotificationsCount() === 0) return true;
  
  // Mark all as read
  notifications = notifications.map(notification => {
    return { ...notification, isRead: true };
  });
  
  const success = saveNotifications();
  if (success) {
    toast.success('All notifications marked as read');
  }
  
  return success;
};

// Delete a notification
export const deleteNotification = (id: string): boolean => {
  if (!id) return false;
  
  const prevLength = notifications.length;
  const removedNotification = notifications.find(notification => notification.id === id);
  notifications = notifications.filter(notification => notification.id !== id);
  
  if (prevLength === notifications.length) {
    // No notification was deleted
    return false;
  }
  
  const success = saveNotifications();
  if (success) {
    toast.success('Notification removed', {
      description: removedNotification?.title || 'Notification has been deleted'
    });
  }
  
  return success;
};

// Clear all notifications
export const clearAllNotifications = (): boolean => {
  const prevLength = notifications.length;
  
  if (prevLength === 0) return true; // Nothing to do
  
  notifications = [];
  
  try {
    // Simply remove the item from localStorage
    localStorage.removeItem(STORAGE_KEY);
    toast.success('All notifications cleared');
    return true;
  } catch (e) {
    console.error('Failed to clear notifications', e);
    return false;
  }
};

// Add a new notification
export const addNotification = (notification: Omit<Notification, 'id'>): string | null => {
  try {
    // Validate the notification object
    if (!notification || 
        typeof notification.title !== 'string' || 
        typeof notification.message !== 'string' ||
        typeof notification.channelName !== 'string' ||
        !['upload', 'comment', 'subscription', 'recommendation', 'update'].includes(notification.type)) {
      console.error('Invalid notification object', notification);
      return null;
    }
    
    const id = `n${Date.now()}`;
    
    // Create new notification with ID
    const newNotification: Notification = {
      ...notification,
      id
    };
    
    // Add to beginning of array
    notifications.unshift(newNotification);
    
    // Save and show toast on success
    const success = saveNotifications();
    if (success) {
      toast.success('New notification received', {
        description: notification.title
      });
      return id;
    }
    
    return null;
  } catch (e) {
    console.error('Error adding notification', e);
    return null;
  }
};

// Generate a test notification for debugging
export const generateRandomNotification = (): string | null => {
  const channels = [
    { name: 'Fireship', img: 'https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj', id: 'HPz8KIqwlIU' },
    { name: 'Web Dev Simplified', img: 'https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s176-c-k-c0x00ffffff-no-rj', id: '4F2m91eKmJk' },
    { name: 'Theo', img: 'https://yt3.googleusercontent.com/ytc/APkrFKaSHW81jrtcwz5cKa3uWcMMsRX1AYrdTsArxBLc=s176-c-k-c0x00ffffff-no-rj', id: 'N9y-7AWbVBc' },
    { name: 'Kevin Powell', img: 'https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj', id: '_lS-rLUwPwI' }
  ];
  
  const types: Notification['type'][] = ['upload', 'comment', 'subscription', 'recommendation', 'update'];
  
  const randomChannel = channels[Math.floor(Math.random() * channels.length)];
  const randomType = types[Math.floor(Math.random() * types.length)];
  
  let title, message;
  
  switch (randomType) {
    case 'upload':
      title = `${randomChannel.name} just uploaded`;
      message = Math.random() > 0.5 
        ? 'Check out their latest video' 
        : 'New short video is available';
      break;
    case 'comment':
      title = `New comment on your video`;
      message = `${randomChannel.name} replied: "Great video, thanks for sharing"`;
      break;
    case 'subscription':
      title = `${randomChannel.name} subscribed to your channel`;
      message = 'You have a new subscriber!';
      break;
    case 'recommendation':
      title = 'Recommended for you';
      message = `We think you'll like this video from ${randomChannel.name}`;
      break;
    case 'update':
      title = 'YouTube Updates';
      message = 'New features have been added to YouTube';
      break;
    default:
      title = 'New Notification';
      message = 'You have a new notification';
  }
  
  return addNotification({
    title,
    message,
    timestamp: 'Just now',
    isRead: false,
    type: randomType,
    channelName: randomChannel.name,
    channelImageUrl: randomChannel.img,
    videoId: randomChannel.id
  });
};

// Generate multiple test notifications
export const generateTestNotifications = (count: number = 5): void => {
  for (let i = 0; i < count; i++) {
    generateRandomNotification();
  }
  toast.success(`Generated ${count} test notifications`);
};

// Reset notifications to default
export const resetNotificationsToDefault = (): void => {
  notifications = [...defaultNotifications];
  saveNotifications();
  toast.success('Notifications reset to default');
}; 