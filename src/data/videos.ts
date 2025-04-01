import { longVideos, getRelatedLongVideos } from './longVideos';
import { shortsVideos, getRelatedShorts } from './shortsVideos';
import { initializeNotifications } from './notifications';

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelName: string;
  channelImageUrl: string;
  views: string;
  timestamp: string;
  duration: string;
  description: string;
  videoId: string; // YouTube video ID
  likes: number;
  dislikes: number;
  isSubscribed?: boolean;
  category?: string;
  isLiked?: boolean;
  isVerified?: boolean;
  isLive?: boolean;
  isNewVideo?: boolean;
  isShort?: boolean;
}

export interface Comment {
  id: string;
  username: string;
  profilePic: string;
  content: string;
  timestamp: string;
  likes: number;
}

// Export all videos combined for backward compatibility
export const videos: Video[] = [...longVideos];

// Get a video by ID
export const getVideoById = (id: string): Video | undefined => {
  return longVideos.find(video => video.id === id);
};

// Get related videos (excludes the current video)
export const getRelatedVideos = (currentVideoId: string, count: number = 8): Video[] => {
  return getRelatedLongVideos(currentVideoId, count);
};

// Simulate video history
export const getWatchHistory = (): Video[] => {
  return longVideos.slice(0, 4); // First 4 videos as "watched"
};

// Simulate subscribed channels
export const subscribedChannels = [
  {
    id: "c1",
    name: "JavaScript Mastery",
    imageUrl: "https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj",
    isSubscribed: true
  },
  {
    id: "c2",
    name: "freeCodeCamp.org",
    imageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaqca-xQcJtp9XfTfYYk2TCk0-aL4CQQ0jGiLGNZw=s176-c-k-c0x00ffffff-no-rj",
    isSubscribed: true
  },
  {
    id: "c3",
    name: "Fireship",
    imageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj",
    isSubscribed: true
  },
  {
    id: "c4",
    name: "Kevin Powell",
    imageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj",
    isSubscribed: true
  },
  {
    id: "c5",
    name: "Marques Brownlee",
    imageUrl: "https://yt3.googleusercontent.com/Ikb1C4ih2VMvfjma8OO5b39JnHL2CQcQgksB_I7TM-gGA3ERTY589OIeoYXSgQgkKxJE_PmB=s176-c-k-c0x00ffffff-no-rj",
    isSubscribed: true
  }
];

// Check if a channel is subscribed
export const isChannelSubscribed = (channelName: string): boolean => {
  return subscribedChannels.some(channel => channel.name === channelName);
};

// Initialize subscriptions from localStorage
export const initializeSubscriptions = () => {
  try {
    const savedSubscriptions = localStorage.getItem('youtube-clone-subscriptions');
    if (savedSubscriptions) {
      const parsed = JSON.parse(savedSubscriptions);
      
      // Update the subscribedChannels array with saved data
      if (Array.isArray(parsed)) {
        // Clear the current array
        subscribedChannels.length = 0;
        
        // Add saved subscriptions
        parsed.forEach(channel => {
          subscribedChannels.push(channel);
        });
        
        // Update subscription status in videos
        longVideos.forEach(video => {
          video.isSubscribed = isChannelSubscribed(video.channelName);
        });
        
        // Also update shorts videos
        shortsVideos.forEach(video => {
          video.isSubscribed = isChannelSubscribed(video.channelName);
        });
      }
    }
  } catch (e) {
    console.error('Failed to load subscriptions from localStorage', e);
  }
};

// Subscribe or unsubscribe from a channel
export const toggleChannelSubscription = (channelName: string, subscribe: boolean) => {
  const index = subscribedChannels.findIndex(channel => channel.name === channelName);
  
  if (subscribe && index === -1) {
    // Find channel image from videos
    const channelVideo = longVideos.find(video => video.channelName === channelName) || 
                         shortsVideos.find(video => video.channelName === channelName);
    if (channelVideo) {
      subscribedChannels.push({
        id: `c${subscribedChannels.length + 1}`,
        name: channelName,
        imageUrl: channelVideo.channelImageUrl,
        isSubscribed: true
      });
    }
  } else if (!subscribe && index !== -1) {
    subscribedChannels.splice(index, 1);
  }
  
  // Update subscription status in videos
  longVideos.forEach(video => {
    if (video.channelName === channelName) {
      video.isSubscribed = subscribe;
    }
  });
  
  // Also update shorts videos
  shortsVideos.forEach(video => {
    if (video.channelName === channelName) {
      video.isSubscribed = subscribe;
    }
  });
  
  // Save to localStorage
  try {
    localStorage.setItem('youtube-clone-subscriptions', JSON.stringify(subscribedChannels));
  } catch (e) {
    console.error('Failed to save subscriptions to localStorage', e);
  }
};

