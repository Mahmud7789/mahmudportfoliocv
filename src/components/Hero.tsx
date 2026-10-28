import { useState } from 'react';
import { Download, FileText, Github, Linkedin, Mail, MapPin, Phone, ShieldCheck, CheckCircle, Eye } from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';
import { downloadCvPdf } from '../utils/cvDownloader';

interface HeroProps {
  profile: PortfolioProfile;
  theme: 'light' | 'dark';
  onOpenCV: () => void;
  onOpenDeploy: () => void;
  onOpenEditor: () => void;
  onOpenPdfPreview?: () => void;
}

export function Hero({ profile, theme, onOpenCV, onOpenDeploy, onOpenPdfPreview }: HeroProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const isLight = theme === 'light';

  const handleDownloadCv = (e: React.MouseEvent) => {
    e.preventDefault();
    downloadCvPdf('Mahmud_IT_Officer.pdf');
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToExperience = () => {
    const el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className={`relative pt-8 pb-16 sm:pt-12 sm:pb-20 overflow-hidden transition-colors duration-200 ${
        isLight ? 'bg-gradient-to-b from-slate-50 via-white to-slate-50' : 'bg-[#090a0f]'
      }`}
    >
      {/* Subtle ambient light gradient wash */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] blur-[140px] pointer-events-none rounded-full ${
          isLight ? 'bg-blue-200/40' : 'bg-cyan-600/10'
        }`}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Editorial Kicker (Unboxed text with typographic separators) */}
            <div
              className={`text-xs sm:text-sm font-semibold tracking-wide mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 ${
                isLight ? 'text-blue-700' : 'text-cyan-400'
              }`}
            >
              <span className="font-semibold leading-relaxed">
                BSc in CSE · IT Officer || IT Professional | IT Infrastructure | Network Operations | System Administration |
              </span>
              <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-zinc-600'}>
                /
              </span>
              <span className={isLight ? 'text-slate-500' : 'text-zinc-400'}>
                Open to High-Impact Roles
              </span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18] text-balance mb-5 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Managing enterprise IT infrastructure, secure networks &amp; web systems.
            </h1>

            {/* Body Lead Copy */}
            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl mb-6 ${
                isLight ? 'text-slate-600' : 'text-zinc-300'
              }`}
            >
              {profile.bio}
            </p>

            {/* Location & Contact Meta info */}
            <div
              className={`flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm mb-8 ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              <span className="inline-flex items-center gap-1.5 font-medium">
                <MapPin className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
                {profile.location}
              </span>
              <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-zinc-600'}>
                ·
              </span>
              <a
                href={`mailto:${profile.email}`}
                className={`inline-flex items-center gap-1.5 transition-colors ${
                  isLight ? 'text-slate-700 hover:text-blue-600' : 'text-zinc-300 hover:text-cyan-400'
                }`}
              >
                <Mail className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
                {profile.email}
              </a>
              <span aria-hidden="true" className={isLight ? 'text-slate-300' : 'text-zinc-600'}>
                ·
              </span>
              <a
                href={`tel:${profile.phone}`}
                className={`inline-flex items-center gap-1.5 transition-colors ${
                  isLight ? 'text-slate-700 hover:text-blue-600' : 'text-zinc-300 hover:text-cyan-400'
                }`}
              >
                <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
                {profile.phone}
              </a>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadCv}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-xs whitespace-nowrap"
                title="Download Mahmud's verified 3-page CV PDF"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-200" />
                    <span>Downloaded PDF!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Official CV (PDF)</span>
                  </>
                )}
              </button>

              {onOpenPdfPreview && (
                <button
                  onClick={onOpenPdfPreview}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap ${
                    isLight
                      ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      : 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                  }`}
                  title="Preview official PDF document"
                >
                  <Eye className={`w-4 h-4 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
                  <span>Preview PDF</span>
                </button>
              )}

              <button
                onClick={onOpenCV}
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap ${
                  isLight
                    ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 shadow-2xs'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <FileText className={`w-4 h-4 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
                <span>Interactive Digital CV</span>
              </button>

              <button
                onClick={scrollToExperience}
                className={`px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                  isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                View Experience →
              </button>
            </div>

            {/* Social links & trust markers */}
            <div
              className={`flex items-center gap-4 mt-8 pt-6 border-t text-xs ${
                isLight ? 'border-slate-200 text-slate-500' : 'border-zinc-800/80 text-zinc-400'
              }`}
            >
              <span className="font-semibold text-slate-700 dark:text-zinc-300">Profiles:</span>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`p-1.5 rounded-md transition-colors ${
                  isLight ? 'hover:bg-slate-200/80 hover:text-slate-900' : 'hover:bg-zinc-800 hover:text-white'
                }`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className={`p-1.5 rounded-md transition-colors ${
                  isLight ? 'hover:bg-slate-200/80 hover:text-slate-900' : 'hover:bg-zinc-800 hover:text-white'
                }`}
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <button
                onClick={scrollToContact}
                className={`ml-auto font-medium transition-colors ${
                  isLight ? 'text-blue-600 hover:underline' : 'text-cyan-400 hover:underline'
                }`}
              >
                Get In Touch with Mahmud
              </button>
            </div>

          </div>

          {/* Right Column: Visual Container at Matching Height */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md group">
              {/* Subtle ambient border backlight */}
              <div
                className={`absolute -inset-1 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none ${
                  isLight
                    ? 'bg-gradient-to-tr from-blue-300/40 via-sky-200/30 to-indigo-300/40'
                    : 'bg-gradient-to-tr from-cyan-500/20 via-blue-600/10 to-indigo-500/20'
                }`}
              />

              <div
                className={`relative rounded-2xl overflow-hidden border shadow-xl transition-colors ${
                  isLight
                    ? 'border-slate-200/90 bg-white'
                    : 'border-zinc-800 bg-zinc-900/80'
                }`}
              >
                <div className="aspect-square relative overflow-hidden bg-slate-100 dark:bg-zinc-950">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-[1.01] group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  {/* Subtle contrast gradient scrim at bottom */}
                  <div
                    className={`absolute inset-x-0 bottom-0 h-10 pointer-events-none ${
                      isLight
                        ? 'bg-gradient-to-t from-black/20 via-transparent to-transparent'
                        : 'bg-gradient-to-t from-[#090a0f]/80 via-transparent to-transparent'
                    }`}
                  />
                </div>

                {/* Profile card footer inside visual frame */}
                <div
                  className={`p-5 relative border-t ${
                    isLight ? 'bg-slate-50/80 border-slate-200/80' : 'bg-[#0d0f18] border-zinc-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2
                        className={`text-base font-bold ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {profile.name}
                      </h2>
                      <p
                        className={`text-xs font-medium leading-relaxed mt-0.5 tracking-tight ${
                          isLight ? 'text-slate-600' : 'text-zinc-400'
                        }`}
                      >
                        IT Professional | IT Infrastructure | Network Operations | System Administration
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-blue-600">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>CCNA</span>
                    </div>
                  </div>
                  <div
                    className={`mt-3 flex items-center justify-between text-xs pt-3 border-t ${
                      isLight ? 'border-slate-200 text-slate-500' : 'border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <span>AL-Mostafa Group (Head Office)</span>
                    <span className="font-semibold text-blue-600">Gulshan-1, Dhaka</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width KPI Strip row below the hero split */}
        <div
          className={`mt-14 pt-10 border-t ${
            isLight ? 'border-slate-200/90' : 'border-zinc-800/80'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {profile.metrics.map((metric, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-xl border transition-all ${
                  isLight
                    ? 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700/80'
                }`}
              >
                <div
                  className={`text-2xl sm:text-3xl font-extrabold font-mono tabular-nums tracking-tight mb-1 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {metric.value}
                </div>
                <div
                  className={`text-xs sm:text-sm font-semibold mb-0.5 ${
                    isLight ? 'text-slate-700' : 'text-zinc-200'
                  }`}
                >
                  {metric.label}
                </div>
                <div
                  className={`text-xs line-clamp-1 ${
                    isLight ? 'text-slate-500' : 'text-zinc-400'
                  }`}
                >
                  {metric.context}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
