import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, GraduationCap, Briefcase, Code2, Award, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, EXPERIENCES, PROJECTS, CERTIFICATIONS, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast?: (msg: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, showToast }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Download uploaded resume asset or fallback to summary document
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Kavya_T_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (showToast) {
      showToast('Downloading Kavya T Official Resume...');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden my-8 max-h-[90vh]"
        >
          {/* Top Control Bar */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-400" />
              <h3 className="text-base font-bold">Kavya T - Official Curriculum Vitae</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Resume Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Printable Document Content */}
          <div id="printable-resume" className="p-8 sm:p-12 overflow-y-auto space-y-8 font-sans bg-white text-slate-900">
            {/* Resume Header */}
            <div className="border-b-2 border-slate-900 pb-6">
              <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm font-bold text-blue-700 mt-1">
                {PERSONAL_INFO.role}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {PERSONAL_INFO.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {PERSONAL_INFO.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  VSBEC (GPA {PERSONAL_INFO.gpa})
                </span>
              </div>
            </div>

            {/* Profile Summary */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Executive Profile
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {PERSONAL_INFO.aboutBio}
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Education
              </h2>
              <div>
                <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                  <span>{EDUCATION.degree}</span>
                  <span>{EDUCATION.duration}</span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-slate-600">
                  <span>{EDUCATION.college}, {EDUCATION.location}</span>
                  <span className="font-bold text-emerald-700">Cumulative GPA: {EDUCATION.gpa}</span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Work & Internship Experience
              </h2>
              <div className="space-y-4">
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                      <span>{exp.role} — {exp.company}</span>
                      <span className="text-slate-600 font-mono text-[11px]">{exp.period}</span>
                    </div>
                    <ul className="mt-1 space-y-1 list-disc list-inside text-xs text-slate-700">
                      {exp.description.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Key Software Projects
              </h2>
              <div className="space-y-3">
                {PROJECTS.map((proj) => (
                  <div key={proj.id}>
                    <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span>{proj.title} <span className="font-normal text-slate-600">— {proj.tagline}</span></span>
                      <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded">{proj.category}</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-0.5">{proj.description}</p>
                    <div className="text-[10px] text-blue-700 font-semibold mt-1">
                      Tech Stack: {proj.tags.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Matrix */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Technical Skills
              </h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.title}>
                    <span className="font-bold text-slate-900">{cat.title}: </span>
                    <span className="text-slate-700">{cat.skills.map(s => s.name).join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Certifications
              </h2>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.id}>
                    • <strong>{cert.title}</strong> ({cert.issuer})
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
