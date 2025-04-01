
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, thumbnailUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // For demo purposes, we'll use the thumbnail as a placeholder
  // In a real implementation, you would use a real video URL
  const videoSrc = videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / progressBar.offsetWidth;
    
    video.currentTime = pos * video.duration;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        poster={thumbnailUrl}
        className="w-full h-full object-contain"
        onClick={togglePlay}
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-2">
        {/* Progress bar */}
        <div 
          className="w-full h-1 bg-gray-600 cursor-pointer mb-2"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-red-600" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={togglePlay}
              className="text-white hover:bg-white/20 rounded-full p-1"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            
            <button 
              onClick={toggleMute}
              className="text-white hover:bg-white/20 rounded-full p-1"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            
            <span className="text-white text-xs">
              {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-white hover:bg-white/20 rounded-full p-1">
              <Settings size={18} />
            </button>
            <button className="text-white hover:bg-white/20 rounded-full p-1">
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
