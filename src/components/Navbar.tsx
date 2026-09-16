import React, { useState, useEffect } from 'react';
import { Share2, MessageSquare, Download, Menu, X, Check, Copy } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenTalkModal: () => void;
  onOpenCvModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTalkModal, onOpenCvModal }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${PERSONAL_INFO.name} - Visualizer & Video Editor`,
          text: `Check out the portfolio of ${PERSONAL_INFO.name}, Creative Visualizer and Video Editor.`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'My Projects', href: '#projects', id: 'projects' },
    { name: 'Core Expertise & Skills', href: '#skills', id: 'skills' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#020709]/80 backdrop-blur-xl border-b border-cyan-500/20 px-4 sm:px-8 py-3.5 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Profile Brand */}
        <a href="#home" className="flex items-center gap-3 group focus:outline-none bouncy-hover-sm">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-[#020709] font-black text-sm tracking-tighter shadow-lg ring-2 ring-cyan-400/40 group-hover:scale-105 transition-transform overflow-hidden">
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
            <span className="text-white font-bold text-base leading-tight tracking-tight group-hover:text-cyan-300 transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-cyan-400 font-semibold text-[10px] tracking-wider uppercase">
              {PERSONAL_INFO.role}
            </span>
          </div>
        </a>

        {/* Center Navigation Pill Bar (Desktop) */}
        <nav className="hidden lg:flex items-center bg-[#04141c]/70 backdrop-blur-md border border-cyan-500/25 rounded-full px-2 py-1 shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium bouncy-hover-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/30 to-teal-500/20 text-white shadow-sm border border-cyan-400/60 font-semibold'
                    : 'text-stone-300 hover:text-cyan-300 hover:bg-cyan-950/40'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          
          {/* Download CV Pill Button */}
          <button
            onClick={onOpenCvModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-stone-200 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors focus:outline-none cursor-pointer bouncy-hover-sm"
            title={`Preview or download ${PERSONAL_INFO.name}'s CV`}
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Download CV</span>
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="relative w-9 h-9 rounded-full bg-[#051a24]/80 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 text-stone-300 hover:text-white flex items-center justify-center transition-all bouncy-hover-sm focus:outline-none cursor-pointer"
            title="Share portfolio"
            aria-label="Share portfolio link"
          >
            {copiedShare ? (
              <Check className="w-4 h-4 text-cyan-400" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
            
            {copiedShare && (
              <div className="absolute top-12 right-0 bg-[#061e2b] text-cyan-300 text-[11px] font-medium px-2.5 py-1 rounded-md border border-cyan-500/40 shadow-xl whitespace-nowrap animate-in fade-in">
                Link copied to clipboard!
              </div>
            )}
          </button>

          {/* Let's Talk Button */}
          <button
            onClick={onOpenTalkModal}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-[#020709] px-4.5 py-2 rounded-full text-xs font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] bouncy-hover focus:outline-none cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-[#020709]" />
            <span>Let's Talk</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenTalkModal}
            className="bg-cyan-500 text-[#020709] px-3 py-1.5 rounded-full text-xs font-extrabold bouncy-hover-sm"
          >
            Talk
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-300 hover:text-cyan-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-cyan-500/20 bg-[#03131c]/95 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium bouncy-hover-sm ${
                activeSection === link.id
                  ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-stone-300 hover:bg-cyan-950/40'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-cyan-500/20 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCvModal();
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-[#061d29] border border-cyan-500/30 py-2 rounded-xl text-xs font-medium text-stone-200 bouncy-hover-sm"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              Download CV
            </button>
            <button
              onClick={handleShare}
              className="px-3 py-2 bg-[#061d29] border border-cyan-500/30 rounded-xl text-xs text-stone-300 flex items-center gap-1.5 bouncy-hover-sm"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
