import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  MapPin, 
  Copy, 
  Check, 
  ExternalLink, 
  Clock
} from 'lucide-react';
import { CONTACT_DATA } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenTalkModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenTalkModal }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const contactCards = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email Address',
      value: CONTACT_DATA.email,
      note: 'Official inquiries & project briefs',
      actionType: 'email',
      actionUrl: `mailto:${CONTACT_DATA.email}`,
      actionLabel: 'Send Email',
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      value: CONTACT_DATA.whatsapp,
      note: 'Fastest response for direct chats',
      actionType: 'whatsapp',
      actionUrl: `https://wa.me/88${CONTACT_DATA.whatsapp}`,
      actionLabel: 'Chat on WhatsApp',
    },
    {
      id: 'facebook',
      icon: Facebook,
      label: 'Facebook Profile',
      value: 'Osman Goni',
      note: 'Connect on Facebook profile',
      actionType: 'social',
      actionUrl: CONTACT_DATA.facebook.startsWith('http') ? CONTACT_DATA.facebook : `https://facebook.com/${CONTACT_DATA.facebook}`,
      actionLabel: 'Visit Facebook',
    },
    {
      id: 'instagram',
      icon: Instagram,
      label: 'Instagram',
      value: '@mm.osmangoni',
      note: 'Visual reels & design carousels',
      actionType: 'social',
      actionUrl: CONTACT_DATA.instagram.startsWith('http') ? CONTACT_DATA.instagram : `https://instagram.com/${CONTACT_DATA.instagram.replace('@', '')}`,
      actionLabel: 'Visit Instagram',
    },
  ];

  return (
    <section id="contact" className="w-full py-20 px-4 sm:px-8 border-t border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Top Pill Badge */}
        <div className="glass-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-lg bouncy-hover-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>CONTACT INFORMATION</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-3">
          <span className="text-white">Get In </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 drop-shadow-[0_2px_15px_rgba(6,182,212,0.4)]">
            Touch
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-stone-300 text-sm sm:text-base text-center max-w-xl mb-12">
          Feel free to connect directly for video editing, graphic design, or creative collaboration.
        </p>

        {/* 4 Quick Contact Cards in 2x2 Grid - Glassmorphism & Bounce on Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-10">
          {contactCards.map((card) => {
            const Icon = card.icon;
            const isCopied = copiedKey === card.id;

            return (
              <div
                key={card.id}
                className="glass-panel glass-panel-hover bouncy-hover border border-cyan-500/20 hover:border-cyan-400/60 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/35 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-500/25 group-hover:border-cyan-400/70 transition-all shadow-inner bouncy-hover-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider block">
                          {card.label}
                        </span>
                        <span className="text-white font-bold text-base sm:text-lg select-all">
                          {card.value}
                        </span>
                      </div>
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(card.value, card.id);
                      }}
                      className="p-2 rounded-lg glass-pill text-stone-200 hover:text-cyan-300 border-cyan-500/30 hover:border-cyan-400 transition-all text-xs flex items-center gap-1 focus:outline-none cursor-pointer bouncy-hover-sm"
                      title="Copy to clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="text-[11px] text-cyan-400 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-stone-300 text-xs mt-1 mb-4">
                    {card.note}
                  </p>
                </div>

                {/* Direct Action Link with Bounce */}
                <div className="pt-3 border-t border-cyan-500/20 flex items-center justify-end">
                  <a
                    href={card.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors bouncy-hover-sm cursor-pointer"
                  >
                    <span>{card.actionLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Big Bottom Address & Immediate Action Box - Glass Container */}
        <div className="w-full max-w-5xl glass-panel border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Cyan Glow Radial */}
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            {/* Address & Availability Info */}
            <div className="flex-1">
              <div className="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-cyan-300 text-[11px] font-bold uppercase tracking-wider mb-3 bouncy-hover-sm">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>PERMANENT ADDRESS</span>
              </div>

              <h3 className="text-white font-bold text-lg sm:text-xl leading-snug mb-2">
                {CONTACT_DATA.address}
              </h3>

              <p className="text-stone-300 text-xs sm:text-sm max-w-xl leading-relaxed mb-4">
                Based in Dhaka, Bangladesh — Available worldwide for remote video editing and graphic design collaborations.
              </p>

              {/* Status Chips */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-pill border-cyan-400/40 text-cyan-300 text-xs font-medium bouncy-hover-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>{CONTACT_DATA.availability}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill border-cyan-500/30 text-stone-200 text-xs bouncy-hover-sm">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Response: {CONTACT_DATA.responseRate}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons with Bounce */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <a
                href={`https://wa.me/88${CONTACT_DATA.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-[#020709] font-black px-6 py-3 rounded-full text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)] bouncy-hover whitespace-nowrap cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-[#020709]" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={onOpenTalkModal}
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-[#020709] font-extrabold px-6 py-3 rounded-full text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] bouncy-hover whitespace-nowrap cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Direct Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
