import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Experience, Education } from '../types/portfolio';

interface ExperienceSectionProps {
  experiences: Experience[];
  education: Education[];
  theme: 'light' | 'dark';
}

export function ExperienceSection({ experiences, education, theme }: ExperienceSectionProps) {
  const isLight = theme === 'light';

  return (
    <section
      id="experience"
      className={`py-16 sm:py-24 border-t transition-colors duration-200 ${
        isLight
          ? 'bg-slate-50/60 border-slate-200/90 text-slate-900'
          : 'bg-[#090a0f] border-zinc-800/80 text-zinc-100'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-14">
          <div
            className={`text-xs font-semibold tracking-wider uppercase mb-2 ${
              isLight ? 'text-blue-700' : 'text-cyan-400'
            }`}
          >
            Track Record &amp; Academics
          </div>
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Professional Experience &amp; Education
          </h2>
          <p
            className={`text-sm sm:text-base mt-2 max-w-xl ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            Proven hands-on leadership across corporate IT infrastructure, ISP networking, and technical support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Work Experience */}
          <div className="lg:col-span-7 space-y-8">
            <div
              className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-6 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              <Briefcase className={`w-4 h-4 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
              <span>Professional IT Work History</span>
            </div>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    isLight
                      ? 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs'
                      : 'bg-zinc-900/50 border-zinc-800/90 hover:border-zinc-700/80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {exp.role}
                    </h3>
                    <span
                      className={`text-xs font-mono font-semibold ${
                        isLight ? 'text-blue-700' : 'text-cyan-400'
                      }`}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Unboxed metadata with typographic separator */}
                  <div
                    className={`flex items-center gap-2 text-xs mb-4 ${
                      isLight ? 'text-slate-500' : 'text-zinc-400'
                    }`}
                  >
                    <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-zinc-200'}`}>
                      {exp.company}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{exp.location}</span>
                  </div>

                  <p
                    className={`text-sm leading-relaxed mb-4 ${
                      isLight ? 'text-slate-600' : 'text-zinc-300'
                    }`}
                  >
                    {exp.description}
                  </p>

                  {/* Bullet achievements */}
                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((ach, aIdx) => (
                      <li
                        key={aIdx}
                        className={`flex items-start gap-2 text-xs sm:text-sm ${
                          isLight ? 'text-slate-700' : 'text-zinc-300'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isLight ? 'text-blue-600' : 'text-cyan-400'
                          }`}
                        />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack used */}
                  <div
                    className={`pt-3 border-t flex flex-wrap gap-2 text-xs font-mono ${
                      isLight
                        ? 'border-slate-100 text-slate-500'
                        : 'border-zinc-800/80 text-zinc-400'
                    }`}
                  >
                    {exp.techStack.map((tech, tIdx) => (
                      <span key={tIdx}>
                        {tech}{tIdx < exp.techStack.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-6 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              <GraduationCap className={`w-4 h-4 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
              <span>Academic Credentials</span>
            </div>

            {education.map((edu) => (
              <div
                key={edu.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isLight
                    ? 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs'
                    : 'bg-zinc-900/50 border-zinc-800/90 hover:border-zinc-700/80'
                }`}
              >
                <div className="flex items-baseline justify-between gap-1 mb-1.5">
                  <h3 className={`text-base font-bold leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {edu.degree}
                  </h3>
                  <span
                    className={`text-xs font-mono font-semibold shrink-0 ${
                      isLight ? 'text-blue-700' : 'text-cyan-400'
                    }`}
                  >
                    {edu.period}
                  </span>
                </div>

                <div
                  className={`flex items-center gap-2 text-xs mb-3 ${
                    isLight ? 'text-slate-500' : 'text-zinc-400'
                  }`}
                >
                  <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-zinc-200'}`}>
                    {edu.institution}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{edu.location}</span>
                </div>

                {edu.cgpaOrGrade && (
                  <div
                    className={`text-xs font-bold font-mono mb-3 ${
                      isLight ? 'text-emerald-700' : 'text-emerald-400'
                    }`}
                  >
                    {edu.cgpaOrGrade}
                  </div>
                )}

                <div className="space-y-1.5">
                  {edu.highlights.map((hl, hIdx) => (
                    <p
                      key={hIdx}
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isLight ? 'text-slate-600' : 'text-zinc-300'
                      }`}
                    >
                      • {hl}
                    </p>
                  ))}
                </div>

                {edu.courses && edu.courses.length > 0 && (
                  <div
                    className={`mt-4 pt-3 border-t text-xs ${
                      isLight ? 'border-slate-100 text-slate-600' : 'border-zinc-800/80 text-zinc-400'
                    }`}
                  >
                    <span className="font-semibold uppercase tracking-wider text-[11px] block mb-1">
                      Key Disciplines:
                    </span>
                    <span className="font-mono text-xs">
                      {edu.courses.join(' · ')}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
