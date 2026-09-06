import React from 'react';
import { motion } from 'motion/react';
import { Code2, Sparkles } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/30 mb-6"
      >
        <Code2 className="w-10 h-10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-2xl font-black tracking-tight mb-1">
          Kavya T<span className="text-blue-500">.</span>
        </h1>
        <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>Full Stack Developer Portfolio Loading...</span>
        </p>
      </motion.div>
    </div>
  );
};
