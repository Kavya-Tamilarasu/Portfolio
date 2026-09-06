import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Code2, GraduationCap, FolderGit2, Flame, Star } from 'lucide-react';
import { STATS } from '../data/portfolioData';

export const StatsCountUp: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (!isInView) return;

    STATS.forEach((stat) => {
      let start = 0;
      const end = stat.value;
      const duration = 1500; // ms
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = end / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCounts((prev) => ({ ...prev, [stat.id]: Math.round(start * 10) / 10 }));
      }, stepTime);
    });
  }, [isInView]);

  const getStatIcon = (id: string) => {
    switch (id) {
      case 'gpa':
        return <GraduationCap className="w-6 h-6 text-yellow-500" />;
      case 'solved':
        return <Code2 className="w-6 h-6 text-emerald-500" />;
      case 'projects':
        return <FolderGit2 className="w-6 h-6 text-blue-500" />;
      case 'certifications':
        return <Award className="w-6 h-6 text-purple-500" />;
      default:
        return <Star className="w-6 h-6 text-indigo-500" />;
    }
  };

  return (
    <section ref={ref} className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => {
            const currentVal = counts[stat.id] !== undefined ? counts[stat.id] : 0;
            const displayVal =
              stat.id === 'gpa' ? currentVal.toFixed(1) : Math.floor(currentVal);

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl hover:border-blue-500/40 transition-all text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  {getStatIcon(stat.id)}
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-0.5">
                  <span>{stat.prefix}</span>
                  <span>{displayVal}</span>
                  <span className="text-blue-600 dark:text-blue-400 text-2xl font-bold">
                    {stat.suffix}
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                  {stat.label}
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
