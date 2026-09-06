import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  MapPin,
  GraduationCap,
  Award,
  ChevronDown,
  ArrowRight,
  Code2,
  Layers,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  onOpenAiAssistant: () => void;
  showToast: (msg: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResume,
  onOpenAiAssistant,
  showToast,
}) => {
  // Typing Effect State
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTagline = PERSONAL_INFO.taglines[taglineIndex];
    let typingSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && displayText === currentTagline) {
      typingSpeed = 2200; // Pause at end
      const timeout = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % PERSONAL_INFO.taglines.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentTagline.substring(0, displayText.length - 1)
          : currentTagline.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, taglineIndex]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    showToast('Email address copied to clipboard!');
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* Background Animated Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-6 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-6 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Subtle Background Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Hero Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Availability Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-5 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>{PERSONAL_INFO.availabilityStatus}</span>
            </div>

            {/* Main Greeting Heading */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-3">
              Hello, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Dynamic Typing Role */}
            <div className="h-10 sm:h-12 flex items-center mb-4">
              <span className="text-lg sm:text-2xl font-bold text-slate-700 dark:text-slate-300">
                I am{' '}
              </span>
              <span className="ml-2 text-lg sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent font-mono border-r-2 border-blue-500 pr-1 animate-pulse">
                {displayText}
              </span>
            </div>

            {/* Current Focus Highlight */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-5 border border-blue-500/20 font-mono">
              <Code2 className="w-3.5 h-3.5" />
              <span>Current Focus: {PERSONAL_INFO.currentFocus}</span>
            </div>

            {/* Short Intro Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-7">
              3rd Year Information Technology student at{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">
                {PERSONAL_INFO.college}
              </strong>{' '}
              with a <span className="font-extrabold text-blue-600 dark:text-blue-400">8.8 / 10.0 GPA</span>.
              Specializing in Next.js 16, TypeScript, Node.js, PostgreSQL, and Generative AI to engineer high-performance,
              scalable full-stack architectures.
            </p>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mb-8">
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-[11px] font-bold mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Academic GPA</span>
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white">8.8 / 10</div>
                
              </div>

              <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
                <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold mb-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Batch</span>
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white">3rd Year IT</div>
                <div className="text-[10px] text-slate-500">2024 – 2028</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
                <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 text-[11px] font-bold mb-1">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Problem Solving</span>
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white">450+ Solved</div>
                <div className="text-[10px] text-slate-500">LeetCode & HackerRank</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold mb-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Internships</span>
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white">2 Completed</div>
                <div className="text-[10px] text-slate-500">Neuroglobal & Infosys</div>
              </div>
            </div>

            {/* Action Buttons Group */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Resume Button */}
              <button
                id="btn-hero-resume"
                onClick={onOpenResume}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>View & Print Resume</span>
              </button>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer"
                title="Copy Email Address"
              >
                <Copy className="w-4 h-4 text-blue-500" />
              </button>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <button
                  onClick={onOpenAiAssistant}
                  className="p-3.5 rounded-xl bg-purple-600/15 text-purple-600 dark:text-purple-300 border border-purple-500/30 hover:bg-purple-600/25 transition-all cursor-pointer"
                  title="Ask AI Assistant about Kavya"
                >
                  <Sparkles className="w-4 h-4 text-purple-500" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Avatar Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer Decorative Gradient Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur-lg opacity-40 animate-pulse" />

              {/* Main Profile Frame */}
              <div className="relative p-6 rounded-3xl bg-white/75 dark:bg-slate-900/85 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Background Tech Accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />

                {/* Avatar Image Container */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 border-2 border-slate-200/50 dark:border-slate-700/50 shadow-inner group">
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

                  {/* Floating Overlay Badge on Avatar */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 border border-white/15 backdrop-blur-md flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-bold">Open to Work (2024 Batch)</span>
                    </div>
                    <span className="text-[11px] text-blue-300 font-mono">B.Tech IT</span>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="space-y-2.5 text-xs">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Academic Standing</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                      GPA 8.8 / 10
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Primary Stack</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                      Next.js 16, TypeScript, Postgres
                    </span>
                  </div>
                </div>

                {/* AI Interactive Prompt Trigger */}
                <button
                  onClick={onOpenAiAssistant}
                  className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between transition-colors cursor-pointer group"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-500 group-hover:rotate-12 transition-transform" />
                    <span>Ask AI Assistant about Kavya's Stack</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Down Scroll Arrow */}
      <a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-full text-slate-400 hover:text-blue-500 transition-colors animate-bounce hidden sm:block"
        aria-label="Scroll down to About section"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};
