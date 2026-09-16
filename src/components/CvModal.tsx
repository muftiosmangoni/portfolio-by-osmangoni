import React from 'react';
import { X, Download, Printer, CheckCircle2, MapPin, Mail, Phone } from 'lucide-react';
import { PERSONAL_INFO, CONTACT_DATA, EDUCATION_DATA, TRAINING_INSTITUTE, SKILLS_DATA } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl glass-panel border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-[#020709]/80">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-bold text-lg">Curriculum Vitae</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full glass-pill text-cyan-300 font-semibold border border-cyan-500/40">
              {PERSONAL_INFO.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-full glass-pill border-cyan-500/30 text-stone-200 hover:text-white flex items-center gap-1.5 text-xs font-semibold transition-all focus:outline-none cursor-pointer bouncy-hover-sm"
              title="Print CV"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full glass-pill border-cyan-500/30 text-stone-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none cursor-pointer bouncy-hover-sm"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CV Paper Content */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-[#020709]/95 text-stone-200 flex flex-col gap-6 print:bg-white print:text-black">
          {/* Header Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-cyan-400 font-bold text-sm tracking-wider uppercase mt-1">
                {PERSONAL_INFO.role}
              </p>
              <p className="text-stone-300 text-xs mt-2 max-w-md leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-xs text-stone-300">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                {CONTACT_DATA.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                {CONTACT_DATA.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {CONTACT_DATA.address}
              </span>
            </div>
          </div>

          {/* Core Competencies */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300 mb-3">
              Core Expertise & Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SKILLS_DATA.map((skill) => (
                <div key={skill.id} className="p-3 glass-pill rounded-xl border border-cyan-500/20 bouncy-hover-sm">
                  <h3 className="font-bold text-white text-xs mb-1">{skill.title}</h3>
                  <p className="text-stone-300 text-[11px] leading-relaxed">{skill.description}</p>
                  {skill.tools && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {skill.tools.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-cyan-500/15 text-cyan-200 px-2 py-0.5 rounded border border-cyan-500/30">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Professional Skill Development */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300 mb-3">
              Professional Training & Certification
            </h2>
            <div className="p-4 glass-pill rounded-xl border border-cyan-500/25">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-bold text-white text-sm">
                  {TRAINING_INSTITUTE.institution}
                </h3>
                <span className="text-xs text-cyan-300 font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30">
                  {TRAINING_INSTITUTE.batch}
                </span>
              </div>
              <p className="text-xs text-stone-300 mb-3">
                {TRAINING_INSTITUTE.course}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TRAINING_INSTITUTE.competencies.map((comp, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span><strong>{comp.title}:</strong> {comp.tools}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Background */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300 mb-3">
              Academic Background
            </h2>
            <div className="space-y-3">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} className="p-3 glass-pill rounded-xl border border-cyan-500/20 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white text-xs">{edu.title}</h3>
                    <p className="text-stone-300 text-[11px]">{edu.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-semibold text-cyan-300">{edu.year}</span>
                    <p className="text-[10px] text-cyan-400 font-medium">{edu.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-cyan-500/20 bg-[#020709]/80 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-semibold text-stone-400 hover:text-white cursor-pointer bouncy-hover-sm"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-[#020709] px-5 py-2 rounded-full text-xs font-black shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer bouncy-hover"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};