export const comments: Comment[] = [
  {
    id: "c1",
    username: "DevEnthusiast",
    profilePic: "https://randomuser.me/api/portraits/men/72.jpg",
    content: "This tutorial saved me hours of work! Thank you so much for explaining things so clearly.",
    timestamp: "2 days ago",
    likes: 342
  },
  {
    id: "c2",
    username: "CodeNewbie",
    profilePic: "https://randomuser.me/api/portraits/women/51.jpg",
    content: "As a beginner, I found this really helpful. Could you make a follow-up on state management?",
    timestamp: "1 week ago",
    likes: 128
  },
  {
    id: "c3",
    username: "FrontEndNinja",
    profilePic: "https://randomuser.me/api/portraits/women/32.jpg",
    content: "Great video! I'd suggest also mentioning performance optimization techniques.",
    timestamp: "3 days ago",
    likes: 89
  },
  {
    id: "c4",
    username: "JavaScriptPro",
    profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
    content: "I've been coding for 5 years and still learned some new tricks from this. Well done!",
    timestamp: "4 days ago",
    likes: 215
  }
];

// Initialize all data when the app starts
export const initializeAppData = () => {
  initializeSubscriptions();
  initializeNotifications();
  
  // Load other persisted data like likes and watch history
  try {
    // Load liked videos
    const likedVideosJson = localStorage.getItem('youtube-clone-liked-videos');
    if (likedVideosJson) {
      const likedVideoIds = JSON.parse(likedVideosJson);
      if (Array.isArray(likedVideoIds)) {
        // Update the liked status in videos
        longVideos.forEach(video => {
          if (likedVideoIds.includes(video.id)) {
            video.isLiked = true;
          }
        });
        
        shortsVideos.forEach(video => {
          if (likedVideoIds.includes(video.id)) {
            video.isLiked = true;
          }
        });
      }
    }
  } catch (e) {
    console.error('Failed to load liked videos from localStorage', e);
  }
};

// Helper function to save liked videos
export const saveLikedVideo = (videoId: string, liked: boolean) => {
  try {
    // Get existing liked videos
    const likedVideosJson = localStorage.getItem('youtube-clone-liked-videos') || '[]';
    const likedVideoIds = JSON.parse(likedVideosJson) as string[];
    
    if (liked) {
      // Add to liked videos if not already liked
      if (!likedVideoIds.includes(videoId)) {
        likedVideoIds.push(videoId);
      }
    } else {
      // Remove from liked videos
      const updatedIds = likedVideoIds.filter(id => id !== videoId);
      localStorage.setItem('youtube-clone-liked-videos', JSON.stringify(updatedIds));
      return;
    }
    
    localStorage.setItem('youtube-clone-liked-videos', JSON.stringify(likedVideoIds));
  } catch (e) {
    console.error('Failed to save liked video', e);
  }
};

// Get user's uploaded videos
export const getUserVideos = (): Video[] => {
  try {
    const userVideosJson = localStorage.getItem('youtube-clone-user-videos');
    if (userVideosJson) {
      const userVideos = JSON.parse(userVideosJson);
      if (Array.isArray(userVideos)) {
        return userVideos;
      }
    }
  } catch (e) {
    console.error('Failed to load user videos from localStorage', e);
  }
  
  // Return empty array if no videos found
  return [];
};

// Save a new user video
export const saveUserVideo = (video: Video): boolean => {
  try {
    const userVideos = getUserVideos();
    
    // Generate ID if not provided
    if (!video.id) {
      video.id = `uv-${Date.now()}`;
    }
    
    // Add video to user videos
    userVideos.push(video);
    
    // Save to localStorage
    localStorage.setItem('youtube-clone-user-videos', JSON.stringify(userVideos));
    return true;
  } catch (e) {
    console.error('Failed to save user video', e);
    return false;
  }
};

// Delete a user video
export const deleteUserVideo = (videoId: string): boolean => {
  try {
    const userVideos = getUserVideos();
    const updatedVideos = userVideos.filter(video => video.id !== videoId);
    
    // Save updated array to localStorage
    localStorage.setItem('youtube-clone-user-videos', JSON.stringify(updatedVideos));
    return true;
  } catch (e) {
    console.error('Failed to delete user video', e);
    return false;
  }
};
