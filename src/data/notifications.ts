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

// Sample notifications data
const defaultNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'New upload from Fireship',
    message: 'CSS in 2023 is GAME CHANGING',
    timestamp: '2 hours ago',
    isRead: false,
    type: 'upload',
    channelName: 'Fireship',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj',
    videoId: 'v1'
  },
  {
    id: 'n2',
    title: 'Kevin Powell replied to your comment',
    message: 'Thanks for the support! That\'s a great question...',
    timestamp: '1 day ago',
    isRead: false,
    type: 'comment',
    channelName: 'Kevin Powell',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj',
    videoId: 'v2'
  },
  {
    id: 'n3',
    title: 'Monthly Updates from YouTube',
    message: 'Check out new features available for your account',
    timestamp: '5 days ago',
    isRead: true,
    type: 'update',
    channelName: 'YouTube',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKa3Gon_i8TPY-qMVs8-3Ut42s3ZBet74QbPnk5_=s176-c-k-c0x00ffffff-no-rj'
  },
  {
    id: 'n4',
    title: 'Web Dev Simplified uploaded a new video',
    message: 'How To Properly Learn JavaScript In 2023',
    timestamp: '1 week ago',
    isRead: true,
    type: 'upload',
    channelName: 'Web Dev Simplified',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s176-c-k-c0x00ffffff-no-rj',
    videoId: 'v3'
  },
  {
    id: 'n5',
    title: 'ThePrimeagen is now streaming',
    message: 'JavaScript Tips & Tricks with guest CodeSavvy',
    timestamp: 'Just now',
    isRead: false,
    type: 'upload',
    channelName: 'ThePrimeagen',
    channelImageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKbK_0EEoAFVJI2O-VJ1rNSgGJvSvec9F5gD0-b7=s176-c-k-c0x00ffffff-no-rj'
  }
];

// Current notifications
let notifications: Notification[] = [];

// Initialize notifications from localStorage or use default
export const initializeNotifications = (): void => {
  try {
    // Try to load from localStorage
    const savedNotifications = localStorage.getItem('youtube-clone-notifications');
    if (savedNotifications) {
      const parsed = JSON.parse(savedNotifications);
      if (Array.isArray(parsed)) {
        notifications = parsed;
        return;
      }
    }
  } catch (e) {
    console.error('Failed to load notifications from localStorage', e);
  }
  
  // If we got here, either loading failed or there were no saved notifications
  // Use default notifications
  notifications = [...defaultNotifications];
  
  // Save to localStorage
  try {
    localStorage.setItem('youtube-clone-notifications', JSON.stringify(notifications));
  } catch (e) {
    console.error('Failed to save notifications to localStorage', e);
  }
};

// Save notifications to localStorage
const saveNotifications = (): void => {
  try {
    localStorage.setItem('youtube-clone-notifications', JSON.stringify(notifications));
  } catch (e) {
    console.error('Failed to save notifications to localStorage', e);
    toast.error('Failed to save notification settings');
  }
};

// Get all notifications
export const getNotifications = (): Notification[] => {
  return [...notifications];
};

// Get unread notification count
export const getUnreadNotificationsCount = (): number => {
  return notifications.filter(notification => !notification.isRead).length;
};

// Mark a notification as read
export const markNotificationAsRead = (id: string): void => {
  notifications = notifications.map(notification => 
    notification.id === id 
      ? { ...notification, isRead: true } 
      : notification
  );
  saveNotifications();
};

// Mark all notifications as read
export const markAllNotificationsAsRead = (): void => {
  notifications = notifications.map(notification => ({
    ...notification,
    isRead: true
  }));
  saveNotifications();
};

// Delete a notification
export const deleteNotification = (id: string): void => {
  notifications = notifications.filter(notification => notification.id !== id);
  saveNotifications();
};

// Clear all notifications
export const clearAllNotifications = (): void => {
  notifications = [];
  saveNotifications();
};

// Add a new notification
export const addNotification = (notification: Omit<Notification, 'id'>): string => {
  const id = `n${Date.now()}`;
  notifications.unshift({
    ...notification,
    id
  });
  saveNotifications();
  
  // Return the notification ID (useful for testing)
  return id;
};

// Generate a random notification (for testing)
export const generateRandomNotification = (): void => {
  const channels = [
    { name: 'Fireship', imageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj' },
    { name: 'Kevin Powell', imageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj' },
    { name: 'ThePrimeagen', imageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKbK_0EEoAFVJI2O-VJ1rNSgGJvSvec9F5gD0-b7=s176-c-k-c0x00ffffff-no-rj' },
    { name: 'Web Dev Simplified', imageUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s176-c-k-c0x00ffffff-no-rj' },
  ];
  
  const types = ['upload', 'comment', 'subscription', 'recommendation', 'update'] as const;
  const randomChannel = channels[Math.floor(Math.random() * channels.length)];
  const randomType = types[Math.floor(Math.random() * types.length)];
  
  let title = '';
  let message = '';
  
  switch (randomType) {
    case 'upload':
      title = `New upload from ${randomChannel.name}`;
      message = `Check out the latest video: "${Math.random() > 0.5 ? 'Amazing coding tips' : 'Learn this tech in 10 minutes'}"`;
      break;
    case 'comment':
      title = `${randomChannel.name} replied to your comment`;
      message = 'Thanks for the support! That\'s a great question...';
      break;
    case 'subscription':
      title = `${randomChannel.name} just subscribed to you`;
      message = 'Your channel now has a new subscriber';
      break;
    case 'recommendation':
      title = 'Recommended for you';
      message = `New content from ${randomChannel.name} based on your watch history`;
      break;
    case 'update':
      title = 'YouTube Updates';
      message = 'Check out new features available for your account';
      break;
  }
  
  const newNotification: Omit<Notification, 'id'> = {
    title,
    message,
    timestamp: 'Just now',
    isRead: false,
    type: randomType,
    channelName: randomChannel.name,
    channelImageUrl: randomChannel.imageUrl,
    videoId: randomType === 'upload' ? `v${Date.now()}` : undefined
  };
  
  addNotification(newNotification);
}; 