import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { useEffect, useState } from "react";
import { initializeAppData } from "@/data/videos";
import { initializeUserData } from "@/data/userData";
import { initializeNotifications } from "@/data/notifications";
import Index from "./pages/Index";
import VideoPlayer from "./pages/VideoPlayer";
import Library from "./pages/Library";
import SearchResults from "./pages/SearchResults";
import Shorts from "./pages/Shorts";
import NotFound from "./pages/NotFound";
import Channel from "./pages/Channel";
import EditChannel from "./pages/EditChannel";
import MyChannel from "./pages/MyChannel";
import NotificationDebug from "./components/NotificationDebug";

// ScrollToTop component to handle scroll restoration on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// AppRoutes component to include the ScrollToTop component
function AppRoutes() {
  // Only show notification debug in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  const [showDebug, setShowDebug] = useState(false);
  
  // Listen for key combo Ctrl+Shift+N to toggle debug panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'N') {
        setShowDebug(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/watch/:videoId" element={<VideoPlayer />} />
        <Route path="/video/:videoId" element={<VideoPlayer />} />
        <Route path="/library" element={<Library />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/shorts" element={<Shorts />} />
        <Route path="/shorts/:videoId" element={<Shorts />} />
        <Route path="/explore" element={<Index category="explore" />} />
        <Route path="/subscriptions" element={<Index category="subscriptions" />} />
        <Route path="/your-videos" element={<Library tab="your-videos" />} />
        
        {/* Category routes */}
        <Route path="/movies" element={<Index category="movies" />} />
        <Route path="/gaming" element={<Index category="gaming" />} />
        <Route path="/news" element={<Index category="news" />} />
        <Route path="/sports" element={<Index category="sports" />} />
        <Route path="/learning" element={<Index category="learning" />} />
        <Route path="/music" element={<Index category="music" />} />
        <Route path="/coding" element={<Index category="coding" />} />
        <Route path="/tech" element={<Index category="tech" />} />
        <Route path="/design" element={<Index category="design" />} />
        <Route path="/entertainment" element={<Index category="entertainment" />} />
        <Route path="/science" element={<Index category="science" />} />
        <Route path="/cooking" element={<Index category="cooking" />} />
        <Route path="/travel" element={<Index category="travel" />} />
        <Route path="/fitness" element={<Index category="fitness" />} />
        <Route path="/photography" element={<Index category="photography" />} />
        
        {/* Channel routes */}
        <Route path="/channel/:channelName" element={<Channel />} />
        <Route path="/channel/edit" element={<EditChannel />} />
        <Route path="/my-channel" element={<MyChannel />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Notification Debug Panel - only shown when enabled */}
      {isDevelopment && showDebug && <NotificationDebug />}
    </>
  );
}

const App = () => {
  // Initialize app data when the application starts
  useEffect(() => {
    initializeAppData();
    initializeUserData();
    initializeNotifications();
  }, []);

  return (
    <ThemeProvider defaultTheme="system">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster position="bottom-right" richColors />
    </ThemeProvider>
  );
};

export default App;
