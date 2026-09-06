import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen, UserCheck, Code, Sparkles, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION } from '../data/portfolioData';

interface AboutProps {
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Get To Know Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Kavya T</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            A passionate Full Stack Developer and 3rd Year Information Technology student driven by curiosity, code quality, and intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Bio & Core Values */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <span>My Background & Passions</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {PERSONAL_INFO.aboutBio}
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                My journey into tech began with a curiosity for how complex systems process data seamlessly. Today, I build end-to-end full stack web products—from responsive UI components with Next.js and Tailwind CSS to scalable RESTful backends and PostgreSQL databases.
              </p>

              {/* Core Strengths Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                {[
                  'Full-Stack Architecture (Next.js & Node.js)',
                  'AI Integration & Gemini API Models',
                  'Database Design (PostgreSQL & MongoDB)',
                  'Clean Code & Problem Solving',
                  'Agile Collaboration & Version Control',
                  'UI/UX Design Sensitivity & Responsiveness',
                ].map((strength, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-500/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  Looking for an energetic Full Stack / AI Intern?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  I am available for Summer / Fall 2026 internship opportunities and full-time roles.
                </p>
              </div>
              <button
                onClick={onOpenResume}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all cursor-pointer shadow-md shadow-blue-500/20"
              >
                View Full Resume
              </button>
            </div>
          </motion.div>

          {/* Right Column: Education Card & Academic Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Education Glass Card */}
            <div className="p-7 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Education</h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{EDUCATION.duration}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Degree</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{EDUCATION.degree}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center justify-between">
                    <span>{EDUCATION.college}</span>
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      GPA {EDUCATION.gpa}
                    </span>
                  </div>
                </div>

                {/* Coursework Modules */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                    <span>Relevant IT Coursework</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {EDUCATION.coursework.map((course, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-300/50 dark:border-slate-700/50"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Achievement Badge */}
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1">Academic Standing</div>
                  <div className="text-lg font-black text-white">Consistent High Academic Standing</div>
                  <p className="text-xs text-slate-300 mt-1">
                    Maintained an 8.8 / 10.0 cumulative GPA while actively participating in tech internships and building production-grade projects.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
