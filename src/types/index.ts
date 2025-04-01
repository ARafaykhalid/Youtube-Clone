// User Types
export interface UserProfile {
  username: string;
  displayName: string;
  email: string;
  bio: string;
  description?: string;  // Longer channel description
  profilePicture: string;
  bannerUrl?: string;    // URL for channel banner image
  bannerColor: string;
  subscriberCount: number;
  subscribers?: number;   // Alias for subscriberCount for consistency
  joinDate?: string;      // When the user joined
  totalViews?: number;    // Total channel views
  location?: string;      // User's location
  socialLinks: {
    website?: string;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
  };
  settings: {
    darkMode: boolean;
    autoplay: boolean;
    restrictedMode: boolean;
    notifications: boolean;
  };
}

// Video Types
export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelName: string;
  channelImageUrl: string;
  views: string;
  timestamp: string;
  duration: string;
  videoId?: string;
  description?: string;
  likes?: number;
  dislikes?: number;
  comments?: number;
  category?: string;
  isShort?: boolean;
}

// Shorts Types
export interface ShortsVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelName: string;
  channelImageUrl: string;
  views: string;
  timestamp: string;
  duration: string;
  videoId: string;
  likes: number;
  comments?: number;
  category?: string;
  description?: string;
  isShort?: boolean;
}

// Notification Types
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