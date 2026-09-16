import React, { useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { ProjectItem } from '../types';

interface VideoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!project) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl glass-panel border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-[#020709]/80">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold glass-pill text-cyan-300 border-cyan-400/40">
              {project.tag}
            </span>
            <h3 className="text-white font-bold text-lg leading-tight truncate">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-pill border-cyan-500/30 text-stone-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none cursor-pointer bouncy-hover-sm"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player or Graphic Preview Container */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
          {project.category === 'video' && project.videoUrl ? (
            <>
              <video
                ref={videoRef}
                src={project.videoUrl}
                poster={project.thumbnail}
                autoPlay
                loop
                playsInline
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-contain"
                onClick={togglePlay}
              />

              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-[#020709] flex items-center justify-center transition-transform active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.5)] cursor-pointer bouncy-hover"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current stroke-none" /> : <Play className="w-4 h-4 fill-current stroke-none ml-0.5" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 text-stone-300 hover:text-white transition-colors cursor-pointer bouncy-hover-sm"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <span className="text-xs text-stone-300 font-mono">
                    {project.duration || "0:45"}
                  </span>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-stone-300 hover:text-white transition-colors cursor-pointer bouncy-hover-sm"
                  title="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Modal Footer / Details */}
        <div className="p-6 bg-[#020709]/95 overflow-y-auto">
          <p className="text-stone-300 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cyan-500/20">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-stone-400 text-xs font-semibold">Tools used:</span>
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-medium glass-pill text-cyan-200 border-cyan-500/30"
                >
                  {tool}
                </span>
              ))}
            </div>

            {project.clientOrOrg && (
              <span className="text-xs text-stone-400 font-medium">
                Client / Program: <span className="text-cyan-300 font-bold">{project.clientOrOrg}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
