import { useState, useEffect } from 'react';
import { X, Copy, Check, ExternalLink, Globe, Terminal, FileCode, Sparkles } from 'lucide-react';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeployModal({ isOpen, onClose }: DeployModalProps) {
  const [activeTab, setActiveTab] = useState<'vercel' | 'netlify' | 'cli' | 'configs'>('vercel');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const vercelJsonContent = `{
  "framework": "vite",
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`;

  const netlifyTomlContent = `[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c0e17] border border-zinc-800 shadow-2xl text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Free Web Hosting &amp; Deployment Guide
              </h2>
              <p className="text-xs text-zinc-400">
                Deploy Mahmud&apos;s portfolio &amp; CV on Vercel or Netlify in under 2 minutes.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-zinc-800 px-6 bg-zinc-950/50">
          <button
            onClick={() => setActiveTab('vercel')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'vercel'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Vercel (Recommended)
          </button>
          <button
            onClick={() => setActiveTab('netlify')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'netlify'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Netlify
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'cli'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Terminal / CLI
          </button>
          <button
            onClick={() => setActiveTab('configs')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'configs'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Included Configs
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-6">
          {activeTab === 'vercel' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs sm:text-sm text-cyan-200">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    Vercel provides 100% free hosting with automatic HTTPS, custom domains, and edge CDN.
                  </span>
                </span>
                <a
                  href="https://vercel.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-cyan-400 hover:underline flex items-center gap-1 shrink-0 ml-2"
                >
                  <span>Open Vercel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Step 1: Push repository to GitHub
                  </div>
                  <p className="text-xs text-zinc-300">
                    Create a private or public GitHub repository named <code className="text-cyan-400">portfolio</code> and push this project.
                  </p>
                  <div className="relative group">
                    <pre className="p-3 rounded-lg bg-zinc-950 font-mono text-xs text-zinc-300 overflow-x-auto">
{`git init
git add .
git commit -m "feat: digital portfolio & cv"
git branch -M main
git remote add origin https://github.com/Mahmud7789/portfolio.git
git push -u origin main`}
                    </pre>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          'git init && git add . && git commit -m "feat: digital portfolio & cv" && git branch -M main',
                          'git-vercel'
                        )
                      }
                      className="absolute top-2 right-2 p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                      title="Copy Git Commands"
                    >
                      {copiedKey === 'git-vercel' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Step 2: Connect to Vercel (Auto-Configured)
                  </div>
                  <ul className="text-xs text-zinc-300 space-y-1.5 list-disc pl-4">
                    <li>Log in to <strong className="text-white">vercel.com</strong> with your GitHub account.</li>
                    <li>Click <strong className="text-white">&ldquo;Add New...&rdquo; → &ldquo;Project&rdquo;</strong> and select your repository.</li>
                    <li>
                      Vercel automatically detects <strong className="text-cyan-400">Vite</strong> and uses our included <code className="text-zinc-200">vercel.json</code>.
                    </li>
                    <li>Click <strong className="text-cyan-400">Deploy</strong>. Your site goes live at <code className="text-white">https://your-name.vercel.app</code>!</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'netlify' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs sm:text-sm text-emerald-200">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Netlify offers instant drag-and-drop or Git-based hosting on a global application delivery network.
                  </span>
                </span>
                <a
                  href="https://app.netlify.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-emerald-400 hover:underline flex items-center gap-1 shrink-0 ml-2"
                >
                  <span>Open Netlify</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Method A: Git Continuous Deployment
                  </div>
                  <p className="text-xs text-zinc-300">
                    Import your repository from GitHub. Netlify reads our pre-configured <code className="text-cyan-400">netlify.toml</code> file with SPA route redirects automatically.
                  </p>
                  <ul className="text-xs text-zinc-400 space-y-1 list-disc pl-4">
                    <li>Build command: <code className="text-zinc-200">npm run build</code></li>
                    <li>Publish directory: <code className="text-zinc-200">dist</code></li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Method B: Drag &amp; Drop Deploy (Zero Git Required)
                  </div>
                  <p className="text-xs text-zinc-300">
                    Run <code className="text-cyan-400">npm run build</code> locally, then drag the generated <code className="text-white">dist/</code> folder into Netlify&apos;s Drop zone.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Deploy via Vercel CLI</span>
                </div>
                <div className="relative group">
                  <pre className="p-3 rounded-lg bg-zinc-950 font-mono text-xs text-zinc-300 overflow-x-auto">
{`# 1. Install Vercel globally (one time)
npm i -g vercel

# 2. Deploy instantly
vercel --prod`}
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npm i -g vercel && vercel --prod', 'cli-vercel')}
                    className="absolute top-2 right-2 p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                  >
                    {copiedKey === 'cli-vercel' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Deploy via Netlify CLI</span>
                </div>
                <div className="relative group">
                  <pre className="p-3 rounded-lg bg-zinc-950 font-mono text-xs text-zinc-300 overflow-x-auto">
{`# 1. Build production static bundle
npm run build

# 2. Deploy dist folder to Netlify production
npx netlify-cli deploy --prod --dir=dist`}
                  </pre>
                  <button
                    onClick={() => copyToClipboard('npm run build && npx netlify-cli deploy --prod --dir=dist', 'cli-netlify')}
                    className="absolute top-2 right-2 p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                  >
                    {copiedKey === 'cli-netlify' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'configs' && (
            <div className="space-y-4">
              <p className="text-xs text-zinc-400">
                Both configuration files are already generated and active in the root directory of this repository:
              </p>

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5" />
                    <span>vercel.json</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(vercelJsonContent, 'vercel-json')}
                    className="inline-flex items-center gap-1 text-zinc-400 hover:text-white"
                  >
                    {copiedKey === 'vercel-json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'vercel-json' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-zinc-950 font-mono text-xs text-zinc-300 border border-zinc-800">
                  {vercelJsonContent}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5" />
                    <span>netlify.toml</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(netlifyTomlContent, 'netlify-toml')}
                    className="inline-flex items-center gap-1 text-zinc-400 hover:text-white"
                  >
                    {copiedKey === 'netlify-toml' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'netlify-toml' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-zinc-950 font-mono text-xs text-zinc-300 border border-zinc-800">
                  {netlifyTomlContent}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors"
          >
            Got it, Let&apos;s Deploy!
          </button>
        </div>
      </div>
    </div>
  );
}
