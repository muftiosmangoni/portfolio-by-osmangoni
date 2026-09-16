import React from 'react';
import { 
  Sparkles, 
  Video, 
  Palette, 
  Eye, 
  FileText, 
  Mic, 
  Users 
} from 'lucide-react';
import { SKILLS_DATA, PERSONAL_INFO } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'video':
        return <Video className="w-6 h-6 text-cyan-400" />;
      case 'palette':
        return <Palette className="w-6 h-6 text-cyan-400" />;
      case 'eye':
        return <Eye className="w-6 h-6 text-cyan-400" />;
      case 'file-text':
        return <FileText className="w-6 h-6 text-cyan-400" />;
      case 'mic':
        return <Mic className="w-6 h-6 text-cyan-400" />;
      case 'users':
        return <Users className="w-6 h-6 text-cyan-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="w-full py-20 px-4 sm:px-8 border-t border-cyan-500/20 relative overflow-hidden">
      {/* Ambient glow spotlight behind skills */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Subtle Background Watermark Silhouette */}
      <div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none -z-10 bg-contain bg-no-repeat bg-right"
        style={{ backgroundImage: `url(${PERSONAL_INFO.portraitUrl})` }}
      />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Top Pill Badge */}
        <div className="glass-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-lg bouncy-hover-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>CORE EXPERTISE & SKILLS</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-12">
          <span className="text-white">Core Expertise & </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 drop-shadow-[0_2px_15px_rgba(6,182,212,0.4)]">
            Skills
          </span>
        </h2>

        {/* 6 Cards in 2 Columns Grid - Glassmorphism & Bounce Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {SKILLS_DATA.map((skill) => (
            <div
              key={skill.id}
              className="glass-panel glass-panel-hover bouncy-hover border border-cyan-500/20 hover:border-cyan-400/60 rounded-2xl p-6 transition-all duration-300 shadow-xl group flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/35 flex items-center justify-center mb-4 group-hover:bg-cyan-500/25 group-hover:border-cyan-400/70 transition-all shadow-inner bouncy-hover-sm">
                  {getIcon(skill.icon)}
                </div>

                {/* Skill Title */}
                <h3 className="text-white font-extrabold text-base sm:text-lg tracking-wide uppercase mb-2 group-hover:text-cyan-300 transition-colors">
                  {skill.title}
                </h3>

                {/* Description */}
                <p className="text-stone-300 text-sm leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              {/* Tools Tags if available - Glass Pill & Bounce */}
              {skill.tools && skill.tools.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-3 border-t border-cyan-500/20">
                  {skill.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold glass-pill text-cyan-200 border-cyan-500/30 hover:border-cyan-400 hover:text-white bouncy-hover-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
