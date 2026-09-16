import React from 'react';
import { 
  ArrowUp, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  Mail, 
  Download 
} from 'lucide-react';
import { PERSONAL_INFO, CONTACT_DATA } from '../data/portfolioData';

interface FooterProps {
  onOpenCvModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCvModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#020709]/90 backdrop-blur-xl border-t border-cyan-500/20 pt-16 pb-12 px-4 sm:px-8 text-stone-300 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md ring-2 ring-cyan-400/40 overflow-hidden bouncy-hover-sm">
              <img 
                src={PERSONAL_INFO.portraitUrl} 
                alt={PERSONAL_INFO.name} 
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="sr-only">OG</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-base leading-tight tracking-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-cyan-400 font-semibold text-[10px] tracking-wider uppercase">
                {PERSONAL_INFO.role}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-stone-300 text-xs font-medium">
            <a href="#home" className="hover:text-cyan-300 transition-colors bouncy-hover-sm">Home</a>
            <a href="#projects" className="hover:text-cyan-300 transition-colors bouncy-hover-sm">My Projects</a>
            <a href="#skills" className="hover:text-cyan-300 transition-colors bouncy-hover-sm">Core Expertise & Skills</a>
            <a href="#education" className="hover:text-cyan-300 transition-colors bouncy-hover-sm">Education</a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors bouncy-hover-sm">Contact</a>
            <button
              onClick={onOpenCvModal}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none cursor-pointer font-semibold bouncy-hover-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </button>
          </nav>

          {/* Social Icons & Back to Top with Bounce */}
          <div className="flex items-center gap-3">
            <a
              href={CONTACT_DATA.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-pill border-cyan-500/30 hover:border-cyan-400 hover:text-white flex items-center justify-center transition-all text-cyan-300 bouncy-hover-sm"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={CONTACT_DATA.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-pill border-cyan-500/30 hover:border-cyan-400 hover:text-white flex items-center justify-center transition-all text-cyan-300 bouncy-hover-sm"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/88${CONTACT_DATA.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-pill border-cyan-500/30 hover:border-cyan-400 hover:text-white flex items-center justify-center transition-all text-cyan-300 bouncy-hover-sm"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${CONTACT_DATA.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-pill border-cyan-500/30 hover:border-cyan-400 hover:text-white flex items-center justify-center transition-all text-cyan-300 bouncy-hover-sm"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-[#020709] flex items-center justify-center hover:opacity-90 transition-all ml-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] focus:outline-none cursor-pointer bouncy-hover"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-cyan-500/20" />

        {/* Bottom Copyright & Mission Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-[11px]">
          <p>© 2026 {PERSONAL_INFO.name} | All Rights Reserved.</p>
          <p className="text-cyan-300 font-medium">
            Crafting visual stories that connect, convert & elevate brands
          </p>
        </div>
      </div>
    </footer>
  );
};
