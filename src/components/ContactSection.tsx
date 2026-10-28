import { useState } from 'react';
import { Mail, Copy, Check, Send, MapPin, Phone, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';

interface ContactSectionProps {
  profile: PortfolioProfile;
  theme: 'light' | 'dark';
}

export function ContactSection({ profile, theme }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [submittedToast, setSubmittedToast] = useState(false);

  const isLight = theme === 'light';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject || `IT Inquiry from ${senderName || 'Portfolio Visitor'}`
    )}&body=${encodeURIComponent(
      `From: ${senderName} (${senderEmail})\n\n${message}`
    )}`;
    window.location.href = mailtoUrl;
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 4000);
  };

  return (
    <section
      id="contact"
      className={`py-16 sm:py-24 border-t transition-colors duration-200 relative ${
        isLight
          ? 'bg-slate-50/70 border-slate-200/90 text-slate-900'
          : 'bg-[#090a0f] border-zinc-800/80 text-zinc-100'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div
                className={`text-xs font-semibold tracking-wider uppercase mb-2 ${
                  isLight ? 'text-blue-700' : 'text-cyan-400'
                }`}
              >
                Direct Communication
              </div>
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Let&apos;s discuss IT &amp; Network opportunities.
              </h2>
              <p
                className={`text-sm sm:text-base mt-3 leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}
              >
                Open to IT Officer positions, network engineering roles, and systems management opportunities in Dhaka or remote.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Email Card */}
              <div
                className={`p-4 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                  isLight
                    ? 'bg-white border-slate-200/90 shadow-2xs'
                    : 'bg-zinc-900/60 border-zinc-800/90'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isLight ? 'bg-blue-50 text-blue-600' : 'bg-zinc-800 text-cyan-400'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div
                      className={`text-[11px] uppercase font-semibold ${
                        isLight ? 'text-slate-400' : 'text-zinc-400'
                      }`}
                    >
                      Email Address
                    </div>
                    <a
                      href={`mailto:${profile.email}`}
                      className={`text-xs sm:text-sm font-mono truncate block hover:underline ${
                        isLight ? 'text-slate-800' : 'text-zinc-200'
                      }`}
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 inline-flex items-center gap-1.5 ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                  }`}
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div
                className={`p-4 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                  isLight
                    ? 'bg-white border-slate-200/90 shadow-2xs'
                    : 'bg-zinc-900/60 border-zinc-800/90'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isLight ? 'bg-blue-50 text-blue-600' : 'bg-zinc-800 text-cyan-400'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div
                      className={`text-[11px] uppercase font-semibold ${
                        isLight ? 'text-slate-400' : 'text-zinc-400'
                      }`}
                    >
                      Direct Phone
                    </div>
                    <a
                      href={`tel:${profile.phone}`}
                      className={`text-xs sm:text-sm font-mono truncate block hover:underline ${
                        isLight ? 'text-slate-800' : 'text-zinc-200'
                      }`}
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 inline-flex items-center gap-1.5 ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                  }`}
                  title="Copy phone number"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div
                className={`p-4 rounded-xl border flex items-center gap-3 transition-colors ${
                  isLight
                    ? 'bg-white border-slate-200/90 shadow-2xs'
                    : 'bg-zinc-900/60 border-zinc-800/90'
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    isLight ? 'bg-blue-50 text-blue-600' : 'bg-zinc-800 text-cyan-400'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div
                    className={`text-[11px] uppercase font-semibold ${
                      isLight ? 'text-slate-400' : 'text-zinc-400'
                    }`}
                  >
                    Current Base
                  </div>
                  <div className={`text-xs sm:text-sm font-medium ${isLight ? 'text-slate-800' : 'text-zinc-200'}`}>
                    {profile.location} (Gulshan / Mohakhali)
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 flex items-center gap-3 text-xs">
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-colors ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-colors ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                >
                  <Github className="w-4 h-4 text-blue-600" />
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 sm:p-8 rounded-2xl border shadow-xl transition-colors ${
                isLight
                  ? 'bg-white border-slate-200/90 text-slate-900'
                  : 'bg-zinc-900/50 border-zinc-800/90 text-zinc-100'
              }`}
            >
              <h3 className={`text-base font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Send Direct Message
              </h3>
              <p className={`text-xs mb-6 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                Fires directly to Golam Mahmud at {profile.email}.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                        isLight ? 'text-slate-500' : 'text-zinc-400'
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hiring Manager / Recruiter"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:border-blue-500 ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                          : 'bg-zinc-950/80 border-zinc-800 text-white placeholder-zinc-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                        isLight ? 'text-slate-500' : 'text-zinc-400'
                      }`}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. hr@company.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:border-blue-500 ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                          : 'bg-zinc-950/80 border-zinc-800 text-white placeholder-zinc-600'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      isLight ? 'text-slate-500' : 'text-zinc-400'
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IT Officer / Network Support Opportunity"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:border-blue-500 ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                        : 'bg-zinc-950/80 border-zinc-800 text-white placeholder-zinc-600'
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      isLight ? 'text-slate-500' : 'text-zinc-400'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe job requirements, company details, or discussion points..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border transition-colors leading-relaxed focus:outline-none focus:border-blue-500 ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                        : 'bg-zinc-950/80 border-zinc-800 text-white placeholder-zinc-600'
                    }`}
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                    Opens in your email application
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {submittedToast && (
                <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Email client opened! Thank you for reaching out to Golam Mahmud.
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
