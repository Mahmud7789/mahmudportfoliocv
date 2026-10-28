import { useState, useEffect } from 'react';
import { initialPortfolioData } from './data/portfolioData';
import { PortfolioProfile } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { DigitalCVView } from './components/DigitalCVView';
import { ContactSection } from './components/ContactSection';
import { DeployModal } from './components/DeployModal';
import { LiveEditorModal } from './components/LiveEditorModal';
import { PdfPreviewModal } from './components/PdfPreviewModal';
import { Footer } from './components/Footer';

export default function App() {
  // Theme state: defaults to 'light' as requested by the user
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const savedTheme = localStorage.getItem('golam_mahmud_portfolio_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    } catch {
      // ignore
    }
    return 'light'; // Default light theme
  });

  const [profile, setProfile] = useState<PortfolioProfile>(() => {
    try {
      const saved = localStorage.getItem('golam_mahmud_cv_data_v15');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          title: initialPortfolioData.title,
          editorialKicker: initialPortfolioData.editorialKicker,
          avatarUrl: initialPortfolioData.avatarUrl,
          cvPdfUrl: initialPortfolioData.cvPdfUrl,
          socials: {
            ...parsed.socials,
            github: initialPortfolioData.socials.github,
            linkedin: initialPortfolioData.socials.linkedin,
          },
          projects: initialPortfolioData.projects,
        };
      }
    } catch {
      // Fallback
    }
    return initialPortfolioData;
  });

  const [currentView, setCurrentView] = useState<'portfolio' | 'cv'>('portfolio');
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [pdfPreviewModalOpen, setPdfPreviewModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('golam_mahmud_portfolio_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.className = 'bg-[#090a0f] text-zinc-100 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200';
      } else {
        document.documentElement.classList.remove('dark');
        document.body.className = 'bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200';
      }
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('golam_mahmud_cv_data_v15', JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSaveProfile = (updated: PortfolioProfile) => {
    setProfile(updated);
  };

  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#090a0f] text-zinc-100'
      }`}
    >
      {/* Strict 3-zone contract navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        currentView={currentView}
        onToggleView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDeployModal={() => setDeployModalOpen(true)}
        onOpenEditorModal={() => setEditorModalOpen(true)}
        onOpenPdfPreview={() => setPdfPreviewModalOpen(true)}
        cvPdfUrl={profile.cvPdfUrl}
      />

      <main className="flex-1">
        {currentView === 'cv' ? (
          <DigitalCVView
            profile={profile}
            theme={theme}
            onBackToPortfolio={() => {
              setCurrentView('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPdfPreview={() => setPdfPreviewModalOpen(true)}
          />
        ) : (
          <>
            <Hero
              profile={profile}
              theme={theme}
              onOpenCV={() => {
                setCurrentView('cv');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenDeploy={() => setDeployModalOpen(true)}
              onOpenEditor={() => setEditorModalOpen(true)}
              onOpenPdfPreview={() => setPdfPreviewModalOpen(true)}
            />

            <ExperienceSection
              experiences={profile.experiences}
              education={profile.education}
              theme={theme}
            />

            <ProjectsSection
              projects={profile.projects}
              theme={theme}
            />

            <SkillsSection
              categories={profile.skillCategories}
              certifications={profile.certifications}
              theme={theme}
            />

            <ContactSection
              profile={profile}
              theme={theme}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        theme={theme}
        cvPdfUrl={profile.cvPdfUrl}
        onOpenDeploy={() => setDeployModalOpen(true)}
        onOpenEditor={() => setEditorModalOpen(true)}
        onOpenCV={() => {
          setCurrentView('cv');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Vercel & Netlify Deployment Assistant Modal */}
      <DeployModal
        isOpen={deployModalOpen}
        onClose={() => setDeployModalOpen(false)}
      />

      {/* Live CV & Portfolio Customizer Modal */}
      <LiveEditorModal
        isOpen={editorModalOpen}
        onClose={() => setEditorModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      {/* Official 3-Page CV PDF Preview & Direct Download Modal */}
      <PdfPreviewModal
        isOpen={pdfPreviewModalOpen}
        onClose={() => setPdfPreviewModalOpen(false)}
        theme={theme}
      />
    </div>
  );
}
