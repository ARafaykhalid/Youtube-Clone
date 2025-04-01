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
  comments: number;
  description?: string;
  isSubscribed?: boolean;
  category?: string;
  isLiked?: boolean;
  isShort: boolean;
}

// Collection of at least 25 shorts videos
export const shortsVideos: ShortsVideo[] = [
  {
    "id": "p1",
    "title": "Mastering JavaScript Closures in 60 Seconds",
    "thumbnailUrl": "https://i.ytimg.com/vi/jQJXBxNqgHk/hq720.jpg",
    "channelName": "Fireship",
    "channelImageUrl": "https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj",
    "views": "1.2M views",
    "timestamp": "3 days ago",
    "duration": "0:58",
    "videoId": "jQJXBxNqgHk",
    "likes": 220000,
    "comments": 12000,
    "category": "programming",
    "isShort": true
  },
  {
    "id": "p2",
    "title": "Stop Writing Bad CSS - Do This Instead!",
    "thumbnailUrl": "https://i.ytimg.com/vi/OcwON22ctYc/hq720.jpg",
    "channelName": "Kevin Powell",
    "channelImageUrl": "https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj",
    "views": "890K views",
    "timestamp": "5 hours ago",
    "duration": "0:45",
    "videoId": "OcwON22ctYc",
    "likes": 145000,
    "comments": 9000,
    "category": "programming",
    "isShort": true
  },
  {
    "id": "p3",
    "title": "How to Write Cleaner React Code",
    "thumbnailUrl": "https://i.ytimg.com/vi/N9y-7AWbVBc/hq720.jpg",
    "channelName": "Web Dev Simplified",
    "channelImageUrl": "https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s176-c-k-c0x00ffffff-no-rj",
    "views": "1.5M views",
    "timestamp": "1 day ago",
    "duration": "0:50",
    "videoId": "N9y-7AWbVBc",
    "likes": 290000,
    "comments": 17000,
    "category": "programming",
    "isShort": true
  },
  {
    "id": "p4",
    "title": "5 VS Code Extensions That Will Blow Your Mind",
    "thumbnailUrl": "https://i.ytimg.com/vi/t-0Xs5OjGuo/hq720.jpg",
    "channelName": "ThePrimeagen",
    "channelImageUrl": "https://yt3.googleusercontent.com/ytc/APkrFKbK_0EEoAFVJI2O-VJ1rNSgGJvSvec9F5gD0-b7=s176-c-k-c0x00ffffff-no-rj",
    "views": "970K views",
    "timestamp": "12 hours ago",
    "duration": "0:55",
    "videoId": "t-0Xs5OjGuo",
    "likes": 112000,
    "comments": 8000,
    "category": "programming",
    "isShort": true
  },
  {
    "id": "p5",
    "title": "Why Every Developer Should Learn TypeScript",
    "thumbnailUrl": "https://i.ytimg.com/vi/m12x_wPi-NM/hq720.jpg",
    "channelName": "Fireship",
    "channelImageUrl": "https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj",
    "views": "2.3M views",
    "timestamp": "6 hours ago",
    "duration": "0:51",
    "videoId": "m12x_wPi-NM",
    "likes": 310000,
    "comments": 21000,
    "category": "programming",
    "isShort": true
  }
];

export const getShortsById = (id: string): ShortsVideo | undefined => {
  return shortsVideos.find(video => video.id === id);
};

export const getRelatedShorts = (currentVideoId: string, count: number = 10): ShortsVideo[] => {
  const filtered = shortsVideos.filter(video => video.id !== currentVideoId);
  // Randomly shuffle the array for more variety in related shorts
  return filtered.sort(() => 0.5 - Math.random()).slice(0, count);
}; 