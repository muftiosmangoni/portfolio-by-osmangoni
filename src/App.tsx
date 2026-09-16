import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { CvModal } from './components/CvModal';
import { TalkModal } from './components/TalkModal';
import { ProjectItem } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#020709] text-white selection:bg-cyan-400 selection:text-[#020709] flex flex-col font-sans relative overflow-x-hidden">
      {/* Top Atmospheric Ambient Cyan Spotlight matching reference image */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-400/20 via-cyan-600/5 to-transparent blur-[120px] pointer-events-none -z-0" />
      {/* Left and right subtle sparkle star glows */}
      <div className="fixed top-1/4 -left-32 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-0" />
      <div className="fixed top-2/3 -right-32 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-0" />

      {/* Top Navbar */}
      <Navbar
        onOpenTalkModal={() => setIsTalkModalOpen(true)}
        onOpenCvModal={() => setIsCvModalOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1 flex flex-col items-center w-full">
        {/* Hero Section */}
        <Hero
          onExploreProjects={() => {
            const el = document.getElementById('projects');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactClick={() => {
            const el = document.getElementById('contact');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* My Projects Section */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Core Expertise & Skills */}
        <SkillsSection />

        {/* My Education & Creative Learning */}
        <EducationSection />

        {/* Contact Me */}
        <ContactSection
          onOpenTalkModal={() => setIsTalkModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenCvModal={() => setIsCvModalOpen(true)}
      />

      {/* Interactive Modals */}
      <VideoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      <TalkModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
      />
    </div>
  );
}

