export interface ProjectItem {
  id: string;
  title: string;
  category: 'video' | 'graphics';
  tag: string;
  duration?: string;
  thumbnail: string;
  videoUrl?: string;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  description: string;
  tools: string[];
  clientOrOrg?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  tools?: string[];
}

export interface EducationItem {
  id: string;
  title: string;
  year: string;
  degreeOrType: string;
  institution?: string;
  description: string;
  status: string;
  statusColor?: string;
  icon: string;
}

export interface TrainingCompetency {
  title: string;
  tools: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  address: string;
  responseRate: string;
  availability: string;
}

