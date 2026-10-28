import { useState } from 'react';
import { ExternalLink, Github, Code2, ArrowUpRight } from 'lucide-react';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

export interface ProjectsSectionProps {
  projects: Project[];
  theme: 'light' | 'dark';
}

export function ProjectsSection({ projects, theme }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const isLight = theme === 'light';

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Web Application', label: 'Web Applications' },
    { id: 'Machine Learning', label: 'Machine Learning & AI' },
  ];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className={`py-16 sm:py-24 border-t transition-colors duration-200 ${
        isLight
          ? 'bg-white border-slate-200/90 text-slate-900'
          : 'bg-[#090a0f] border-zinc-800/80 text-zinc-100'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Title & Interactive Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div
              className={`text-xs font-semibold tracking-wider uppercase mb-2 ${
                isLight ? 'text-blue-700' : 'text-cyan-400'
              }`}
            >
              Real Deployed Systems
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Featured Software &amp; ML Projects
            </h2>
            <p
              className={`text-sm sm:text-base mt-2 max-w-xl ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              Live production applications, corporate web portals, and machine learning computer vision systems.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div
            className={`inline-flex p-1 rounded-lg border self-start md:self-auto transition-colors ${
              isLight
                ? 'bg-slate-100 border-slate-200'
                : 'bg-zinc-900/90 border-zinc-800'
            }`}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  filter === cat.id
                    ? isLight
                      ? 'bg-white text-blue-700 shadow-xs font-semibold'
                      : 'bg-zinc-800 text-white shadow-sm font-semibold'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Box Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 overflow-hidden ${
                isLight
                  ? 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md'
                  : 'bg-zinc-900/50 border-zinc-800/90 hover:border-zinc-700/80 shadow-lg'
              }`}
            >
              {/* Visual Media Container */}
              <div
                className="relative aspect-video w-full bg-slate-100 dark:bg-zinc-950 overflow-hidden cursor-pointer"
                onClick={() => setActiveProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                />
                {/* Contrast Scrim */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    isLight
                      ? 'from-black/60 via-transparent to-transparent'
                      : 'from-[#0d0f18] via-transparent to-transparent'
                  } opacity-80`}
                />

                {/* Top-right overlay expand icon */}
                <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowUpRight className="w-4 h-4 text-blue-400" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Unboxed Metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <span className={`font-semibold ${isLight ? 'text-blue-700' : 'text-cyan-400'}`}>
                      {project.category}
                    </span>
                    <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-zinc-600'}>
                      ·
                    </span>
                    <span className={`font-mono ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                      {project.stats}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3
                    onClick={() => setActiveProject(project)}
                    className={`text-lg font-bold transition-colors cursor-pointer ${
                      isLight
                        ? 'text-slate-900 group-hover:text-blue-600'
                        : 'text-white group-hover:text-cyan-300'
                    }`}
                  >
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p
                    className={`text-xs sm:text-sm mt-2 leading-relaxed line-clamp-3 ${
                      isLight ? 'text-slate-600' : 'text-zinc-300'
                    }`}
                  >
                    {project.shortDesc}
                  </p>
                </div>

                {/* Card Footer: Tech tags + Links */}
                <div
                  className={`mt-6 pt-4 border-t ${
                    isLight ? 'border-slate-100' : 'border-zinc-800/70'
                  }`}
                >
                  {/* Clean unboxed tags with subtle separators */}
                  <div
                    className={`text-xs font-mono flex flex-wrap gap-x-2.5 gap-y-1 mb-4 ${
                      isLight ? 'text-slate-500' : 'text-zinc-400'
                    }`}
                  >
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={isLight ? 'hover:text-slate-900' : 'hover:text-zinc-200'}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <button
                      onClick={() => setActiveProject(project)}
                      className={`inline-flex items-center gap-1 font-semibold transition-colors ${
                        isLight ? 'text-blue-700 hover:text-blue-800' : 'text-cyan-400 hover:text-cyan-300'
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Architecture</span>
                    </button>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`transition-colors ${
                            isLight ? 'text-slate-500 hover:text-slate-900' : 'text-zinc-400 hover:text-white'
                          }`}
                          aria-label={`Source code for ${project.title}`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-1 transition-colors ${
                            isLight ? 'text-blue-600 hover:text-blue-800' : 'text-zinc-400 hover:text-cyan-400'
                          }`}
                          aria-label={`Live demo for ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        theme={theme}
      />
    </section>
  );
}
