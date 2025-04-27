# YouTube Clone

A responsive YouTube clone built with React, TypeScript, and Tailwind CSS that replicates core YouTube features and UI.

---

![YouTube Clone Screenshot](/screenshot.png)

---

## 🚀 Features

- **Responsive Design** - Works seamlessly across mobile, tablet, and desktop
- **Video Playback** - Watch YouTube videos through embedded iframes
- **Dark/Light Mode** - Toggle between themes with system preference support
- **Channel Pages** - Browse creator channels and their video collections
- **Watch Later** - Save videos to your personal watch queue
- **Shorts Feed** - Vertical short-form video browsing similar to YouTube Shorts
- **Library Section** - Access your watch history, liked videos, and saved content
- **Search Functionality** - Find videos within the application

---

## 🛠️ Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS + Shadcn UI components
- **Routing**: React Router
- **State Management**: React Context API and Hooks
- **Video Integration**: YouTube Iframe API
- **Notifications**: Sonner for toast messages
- **Build Tool**: Vite

---

## 📋 Prerequisites

- Node.js (v16 or newer)
- npm or bun package manager

---

## 🚦 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/YouTube-Clone.git
   cd YouTube-Clone
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

---

## 📂 Project Structure

```
src/
├── assets/       # Static assets and images
├── components/   # Reusable UI components
├── data/         # Mock data for videos and channels
├── hooks/        # Custom React hooks
├── layouts/      # Page layout components
├── lib/          # Utility functions and helpers
├── pages/        # Main application pages
├── types/        # TypeScript type definitions
└── utils/        # Helper utilities
```

---

## 🔮 Roadmap

- User authentication and profiles
- Video uploading capability
- Live chat functionality
- Comments and interactions
- Subscription management
- Custom playlists creation
- Real API integration with YouTube Data API

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

MIT

---

## 📣 Acknowledgements

- This project was created as a learning exercise
- Not affiliated with YouTube or Google
- UI inspired by YouTube's design
- Built with [Shadcn UI](https://ui.shadcn.com/) components
