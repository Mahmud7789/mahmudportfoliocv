import { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, Zap, Cpu } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export function ProjectModal({ project, onClose, theme }: ProjectModalProps) {
  const isLight = theme === 'light';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0c0e17] border-zinc-800 text-zinc-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image preview */}
        <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 border border-white/20 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on image scrim */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="text-xs text-blue-400 font-mono tracking-wider mb-1 flex items-center gap-2">
              <span>{project.category}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="text-slate-200">{project.stats}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal content body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Detailed description */}
          <div>
            <h3
              className={`text-xs uppercase tracking-wider font-semibold mb-2 ${
                isLight ? 'text-slate-500' : 'text-zinc-400'
              }`}
            >
              Overview &amp; Implementation
            </h3>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-zinc-300'
              }`}
            >
              {project.fullDesc}
            </p>
          </div>

          {/* Architecture / Design */}
          <div
            className={`p-5 rounded-xl border space-y-4 ${
              isLight
                ? 'bg-slate-50 border-slate-200/90'
                : 'bg-zinc-900/70 border-zinc-800/80'
            }`}
          >
            <div
              className={`flex items-center gap-2 text-sm font-semibold ${
                isLight ? 'text-blue-700' : 'text-cyan-400'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>System Design &amp; Architectural Highlights</span>
            </div>
            <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-zinc-300'}`}>
              {project.architecture.overview}
            </p>

            <ul
              className={`space-y-2 pt-2 border-t ${
                isLight ? 'border-slate-200' : 'border-zinc-800'
              }`}
            >
              {project.architecture.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-2 text-xs sm:text-sm ${
                    isLight ? 'text-slate-700' : 'text-zinc-300'
                  }`}
                >
                  <Zap
                    className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                      isLight ? 'text-blue-600' : 'text-cyan-400'
                    }`}
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack badges */}
          <div>
            <div
              className={`flex items-center gap-2 text-xs uppercase tracking-wider font-semibold mb-2 ${
                isLight ? 'text-slate-500' : 'text-zinc-400'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Technologies &amp; Libraries</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded-md border ${
                    isLight
                      ? 'bg-slate-100 text-slate-700 border-slate-200'
                      : 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div
            className={`pt-4 border-t flex flex-wrap items-center justify-between gap-4 ${
              isLight ? 'border-slate-200' : 'border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
                >
                  <span>Launch Live Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className={`text-xs transition-colors ${
                isLight ? 'text-slate-500 hover:text-slate-900' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Close Window (Esc)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
