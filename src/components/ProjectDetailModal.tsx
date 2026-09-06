import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  Sparkles,
  CheckCircle2,
  Layers,
  Cpu,
  Database,
  Network,
  ShieldCheck,
  Zap,
  Play,
  FileCode,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  Gauge,
  Lock,
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<
    'case-study' | 'architecture' | 'schema' | 'api' | 'security' | 'simulator'
  >('case-study');

  // Simulator state
  const [simInput, setSimInput] = useState<string>('');
  const [simState, setSimState] = useState<'idle' | 'running' | 'done'>('idle');
  const [simOutput, setSimOutput] = useState<string>('');

  if (!project) return null;

  const caseStudy = project.caseStudy;

  const handleRunSimulator = () => {
    setSimState('running');
    setSimOutput('Initializing project execution pipeline...');

    setTimeout(() => {
      if (project.id === 'campus-connect') {
        const query = simInput || 'Full Stack Next.js & PostgreSQL Developer';
        setSimOutput(`[Campus Connect ATS & Placement Engine]
• Target Profile: "${query}"
✓ Supabase Auth Verified: Student ID #2026-IT-088 (Kavya T)
✓ ATS Resume Vector Match: 94.8% Match Score
✓ Eligibility Verification:
  - GPA 8.8 >= 7.5 Threshold (PASSED)
  - Standing Arrears: 0 (PASSED)
  - Department: Information Technology (PASSED)
✓ Interview Pipeline: Shortlisted for Technical Round 1 (Infosys / Neuroglobal)
✓ Real-time Notification Dispatched via Resend Webhook`);
      } else if (project.id === 'civic-flow') {
        const locationQuery = simInput || 'Karur Municipal Ward 12 - Pothole on Collectorate Road';
        setSimOutput(`[CivicFlow AI Dispatcher Engine]
• Grievance Submission: "${locationQuery}"
✓ EXIF Coordinates Extracted: Lat 10.9601° N, Long 78.0766° E (Karur)
✓ Gemini Vision Classifier: Pothole & Road Surface Damage (Confidence: 98.4%)
✓ Multilingual AI Pipeline: Translated Tamil colloquial remarks -> English
✓ Automated Routing: Ticket #CF-2026-8821 Assigned to Ward 12 Municipal Public Works
✓ Public Map Marker: Rendered on Leaflet with 24-Hour SLA Escalation Watchdog`);
      } else if (project.id === 'ai-bug-analyzer') {
        const codeSnippet = simInput || 'for i in range(len(arr) + 1): print(arr[i])';
        setSimOutput(`[AI Bug Analyzer Engine]
• Target Snippet: "${codeSnippet}"
✓ AST Syntax & Boundary Parser: IndexError detected
✓ Root Cause: Loop index exceeds array boundary by 1
✓ Gemini AI Suggested Patch:
  for i in range(len(arr)):
      print(arr[i])
✓ Time Complexity: O(N) | Space Complexity: O(1)
✓ Code Health Score: 98 / 100`);
      } else {
        setSimOutput(`[Flight Booking Algorithm Engine]
• Route Query: DEL -> MAA -> TRZ
✓ Graph Shortest Path: 2 Layovers optimized for minimal transit time (3h 45m)
✓ Dynamic Pricing Algorithm:
  - Base Fare: $120
  - Occupancy Demand Curve (84% Full): +$65 surge
  - Final Dynamic Seat Price: $185
✓ Concurrent Seat Allocation: 1,400 simultaneous bookings processed in 12ms`);
      }
      setSimState('done');
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
        >
          {/* Top Banner Header */}
          <div className="relative h-44 sm:h-56 shrink-0 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 text-white hover:bg-slate-950 border border-white/20 transition-all cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title Overlay */}
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full bg-blue-600 text-xs font-bold uppercase tracking-wider">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured Case Study
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">{project.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium line-clamp-1">{project.tagline}</p>
            </div>
          </div>

          {/* Navigation Tab Bar */}
          <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 overflow-x-auto shrink-0 no-scrollbar">
            <button
              onClick={() => setActiveTab('case-study')}
              className={`px-3 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === 'case-study'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Case Study</span>
            </button>

            {caseStudy && (
              <>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-3 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'architecture'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Cpu className="w-4 h-4 text-indigo-500" />
                  <span>Architecture Diagram</span>
                </button>

                <button
                  onClick={() => setActiveTab('schema')}
                  className={`px-3 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'schema'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Database className="w-4 h-4 text-emerald-500" />
                  <span>Database Schema</span>
                </button>

                <button
                  onClick={() => setActiveTab('api')}
                  className={`px-3 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'api'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Network className="w-4 h-4 text-purple-500" />
                  <span>API Endpoints</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-3 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'security'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-teal-500" />
                  <span>Security & Performance</span>
                </button>
              </>
            )}

            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === 'simulator'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Play className="w-4 h-4 text-amber-500" />
              <span>Live Simulator</span>
            </button>
          </div>

          {/* Modal Tab Content Area */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 dark:text-slate-300">
            {/* 1. CASE STUDY TAB */}
            {activeTab === 'case-study' && (
              <div className="space-y-6">
                {/* Problem & Research */}
                {caseStudy && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/20">
                      <h4 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Problem Statement</span>
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                        {caseStudy.problem}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20">
                      <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4" />
                        <span>Research & Findings</span>
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                        {caseStudy.research}
                      </p>
                    </div>
                  </div>
                )}

                {/* Long Description */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Executive Overview
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                    {project.longDescription}
                  </p>
                </div>

                {/* Tech Stack Matrix */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features Checklist */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Core Functional Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 text-xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                {caseStudy && caseStudy.challengesAndSolutions && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Engineering Challenges Overcome
                    </h4>
                    <div className="space-y-3">
                      {caseStudy.challengesAndSolutions.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-1.5"
                        >
                          <div className="text-xs font-bold text-red-500 flex items-center gap-1.5">
                            <span>Challenge:</span>
                            <span className="text-slate-800 dark:text-slate-200 font-semibold">{item.challenge}</span>
                          </div>
                          <div className="text-xs font-bold text-emerald-500 flex items-start gap-1.5">
                            <span>Solution:</span>
                            <span className="text-slate-700 dark:text-slate-300 font-normal">{item.solution}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. ARCHITECTURE DIAGRAM TAB */}
            {activeTab === 'architecture' && caseStudy && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                    System Architecture & Communication Pipeline
                  </h4>
                  <p className="text-xs text-slate-300">
                    {caseStudy.architectureDiagram.flow}
                  </p>
                  <div className="mt-2 text-[11px] font-mono text-emerald-400">
                    {caseStudy.architectureDiagram.latency}
                  </div>
                </div>

                {/* Layered Architectural Stack */}
                <div className="space-y-3">
                  {caseStudy.architectureDiagram.layers.map((layer, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl bg-gradient-to-r ${layer.color} border space-y-2`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider">{layer.name}</span>
                        <span className="text-[10px] font-mono opacity-75">Layer 0{idx + 1}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {layer.items.map((item, itemIdx) => (
                          <span
                            key={itemIdx}
                            className="px-2.5 py-1 rounded-lg bg-slate-900/80 text-white text-xs font-mono border border-white/10"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. DATABASE SCHEMA TAB */}
            {activeTab === 'schema' && caseStudy && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Relational PostgreSQL Schema Preview
                  </h4>
                  <span className="text-xs font-mono text-emerald-500 font-bold">
                    {caseStudy.databaseSchema.length} Tables Normalized
                  </span>
                </div>

                <div className="space-y-6">
                  {caseStudy.databaseSchema.map((table, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80 mb-3">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                            {table.tableName}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">{table.description}</span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs font-mono">
                          <thead>
                            <tr className="text-slate-400 border-b border-slate-200 dark:border-slate-800">
                              <th className="pb-2">Column Name</th>
                              <th className="pb-2">Data Type</th>
                              <th className="pb-2">Key Constraint</th>
                              <th className="pb-2">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800/40">
                            {table.columns.map((col, colIdx) => (
                              <tr key={colIdx} className="hover:bg-slate-100/50 dark:hover:bg-slate-900/50">
                                <td className="py-2 font-bold text-blue-500">{col.name}</td>
                                <td className="py-2 text-purple-400">{col.type}</td>
                                <td className="py-2">
                                  {col.isKey ? (
                                    <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold">
                                      PRIMARY KEY
                                    </span>
                                  ) : (
                                    <span className="text-slate-400">—</span>
                                  )}
                                </td>
                                <td className="py-2 text-slate-600 dark:text-slate-400 font-sans text-xs">
                                  {col.desc}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. API ENDPOINTS TAB */}
            {activeTab === 'api' && caseStudy && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  RESTful API Specifications
                </h4>

                <div className="space-y-2.5">
                  {caseStudy.apiEndpoints.map((endpoint, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                            endpoint.method === 'GET'
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : endpoint.method === 'POST'
                              ? 'bg-blue-500/10 text-blue-500'
                              : 'bg-purple-500/10 text-purple-500'
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <span className="text-slate-900 dark:text-white font-bold">{endpoint.path}</span>
                      </div>

                      <div className="flex items-center gap-3 font-sans text-xs">
                        <span className="text-slate-600 dark:text-slate-400">{endpoint.description}</span>
                        {endpoint.auth && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold flex items-center gap-1 shrink-0">
                            <Lock className="w-3 h-3" /> Auth
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold shrink-0">
                          {endpoint.status} OK
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SECURITY & PERFORMANCE TAB */}
            {activeTab === 'security' && caseStudy && (
              <div className="space-y-6">
                {/* Performance Metrics */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-emerald-500" />
                    <span>Lighthouse & Core Web Vitals Performance</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {caseStudy.performance.map((perf, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20"
                      >
                        <div className="text-xs font-semibold text-slate-400">{perf.metric}</div>
                        <div className="text-xl font-black text-emerald-500 mt-1">{perf.score}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{perf.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Measures */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                    <span>Security & Access Control Enforcement</span>
                  </h4>
                  <div className="space-y-2">
                    {caseStudy.security.map((sec, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 text-xs"
                      >
                        <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>{sec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. LIVE SIMULATOR TAB */}
            {activeTab === 'simulator' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 border border-blue-500/20">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                    <Cpu className="w-4 h-4 text-blue-500" />
                    <span>Live Interactive Execution Sandbox</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Interact directly with the simulated backend algorithms, ATS scoring engines, or AI dispatch models powering {project.title}.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Custom Simulation Parameter / Query (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder={
                      project.id === 'campus-connect'
                        ? 'e.g. Next.js 16, TypeScript, Supabase, 8.8 GPA'
                        : project.id === 'civic-flow'
                        ? 'e.g. Broken street lamp near Karur Bus Stand'
                        : 'e.g. def calculate_sum(arr): for i in range(len(arr) + 1)...'
                    }
                    value={simInput}
                    onChange={(e) => setSimInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <button
                  onClick={handleRunSimulator}
                  disabled={simState === 'running'}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer disabled:opacity-50 transition-all"
                >
                  <Play className="w-4 h-4" />
                  <span>{simState === 'running' ? 'Executing Simulation...' : 'Run Simulation Pipeline'}</span>
                </button>

                {simOutput && (
                  <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre-wrap border border-slate-800 shadow-inner">
                    {simOutput}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Bar Actions */}
          <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live App</span>
                </a>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('simulator')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Play className="w-4 h-4" />
                <span>Test Live Simulator</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
