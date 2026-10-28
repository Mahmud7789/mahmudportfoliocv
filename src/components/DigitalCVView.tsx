import { useState } from 'react';
import { Printer, Copy, Check, ArrowLeft, Download, Mail, MapPin, Phone, Github, Linkedin, CheckCircle, Eye } from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';
import { downloadCvPdf } from '../utils/cvDownloader';

interface DigitalCVViewProps {
  profile: PortfolioProfile;
  theme: 'light' | 'dark';
  onBackToPortfolio: () => void;
  onOpenPdfPreview?: () => void;
}

export function DigitalCVView({ profile, theme, onBackToPortfolio, onOpenPdfPreview }: DigitalCVViewProps) {
  const [copiedText, setCopiedText] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const isLight = theme === 'light';

  const handleDownloadCv = (e: React.MouseEvent) => {
    e.preventDefault();
    downloadCvPdf('Mahmud_IT_Officer.pdf');
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${profile.name.toLowerCase().replace(/\s+/g, '_')}_cv.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyPlainText = () => {
    const text = `
${profile.name} — ${profile.title}
${profile.location} | Phone: ${profile.phone} | Email: ${profile.email}
LinkedIn: ${profile.socials.linkedin} | GitHub: ${profile.socials.github}

PROFESSIONAL SUMMARY
${profile.bio}

EXPERIENCE
${profile.experiences
  .map(
    (e) => `
${e.role} — ${e.company} (${e.period}, ${e.location})
${e.description}
Key Responsibilities:
${e.achievements.map((a) => `• ${a}`).join('\n')}
Core Skills: ${e.techStack.join(', ')}`
  )
  .join('\n')}

EDUCATION
${profile.education
  .map(
    (ed) => `
${ed.degree} — ${ed.institution} (${ed.period})
${ed.cgpaOrGrade ? `Result: ${ed.cgpaOrGrade}` : ''}`
  )
  .join('\n')}

TECHNICAL SKILLS
${profile.skillCategories
  .map((cat) => `${cat.name}: ${cat.skills.map((s) => s.name).join(', ')}`)
  .join('\n')}

TRAINING & CERTIFICATIONS
${profile.certifications
  .map((c) => `• ${c.name} — ${c.issuer} (${c.status})`)
  .join('\n')}

PROJECTS
${profile.projects
  .map(
    (p) => `
${p.title} (${p.category})
${p.shortDesc}
Technologies: ${p.tags.join(', ')}
${p.liveUrl ? `Live URL: ${p.liveUrl}` : ''}`
  )
  .join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top action toolbar (Hidden in print) */}
      <div
        className={`no-print flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-xl border transition-colors ${
          isLight
            ? 'bg-white border-slate-200 shadow-xs'
            : 'bg-zinc-900/90 border-zinc-800'
        }`}
      >
        <button
          onClick={onBackToPortfolio}
          className={`inline-flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors ${
            isLight ? 'text-slate-700 hover:text-blue-600' : 'text-zinc-300 hover:text-white'
          }`}
        >
          <ArrowLeft className={`w-4 h-4 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
          <span>Back to Interactive Portfolio</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleDownloadCv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg transition-all shadow-2xs"
            title="Download the exact official PDF CV attachment"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-200" />
                <span>Downloaded PDF!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download Official PDF</span>
              </>
            )}
          </button>

          {onOpenPdfPreview && (
            <button
              onClick={onOpenPdfPreview}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                isLight
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
              }`}
              title="Preview official PDF document"
            >
              <Eye className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
              <span>Preview PDF</span>
            </button>
          )}

          <button
            onClick={handleCopyPlainText}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
            }`}
            title="Copy plain-text formatted CV for job portals"
          >
            {copiedText ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedText ? 'Copied Text!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
            }`}
            title="Download JSON data schema"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50 shadow-2xs'
                : 'bg-cyan-400 text-zinc-950 hover:bg-cyan-300 shadow-sm'
            }`}
            title="Open browser print dialog to save as PDF or print on paper"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Digital CV Document */}
      <div
        className={`print-card rounded-2xl border p-8 sm:p-12 shadow-xl space-y-10 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0d0f18] border-zinc-800 text-zinc-100'
        }`}
      >
        
        {/* CV Header */}
        <header
          className={`border-b pb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6 ${
            isLight ? 'border-slate-200' : 'border-zinc-800'
          }`}
        >
          <div>
            <h1
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {profile.name}
            </h1>
            <p
              className={`text-base sm:text-lg font-semibold mt-1 ${
                isLight ? 'text-blue-700' : 'text-cyan-400'
              }`}
            >
              {profile.title}
            </p>
            <p
              className={`text-xs sm:text-sm mt-2 max-w-xl leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              {profile.bio}
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-5 shrink-0">
            <div
              className={`text-xs space-y-1.5 shrink-0 font-mono ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
                <a href={`tel:${profile.phone}`} className="hover:underline">
                  {profile.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
                <a href={`mailto:${profile.email}`} className="hover:underline">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                  LinkedIn Profile
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-cyan-400'}`} />
                <a href={profile.socials.github} target="_blank" rel="noreferrer" className="hover:underline">
                  GitHub Profile
                </a>
              </div>
            </div>

            {/* Passport Photo */}
            <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700 bg-white shadow-xs shrink-0">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </header>

        {/* Work Experience */}
        <section className="space-y-6">
          <h2
            className={`text-xs font-bold uppercase tracking-wider font-mono border-b pb-2 ${
              isLight
                ? 'text-blue-700 border-slate-200'
                : 'text-cyan-400 border-zinc-800'
            }`}
          >
            01. Professional Experience
          </h2>
          <div className="space-y-6">
            {profile.experiences.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {exp.role} <span className={isLight ? 'text-slate-500 font-normal' : 'text-zinc-400 font-normal'}>at {exp.company}</span>
                  </h3>
                  <span className={`text-xs font-mono font-medium ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                    {exp.period} · {exp.location}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-300'}`}>
                  {exp.description}
                </p>
                <ul className="space-y-1 pl-4 list-disc text-xs sm:text-sm leading-relaxed">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className={isLight ? 'text-slate-700' : 'text-zinc-300'}>
                      {ach}
                    </li>
                  ))}
                </ul>
                <div className={`text-xs font-mono pt-1 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                  Core Skills: {exp.techStack.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-6">
          <h2
            className={`text-xs font-bold uppercase tracking-wider font-mono border-b pb-2 ${
              isLight
                ? 'text-blue-700 border-slate-200'
                : 'text-cyan-400 border-zinc-800'
            }`}
          >
            02. Academic Credentials
          </h2>
          <div className="space-y-4">
            {profile.education.map((edu) => (
              <div key={edu.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className={`text-sm sm:text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {edu.degree}
                  </h3>
                  <span className={`text-xs font-mono font-medium ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                    {edu.period}
                  </span>
                </div>
                <div className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  {edu.institution} · {edu.location} {edu.cgpaOrGrade && `· ${edu.cgpaOrGrade}`}
                </div>
                {edu.highlights && edu.highlights.length > 0 && (
                  <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-zinc-300'}`}>
                    {edu.highlights.join(' ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Training & Certifications */}
        <section className="space-y-4">
          <h2
            className={`text-xs font-bold uppercase tracking-wider font-mono border-b pb-2 ${
              isLight
                ? 'text-blue-700 border-slate-200'
                : 'text-cyan-400 border-zinc-800'
            }`}
          >
            03. Training &amp; Professional Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {profile.certifications.map((cert) => (
              <div key={cert.id} className={isLight ? 'text-slate-700' : 'text-zinc-300'}>
                <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {cert.name}
                </span>{' '}
                —{' '}
                <span className={`font-mono ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  {cert.issuer} ({cert.status})
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="space-y-4">
          <h2
            className={`text-xs font-bold uppercase tracking-wider font-mono border-b pb-2 ${
              isLight
                ? 'text-blue-700 border-slate-200'
                : 'text-cyan-400 border-zinc-800'
            }`}
          >
            04. Technical Proficiencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {profile.skillCategories.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-zinc-200'}`}>
                  {cat.name}:
                </span>{' '}
                <span className={`font-mono ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  {cat.skills.map((s) => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Projects */}
        <section className="space-y-4">
          <h2
            className={`text-xs font-bold uppercase tracking-wider font-mono border-b pb-2 ${
              isLight
                ? 'text-blue-700 border-slate-200'
                : 'text-cyan-400 border-zinc-800'
            }`}
          >
            05. Selected Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.projects.map((proj) => (
              <div
                key={proj.id}
                className={`p-4 rounded-xl border space-y-2 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-zinc-950/60 border-zinc-800'
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {proj.title}
                  </h3>
                  <span className={`text-[11px] font-mono ${isLight ? 'text-blue-700 font-semibold' : 'text-cyan-400'}`}>
                    {proj.category}
                  </span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-300'}`}>
                  {proj.shortDesc}
                </p>
                <div className={`text-[11px] font-mono ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                  Stack: {proj.tags.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
