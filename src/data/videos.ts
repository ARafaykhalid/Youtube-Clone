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
  videoUrl: string;
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

export const videos: Video[] = [
  {
    id: "v1",
    title: "How to Build a YouTube Clone with React and Tailwind CSS",
    thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=281&fit=crop",
    channelName: "CodeMaster",
    channelImageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    views: "1.2M views",
    timestamp: "3 weeks ago",
    duration: "18:24",
    description: "In this comprehensive tutorial, I show you how to build a complete YouTube clone using React and Tailwind CSS. We'll cover responsive design, component architecture, and styling techniques to create a beautiful and functional UI. Perfect for intermediate React developers looking to improve their skills.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 12400,
    dislikes: 400,
    category: "education"
  },
  {
    id: "v2",
    title: "Learn JavaScript ES6+ Complete Course 2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&h=281&fit=crop",
    channelName: "JS Tutorials",
    channelImageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    views: "850K views",
    timestamp: "1 month ago",
    duration: "42:18",
    description: "Master modern JavaScript with this complete ES6+ course. We'll cover arrow functions, destructuring, async/await, modules, and all the new features that make JavaScript so powerful. With practical examples and real-world applications, you'll be writing modern JavaScript in no time.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 8500,
    dislikes: 120,
    category: "education"
  },
  {
    id: "v3",
    title: "Responsive Web Design Best Practices",
    thumbnailUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=281&fit=crop",
    channelName: "WebDev Pro",
    channelImageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    views: "422K views",
    timestamp: "2 months ago",
    duration: "15:45",
    description: "Learn essential responsive web design techniques that work across all devices. This tutorial covers media queries, flexible grids, responsive images, and mobile-first design strategies. Follow along as we build a fully responsive website from scratch.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 4220,
    dislikes: 85,
    category: "education"
  },
  {
    id: "v4",
    title: "10 Amazing UI/UX Tips for Developers",
    thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=281&fit=crop",
    channelName: "Design Masters",
    channelImageUrl: "https://randomuser.me/api/portraits/men/51.jpg",
    views: "1.8M views",
    timestamp: "5 months ago",
    duration: "23:10",
    description: "Discover 10 powerful UI/UX tips that will transform your web applications. I'll show you how small design changes can dramatically improve the user experience, increase engagement, and make your interfaces more intuitive. These tips are perfect for developers who want to enhance their design skills.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 18000,
    dislikes: 320,
    category: "design"
  },
  {
    id: "v5",
    title: "Building a Real-time Chat App with Firebase",
    thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=281&fit=crop",
    channelName: "Firebase Masters",
    channelImageUrl: "https://randomuser.me/api/portraits/women/42.jpg",
    views: "720K views",
    timestamp: "2 weeks ago",
    duration: "31:42",
    description: "Learn how to build a full-featured real-time chat application using Firebase. We'll implement authentication, real-time database, and cloud functions to create a complete messaging platform. By the end, you'll understand how to use Firebase to power your real-time applications.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 7200,
    dislikes: 110,
    category: "education"
  },
  {
    id: "v6",
    title: "Advanced React Hooks Tutorial",
    thumbnailUrl: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=500&h=281&fit=crop",
    channelName: "React Pros",
    channelImageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    views: "1.5M views",
    timestamp: "1 year ago",
    duration: "28:15",
    description: "Take your React skills to the next level with advanced hooks techniques. We'll cover useCallback, useMemo, useRef, and custom hooks with practical examples. Learn patterns for state management, memoization, and performance optimization that will make your React applications more efficient.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 15000,
    dislikes: 300,
    category: "education"
  },
  {
    id: "v7",
    title: "CSS Grid vs Flexbox - When to Use Each",
    thumbnailUrl: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=500&h=281&fit=crop",
    channelName: "CSS Wizards",
    channelImageUrl: "https://randomuser.me/api/portraits/women/29.jpg",
    views: "980K views",
    timestamp: "8 months ago",
    duration: "14:26",
    description: "Confused about when to use CSS Grid vs Flexbox? This tutorial breaks down the differences, strengths, and best use cases for each layout system. With practical examples and side-by-side comparisons, you'll know exactly which tool to reach for in your next project.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 9800,
    dislikes: 210,
    category: "education"
  },
  {
    id: "v8",
    title: "TypeScript for Beginners - Full Course",
    thumbnailUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=281&fit=crop",
    channelName: "TypeMaster",
    channelImageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    views: "2.3M views",
    timestamp: "4 months ago",
    duration: "1:12:44",
    description: "Start your TypeScript journey with this comprehensive beginner's course. We'll cover basic types, interfaces, classes, generics, and more as we build real-world applications. By the end, you'll be confident writing type-safe code and leveraging TypeScript's powerful features.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 23000,
    dislikes: 450,
    category: "education"
  },
  {
    id: "v9",
    title: "Top 10 Movies of 2023 - Must Watch Films",
    thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=281&fit=crop",
    channelName: "Film Reviews",
    channelImageUrl: "https://randomuser.me/api/portraits/men/62.jpg",
    views: "1.7M views",
    timestamp: "2 months ago",
    duration: "15:30",
    description: "Check out our picks for the top 10 must-watch movies of 2023. From blockbusters to indie gems, we cover the films that defined the year and deserved your attention.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 17000,
    dislikes: 350,
    category: "movie"
  },
  {
    id: "v10",
    title: "Gaming News Roundup - July 2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=281&fit=crop",
    channelName: "Game Central",
    channelImageUrl: "https://randomuser.me/api/portraits/men/35.jpg",
    views: "890K views",
    timestamp: "3 weeks ago",
    duration: "22:15",
    description: "Your monthly roundup of all the biggest gaming news, releases, and updates from July 2023. We cover the latest console announcements, game releases, and industry news.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 8900,
    dislikes: 180,
    category: "gaming"
  },
  {
    id: "v11",
    title: "Music Production Masterclass",
    thumbnailUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=281&fit=crop",
    channelName: "Music Masters",
    channelImageUrl: "https://randomuser.me/api/portraits/women/22.jpg",
    views: "1.2M views",
    timestamp: "5 months ago",
    duration: "48:22",
    description: "Learn professional music production techniques from industry experts. This masterclass covers everything from recording to mixing and mastering your tracks.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 12000,
    dislikes: 240,
    category: "music"
  },
  {
    id: "v12",
    title: "Breaking News: Tech Industry Updates",
    thumbnailUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&h=281&fit=crop",
    channelName: "Tech News Now",
    channelImageUrl: "https://randomuser.me/api/portraits/men/47.jpg",
    views: "450K views",
    timestamp: "1 week ago",
    duration: "10:15",
    description: "The latest breaking news and updates from the tech industry. We cover major product announcements, company updates, and industry trends.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 4500,
    dislikes: 95,
    category: "news"
  },
  {
    id: "v13",
    title: "Sports Highlights - Weekend Recap",
    thumbnailUrl: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=500&h=281&fit=crop",
    channelName: "Sports Central",
    channelImageUrl: "https://randomuser.me/api/portraits/men/81.jpg",
    views: "920K views",
    timestamp: "2 days ago",
    duration: "12:45",
    description: "Catch up on all the major sports highlights and results from the weekend. We cover football, basketball, baseball, and more in this quick recap.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 9200,
    dislikes: 180,
    category: "sports"
  },
  {
    id: "v14",
    title: "The Science of Climate Change Explained",
    thumbnailUrl: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=500&h=281&fit=crop",
    channelName: "Science Simplified",
    channelImageUrl: "https://randomuser.me/api/portraits/women/71.jpg",
    views: "1.4M views",
    timestamp: "4 months ago",
    duration: "25:30",
    description: "A comprehensive and accessible explanation of climate change science, its causes, effects, and potential solutions. Perfect for anyone looking to understand this critical global issue.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 14000,
    dislikes: 850,
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
    name: "CodeMaster",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "JS Tutorials",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  }
];

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
