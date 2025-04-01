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
}

export interface Comment {
  id: string;
  username: string;
  profilePic: string;
  content: string;
  timestamp: string;
  likes: number;
}

// Updated videos with actual YouTube video IDs and reliable channel images
export const videos: Video[] = [
  {
    id: "v1",
    title: "Build a YouTube Clone with React and TailwindCSS",
    thumbnailUrl: "https://i.ytimg.com/vi/4F2m91eKmJk/maxresdefault.jpg",
    channelName: "JavaScript Mastery",
    channelImageUrl: "https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj",
    views: "1.2M views",
    timestamp: "3 weeks ago",
    duration: "1:28:24",
    description: "In this comprehensive tutorial, I show you how to build a complete YouTube clone using React and Tailwind CSS. We'll cover responsive design, component architecture, and styling techniques to create a beautiful and functional UI. Perfect for intermediate React developers looking to improve their skills.",
    videoId: "4F2m91eKmJk",
    likes: 12400,
    dislikes: 400,
    category: "education"
  },
  {
    id: "v2",
    title: "React JavaScript Framework for Beginners – Full Course",
    thumbnailUrl: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
    channelName: "freeCodeCamp.org",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaqca-xQcJtp9XfTfYYk2TCk0-aL4CQQ0jGiLGNZw=s176-c-k-c0x00ffffff-no-rj",
    views: "4.2M views",
    timestamp: "1 year ago",
    duration: "11:54:07",
    description: "Learn React by building eight real-world projects and solving 140+ coding challenges. This course was developed by Bob Ziroll.",
    videoId: "bMknfKXIFA8",
    likes: 85000,
    dislikes: 1200,
    category: "education"
  },
  {
    id: "v3",
    title: "Responsive Web Design Tutorial – How to Make a Website Look Good on All Devices",
    thumbnailUrl: "https://i.ytimg.com/vi/VQraviuwbzU/maxresdefault.jpg",
    channelName: "freeCodeCamp.org",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaqca-xQcJtp9XfTfYYk2TCk0-aL4CQQ0jGiLGNZw=s176-c-k-c0x00ffffff-no-rj",
    views: "422K views",
    timestamp: "2 months ago",
    duration: "1:45:45",
    description: "Learn essential responsive web design techniques that work across all devices. This tutorial covers media queries, flexible grids, responsive images, and mobile-first design strategies. Follow along as we build a fully responsive website from scratch.",
    videoId: "VQraviuwbzU",
    likes: 4220,
    dislikes: 85,
    category: "education"
  },
  {
    id: "v4",
    title: "10 UI Design Fundamentals for Developers",
    thumbnailUrl: "https://i.ytimg.com/vi/a8CwpGARAsQ/maxresdefault.jpg",
    channelName: "Kevin Powell",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj",
    views: "1.8M views",
    timestamp: "5 months ago",
    duration: "23:10",
    description: "Discover 10 powerful UI/UX tips that will transform your web applications. I'll show you how small design changes can dramatically improve the user experience, increase engagement, and make your interfaces more intuitive. These tips are perfect for developers who want to enhance their design skills.",
    videoId: "a8CwpGARAsQ",
    likes: 18000,
    dislikes: 320,
    category: "design"
  },
  {
    id: "v5",
    title: "Build a Real-time Chat App with Firebase and React",
    thumbnailUrl: "https://i.ytimg.com/vi/k4mjF4sPITE/maxresdefault.jpg",
    channelName: "Fireship",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj",
    views: "720K views",
    timestamp: "2 weeks ago",
    duration: "31:42",
    description: "Learn how to build a full-featured real-time chat application using Firebase and React. We'll implement authentication, real-time database, and cloud functions to create a complete messaging platform. By the end, you'll understand how to use Firebase to power your real-time applications.",
    videoId: "k4mjF4sPITE",
    likes: 7200,
    dislikes: 110,
    category: "education"
  },
  {
    id: "v6",
    title: "React Hooks Explained | useContext, useReducer, useMemo and more",
    thumbnailUrl: "https://i.ytimg.com/vi/TNhaISOUy6Q/maxresdefault.jpg",
    channelName: "Fireship",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj",
    views: "1.5M views",
    timestamp: "1 year ago",
    duration: "15:45",
    description: "Take your React skills to the next level with advanced hooks techniques. We'll cover useCallback, useMemo, useRef, and custom hooks with practical examples. Learn patterns for state management, memoization, and performance optimization that will make your React applications more efficient.",
    videoId: "TNhaISOUy6Q",
    likes: 15000,
    dislikes: 300,
    category: "education"
  },
  {
    id: "v7",
    title: "CSS Grid vs Flexbox: Which is Better?",
    thumbnailUrl: "https://i.ytimg.com/vi/3elGSZSWTbM/maxresdefault.jpg",
    channelName: "Kevin Powell",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj",
    views: "980K views",
    timestamp: "8 months ago",
    duration: "24:26",
    description: "Confused about when to use CSS Grid vs Flexbox? This tutorial breaks down the differences, strengths, and best use cases for each layout system. With practical examples and side-by-side comparisons, you'll know exactly which tool to reach for in your next project.",
    videoId: "3elGSZSWTbM",
    likes: 9800,
    dislikes: 210,
    category: "education"
  },
  {
    id: "v8",
    title: "Learn TypeScript – Full Tutorial for Beginners",
    thumbnailUrl: "https://i.ytimg.com/vi/30LWjhZzg50/maxresdefault.jpg",
    channelName: "freeCodeCamp.org",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaqca-xQcJtp9XfTfYYk2TCk0-aL4CQQ0jGiLGNZw=s176-c-k-c0x00ffffff-no-rj",
    views: "2.3M views",
    timestamp: "4 months ago",
    duration: "1:12:44",
    description: "Start your TypeScript journey with this comprehensive beginner's course. We'll cover basic types, interfaces, classes, generics, and more as we build real-world applications. By the end, you'll be confident writing type-safe code and leveraging TypeScript's powerful features.",
    videoId: "30LWjhZzg50",
    likes: 23000,
    dislikes: 450,
    category: "education"
  },
  {
    id: "v9",
    title: "Best Movies of 2023 Ranked",
    thumbnailUrl: "https://i.ytimg.com/vi/w9gJD_Oz4g0/maxresdefault.jpg",
    channelName: "The Movie Critic",
    channelImageUrl: "https://yt3.googleusercontent.com/iKtNmMUeAtXDbQ4-m5YAJwviI7-tDvl3AyaD-7XJSLT4ZwgJXK9ljJnBaeK9zW-OkxZmwNwBQA=s176-c-k-c0x00ffffff-no-rj",
    views: "1.7M views",
    timestamp: "2 months ago",
    duration: "15:30",
    description: "Check out our picks for the top movies of 2023. From blockbusters to indie gems, we cover the films that defined the year and deserved your attention.",
    videoId: "w9gJD_Oz4g0",
    likes: 17000,
    dislikes: 350,
    category: "movie"
  },
  {
    id: "v10",
    title: "Gaming News Roundup 2023",
    thumbnailUrl: "https://i.ytimg.com/vi/lDMFY0YXLBE/maxresdefault.jpg",
    channelName: "IGN",
    channelImageUrl: "https://yt3.googleusercontent.com/H_---ano_f27DOCejDhUdBMtBcqhLrKQDSAHV2QFtA_Q6iJ9dYQr3DWOh7olkGhd7DaZLhPP=s176-c-k-c0x00ffffff-no-rj",
    views: "890K views",
    timestamp: "3 weeks ago",
    duration: "22:15",
    description: "Your roundup of all the biggest gaming news, releases, and updates from 2023. We cover the latest console announcements, game releases, and industry news.",
    videoId: "lDMFY0YXLBE",
    likes: 8900,
    dislikes: 180,
    category: "gaming"
  },
  {
    id: "v11",
    title: "Music Production Masterclass - Complete Guide",
    thumbnailUrl: "https://i.ytimg.com/vi/eR2XDQOSXt4/maxresdefault.jpg",
    channelName: "Andrew Huang",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKYgdJ9JE4TZRi7ZeMFSkxcVn2-XhYBGJdOhv_W-QQ=s176-c-k-c0x00ffffff-no-rj",
    views: "1.2M views",
    timestamp: "5 months ago",
    duration: "48:22",
    description: "Learn professional music production techniques from industry expert Andrew Huang. This masterclass covers everything from recording to mixing and mastering your tracks.",
    videoId: "eR2XDQOSXt4",
    likes: 12000,
    dislikes: 240,
    category: "music"
  },
  {
    id: "v12",
    title: "Apple's Vision Pro - My Experience!",
    thumbnailUrl: "https://i.ytimg.com/vi/QgcR5d19cGo/maxresdefault.jpg",
    channelName: "Marques Brownlee",
    channelImageUrl: "https://yt3.googleusercontent.com/Ikb1C4ih2VMvfjma8OO5b39JnHL2CQcQgksB_I7TM-gGA3ERTY589OIeoYXSgQgkKxJE_PmB=s176-c-k-c0x00ffffff-no-rj",
    views: "4.5M views",
    timestamp: "1 week ago",
    duration: "18:15",
    description: "The latest Apple Vision Pro - a full review of the device, usability, and whether it's worth the price. We look at pros, cons, and real-world applications.",
    videoId: "QgcR5d19cGo",
    likes: 45000,
    dislikes: 950,
    category: "news"
  },
  {
    id: "v13",
    title: "NBA Highlights - Weekly Top Plays",
    thumbnailUrl: "https://i.ytimg.com/vi/t2h-YMSrj9U/maxresdefault.jpg",
    channelName: "ESPN",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKbpSojje_-tkBQoow7IGF4pVHwTNJewr7o1XF91=s176-c-k-c0x00ffffff-no-rj",
    views: "920K views",
    timestamp: "2 days ago",
    duration: "12:45",
    description: "Catch up on all the major NBA highlights and results from the week. We cover the best plays, dunks, and game-winning moments in this quick recap.",
    videoId: "t2h-YMSrj9U",
    likes: 9200,
    dislikes: 180,
    category: "sports"
  },
  {
    id: "v14",
    title: "Climate Change Explained: The Science Behind Global Warming",
    thumbnailUrl: "https://i.ytimg.com/vi/ifrHogDujXw/maxresdefault.jpg",
    channelName: "Kurzgesagt",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaHuobv8BZLD6AoMXMTqbMzH55HFiYRZ2YEcxl49g=s176-c-k-c0x00ffffff-no-rj",
    views: "14M views",
    timestamp: "4 months ago",
    duration: "13:30",
    description: "A comprehensive and accessible explanation of climate change science, its causes, effects, and potential solutions. Perfect for anyone looking to understand this critical global issue.",
    videoId: "ifrHogDujXw",
    likes: 140000,
    dislikes: 8500,
    category: "science"
  }
];

// Get a video by ID
export const getVideoById = (id: string): Video | undefined => {
  return videos.find(video => video.id === id);
};

// Get related videos (excludes the current video)
export const getRelatedVideos = (currentVideoId: string): Video[] => {
  return videos.filter(video => video.id !== currentVideoId);
};

// Simulate video history
export const getWatchHistory = (): Video[] => {
  return videos.slice(0, 4); // First 4 videos as "watched"
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
        videos.forEach(video => {
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
    const channelVideo = videos.find(video => video.channelName === channelName);
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
  videos.forEach(video => {
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
