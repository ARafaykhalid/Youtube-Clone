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
}

// Collection of at least 25 shorts videos
export const shortsVideos: ShortsVideo[] = [
  {
    id: "s1",
    title: "I built an AI to play this game...",
    thumbnailUrl: "https://i.ytimg.com/vi/sTNFHjPg8UQ/hq720_2.jpg",
    channelName: "Code Bullet",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKYOnZH-Qq4KrWKAFrELKjsh19_cJCQVVVAZ_mJo=s176-c-k-c0x00ffffff-no-rj",
    views: "8.2M views",
    timestamp: "2 weeks ago",
    duration: "0:58",
    videoId: "sTNFHjPg8UQ",
    likes: 980000,
    comments: 34500,
    category: "tech"
  },
  {
    id: "s2",
    title: "This CSS trick will change how you build layouts",
    thumbnailUrl: "https://i.ytimg.com/vi/_lS-rLUwPwI/hq720_2.jpg",
    channelName: "Kevin Powell",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj",
    views: "1.4M views",
    timestamp: "3 weeks ago",
    duration: "0:45",
    videoId: "_lS-rLUwPwI",
    likes: 154000,
    comments: 18200,
    category: "coding"
  },
  {
    id: "s3",
    title: "3 React mistakes that are slowing down your app",
    thumbnailUrl: "https://i.ytimg.com/vi/XuhwQMUq5eM/hq720_2.jpg",
    channelName: "Fireship",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj",
    views: "2.7M views",
    timestamp: "1 month ago",
    duration: "0:59",
    videoId: "XuhwQMUq5eM",
    likes: 325000,
    comments: 25000,
    category: "coding"
  },
  {
    id: "s4",
    title: "The most overlooked VS Code feature",
    thumbnailUrl: "https://i.ytimg.com/vi/bnzMuYDlIlY/oar2.jpg",
    channelName: "Theo",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaSHW81jrtcwz5cKa3uWcMMsRX1AYrdTsArxBLc=s176-c-k-c0x00ffffff-no-rj",
    views: "980K views",
    timestamp: "5 days ago",
    duration: "0:42",
    videoId: "bnzMuYDlIlY",
    likes: 112000,
    comments: 12000,
    category: "coding"
  },
  {
    id: "s5",
    title: "How GPT-4 solved this impossible puzzle",
    thumbnailUrl: "https://i.ytimg.com/vi/nP-sCrIBjzs/oar2.jpg",
    channelName: "Two Minute Papers",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKZxjBPiYCJNQ5xTi3skoXcgZpMfZVjkRZcgeVDg=s176-c-k-c0x00ffffff-no-rj",
    views: "3.2M views",
    timestamp: "2 weeks ago",
    duration: "0:59",
    videoId: "nP-sCrIBjzs",
    likes: 420000,
    comments: 30000,
    category: "ai"
  },
  {
    id: "s6",
    title: "This one Tailwind trick will save you hours",
    thumbnailUrl: "https://i.ytimg.com/vi/qMkn8vDxrfA/oar2.jpg",
    channelName: "Web Dev Simplified",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s176-c-k-c0x00ffffff-no-rj",
    views: "780K views",
    timestamp: "4 days ago",
    duration: "0:49",
    videoId: "qMkn8vDxrfA",
    likes: 84000,
    comments: 8000,
    category: "coding"
  },
  {
    id: "s7",
    title: "Game-changing GitHub feature you're not using",
    thumbnailUrl: "https://i.ytimg.com/vi/GpHCgfOVm9U/oar2.jpg",
    channelName: "ThePrimeagen",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKbK_0EEoAFVJI2O-VJ1rNSgGJvSvec9F5gD0-b7=s176-c-k-c0x00ffffff-no-rj",
    views: "1.1M views",
    timestamp: "3 weeks ago",
    duration: "0:53",
    videoId: "GpHCgfOVm9U",
    likes: 155000,
    comments: 14000,
    category: "coding"
  },
  {
    id: "s8",
    title: "When will AI replace developers?",
    thumbnailUrl: "https://i.ytimg.com/vi/N9y-7AWbVBc/oar2.jpg",
    channelName: "Theo",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaSHW81jrtcwz5cKa3uWcMMsRX1AYrdTsArxBLc=s176-c-k-c0x00ffffff-no-rj",
    views: "2.3M views",
    timestamp: "2 weeks ago",
    duration: "0:56",
    videoId: "N9y-7AWbVBc",
    likes: 310000,
    comments: 28000,
    category: "ai"
  },
  {
    id: "s9",
    title: "This is why developers use TypeScript",
    thumbnailUrl: "https://i.ytimg.com/vi/m12x_wPi-NM/oar2.jpg",
    channelName: "Fireship",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj",
    views: "1.8M views",
    timestamp: "1 month ago",
    duration: "0:51",
    videoId: "m12x_wPi-NM",
    likes: 220000,
    comments: 18000,
    category: "coding"
  },
  {
    id: "s10",
    title: "The fastest way to learn any programming language",
    thumbnailUrl: "https://i.ytimg.com/vi/xm4y1l-6Hgg/oar2.jpg",
    channelName: "Programming with Mosh",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj",
    views: "4.1M views",
    timestamp: "3 months ago",
    duration: "0:59",
    videoId: "xm4y1l-6Hgg",
    likes: 485000,
    comments: 40000,
    category: "education"
  },
  {
    id: "s11",
    title: "Stop using console.log - do this instead",
    thumbnailUrl: "https://i.ytimg.com/vi/xUTq1F_cCks/oar2.jpg",
    channelName: "Wes Bos",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKYDqjD2AY-Cv4S0btc227EsbL_GvA5i3mU1OUoqQQ=s176-c-k-c0x00ffffff-no-rj",
    views: "1.5M views",
    timestamp: "2 weeks ago",
    duration: "0:48",
    videoId: "xUTq1F_cCks",
    likes: 183000,
    comments: 15000,
    category: "coding"
  },
  {
    id: "s12",
    title: "CSS in 2023 is GAME CHANGING",
    thumbnailUrl: "https://i.ytimg.com/vi/OcwON22ctYc/oar2.jpg",
    channelName: "Hyperplexed",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKY455xp8vY6JCd-cUfUqRsrBxw4TD3-LLpZtX8T=s176-c-k-c0x00ffffff-no-rj",
    views: "3.2M views",
    timestamp: "4 weeks ago",
    duration: "0:58",
    videoId: "OcwON22ctYc",
    likes: 412000,
    comments: 35000,
    category: "coding"
  },
  {
    id: "s13",
    title: "Next.js 14 in 60 seconds",
    thumbnailUrl: "https://i.ytimg.com/vi/l61Hw30ZRZs/oar2.jpg",
    channelName: "Josh tried coding",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKYl9LyRrY1BEyXZQLH9jmgxRJJwFdYZ-nPVPu_2=s176-c-k-c0x00ffffff-no-rj",
    views: "920K views",
    timestamp: "1 week ago",
    duration: "0:54",
    videoId: "l61Hw30ZRZs",
    likes: 98000,
    comments: 8000,
    category: "coding"
  },
  {
    id: "s14",
    title: "The world's ugliest code",
    thumbnailUrl: "https://i.ytimg.com/vi/c0xvTBW4d9k/oar2.jpg",
    channelName: "ThePrimeagen",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKbK_0EEoAFVJI2O-VJ1rNSgGJvSvec9F5gD0-b7=s176-c-k-c0x00ffffff-no-rj",
    views: "1.8M views",
    timestamp: "5 days ago",
    duration: "0:52",
    videoId: "c0xvTBW4d9k",
    likes: 245000,
    comments: 20000,
    category: "coding"
  },
  {
    id: "s15",
    title: "How I create web animations in 2023",
    thumbnailUrl: "https://i.ytimg.com/vi/b3pQ99LZfh0/oar2.jpg",
    channelName: "DesignCourse",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKbpCCgmxg-XoS0H1rVQPgVca3PV2MgwnxYNioPYMg=s176-c-k-c0x00ffffff-no-rj",
    views: "760K views",
    timestamp: "3 weeks ago",
    duration: "0:57",
    videoId: "b3pQ99LZfh0",
    likes: 86000,
    comments: 7000,
    category: "design"
  },
  {
    id: "s16",
    title: "Debugging tip that will save you hours",
    thumbnailUrl: "https://i.ytimg.com/vi/K5xChBWh-Hc/oar2.jpg",
    channelName: "Jack Herrington",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKbbxBfa5VnQqd5fOq5t2ulEt8WxVY9RPCZNyXLv=s176-c-k-c0x00ffffff-no-rj",
    views: "430K views",
    timestamp: "2 days ago",
    duration: "0:41",
    videoId: "K5xChBWh-Hc",
    likes: 67000,
    comments: 5000,
    category: "coding"
  },
  {
    id: "s17",
    title: "AI Explained in 60 seconds",
    thumbnailUrl: "https://i.ytimg.com/vi/K3Uw8iw-47c/oar2.jpg",
    channelName: "Saptarshi Prakash",
    channelImageUrl: "https://yt3.googleusercontent.com/s8xtANwL9paZ-8cJJZaE6PJDPRMsjGEcxZhm1m-FfnEF6eINMHg9prwzxSaGLsqOoCe0UWj0=s176-c-k-c0x00ffffff-no-rj",
    views: "5.2M views",
    timestamp: "2 months ago",
    duration: "0:55",
    videoId: "K3Uw8iw-47c",
    likes: 620000,
    comments: 55000,
    category: "ai"
  },
  {
    id: "s18",
    title: "How I organize my React components",
    thumbnailUrl: "https://i.ytimg.com/vi/qGfA75WbP6E/oar2.jpg",
    channelName: "ByteGrad",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKYEUtrTosm7UMXTe3O6RL9hT6pctDKD0CZJPJRu=s176-c-k-c0x00ffffff-no-rj",
    views: "680K views",
    timestamp: "1 week ago",
    duration: "0:48",
    videoId: "qGfA75WbP6E",
    likes: 89000,
    comments: 7000,
    category: "coding"
  },
  {
    id: "s19",
    title: "This simple CSS trick creates insane animations",
    thumbnailUrl: "https://i.ytimg.com/vi/wLNBZ6j0VAM/oar2.jpg",
    channelName: "Kevin Powell",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj",
    views: "1.7M views",
    timestamp: "3 weeks ago",
    duration: "0:59",
    videoId: "wLNBZ6j0VAM",
    likes: 186000,
    comments: 16000,
    category: "design"
  },
  {
    id: "s20",
    title: "Every dev's Git nightmare",
    thumbnailUrl: "https://i.ytimg.com/vi/mJJGE5YV_Cw/oar2.jpg",
    channelName: "Fireship",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKb--NH6RwAGHYsD3KfxX-SAgWgIHrjx5tiYJ8rH=s176-c-k-c0x00ffffff-no-rj",
    views: "2.2M views",
    timestamp: "2 weeks ago",
    duration: "0:58",
    videoId: "mJJGE5YV_Cw",
    likes: 298000,
    comments: 25000,
    category: "coding"
  },
  {
    id: "s21",
    title: "JavaScript Array methods you need to know",
    thumbnailUrl: "https://i.ytimg.com/vi/R8rmkpLyeTs/oar2.jpg",
    channelName: "Traversy Media",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKYcYswt_UhD7D0j6ddiQz6Gb8Q_owVrWbUhQVInEQ=s176-c-k-c0x00ffffff-no-rj-mo",
    views: "1.3M views",
    timestamp: "4 weeks ago",
    duration: "0:56",
    videoId: "R8rmkpLyeTs",
    likes: 157000,
    comments: 12000,
    category: "coding"
  },
  {
    id: "s22",
    title: "Top 5 VS Code extensions for React developers",
    thumbnailUrl: "https://i.ytimg.com/vi/MU8HUVlJo-c/oar2.jpg",
    channelName: "Sonny Sangha",
    channelImageUrl: "https://yt3.googleusercontent.com/FjeN785fVWx0Hd-1sHNQu1iadAb_cI3h-rVizUXgzO-cz1C-1nIbGQR6CqOOlUa9QH8jgJlRm_c=s176-c-k-c0x00ffffff-no-rj",
    views: "890K views",
    timestamp: "2 weeks ago",
    duration: "0:59",
    videoId: "MU8HUVlJo-c",
    likes: 105000,
    comments: 9000,
    category: "coding"
  },
  {
    id: "s23",
    title: "Browser DevTools trick nobody talks about",
    thumbnailUrl: "https://i.ytimg.com/vi/qQ4P6lhY50s/oar2.jpg",
    channelName: "Coding Tech",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaSWS9LFIN2IhL9J5l0nF89xaf5CdU7CLu6z-Ox=s176-c-k-c0x00ffffff-no-rj",
    views: "720K views",
    timestamp: "1 week ago",
    duration: "0:46",
    videoId: "qQ4P6lhY50s",
    likes: 94000,
    comments: 7000,
    category: "coding"
  },
  {
    id: "s24",
    title: "How I organize my CSS in 2023",
    thumbnailUrl: "https://i.ytimg.com/vi/K7OGl5x2aic/oar2.jpg",
    channelName: "Kevin Powell",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj",
    views: "1.1M views",
    timestamp: "3 weeks ago",
    duration: "0:57",
    videoId: "K7OGl5x2aic",
    likes: 132000,
    comments: 10000,
    category: "design"
  },
  {
    id: "s25",
    title: "One TypeScript feature that changed my life",
    thumbnailUrl: "https://i.ytimg.com/vi/rY_XqfSHock/oar2.jpg",
    channelName: "Matt Pocock",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKbpSojje_-tkBQoow7IGF4pVHwTNJewr7o1XF91=s176-c-k-c0x00ffffff-no-rj",
    views: "980K views",
    timestamp: "2 weeks ago",
    duration: "0:52",
    videoId: "rY_XqfSHock",
    likes: 118000,
    comments: 9000,
    category: "coding"
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