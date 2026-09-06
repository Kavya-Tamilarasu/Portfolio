import React from 'react';
import { MARQUEE_TECHS } from '../data/portfolioData';
import {
  Code2,
  Globe,
  FileCode,
  Server,
  Cpu,
  Database,
  Zap,
  Layout,
  Terminal,
  Coffee,
  Sparkles,
  GitBranch,
} from 'lucide-react';

export const TechMarquee: React.FC = () => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'FileCode':
        return <FileCode className="w-5 h-5" />;
      case 'Server':
        return <Server className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Database':
        return <Database className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  // Double the list for continuous marquee loop
  const duplicatedTechs = [...MARQUEE_TECHS, ...MARQUEE_TECHS];

  return (
    <div className="py-8 bg-slate-900/80 dark:bg-slate-950/90 border-y border-slate-800/80 overflow-hidden relative">
      {/* Gradient Fades on Left & Right Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
        {duplicatedTechs.map((tech, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-slate-200 text-xs font-semibold shrink-0 shadow-sm hover:border-blue-500/50 transition-colors"
          >
            <span className={tech.color}>{renderIcon(tech.icon)}</span>
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
