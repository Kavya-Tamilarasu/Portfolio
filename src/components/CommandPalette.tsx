import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Command,
  User,
  Code2,
  FolderGit2,
  Briefcase,
  Award,
  Mail,
  BookOpen,
  Sparkles,
  FileText,
  Sun,
  Moon,
  Copy,
  Github,
  Linkedin,
  Cpu,
  Trophy,
  X,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAiAssistant: () => void;
  onOpenResume: () => void;
  toggleTheme: () => void;
  theme: 'dark' | 'light';
  showToast?: (msg: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenAiAssistant,
  onOpenResume,
  toggleTheme,
  theme,
  showToast,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          setQuery('');
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'ai',
      label: "Ask Kavya's AI Assistant",
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      action: () => {
        onClose();
        onOpenAiAssistant();
      },
    },
    {
      id: 'resume',
      label: 'View Printable Resume / CV (PDF)',
      icon: <FileText className="w-4 h-4 text-blue-400" />,
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'theme',
      label: `Switch Theme to ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`,
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />,
      action: () => {
        toggleTheme();
        onClose();
        if (showToast) showToast(`Switched to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
      },
    },
    {
      id: 'copy-email',
      label: 'Copy Email Address to Clipboard',
      icon: <Copy className="w-4 h-4 text-emerald-400" />,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        onClose();
        if (showToast) showToast('Email address copied to clipboard!');
      },
    },
    {
      id: 'sec-tech-depth',
      label: 'Jump to CS Core & Architecture Depth',
      icon: <Cpu className="w-4 h-4 text-blue-400" />,
      action: () => {
        onClose();
        document.getElementById('technical-depth')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'sec-projects',
      label: 'Jump to Featured Projects & Case Studies',
      icon: <FolderGit2 className="w-4 h-4 text-slate-400" />,
      action: () => {
        onClose();
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'sec-skills',
      label: 'Jump to Skills Matrix & Proficiency',
      icon: <Code2 className="w-4 h-4 text-slate-400" />,
      action: () => {
        onClose();
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'sec-achievements',
      label: 'Jump to Honors & Key Achievements',
      icon: <Trophy className="w-4 h-4 text-amber-400" />,
      action: () => {
        onClose();
        document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'sec-exp',
      label: 'Jump to Experience & Internships',
      icon: <Briefcase className="w-4 h-4 text-slate-400" />,
      action: () => {
        onClose();
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'sec-about',
      label: 'Jump to About Section & Education',
      icon: <User className="w-4 h-4 text-slate-400" />,
      action: () => {
        onClose();
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'sec-cert',
      label: 'Jump to Certifications',
      icon: <Award className="w-4 h-4 text-slate-400" />,
      action: () => {
        onClose();
        document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'sec-contact',
      label: 'Jump to Contact Section',
      icon: <Mail className="w-4 h-4 text-slate-400" />,
      action: () => {
        onClose();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  const filteredActions = actions.filter((act) =>
    act.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Input Header */}
          <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command (e.g. Case Study, Resume, CS Core, Ask AI)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none placeholder:text-slate-400 font-sans"
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredActions.length > 0 ? (
              filteredActions.map((act) => (
                <button
                  key={act.id}
                  onClick={act.action}
                  className="w-full px-4 py-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left flex items-center justify-between text-xs sm:text-sm text-slate-800 dark:text-slate-200 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600/10 transition-colors">
                      {act.icon}
                    </div>
                    <span className="font-semibold text-xs sm:text-sm">{act.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Execute ↵
                  </span>
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                No matching command found for "{query}"
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Use ↑↓ to navigate</span>
            <span>ESC to exit</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
