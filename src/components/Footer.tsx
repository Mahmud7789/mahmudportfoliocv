import { ArrowUp, Download } from 'lucide-react';
import { downloadCvPdf } from '../utils/cvDownloader';

interface FooterProps {
  theme: 'light' | 'dark';
  cvPdfUrl: string;
  onOpenDeploy?: () => void;
  onOpenEditor?: () => void;
  onOpenCV: () => void;
}

export function Footer({ theme, onOpenDeploy, onOpenEditor, onOpenCV }: FooterProps) {
  const isLight = theme === 'light';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    downloadCvPdf('Mahmud_IT_Officer.pdf');
  };

  return (
    <footer
      className={`border-t py-10 text-xs no-print transition-colors duration-200 ${
        isLight
          ? 'bg-slate-100 border-slate-200/90 text-slate-600'
          : 'bg-[#08090d] border-zinc-800/80 text-zinc-400'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-zinc-200'}`}>
            Golam Mahmud
          </span>
          <span aria-hidden="true" className={isLight ? 'hidden sm:inline text-slate-300' : 'hidden sm:inline text-zinc-700'}>
            ·
          </span>
          <span>&copy; {new Date().getFullYear()} Golam Mahmud. IT Officer &amp; CCNA Certified.</span>
        </div>

        {/* Center: Real action links */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleDownload}
            className={`inline-flex items-center gap-1 transition-colors ${
              isLight ? 'hover:text-blue-600 text-slate-700 font-medium' : 'hover:text-cyan-400 text-zinc-300'
            }`}
            title="Download Mahmud_IT_Officer.pdf"
          >
            <Download className="w-3 h-3 text-blue-600" />
            <span>PDF CV</span>
          </button>
          <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-zinc-700'}>·</span>
          <button
            onClick={onOpenCV}
            className={`transition-colors ${isLight ? 'hover:text-blue-600' : 'hover:text-cyan-400'}`}
          >
            Digital CV
          </button>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          className={`inline-flex items-center gap-1 transition-colors ${
            isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-white'
          }`}
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
