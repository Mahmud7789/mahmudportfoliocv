import { useState } from 'react';
import { Menu, X, Sun, Moon, Download, Sliders, CheckCircle, FileText } from 'lucide-react';
import { downloadCvPdf } from '../utils/cvDownloader';

export interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenDeployModal?: () => void;
  onOpenEditorModal: () => void;
  onOpenPdfPreview?: () => void;
  currentView: 'portfolio' | 'cv';
  onToggleView: (view: 'portfolio' | 'cv') => void;
  cvPdfUrl: string;
}

export function Navbar({
  theme,
  onToggleTheme,
  onOpenEditorModal,
  onOpenPdfPreview,
  currentView,
  onToggleView,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const isLight = theme === 'light';

  const handleDownloadCv = (e: React.MouseEvent) => {
    e.preventDefault();
    downloadCvPdf('Mahmud_IT_Officer.pdf');
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleNavClick = (sectionId: string) => {
    if (currentView === 'cv') {
      onToggleView('portfolio');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-200 no-print ${
        isLight
          ? 'border-slate-200/90 bg-white/95 text-slate-900 shadow-xs backdrop-blur-md'
          : 'border-zinc-800/80 bg-[#090a0f]/95 text-zinc-100 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            onToggleView('portfolio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`text-left text-lg font-bold tracking-tight whitespace-nowrap shrink-0 transition-colors ${
            isLight ? 'text-slate-900 hover:text-blue-600' : 'text-zinc-100 hover:text-white'
          }`}
        >
          Golam Mahmud<span className="text-blue-600">.IT</span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav
          className={`hidden md:flex items-center gap-7 text-sm font-medium whitespace-nowrap shrink-0 ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}
        >
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              isLight ? 'hover:text-slate-900' : 'hover:text-zinc-100'
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('experience')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              isLight ? 'hover:text-slate-900' : 'hover:text-zinc-100'
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => handleNavClick('projects')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              isLight ? 'hover:text-slate-900' : 'hover:text-zinc-100'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => handleNavClick('skills')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              isLight ? 'hover:text-slate-900' : 'hover:text-zinc-100'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => onToggleView(currentView === 'cv' ? 'portfolio' : 'cv')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'cv'
                ? 'text-blue-600 font-semibold'
                : isLight
                ? 'hover:text-slate-900 text-slate-600'
                : 'hover:text-zinc-100 text-zinc-300'
            }`}
          >
            {currentView === 'cv' ? '← Back to Portfolio' : 'Digital CV'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Theme Switcher Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg border transition-colors ${
              isLight
                ? 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                : 'border-zinc-700/80 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
            }`}
            title={`Switch to ${isLight ? 'Dark' : 'Light'} theme`}
            aria-label="Toggle visual theme"
          >
            {isLight ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Download Official CV PDF button (Primary Action) */}
          <button
            onClick={handleDownloadCv}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 shadow-xs transition-all whitespace-nowrap shrink-0"
            title="Download Mahmud's original official CV PDF"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-200" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Official CV (PDF)</span>
              </>
            )}
          </button>

          {/* Quick PDF Preview Modal button */}
          {onOpenPdfPreview && (
            <button
              onClick={onOpenPdfPreview}
              className={`hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                isLight
                  ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  : 'border-zinc-700/80 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
              }`}
              title="Preview official PDF document"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Preview</span>
            </button>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-zinc-100'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t px-4 py-4 space-y-3 transition-colors ${
            isLight
              ? 'border-slate-200 bg-white text-slate-800'
              : 'border-zinc-800 bg-[#0c0e15] text-zinc-300'
          }`}
        >
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-1 hover:text-blue-600 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('experience')}
              className="text-left py-1 hover:text-blue-600 transition-colors"
            >
              Experience (AL-Mostafa &amp; MetroNet)
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className="text-left py-1 hover:text-blue-600 transition-colors"
            >
              Projects &amp; Systems
            </button>
            <button
              onClick={() => handleNavClick('skills')}
              className="text-left py-1 hover:text-blue-600 transition-colors"
            >
              Skills &amp; CCNA Certifications
            </button>
            <button
              onClick={() => {
                onToggleView(currentView === 'cv' ? 'portfolio' : 'cv');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-blue-600 font-semibold"
            >
              {currentView === 'cv' ? 'View Full Portfolio' : 'Digital CV View (Print / PDF)'}
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap items-center gap-2">
            <button
              onClick={(e) => {
                handleDownloadCv(e);
              }}
              className="flex-1 inline-flex justify-center items-center gap-1.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Download PDF CV'}</span>
            </button>
            {onOpenPdfPreview && (
              <button
                onClick={() => {
                  onOpenPdfPreview();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 inline-flex justify-center items-center gap-1.5 py-2 text-xs font-medium text-slate-700 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 rounded-lg"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Preview PDF</span>
              </button>
            )}
            <button
              onClick={() => {
                onOpenEditorModal();
                setMobileMenuOpen(false);
              }}
              className="w-full inline-flex justify-center items-center gap-1.5 py-2 text-xs font-medium text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800/60 rounded-lg"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              Customize Info
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
