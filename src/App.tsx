import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import VideoPlayer from "./pages/VideoPlayer";
import Library from "./pages/Library";
import SearchResults from "./pages/SearchResults";
import Shorts from "./pages/Shorts";
import NotFound from "./pages/NotFound";
import Channel from "./pages/Channel";

const App = () => (
  <ThemeProvider defaultTheme="system">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/watch/:videoId" element={<VideoPlayer />} />
        <Route path="/library" element={<Library />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/shorts" element={<Shorts />} />
        <Route path="/explore" element={<Index category="explore" />} />
        <Route path="/subscriptions" element={<Index category="subscriptions" />} />
        <Route path="/your-videos" element={<Library tab="your-videos" />} />
        <Route path="/movies" element={<Index category="movies" />} />
        <Route path="/gaming" element={<Index category="gaming" />} />
        <Route path="/news" element={<Index category="news" />} />
        <Route path="/sports" element={<Index category="sports" />} />
        <Route path="/learning" element={<Index category="learning" />} />
        <Route path="/music" element={<Index category="music" />} />
        <Route path="/channel/:channelName" element={<Channel />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <Toaster position="bottom-right" richColors />
  </ThemeProvider>
);

export default App;
