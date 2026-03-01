export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CareerEntry {
  hash: string;
  date: string;
  endDate: string;
  action: "feat" | "init";
  org: string;
  role: string;
  type: string;
  detail: string;
  achievements?: string[];
}

export interface Keyword {
  icon: string;
  title: string;
  desc: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  url: string | null;
  tags: string[];
  sort_order: number;
  created_at: string;
}

export type ProjectCategory = "ai" | "web3" | "fullstack";

export interface ProjectCard {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
  thumbnail: string;
  category?: ProjectCategory;
  role?: string;
  impact?: string;
  period?: string;
  highlights?: string[];
}

export interface Hobby {
  icon: string;
  title: string;
  desc: string;
}

export interface DailyRoutine {
  time: string;
  activity: string;
  icon: string;
  detail?: string;
}

export interface Quote {
  text: string;
  source: string;
  icon: string;
  note?: string;
}

export interface Book {
  title: string;
  author: string;
  status: "reading" | "finished" | "wishlist";
  genre: string;
  review?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface MockPost {
  date: string;
  category: string;
  title: string;
  slug: string;
}

export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
  desc?: string;
}

export type SkillCategory = "language" | "framework" | "tool" | "blockchain";

export type CapabilityCategory = "analysis" | "product" | "content" | "ai";

export interface Capability {
  icon: string;
  title: string;
  description: string;
  tools: string[];
  category: CapabilityCategory;
}
