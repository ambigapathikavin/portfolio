export type ProjectCategory = 'ALL' | 'DATA ANALYTICS' | 'POWER BI' | 'MACHINE LEARNING' | 'NLP' | 'AI';

export interface ProjectPipelineStep {
  step: string;
  description: string;
  tools?: string[];
  codeSnippet?: string;
}

export interface MetricCardData {
  label: string;
  value: string;
  sublabel?: string;
  change?: string;
  isPositive?: boolean;
  benchmark?: string;
}

export interface ProjectKPI {
  title: string;
  current: string;
  baseline: string;
  improvement: string;
  unit?: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  filterCategories: ProjectCategory[];
  technology: string[];
  shortDescription: string;
  keyResult: string;
  imageUrl?: string;
  imageCaption?: string;
  roleType?: 'DATA_ANALYST' | 'DATA_SCIENTIST' | 'BOTH';
  metrics?: { label: string; value: string; subtext?: string }[];
  kpis?: ProjectKPI[];
  highlights: string[];
  overview: string;
  problem: string;
  data: string;
  methodology: string;
  process: string[];
  pipeline: ProjectPipelineStep[];
  results: string[];
  learnings: string[];
  accentColor?: string;
  dashboardType?: 'sales' | 'cricket' | 'hr' | 'news' | 'prescription' | 'churn' | 'credit' | 'ecommerce' | 'healthcare';
  datasetStats?: {
    rows: string;
    features: string;
    format: string;
    timeframe: string;
  };
}

export interface SkillItem {
  name: string;
  levelDescription?: string;
  iconType?: string;
  tags?: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  project?: string;
  isCurrent?: boolean;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  description?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skillsCovered: string[];
}

export interface StatItem {
  id: string;
  value: string;
  numericTarget: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
  icon: string;
}

export interface JourneyStage {
  stepNumber: number;
  id: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  keyTools: string[];
  deliverable: string;
  codeSnippet?: string;
}
