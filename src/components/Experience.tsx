import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2, TrendingUp, Users } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work & Internships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Professional <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Hands-on software development internship track delivering production web features, optimizing PostgreSQL queries, and collaborating in agile teams.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 opacity-30 -translate-x-1/2" />

          <div className="space-y-12">
            {EXPERIENCES.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-1.5 w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-500/30 ring-4 ring-white dark:ring-slate-950 z-10 font-mono">
                    {item.logoText}
                  </div>

                  {/* Experience Card */}
                  <div
                    className={`w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0 ${
                      isEven ? 'sm:pr-0' : 'sm:pl-0'
                    }`}
                  >
                    <div className="p-6 sm:p-7 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl hover:border-blue-500/40 transition-all space-y-4">
                      {/* Header Info */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {item.location}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                          {item.role}
                        </h3>
                        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{item.company}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500 font-normal">{item.type}</span>
                        </div>
                      </div>

                      {/* Key Responsibilities */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Responsibilities:
                        </span>
                        <ul className="space-y-1.5">
                          {item.description.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed"
                            >
                              <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Measurable Outcomes */}
                      {item.outcomes && (
                        <div className="p-3 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>Measurable Impact & Delivery:</span>
                          </span>
                          <ul className="space-y-1">
                            {item.outcomes.map((outcome, oIdx) => (
                              <li
                                key={oIdx}
                                className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5"
                              >
                                <span className="text-emerald-500 font-bold">•</span>
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Team Collaboration */}
                      {item.teamCollaboration && (
                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{item.teamCollaboration}</span>
                        </div>
                      )}

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200/60 dark:border-slate-700/60 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
