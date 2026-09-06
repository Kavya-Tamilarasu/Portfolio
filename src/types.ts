export type Theme = 'dark' | 'light';

export interface ProjectCaseStudy {
  problem: string;
  research: string;
  architectureDiagram: {
    layers: {
      name: string;
      items: string[];
      color: string;
    }[];
    flow: string;
    latency: string;
  };
  databaseSchema: {
    tableName: string;
    description: string;
    columns: {
      name: string;
      type: string;
      isKey?: boolean;
      desc: string;
    }[];
  }[];
  apiEndpoints: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    description: string;
    auth: boolean;
    status: number;
  }[];
  security: string[];
  performance: {
    metric: string;
    score: string;
    detail: string;
  }[];
  challengesAndSolutions: {
    challenge: string;
    solution: string;
  }[];
  lessonsLearned: string[];
  futureImprovements: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  featured: boolean;
  image: string;
  category: 'Full Stack' | 'AI / ML' | 'Algorithms' | 'Mobile & Web';
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  highlights: string[];
  architecture?: string[];
  caseStudy?: ProjectCaseStudy;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    icon?: string;
    badge?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string[];
  technologies: string[];
  logoText: string;
  outcomes?: string[];
  teamCollaboration?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  badgeType?: 'Silver' | 'Explorer' | 'Professional' | 'Standard';
  date: string;
  credentialId?: string;
  skills: string[];
  verifyUrl?: string;
  fileUrl?: string;
  fileType?: 'pdf' | 'image';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isFallback?: boolean;
}

export interface CodingProfile {
  id: string;
  platform: 'LeetCode' | 'HackerRank' | 'GitHub' | 'LinkedIn';
  username: string;
  rating?: string;
  globalRank?: string;
  solvedCount: number | string;
  badge?: string;
  profileUrl: string;
  color: string;
}

export interface StatItem {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  description: string;
}

export interface TechnicalDepthTopic {
  id: string;
  title: string;
  shortName: string;
  category: string;
  iconName: string;
  badge: string;
  summary: string;
  keyConcepts: {
    name: string;
    explanation: string;
    bulletPoints?: string[];
    codeSnippet?: string;
  }[];
  interviewTakeaways: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  category: 'academic' | 'internship' | 'nptel' | 'hackathon' | 'coding';
  metric: string;
  description: string;
  iconName: string;
  date: string;
}
