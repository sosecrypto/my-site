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

export interface ProjectCard {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
  thumbnail: string;
}
