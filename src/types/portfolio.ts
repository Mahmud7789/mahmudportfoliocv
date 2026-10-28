/**
 * Types for Portfolio & Digital CV
 */

export interface Project {
  id: string;
  title: string;
  category: 'Machine Learning' | 'Web Application' | 'IT & Systems';
  shortDesc: string;
  fullDesc: string;
  image: string;
  stats: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  architecture: {
    overview: string;
    highlights: string[];
    stack: string[];
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpaOrGrade?: string;
  highlights: string[];
  courses?: string[];
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    experience: string;
  }[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  status: 'Completed' | 'In Progress';
  issueDate?: string;
  credentialId?: string;
  verifyUrl?: string;
  details?: string;
}

export interface PortfolioProfile {
  name: string;
  title: string;
  editorialKicker: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  avatarUrl: string;
  cvPdfUrl: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
    portfolioUrl?: string;
  };
  metrics: {
    label: string;
    value: string;
    context: string;
  }[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skillCategories: SkillCategory[];
  certifications: Certification[];
}
