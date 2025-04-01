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
  videoId: string;
  likes: number;
  dislikes: number;
  isSubscribed?: boolean;
  category?: string;
  isLiked?: boolean;
}

// Collection of long-form videos (25+)
export const longVideos: Video[] = [
  {
    id: "lv1",
    title: "Mastering Next.js - Full Course",
    thumbnailUrl: "https://i.ytimg.com/vi/Sklc_fQBmcs/maxresdefault.jpg",
    channelName: "Traversy Media",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/AGIKgqMv0vPh8wxJkN8cU0WziXZUtRQiXEeT1zHG0ag8=s176-c-k-c0x00ffffff-no-rj",
    views: "2.3M views",
    timestamp: "1 month ago",
    duration: "2:14:37",
    description: "A full Next.js course covering routing, data fetching, authentication, and deployment!",
    videoId: "Sklc_fQBmcs",
    likes: 27600,
    dislikes: 700,
    category: "education"
  },
  {
    id: "lv2",
    title: "React.js Crash Course for Beginners",
    thumbnailUrl: "https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
    channelName: "Programming with Mosh",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/AGIKgqPZ6KNJcn1xX4bcjML5FDNYhlChwW4hy7F2v5eB=s176-c-k-c0x00ffffff-no-rj",
    views: "5.1M views",
    timestamp: "2 months ago",
    duration: "1:30:45",
    description: "A beginner-friendly React crash course to help you get started with modern web development.",
    videoId: "w7ejDZ8SWv8",
    likes: 65400,
    dislikes: 1200,
    category: "education"
  },
  {
    id: "lv3",
    title: "Learn Tailwind CSS in One Hour - Beginner to Advanced",
    thumbnailUrl: "https://i.ytimg.com/vi/dFgzHOX84xQ/maxresdefault.jpg",
    channelName: "Codevolution",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/AGIKgqMR8cQWxgJc1o6s7oxIjDjPb6bip9brY5aPlYZP=s176-c-k-c0x00ffffff-no-rj",
    views: "1.7M views",
    timestamp: "4 weeks ago",
    duration: "1:10:55",
    description: "A complete guide to Tailwind CSS, covering utility classes, customization, and best practices.",
    videoId: "dFgzHOX84xQ",
    likes: 18900,
    dislikes: 500,
    category: "education"
  },
  {
    id: "lv4",
    title: "The Ultimate JavaScript Course for Beginners",
    thumbnailUrl: "https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
    channelName: "FreeCodeCamp.org",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/AGIKgqN1_rJh0_gTzqmvLj6fo1j9GnQydUBnGgeXqIzH=s176-c-k-c0x00ffffff-no-rj",
    views: "10M views",
    timestamp: "6 months ago",
    duration: "4:30:12",
    description: "A complete JavaScript tutorial for beginners, covering fundamentals, DOM manipulation, and ES6+ features.",
    videoId: "PkZNo7MFNFg",
    likes: 120000,
    dislikes: 3200,
    category: "education"
  },
  {
    id: "lv5",
    title: "Build and Deploy a Full Stack MERN App",
    thumbnailUrl: "https://i.ytimg.com/vi/7CqJlxBYj-M/maxresdefault.jpg",
    channelName: "The Net Ninja",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/AGIKgqN0lOGvFv5PvLglvbbCZtm3ShXnqYdtsoT6wJXK=s176-c-k-c0x00ffffff-no-rj",
    views: "3.8M views",
    timestamp: "5 months ago",
    duration: "3:20:50",
    description: "In this tutorial, you'll learn how to build a complete MERN stack app from scratch.",
    videoId: "7CqJlxBYj-M",
    likes: 45300,
    dislikes: 900,
    category: "education"
  },
  {
    id: "lv6",
    title: "Docker Tutorial for Beginners - A Full DevOps Course",
    thumbnailUrl: "https://i.ytimg.com/vi/fqMOX6JJhGo/maxresdefault.jpg",
    channelName: "freeCodeCamp.org",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaqca-xQcJtp9XfTfYYk2TCk0-aL4CQQ0jGiLGNZw=s176-c-k-c0x00ffffff-no-rj",
    views: "3.7M views",
    timestamp: "3 years ago",
    duration: "2:10:18",
    description: "Learn Docker from scratch in this full course for beginners. You'll learn what Docker is, how it works, and how to use it for development and deployment.",
    videoId: "fqMOX6JJhGo",
    likes: 73000,
    dislikes: 980,
    category: "education"
  },
  {
    id: "lv7",
    title: "The Complete Web Development Bootcamp",
    thumbnailUrl: "https://i.ytimg.com/vi/qz0aGYrrlhU/maxresdefault.jpg",
    channelName: "London App Brewery",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaJ4NQ7J61DOMmriFu6y0hBoMQ4PLMmFsEWmsNO=s176-c-k-c0x00ffffff-no-rj",
    views: "2.1M views",
    timestamp: "2 years ago",
    duration: "2:36:57",
    description: "A comprehensive web development course covering HTML, CSS, JavaScript, Node.js, React, and more. You'll learn everything you need to become a full-stack developer.",
    videoId: "qz0aGYrrlhU",
    likes: 83000,
    dislikes: 1200,
    category: "education"
  },
  {
    id: "lv9",
    title: "Responsive Web Design Full Course - Build a Website From Scratch",
    thumbnailUrl: "https://i.ytimg.com/vi/D-h8L5hgW-w/maxresdefault.jpg",
    channelName: "DesignCourse",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKbpCCgmxg-XoS0H1rVQPgVca3PV2MgwnxYNioPYMg=s176-c-k-c0x00ffffff-no-rj",
    views: "950K views",
    timestamp: "7 months ago",
    duration: "1:47:08",
    description: "Learn how to design and build a fully responsive website using modern HTML and CSS techniques. By the end, you'll have a beautiful, mobile-friendly website.",
    videoId: "D-h8L5hgW-w",
    likes: 42000,
    dislikes: 640,
    category: "design"
  },
  {
    id: "lv10",
    title: "Complete React Native in One Video (For Beginners)",
    thumbnailUrl: "https://i.ytimg.com/vi/CNaLOa-6X7U/maxresdefault.jpg",
    channelName: "CodeWithHarry",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKZzMnxK-mZG5Bh7kT3QNkxG0zQGEVZmX2a3MvOH8w=s176-c-k-c0x00ffffff-no-rj",
    views: "1.8M views",
    timestamp: "10 months ago",
    duration: "4:12:27",
    description: "Learn React Native from scratch in this comprehensive tutorial. You'll build a complete mobile app and learn how to deploy it to both Android and iOS.",
    videoId: "CNaLOa-6X7U",
    likes: 87000,
    dislikes: 1100,
    category: "education"
  },
  {
    id: "lv11",
    title: "Build and Deploy a Full Stack MERN Application",
    thumbnailUrl: "https://i.ytimg.com/vi/ngc9gnGgUdA/maxresdefault.jpg",
    channelName: "JavaScript Mastery",
    channelImageUrl: "https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj",
    views: "1.1M views",
    timestamp: "1 year ago",
    duration: "3:01:15",
    description: "Build a full-stack social media application using the MERN stack (MongoDB, Express, React, Node.js). You'll learn authentication, CRUD operations, and more.",
    videoId: "ngc9gnGgUdA",
    likes: 68000,
    dislikes: 750,
    category: "education"
  },
  {
    id: "lv12",
    title: "3 Hour Machine Learning in Python Tutorial",
    thumbnailUrl: "https://i.ytimg.com/vi/7eh4d6sabA0/maxresdefault.jpg",
    channelName: "Tech With Tim",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaN_hF1rRt3FL0lMbGKPACT0_C2PIZGl6hQnSJjhQ=s176-c-k-c0x00ffffff-no-rj",
    views: "720K views",
    timestamp: "8 months ago",
    duration: "3:14:28",
    description: "Learn machine learning with Python in this complete tutorial. You'll understand key concepts and build practical machine learning models from scratch.",
    videoId: "7eh4d6sabA0",
    likes: 38000,
    dislikes: 580,
    category: "education"
  },
  {
    id: "lv13",
    title: "The Complete JavaScript Course 2023: From Zero to Expert!",
    thumbnailUrl: "https://i.ytimg.com/vi/8dWL3wF_OMw/maxresdefault.jpg",
    channelName: "Coding Addict",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKYLtZCDQbHqIimZMmzeR_iAr5vBaF6KaGEPbvmQfA=s176-c-k-c0x00ffffff-no-rj",
    views: "2.3M views",
    timestamp: "1 year ago",
    duration: "6:52:32",
    description: "Master JavaScript with the most comprehensive course on the market. You'll learn modern JavaScript from basic to advanced concepts, including ES6+ features.",
    videoId: "8dWL3wF_OMw",
    likes: 109000,
    dislikes: 1700,
    category: "education"
  },
  {
    id: "lv14",
    title: "Data Structures Easy to Advanced Course - Full Tutorial from a Google Engineer",
    thumbnailUrl: "https://i.ytimg.com/vi/RBSGKlAvoiM/maxresdefault.jpg",
    channelName: "freeCodeCamp.org",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaqca-xQcJtp9XfTfYYk2TCk0-aL4CQQ0jGiLGNZw=s176-c-k-c0x00ffffff-no-rj",
    views: "3.5M views",
    timestamp: "3 years ago",
    duration: "8:12:44",
    description: "Learn data structures from a Google engineer. This course covers all important data structures from basic to advanced, with practical examples and coding exercises.",
    videoId: "RBSGKlAvoiM",
    likes: 124000,
    dislikes: 930,
    category: "education"
  },
  {
    id: "lv15",
    title: "SwiftUI Tutorial for Beginners (2023) - Build iOS Apps with SwiftUI",
    thumbnailUrl: "https://i.ytimg.com/vi/F2ojC6TNwws/maxresdefault.jpg",
    channelName: "CodeWithChris",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaHHgm8Vty_rlvtdTzL1JmS_lxkCR2FZFvO0d4W=s176-c-k-c0x00ffffff-no-rj",
    views: "670K views",
    timestamp: "5 months ago",
    duration: "3:45:21",
    description: "Learn how to build iOS apps using SwiftUI. This beginner-friendly tutorial takes you from basic UI elements to creating a complete app from scratch.",
    videoId: "F2ojC6TNwws",
    likes: 29000,
    dislikes: 410,
    category: "education"
  },
  {
    id: "lv16",
    title: "Full Stack Development with Spring Boot and React",
    thumbnailUrl: "https://i.ytimg.com/vi/5RA5NpxbioI/maxresdefault.jpg",
    channelName: "Daily Code Buffer",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKZA2J_zhnQgZNk_sYAFrfgQL-XvUgBZRsjfLuiLnw=s176-c-k-c0x00ffffff-no-rj",
    views: "420K views",
    timestamp: "6 months ago",
    duration: "4:28:45",
    description: "Build a complete full-stack application using Spring Boot for the backend and React for the frontend. Learn how to integrate both and create a production-ready application.",
    videoId: "5RA5NpxbioI",
    likes: 18500,
    dislikes: 320,
    category: "education"
  },
  {
    id: "lv17",
    title: "MongoDB Crash Course 2023",
    thumbnailUrl: "https://i.ytimg.com/vi/2QQGWYe7IDU/maxresdefault.jpg",
    channelName: "Web Dev Simplified",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1-pPP=s176-c-k-c0x00ffffff-no-rj",
    views: "530K views",
    timestamp: "7 months ago",
    duration: "1:37:22",
    description: "Learn everything you need to know about MongoDB in this crash course. You'll understand document databases, CRUD operations, and how to use MongoDB in your projects.",
    videoId: "2QQGWYe7IDU",
    likes: 26900,
    dislikes: 310,
    category: "education"
  },
  {
    id: "lv18",
    title: "Learn Blockchain, Solidity, and Full Stack Web3 Development with JavaScript",
    thumbnailUrl: "https://i.ytimg.com/vi/gyMwXuJrbJQ/maxresdefault.jpg",
    channelName: "freeCodeCamp.org",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKaqca-xQcJtp9XfTfYYk2TCk0-aL4CQQ0jGiLGNZw=s176-c-k-c0x00ffffff-no-rj",
    views: "1.4M views",
    timestamp: "1 year ago",
    duration: "16:23:40",
    description: "This course will give you a full introduction into all of the core concepts related to blockchain, smart contracts, Solidity, ERC20s, full-stack Web3 dapps, and more.",
    videoId: "gyMwXuJrbJQ",
    likes: 54000,
    dislikes: 1100,
    category: "education"
  },
  {
    id: "lv19",
    title: "Complete SQL Mastery - Zero to Hero",
    thumbnailUrl: "https://i.ytimg.com/vi/HXV3zeQKqGY/maxresdefault.jpg",
    channelName: "Programming with Mosh",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKa6XiLa13mMVPzkmmTBcgNPjjqCGPrY8J75IypqOA=s176-c-k-c0x00ffffff-no-rj",
    views: "2.8M views",
    timestamp: "3 years ago",
    duration: "4:20:15",
    description: "Master SQL with this comprehensive course. You'll learn how to query databases, design schemas, and optimize your SQL statements for performance.",
    videoId: "HXV3zeQKqGY",
    likes: 98000,
    dislikes: 1200,
    category: "education"
  },
  {
    id: "lv20",
    title: "Flutter Tutorial for Beginners - Build iOS and Android Apps",
    thumbnailUrl: "https://i.ytimg.com/vi/VPvVD8t02U8/maxresdefault.jpg",
    channelName: "Traversy Media",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKYcYswt_UhD7D0j6ddiQz6Gb8Q_owVrWbUhQVInEQ=s176-c-k-c0x00ffffff-no-rj-mo",
    views: "1.2M views",
    timestamp: "1 year ago",
    duration: "3:22:19",
    description: "Learn Flutter framework from scratch. This tutorial covers the basics of Flutter and then shows you how to build a complete mobile app for both iOS and Android.",
    videoId: "VPvVD8t02U8",
    likes: 52000,
    dislikes: 860,
    category: "education"
  },
  {
    id: "lv22",
    title: "5 Machine Learning Projects You Can Build in 2023",
    thumbnailUrl: "https://i.ytimg.com/vi/LpZrAjU6Hhk/maxresdefault.jpg",
    channelName: "Nicholas Renotte",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKZl9OlCwpRVxx7-6JAZpBcbufoMGcgRBnKKNn6H=s176-c-k-c0x00ffffff-no-rj",
    views: "560K views",
    timestamp: "4 months ago",
    duration: "1:43:18",
    description: "Build 5 practical machine learning projects from scratch. This hands-on tutorial walks you through computer vision, NLP, deep learning, and more with TensorFlow and PyTorch.",
    videoId: "LpZrAjU6Hhk",
    likes: 28500,
    dislikes: 380,
    category: "education"
  },
  {
    id: "lv23",
    title: "How to Build an E-commerce Website with Django and React",
    thumbnailUrl: "https://i.ytimg.com/vi/Fia-GGgHpK0/maxresdefault.jpg",
    channelName: "Dennis Ivy",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKYHt6GFqn4MWX_sxhEEWpIrVGXQaVAKpqUQIyUKJA=s176-c-k-c0x00ffffff-no-rj",
    views: "370K views",
    timestamp: "9 months ago",
    duration: "5:43:21",
    description: "Learn how to build a complete e-commerce website using Django for the backend and React for the frontend. This tutorial covers authentication, product listings, cart functionality, and checkout.",
    videoId: "Fia-GGgHpK0",
    likes: 19800,
    dislikes: 290,
    category: "education"
  },
  {
    id: "lv24",
    title: "Game Development with Unity - Complete Course",
    thumbnailUrl: "https://i.ytimg.com/vi/gB1F9G0JXOo/maxresdefault.jpg",
    channelName: "Brackeys",
    channelImageUrl: "https://yt3.googleusercontent.com/ytc/APkrFKYqQxIYGgWLSrVtOdmrzKoJIQGnuCEk2L4MV4jYIQ=s176-c-k-c0x00ffffff-no-rj",
    views: "1.9M views",
    timestamp: "2 years ago",
    duration: "9:18:45",
    description: "Create your own games with Unity! This comprehensive course covers everything from basic concepts to advanced game development techniques. By the end, you'll have built a complete 3D game.",
    videoId: "gB1F9G0JXOo",
    likes: 87000,
    dislikes: 1400,
    category: "gaming"
  }
];

export const getLongVideosById = (id: string): Video | undefined => {
  return longVideos.find(video => video.id === id);
};

export const getRelatedLongVideos = (currentVideoId: string, count: number = 6): Video[] => {
  const filtered = longVideos.filter(video => video.id !== currentVideoId);
  return filtered.slice(0, count);
}; 