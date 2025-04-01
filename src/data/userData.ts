import { toast } from 'sonner';

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

// Default user data
const defaultUserData: UserProfile = {
  username: 'YourChannelName',
  displayName: 'Your Name',
  email: 'your.email@example.com',
  bio: 'Welcome to my channel! I create videos about technology, programming, and digital culture.',
  description: 'This is my YouTube channel where I share tutorials, reviews, and insights about technology and programming. Subscribe for weekly content!',
  profilePicture: 'https://github.com/shadcn.png',
  bannerColor: '#4285F4',
  bannerUrl: '',
  subscriberCount: 1024,
  subscribers: 1024,
  joinDate: new Date().toISOString(),
  totalViews: 15240,
  location: 'San Francisco, CA',
  socialLinks: {
    website: 'https://example.com',
    twitter: 'yourtwitter',
    instagram: 'yourinstagram',
  },
  settings: {
    darkMode: true,
    autoplay: true,
    restrictedMode: false,
    notifications: true
  }
};

// Initialize user data from localStorage or use default
export const initializeUserData = (): UserProfile => {
  try {
    const savedData = localStorage.getItem('youtube-clone-user-data');
    if (savedData) {
      const parsedData = JSON.parse(savedData) as UserProfile;
      return { ...defaultUserData, ...parsedData };
    }
  } catch (e) {
    console.error('Failed to load user data from localStorage', e);
  }
  return defaultUserData;
};

// Current user data
export let userData: UserProfile = initializeUserData();

// Save user data to localStorage
export const saveUserData = (data: Partial<UserProfile>): boolean => {
  try {
    // Update the current userData with new values
    userData = { ...userData, ...data };
    
    // Save to localStorage
    localStorage.setItem('youtube-clone-user-data', JSON.stringify(userData));
    
    return true;
  } catch (e) {
    console.error('Failed to save user data', e);
    toast.error('Failed to save user data');
    return false;
  }
};

// Get user profile data
export const getUserProfile = (): UserProfile => {
  // Ensure subscribers is always synced with subscriberCount for compatibility
  userData.subscribers = userData.subscriberCount;
  return userData;
};

// Update user profile
export const updateUserProfile = (data: Partial<UserProfile>): boolean => {
  const success = saveUserData(data);
  if (success) {
    toast.success('Profile updated successfully');
  }
  return success;
};

// Update user settings
export const updateUserSettings = (settings: Partial<UserProfile['settings']>): boolean => {
  const updatedSettings = { ...userData.settings, ...settings };
  const success = saveUserData({ settings: updatedSettings });
  if (success) {
    toast.success('Settings updated successfully');
  }
  return success;
};

// Reset user data to default (for testing or logout)
export const resetUserData = (): void => {
  userData = defaultUserData;
  localStorage.removeItem('youtube-clone-user-data');
  toast.success('User data reset to default');
};

// Generate random banner color
export const generateRandomBannerColor = (): string => {
  const colors = [
    '#4285F4', // Google Blue
    '#DB4437', // Google Red
    '#F4B400', // Google Yellow
    '#0F9D58', // Google Green
    '#7B1FA2', // Purple
    '#C2185B', // Pink
    '#00796B', // Teal
    '#FFA000', // Amber
    '#607D8B', // Blue Grey
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Initialize app with user data
export const initializeApp = (): void => {
  initializeUserData();
}; 