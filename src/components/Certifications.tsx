import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle2, ExternalLink, ShieldCheck, Sparkles, FileText } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { Certification } from '../types';
import { CertificateViewer } from './CertificateViewer';

export const Certifications: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Learning</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Professional <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Accredited certifications from top academic institutes, industry leaders, and technical platforms.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Badge */}
                  {cert.badgeType && (
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-sm ${
                        cert.badgeType === 'Silver'
                          ? 'bg-slate-200 text-slate-800 dark:bg-slate-300 dark:text-slate-900 border border-slate-300'
                          : cert.badgeType === 'Explorer'
                          ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30'
                          : 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {cert.badgeType}
                    </span>
                  )}
                </div>

                {/* Skills Tags */}
                <div className="mb-6">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Competencies Certified
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Credentials Info */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                  ID: {cert.credentialId || 'Verified'}
                </span>

                <button
                  onClick={() => setSelectedCertificate(cert)}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  aria-label={`View credentials for ${cert.title}`}
                >
                  <span>View Credentials</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reusable In-Portfolio Certificate Viewer Modal */}
      <CertificateViewer
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
};
