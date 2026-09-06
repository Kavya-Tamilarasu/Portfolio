import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, ExternalLink, Code2, Trophy, Flame, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { CODING_PROFILES, PERSONAL_INFO } from '../data/portfolioData';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionData {
  contributions: ContributionDay[];
  totalContributions: number;
}

const CACHE_KEY = 'github_contributions_v1_Kavya-Tamilarasu';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export const GitHubHeatmap: React.FC = () => {
  const [data, setData] = useState<ContributionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchContributions = async () => {
    setIsLoading(true);
    setError(null);

    // 1. Check local cache first
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, payload } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL && payload?.contributions?.length > 0) {
          setData(payload);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Ignore localStorage errors
    }

    let fetchedData: ContributionData | null = null;

    // 2. Try primary backend / proxy endpoint
    try {
      const res = await fetch('/api/github-contributions?username=Kavya-Tamilarasu');
      if (res.ok) {
        const raw = await res.json();
        if (raw.contributions && Array.isArray(raw.contributions)) {
          const total =
            raw.total?.lastYear ??
            (typeof raw.total === 'object'
              ? Object.values(raw.total).reduce((a: number, b: any) => a + (typeof b === 'number' ? b : 0), 0)
              : raw.contributions.reduce((acc: number, c: any) => acc + (c.count || 0), 0));

          fetchedData = {
            contributions: raw.contributions.map((c: any) => ({
              date: c.date,
              count: Number(c.count) || 0,
              level: (Math.min(4, Math.max(0, Number(c.level) || 0)) as 0 | 1 | 2 | 3 | 4)
            })),
            totalContributions: Number(total) || 0
          };
        }
      }
    } catch {
      // Continue to next fallback
    }

    // 3. Try jogruber public API
    if (!fetchedData) {
      try {
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/Kavya-Tamilarasu?y=last');
        if (res.ok) {
          const raw = await res.json();
          if (raw.contributions && Array.isArray(raw.contributions)) {
            const total =
              raw.total?.lastYear ??
              raw.contributions.reduce((acc: number, c: any) => acc + (c.count || 0), 0);

            fetchedData = {
              contributions: raw.contributions.map((c: any) => ({
                date: c.date,
                count: Number(c.count) || 0,
                level: (Math.min(4, Math.max(0, Number(c.level) || 0)) as 0 | 1 | 2 | 3 | 4)
              })),
              totalContributions: Number(total) || 0
            };
          }
        }
      } catch {
        // Continue to next fallback
      }
    }

    // 4. Try vercel public API
    if (!fetchedData) {
      try {
        const res = await fetch('https://github-contributions.vercel.app/api/v1/Kavya-Tamilarasu');
        if (res.ok) {
          const raw = await res.json();
          if (raw.contributions && Array.isArray(raw.contributions)) {
            const rawContribs = [...raw.contributions].reverse();
            const total =
              raw.years?.reduce((acc: number, y: any) => acc + (y.total || 0), 0) ??
              raw.contributions.reduce((acc: number, c: any) => acc + (c.count || 0), 0);

            fetchedData = {
              contributions: rawContribs.map((c: any) => ({
                date: c.date,
                count: Number(c.count) || 0,
                level: (Math.min(4, Math.max(0, parseInt(c.intensity || '0', 10))) as 0 | 1 | 2 | 3 | 4)
              })),
              totalContributions: Number(total) || 0
            };
          }
        }
      } catch {
        // All sources failed
      }
    }

    if (fetchedData && fetchedData.contributions.length > 0) {
      setData(fetchedData);
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), payload: fetchedData })
        );
      } catch {
        // Ignore cache storage error
      }
    } else {
      setError('Unable to load GitHub contribution data at this moment.');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  // Format contributions into a 7x53 grid (weeks and days)
  const { weeks, monthHeaders } = useMemo(() => {
    if (!data || !data.contributions.length) {
      return { weeks: [], monthHeaders: [] };
    }

    const contributions = [...data.contributions];
    // Sort chronologically ascending
    contributions.sort((a, b) => (a.date > b.date ? 1 : -1));

    const weeksList: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    // Align the first day with day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
    const firstDate = new Date(contributions[0].date + 'T00:00:00');
    const startDayOfWeek = firstDate.getDay();

    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push(null);
    }

    for (const day of contributions) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksList.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeksList.push(currentWeek);
    }

    // Generate Month Labels
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const headers: { colIndex: number; monthName: string }[] = [];
    let lastMonth = -1;

    weeksList.forEach((week, wIdx) => {
      const validDay = week.find((d) => d !== null);
      if (validDay) {
        const d = new Date(validDay.date + 'T00:00:00');
        const m = d.getMonth();
        if (m !== lastMonth) {
          headers.push({ colIndex: wIdx, monthName: monthNames[m] });
          lastMonth = m;
        }
      }
    });

    return { weeks: weeksList, monthHeaders: headers };
  }, [data]);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-900/40 dark:bg-emerald-950/60 border-emerald-800/40';
      case 2:
        return 'bg-emerald-600/70 dark:bg-emerald-700/80 border-emerald-500/50';
      case 3:
        return 'bg-emerald-500 dark:bg-emerald-500 border-emerald-400';
      case 4:
        return 'bg-emerald-400 dark:bg-emerald-300 border-emerald-200 shadow-sm shadow-emerald-400/50';
      default:
        return 'bg-slate-200/60 dark:bg-slate-800/60 border-slate-300/40 dark:border-slate-800/40';
    }
  };

  const formatTooltipDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section id="coding-profiles" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Competitive Programming & Open Source</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Coding Profiles & <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 bg-clip-text text-transparent">GitHub Activity</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Consistent problem-solving track record across major algorithmic evaluation platforms and active open-source activity.
          </p>
        </div>

        {/* Coding Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {CODING_PROFILES.map((profile) => (
            <motion.a
              key={profile.id}
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl transition-all cursor-pointer relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 block text-inherit"
              aria-label={`Open ${profile.platform} profile of @${profile.username} in a new tab`}
            >
              {/* Gradient Corner Accent */}
              <div
                className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${profile.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity`}
              />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2.5 rounded-2xl bg-gradient-to-br ${profile.color} text-white shadow-md`}
                  >
                    {profile.platform === 'GitHub' ? (
                      <Github className="w-5 h-5" />
                    ) : profile.platform === 'LeetCode' ? (
                      <Code2 className="w-5 h-5" />
                    ) : profile.platform === 'LinkedIn' ? (
                      <Linkedin className="w-5 h-5" />
                    ) : (
                      <Flame className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {profile.platform}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400">@{profile.username}</p>
                  </div>
                </div>

                <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:scale-110 transition-all">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    {profile.platform === 'GitHub' ? 'Contributions:' : 'Score / Rating:'}
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {profile.platform === 'GitHub' && data?.totalContributions
                      ? `${data.totalContributions} Activity`
                      : profile.rating || profile.solvedCount}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    {profile.platform === 'GitHub' ? 'Repositories:' : 'Rank / Status:'}
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {profile.globalRank}
                  </span>
                </div>
              </div>

              {/* Badge */}
              {profile.badge && (
                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {profile.badge}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {profile.solvedCount}
                  </span>
                </div>
              )}
            </motion.a>
          ))}
        </div>

        {/* GitHub Heatmap Visualizer */}
        <div
          ref={containerRef}
          className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl relative"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-emerald-400">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                  <span>GitHub Contribution Graph</span>
                  {data && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                      {data.totalContributions} contributions in the last year
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Daily code activity & repository commits by Kavya T
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
                aria-label="View Kavya Tamilarasu GitHub Profile in new tab"
              >
                <span>View GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Matrix Grid Container */}
          {isLoading ? (
            /* Loading Skeleton State */
            <div className="space-y-4 py-4 animate-pulse">
              <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded mb-2" />
              <div className="overflow-x-auto pb-2 no-scrollbar">
                <div className="inline-block min-w-[720px]">
                  <div className="flex gap-1.5">
                    {Array.from({ length: 52 }).map((_, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1.5">
                        {Array.from({ length: 7 }).map((_, dIdx) => (
                          <div
                            key={dIdx}
                            className="w-3.5 h-3.5 rounded-sm bg-slate-200 dark:bg-slate-800/60"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          ) : error && !data ? (
            /* Graceful Error State */
            <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
              <AlertCircle className="w-8 h-8 text-amber-500" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{error}</p>
              <button
                onClick={fetchContributions}
                className="px-4 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          ) : (
            /* Real Matrix Grid */
            <div className="overflow-x-auto pb-2 no-scrollbar">
              <div className="inline-block min-w-[760px] select-none">
                {/* Month Headers */}
                <div className="flex text-[10px] font-mono text-slate-400 mb-1.5 pl-6 h-4 relative">
                  {monthHeaders.map((header, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'absolute',
                        left: `${header.colIndex * 14 + 24}px`
                      }}
                      className="whitespace-nowrap"
                    >
                      {header.monthName}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  {/* Day of Week Labels */}
                  <div className="flex flex-col justify-between text-[9px] font-mono text-slate-400 py-0.5 pr-1 select-none">
                    <span className="h-3.5 leading-[14px]">Mon</span>
                    <span className="h-3.5 leading-[14px]">Wed</span>
                    <span className="h-3.5 leading-[14px]">Fri</span>
                  </div>

                  {/* Heatmap Grid */}
                  <div className="flex gap-1.5">
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1.5">
                        {week.map((day, dIdx) => {
                          if (!day) {
                            return <div key={dIdx} className="w-3.5 h-3.5 opacity-0" />;
                          }

                          return (
                            <div
                              key={dIdx}
                              onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setHoveredDay({
                                  day,
                                  x: rect.left + rect.width / 2,
                                  y: rect.top
                                });
                              }}
                              onMouseLeave={() => setHoveredDay(null)}
                              className={`w-3.5 h-3.5 rounded-sm border ${getCellColor(
                                day.level
                              )} transition-all duration-150 hover:scale-125 hover:z-10 cursor-pointer`}
                              aria-label={`${day.count} contributions on ${day.date}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend Footer */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-4 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  <span>Learn how Kavya builds full-stack projects continuously</span>
                  <div className="flex items-center gap-1.5">
                    <span>Less</span>
                    <div className="w-3 h-3 rounded-sm bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-800/40" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-900/40 dark:bg-emerald-950/60 border border-emerald-800/40" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-600/70 dark:bg-emerald-700/80 border border-emerald-500/50" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-500 dark:bg-emerald-500 border border-emerald-400" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-400 dark:bg-emerald-300 border border-emerald-200" />
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floating Tooltip */}
          <AnimatePresence>
            {hoveredDay && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.12 }}
                style={{
                  position: 'fixed',
                  left: `${hoveredDay.x}px`,
                  top: `${hoveredDay.y - 10}px`,
                  transform: 'translate(-50%, -100%)',
                  pointerEvents: 'none',
                  zIndex: 50
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900/95 text-white dark:bg-slate-800/95 dark:text-slate-100 text-xs font-sans shadow-xl border border-slate-700/50 backdrop-blur-md whitespace-nowrap"
              >
                <div className="font-semibold text-[11px]">
                  <span className="text-emerald-400 font-bold">
                    {hoveredDay.day.count === 0 ? 'No' : hoveredDay.day.count} contribution{hoveredDay.day.count === 1 ? '' : 's'}
                  </span>{' '}
                  on {formatTooltipDate(hoveredDay.day.date)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
