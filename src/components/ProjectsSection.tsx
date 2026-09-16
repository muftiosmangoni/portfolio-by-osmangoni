import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Video, 
  Palette, 
  Play, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Layers
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeTab, setActiveTab] = useState<'video' | 'graphics'>('video');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash.includes('graphics')) {
        setActiveTab('graphics');
        setCurrentPageIndex(0);
      } else if (window.location.hash.includes('video')) {
        setActiveTab('video');
        setCurrentPageIndex(0);
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const videoProjects = PROJECTS_DATA.filter((p) => p.category === 'video');
  const graphicProjects = PROJECTS_DATA.filter((p) => p.category === 'graphics');

  const activeProjects = activeTab === 'video' ? videoProjects : graphicProjects;

  // For video carousel (show 3 on desktop at a time)
  const itemsPerPage = 3;
  const maxPages = Math.ceil(activeProjects.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : maxPages - 1));
  };

  const handleNext = () => {
    setCurrentPageIndex((prev) => (prev < maxPages - 1 ? prev + 1 : 0));
  };

  const displayedProjects = activeProjects.slice(
    currentPageIndex * itemsPerPage,
    currentPageIndex * itemsPerPage + itemsPerPage
  );

  return (
    <section id="projects" className="w-full py-20 px-4 sm:px-8 border-t border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Top Pill Badge */}
        <div className="glass-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-lg bouncy-hover-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>PORTFOLIO SHOWCASE</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-8">
          <span className="text-white">Featured </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 drop-shadow-[0_2px_15px_rgba(6,182,212,0.4)]">
            Works
          </span>
        </h2>

        {/* Segmented Filter Tabs - Glassmorphism & Bounce */}
        <div className="flex items-center gap-3 p-1.5 rounded-full glass-panel border border-cyan-500/30 shadow-2xl mb-10">
          <button
            onClick={() => {
              setActiveTab('video');
              setCurrentPageIndex(0);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer bouncy-hover ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-[#020709] shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'text-stone-300 hover:text-white hover:bg-cyan-950/40'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Editing</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeTab === 'video' ? 'bg-[#020709]/20 text-[#020709]' : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
            }`}>
              {videoProjects.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('graphics');
              setCurrentPageIndex(0);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer bouncy-hover ${
              activeTab === 'graphics'
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-[#020709] shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'text-stone-300 hover:text-white hover:bg-cyan-950/40'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Graphic Design</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeTab === 'graphics' ? 'bg-[#020709]/20 text-[#020709]' : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
            }`}>
              {graphicProjects.length}
            </span>
          </button>
        </div>

        {/* Category Sub-bar Banner - Glass Container */}
        <div className="w-full glass-panel border border-cyan-500/25 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-inner">
              {activeTab === 'video' ? <Video className="w-5 h-5" /> : <Palette className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-white font-bold text-base sm:text-lg">
                  {activeTab === 'video' ? 'Video Editing Projects' : 'Graphic Design Projects'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full glass-pill border-cyan-500/40 text-cyan-300 text-xs font-semibold">
                  {activeTab === 'video' ? `${videoProjects.length} Projects` : `${graphicProjects.length} Designs`}
                </span>
              </div>
              <p className="text-stone-300 text-xs sm:text-sm mt-0.5">
                {activeTab === 'video'
                  ? 'Commercial video ads, viral social reels, and YouTube longforms'
                  : 'Brand identity, typography posters, marketing carousels & promotional art'}
              </p>
            </div>
          </div>

          {/* Navigation Arrows for Carousel */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full glass-pill border-cyan-500/30 hover:border-cyan-400 hover:text-cyan-300 text-stone-300 flex items-center justify-center transition-all bouncy-hover-sm focus:outline-none cursor-pointer"
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full glass-pill border-cyan-500/30 hover:border-cyan-400 hover:text-cyan-300 text-stone-300 flex items-center justify-center transition-all bouncy-hover-sm focus:outline-none cursor-pointer"
              aria-label="Next projects"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Projects Cards Container - Glass Cards with Bounce on Hover */}
        <div className="w-full relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="group relative glass-panel glass-panel-hover border border-cyan-500/20 hover:border-cyan-400/60 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col cursor-pointer bouncy-hover"
                onClick={() => onSelectProject(project)}
              >
                {/* Media Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#020709]">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020709] via-[#020709]/30 to-transparent" />

                  {/* Top Right Expand Icon Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#020709]/70 backdrop-blur-md border border-cyan-400/40 text-cyan-300 flex items-center justify-center opacity-85 hover:opacity-100 hover:scale-110 transition-all shadow-md"
                    title="Expand details"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Center Play Button for Videos */}
                  {project.category === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-cyan-400 text-[#020709] flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.6)] group-hover:scale-115 transition-transform ring-4 ring-cyan-400/30">
                        <Play className="w-5 h-5 text-[#020709] fill-[#020709] ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Left Pill Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold glass-pill text-cyan-300 border-cyan-400/50 shadow-md">
                      {project.tag}
                    </span>
                    {project.duration && (
                      <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-[#020709]/80 backdrop-blur-md text-stone-200 border border-cyan-500/20">
                        {project.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="text-white font-bold text-base leading-snug group-hover:text-cyan-300 transition-colors mb-2">
                      {project.title}
                    </h4>
                    <p className="text-stone-300 text-xs line-clamp-2 leading-relaxed mb-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tools / Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-cyan-500/20">
                    {project.tools.slice(0, 3).map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-cyan-950/50 text-cyan-200 border border-cyan-500/30 shadow-xs"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="text-[10px] text-cyan-400/80 font-medium">
                        +{project.tools.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        {maxPages > 1 && (
          <div className="flex items-center gap-2 mt-8">
            {Array.from({ length: maxPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPageIndex(idx)}
                className={`transition-all duration-300 rounded-full focus:outline-none cursor-pointer bouncy-hover-sm ${
                  currentPageIndex === idx
                    ? 'w-7 h-2 bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]'
                    : 'w-2 h-2 bg-cyan-950 border border-cyan-500/30 hover:bg-cyan-800'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
