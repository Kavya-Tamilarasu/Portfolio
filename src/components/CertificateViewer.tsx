import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ShieldCheck, ExternalLink, FileText, Sparkles, Award } from 'lucide-react';
import { Certification } from '../types';

interface CertificateViewerProps {
  certificate: Certification | null;
  onClose: () => void;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({
  certificate,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (certificate) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certificate, onClose]);

  if (!certificate) return null;

  const isPdf =
    certificate.fileType === 'pdf' ||
    (certificate.fileUrl && certificate.fileUrl.toLowerCase().endsWith('.pdf'));

  const fileExtension = certificate.fileUrl
    ? certificate.fileUrl.split('.').pop()?.split('?')[0] || (isPdf ? 'pdf' : 'png')
    : isPdf
    ? 'pdf'
    : 'png';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                    {certificate.title}
                  </h3>
                  {certificate.badgeType && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0">
                      {certificate.badgeType}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Issued by {certificate.issuer} • ID: {certificate.credentialId || 'Verified'} ({certificate.date})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {certificate.fileUrl && (
                <a
                  href={certificate.fileUrl}
                  download={`${certificate.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.${fileExtension}`}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                  title="Download Certificate File"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close certificate viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Certificate Content Viewer Body */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 flex flex-col items-center justify-center min-h-[450px]">
            {certificate.fileUrl ? (
              isPdf ? (
                <div className="w-full h-[65vh] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-inner">
                  <iframe
                    src={`${certificate.fileUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                    title={certificate.title}
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <div className="w-full flex items-center justify-center p-2">
                  <img
                    src={certificate.fileUrl}
                    alt={certificate.title}
                    className="max-h-[65vh] max-w-full object-contain rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl bg-white"
                  />
                </div>
              )
            ) : (
              <div className="p-8 text-center max-w-md space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Certificate Document
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  The verified credential document for <strong className="text-slate-900 dark:text-white">{certificate.title}</strong> is located in <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-mono text-[11px]">public/certificates/</code>.
                </p>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-400 font-semibold">Skills Verified:</span>
              {certificate.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200/60 dark:border-slate-700/60"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              {certificate.fileUrl && (
                <a
                  href={certificate.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Open in Full Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
