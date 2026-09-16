import React from 'react';
import { Play, Send, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onExploreProjects: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onContactClick }) => {
  const heroTags = [
    { label: "Social Media", category: "video" },
    { label: "Graphic Design", category: "graphics" },
    { label: "Motion Design", category: "video" },
    { label: "Video Editing", category: "video" },
    { label: "Gen AI", category: "graphics" }
  ];

  const handlePillClick = (category: string) => {
    const el = document.getElementById('projects');
    el?.scrollIntoView({ behavior: 'smooth' });
    // Trigger filter update if custom event or hash
    window.location.hash = category === 'video' ? '#projects-video' : '#projects-graphics';
  };

  return (
    <section id="home" className="relative w-full min-h-[calc(100vh-70px)] flex items-center justify-center overflow-hidden pt-10 pb-20 px-4 sm:px-8">
      {/* Ambient Top Light Beam from Reference Image */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-cyan-400/25 via-cyan-600/10 to-transparent blur-[110px] pointer-events-none -z-10" />
      
      {/* 4-Point Star Sparkles matching reference image */}
      <div className="absolute top-12 left-6 sm:left-12 pointer-events-none opacity-85 animate-pulse hidden sm:block">
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-cyan-400 fill-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]">
          <path d="M12 0 C12 6.5 17.5 12 24 12 C17.5 12 12 17.5 12 24 C12 17.5 6.5 12 0 12 C6.5 12 12 6.5 12 0 Z" />
        </svg>
      </div>
      <div className="absolute bottom-16 right-6 sm:right-12 pointer-events-none opacity-80 animate-pulse hidden sm:block">
        <svg viewBox="0 0 24 24" className="w-14 h-14 text-cyan-400 fill-cyan-400 drop-shadow-[0_0_16px_rgba(34,211,238,0.9)]">
          <path d="M12 0 C12 6.5 17.5 12 24 12 C17.5 12 12 17.5 12 24 C12 17.5 6.5 12 0 12 C6.5 12 12 6.5 12 0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          
          {/* Tag Pill Badge */}
          <div className="glass-pill inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-stone-200 text-xs font-semibold tracking-wider uppercase mb-5 shadow-lg bouncy-hover-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-bold">{PERSONAL_INFO.badges[0]}</span>
            <span className="text-cyan-500/50 font-normal">|</span>
            <span className="text-cyan-300 font-bold">{PERSONAL_INFO.badges[1]}</span>
          </div>

          {/* Main Headline: Osman Goni as requested */}
          <div className="flex flex-col mb-4">
            <span className="text-lg sm:text-xl font-medium tracking-wide text-stone-300 mb-1">
              Assalamu Alaikum, I am
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06]">
              {PERSONAL_INFO.name.split(' ')[0]}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 drop-shadow-[0_2px_20px_rgba(6,182,212,0.4)]">
                {PERSONAL_INFO.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>
          </div>

          {/* Subtitle / Bio */}
          <p className="text-stone-300 text-base sm:text-lg max-w-xl mb-6 leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>

          {/* Reference Image Style Category Glass Pills (With Bounce Micro-interactions) */}
          <div className="flex flex-wrap items-center gap-2.5 mb-8">
            {heroTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => handlePillClick(tag.category)}
                className="glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-white hover:text-cyan-300 hover:border-cyan-400/70 shadow-[0_4px_15px_rgba(0,0,0,0.3)] bouncy-hover cursor-pointer"
                title={`Filter by ${tag.label}`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href="#projects"
              onClick={onExploreProjects}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-[#020709] font-black px-7 py-3.5 rounded-full text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] bouncy-hover cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-[#020709]/20 flex items-center justify-center">
                <Play className="w-3 h-3 text-[#020709] fill-[#020709] ml-0.5" />
              </div>
              <span>My Projects</span>
            </a>

            <a
              href="#contact"
              onClick={onContactClick}
              className="inline-flex items-center gap-2.5 glass-panel glass-panel-hover text-stone-200 hover:text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide border border-cyan-500/30 hover:border-cyan-400/60 transition-all bouncy-hover cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4 text-cyan-400" />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Quick Credibility Micro-metrics in Glass Container */}
          <div className="mt-10 pt-6 border-t border-cyan-500/20 w-full flex flex-wrap items-center gap-6 sm:gap-10 text-stone-400 text-xs">
            <div className="flex items-center gap-2.5 bouncy-hover-sm">
              <span className="text-white font-extrabold text-xl">20+</span>
              <span className="leading-tight text-stone-300">Creative<br />Projects</span>
            </div>
            <div className="w-px h-8 bg-cyan-500/20" />
            <div className="flex items-center gap-2.5 bouncy-hover-sm">
              <span className="text-cyan-400 font-extrabold text-xl">100%</span>
              <span className="leading-tight text-stone-300">Story-Driven<br />Engagement</span>
            </div>
            <div className="w-px h-8 bg-cyan-500/20" />
            <div className="flex items-center gap-2.5 bouncy-hover-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-300 font-semibold">Available for Projects</span>
            </div>
          </div>
        </div>

        {/* Right Column: Osman Goni Portrait with Glass Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          {/* Subtle Ambient Cyan Glow Behind Portrait */}
          <div className="absolute inset-0 max-w-[420px] max-h-[520px] mx-auto my-auto bg-gradient-to-t from-cyan-500/20 via-cyan-400/10 to-transparent rounded-[40px] blur-3xl -z-10" />
          
          {/* Glass Card Container */}
          <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.8)] p-2 group bouncy-hover">
            {/* Inner Glass Frame */}
            <div className="relative rounded-[22px] overflow-hidden bg-[#031118]/80 aspect-[4/5] flex items-end justify-center border border-cyan-500/20">
              <img
                src={PERSONAL_INFO.portraitUrl}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Bottom Subtle Gradient Fade */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020709] via-[#020709]/70 to-transparent pointer-events-none" />

              {/* Glass Floating Badge in Portrait */}
              <div className="absolute bottom-4 left-4 right-4 glass-pill border border-cyan-500/40 rounded-2xl p-3 flex items-center justify-between shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-inner">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-xs font-bold leading-tight">
                      Visualizer & Editor
                    </span>
                    <span className="text-stone-300 text-[10px]">
                      Dhaka, Bangladesh • Worldwide
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-400/20 text-cyan-300 border border-cyan-400/50 shadow-sm">
                    PRO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


