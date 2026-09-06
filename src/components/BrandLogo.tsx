import React from 'react';
import { motion } from 'motion/react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  };

  return (
    <a
      href="#hero"
      id="brand-logo"
      className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl cursor-pointer"
      aria-label="Kavya T Portfolio Home"
    >
      {/* Luxury Monogram Badge */}
      <motion.div
        whileHover={{ scale: 1.06, rotate: [0, -3, 3, 0] }}
        whileTap={{ scale: 0.95 }}
        className={`relative ${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-[1.5px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow`}
      >
        <div className="w-full h-full rounded-[14px] bg-slate-900 dark:bg-slate-950 flex items-center justify-center relative overflow-hidden">
          {/* Subtle glowing reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Initials KT */}
          <span className="font-black tracking-tighter bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent select-none font-sans">
            KT
          </span>

          {/* Active status pulse green dot */}
          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse" />
        </div>
      </motion.div>

      {/* Name and Designation */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
            <span>Kavya T</span>
            <span className="text-blue-500 font-bold">.</span>
          </span>
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase font-mono">
            Full Stack SDE
          </span>
        </div>
      )}
    </a>
  );
};
