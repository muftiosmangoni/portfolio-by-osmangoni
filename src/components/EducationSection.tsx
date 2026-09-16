import React from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  School, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Wrench,
  Sparkles,
  Layers
} from 'lucide-react';
import { EDUCATION_DATA, TRAINING_INSTITUTE } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  const getEduIcon = (iconName: string) => {
    switch (iconName) {
      case 'book':
        return <BookOpen className="w-5 h-5 text-cyan-400" />;
      case 'school':
        return <School className="w-5 h-5 text-cyan-400" />;
      case 'award':
        return <Award className="w-5 h-5 text-cyan-400" />;
      case 'star':
        return <Star className="w-5 h-5 text-cyan-400 fill-cyan-400/30" />;
      default:
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="education" className="w-full py-20 px-4 sm:px-8 border-t border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Top Pill Badge */}
        <div className="glass-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-lg bouncy-hover-sm">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>EDUCATION & PROFESSIONAL TRAINING</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-12">
          <span className="text-white">My Education & </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 drop-shadow-[0_2px_15px_rgba(6,182,212,0.4)]">
            Creative Learning
          </span>
        </h2>

        {/* 2 Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          {/* Left Column: Academic Background (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-white font-bold text-xl tracking-tight">
                Academic Background
              </h3>
            </div>

            {/* Academic Cards List */}
            <div className="flex flex-col gap-4">
              {EDUCATION_DATA.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel glass-panel-hover bouncy-hover border border-cyan-500/20 hover:border-cyan-400/60 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between group shadow-lg cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center shadow-inner">
                        {getEduIcon(item.icon)}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base leading-snug group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-stone-300 text-xs font-medium">
                          {item.institution}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold glass-pill text-cyan-300 border-cyan-500/40">
                      {item.year}
                    </span>
                  </div>

                  <p className="text-stone-300 text-xs leading-relaxed mt-2 mb-3">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-cyan-500/20 flex items-center justify-between text-xs">
                    <span className="text-stone-400">Status</span>
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Skill Development (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-white font-bold text-xl tracking-tight">
                Professional Skill Development
              </h3>
            </div>

            {/* Main Institutional Training Container */}
            <div className="glass-panel glass-panel-hover bouncy-hover border border-cyan-500/25 rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full">
              {/* Subtle cyan accent glow */}
              <div className="absolute -right-20 -top-20 w-52 h-52 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Institution Badge */}
                <div className="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-cyan-300 text-[11px] font-bold uppercase tracking-wider mb-3 bouncy-hover-sm">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>{TRAINING_INSTITUTE.tag}</span>
                </div>

                {/* Institution Title */}
                <h4 className="text-white font-black text-2xl tracking-tight leading-snug mb-3">
                  {TRAINING_INSTITUTE.institution}
                </h4>

                {/* Course & Batch Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold glass-pill text-stone-200 border-cyan-500/30 bouncy-hover-sm">
                    {TRAINING_INSTITUTE.course}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 bouncy-hover-sm shadow-sm">
                    {TRAINING_INSTITUTE.batch}
                  </span>
                </div>

                {/* Sub-header */}
                <div className="text-stone-300 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>CORE COMPETENCIES ACQUIRED:</span>
                </div>

                {/* 4 Sub-cards in 2x2 Grid with Bounce Hover */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                  {TRAINING_INSTITUTE.competencies.map((comp, idx) => (
                    <div
                      key={idx}
                      className="glass-pill border border-cyan-500/25 hover:border-cyan-400/60 rounded-xl p-3.5 transition-all bouncy-hover-sm cursor-pointer"
                    >
                      <h5 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        {comp.title}
                      </h5>
                      <p className="text-stone-300 text-xs leading-relaxed">
                        {comp.tools}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Footer Bar */}
              <div className="pt-4 border-t border-cyan-500/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
                  <Wrench className="w-4 h-4 text-cyan-400" />
                  <span>{TRAINING_INSTITUTE.footerLeft}</span>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-500 text-[#020709] shadow-sm bouncy-hover-sm">
                  {TRAINING_INSTITUTE.footerRight}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
