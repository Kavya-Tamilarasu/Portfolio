import React, { useState, useEffect } from 'react';
import { Theme } from './types';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsCountUp } from './components/StatsCountUp';
import { TechMarquee } from './components/TechMarquee';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { TechnicalDepth } from './components/TechnicalDepth';
import { Projects } from './components/Projects';
import { GitHubHeatmap } from './components/GitHubHeatmap';
import { Experience } from './components/Experience';
import { AchievementsSection } from './components/AchievementsSection';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { ToastContainer, ToastMessage } from './components/ToastContainer';
import { LoadingScreen } from './components/LoadingScreen';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme') as Theme | null;
      if (saved) return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light'; // Defaulting to light as fallback if no match
  });
  const [loading, setLoading] = useState(true);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initial loader screen duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Sync dark class on html element and persist
  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-blue-500 selection:text-white relative">
      {/* Scroll Progress Bar at the top */}
      <ScrollProgress />

      {/* Main Global Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Flow */}
      <main id="main-content" className="relative z-10">
        {/* Universal Hero with availability badge, typing role, and action buttons */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
          showToast={showToast}
        />

        {/* Portfolio Sections */}
        <>
          <StatsCountUp />
          <TechMarquee />
          <About onOpenResume={() => setIsResumeOpen(true)} />
          <Projects />
          <TechnicalDepth />
          <Skills />
          <GitHubHeatmap />
          <Experience />
          <AchievementsSection />
          <Certifications />
          <Contact showToast={showToast} />
        </>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2.5">
        {/* Floating AI Assistant Trigger Widget */}
        <button
          id="btn-floating-ai"
          onClick={() => setIsAiAssistantOpen(true)}
          className="p-3.5 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xl shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 group"
          aria-label="Ask Kavya's AI Assistant"
        >
          <Sparkles className="w-5 h-5 text-yellow-300 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-xs font-bold pr-1">Ask AI</span>
        </button>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
      />

      {/* Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        showToast={showToast}
      />

      {/* Command Palette (Ctrl + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      {/* Toast Notification Stream */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
