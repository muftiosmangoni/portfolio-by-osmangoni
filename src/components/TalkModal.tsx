import React, { useState } from 'react';
import { X, Send, MessageCircle, Check, Sparkles } from 'lucide-react';
import { CONTACT_DATA, PERSONAL_INFO } from '../data/portfolioData';

interface TalkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TalkModal: React.FC<TalkModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState<'video' | 'graphics' | 'collaboration'>('video');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-populate email or WhatsApp
    const subject = encodeURIComponent(`Project Inquiry: ${projectType.toUpperCase()} - From ${name}`);
    const body = encodeURIComponent(`Hi ${PERSONAL_INFO.name},\n\nMy name is ${name} (${email}).\n\nI am interested in ${projectType} work:\n${message}\n\nLooking forward to hearing from you!`);
    
    // Open mail client
    window.open(`mailto:${CONTACT_DATA.email}?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(`Assalamu Alaikum ${PERSONAL_INFO.name}, I saw your portfolio and would like to discuss a project.`);
    window.open(`https://wa.me/88${CONTACT_DATA.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg glass-panel border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-[#020709]/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-white font-bold text-base">Let's Talk with {PERSONAL_INFO.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-pill border-cyan-500/30 text-stone-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none cursor-pointer bouncy-hover-sm"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 bg-[#020709]/90">
          {submitted ? (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-lg mb-1">Message Ready!</h4>
              <p className="text-stone-300 text-xs">
                Your email client was opened to send your inquiry directly to {CONTACT_DATA.email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 p-1 bg-[#051117] rounded-xl border border-cyan-500/25">
                <button
                  type="button"
                  onClick={() => setProjectType('video')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer bouncy-hover-sm ${
                    projectType === 'video' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-[#020709] font-black shadow-md' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Video Editing
                </button>
                <button
                  type="button"
                  onClick={() => setProjectType('graphics')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer bouncy-hover-sm ${
                    projectType === 'graphics' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-[#020709] font-black shadow-md' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Graphic Design
                </button>
                <button
                  type="button"
                  onClick={() => setProjectType('collaboration')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer bouncy-hover-sm ${
                    projectType === 'collaboration' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-[#020709] font-black shadow-md' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Collaboration
                </button>
              </div>

              <div>
                <label className="block text-stone-300 text-xs font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asif Mahmud"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#051117] border border-cyan-500/25 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none transition-colors placeholder:text-stone-600"
                />
              </div>

              <div>
                <label className="block text-stone-300 text-xs font-semibold mb-1">Your Email or Contact</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. asif@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#051117] border border-cyan-500/25 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none transition-colors placeholder:text-stone-600"
                />
              </div>

              <div>
                <label className="block text-stone-300 text-xs font-semibold mb-1">Project Brief / Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder={`Tell ${PERSONAL_INFO.name} about your video, motion design, or graphic requirements...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#051117] border border-cyan-500/25 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none transition-colors resize-none placeholder:text-stone-600"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-[#020709] font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] bouncy-hover cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Email</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-[#020709] font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] bouncy-hover cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-[#020709]" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
