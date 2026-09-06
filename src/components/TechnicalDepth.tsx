import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Database,
  Cpu,
  Network,
  Boxes,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  BookOpen,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { TECHNICAL_DEPTH_TOPICS } from '../data/portfolioData';

export const TechnicalDepth: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(TECHNICAL_DEPTH_TOPICS[0].id);

  const activeTopic =
    TECHNICAL_DEPTH_TOPICS.find((t) => t.id === selectedTopicId) || TECHNICAL_DEPTH_TOPICS[0];

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Binary':
      case 'Code2':
        return <Code2 className="w-4 h-4" />;
      case 'Database':
        return <Database className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'Network':
        return <Network className="w-4 h-4" />;
      case 'Boxes':
        return <Boxes className="w-4 h-4" />;
      case 'Layers':
        return <Layers className="w-4 h-4" />;
      default:
        return <ShieldCheck className="w-4 h-4" />;
    }
  };

  return (
    <section id="technical-depth" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Computer Science Foundations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Technical Depth & <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">CS Core Mastery</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Systematic mastery of algorithmic complexity, relational database internals, concurrent operating systems, networking protocols, and scalable API architecture.
          </p>
        </div>

        {/* Tab Navigation Pill Strip */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {TECHNICAL_DEPTH_TOPICS.map((topic) => {
            const isSelected = topic.id === selectedTopicId;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {getTopicIcon(topic.iconName)}
                <span>{topic.shortName}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {topic.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Topic Deep Dive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTopic.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-2xl"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md">
                  {getTopicIcon(activeTopic.iconName)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                      {activeTopic.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                      {activeTopic.badge}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {activeTopic.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md">
                {activeTopic.summary}
              </p>
            </div>

            {/* Key Concepts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
              {activeTopic.keyConcepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>{concept.name}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {concept.explanation}
                    </p>
                  </div>

                  {concept.codeSnippet && (
                    <div className="mt-4 p-3.5 rounded-xl bg-slate-900 text-emerald-400 text-xs font-mono overflow-x-auto border border-slate-800">
                      <pre className="whitespace-pre">{concept.codeSnippet}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Interview Takeaways Footer */}
            <div className="p-5 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20">
              <h4 className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>Technical Interview Proficiency Takeaways</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
                {activeTopic.interviewTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
