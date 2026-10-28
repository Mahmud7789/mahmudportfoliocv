import { useState } from 'react';
import { Award, CheckCircle2, Clock, Terminal } from 'lucide-react';
import { SkillCategory, Certification } from '../types/portfolio';

interface SkillsSectionProps {
  categories: SkillCategory[];
  certifications: Certification[];
  theme: 'light' | 'dark';
}

export function SkillsSection({ categories, certifications, theme }: SkillsSectionProps) {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
  const isLight = theme === 'light';

  return (
    <section
      id="skills"
      className={`py-16 sm:py-24 border-t transition-colors duration-200 ${
        isLight
          ? 'bg-slate-50/60 border-slate-200/90 text-slate-900'
          : 'bg-[#090a0f] border-zinc-800/80 text-zinc-100'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-12">
          <div
            className={`text-xs font-semibold tracking-wider uppercase mb-2 ${
              isLight ? 'text-blue-700' : 'text-cyan-400'
            }`}
          >
            Technical Competencies &amp; Certifications
          </div>
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            IT Infrastructure, Networking &amp; Systems
          </h2>
          <p
            className={`text-sm sm:text-base mt-2 max-w-xl ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            Hands-on technical proficiency across hardware support, Cisco/MikroTik routing, Zabbix monitoring, and full-stack web technologies.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          className={`flex flex-wrap gap-2 p-1.5 rounded-xl border mb-8 ${
            isLight
              ? 'bg-white border-slate-200 shadow-2xs'
              : 'bg-zinc-900/90 border-zinc-800'
          }`}
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategoryIdx(idx)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategoryIdx === idx
                  ? isLight
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'bg-zinc-800 text-white shadow-sm font-semibold border border-zinc-700/80'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active Category Skills Grid */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border mb-14 ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-2xs'
              : 'bg-zinc-900/50 border-zinc-800/90'
          }`}
        >
          <div className="mb-6">
            <h3
              className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              <Terminal className={`w-4 h-4 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
              <span>{categories[selectedCategoryIdx].name}</span>
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              {categories[selectedCategoryIdx].description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {categories[selectedCategoryIdx].skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className={`p-4 rounded-xl border flex flex-col justify-between ${
                  isLight
                    ? 'bg-slate-50 border-slate-200/80'
                    : 'bg-zinc-950/60 border-zinc-800/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-2.5">
                  <span className={isLight ? 'text-slate-800 font-semibold' : 'text-zinc-200'}>
                    {skill.name}
                  </span>
                  <span
                    className={`font-mono tabular-nums text-xs font-semibold ${
                      isLight ? 'text-blue-700' : 'text-cyan-400'
                    }`}
                  >
                    {skill.experience}
                  </span>
                </div>

                {/* Meter Bar */}
                <div
                  className={`w-full h-1.5 rounded-full overflow-hidden ${
                    isLight ? 'bg-slate-200' : 'bg-zinc-800/80'
                  }`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isLight
                        ? 'bg-blue-600'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                    }`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Industry Credentials */}
        <div>
          <div
            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-6 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            <Award className={`w-4 h-4 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
            <span>Training &amp; Professional Certifications</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {certifications.map((cert) => {
              const isCompleted = cert.status === 'Completed';

              return (
                <div
                  key={cert.id}
                  className={`p-5 rounded-xl border flex flex-col justify-between transition-colors ${
                    isLight
                      ? 'bg-white border-slate-200/90 shadow-2xs hover:border-slate-300'
                      : 'bg-zinc-900/50 border-zinc-800/90 hover:border-zinc-700/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span
                        className={`font-mono font-semibold ${
                          isLight ? 'text-blue-700' : 'text-cyan-400'
                        }`}
                      >
                        {cert.issuer}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                          isCompleted
                            ? isLight
                              ? 'text-emerald-700'
                              : 'text-emerald-400'
                            : isLight
                            ? 'text-amber-700'
                            : 'text-amber-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        <span>{cert.status}</span>
                      </span>
                    </div>

                    <h4
                      className={`text-sm font-bold leading-snug ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {cert.name}
                    </h4>

                    {cert.details && (
                      <p
                        className={`text-xs mt-2 leading-relaxed ${
                          isLight ? 'text-slate-600' : 'text-zinc-400'
                        }`}
                      >
                        {cert.details}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
