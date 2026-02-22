import type { CareerEntry, Keyword, ProjectCard, Hobby, DailyRoutine } from "@/types";

export const PROFILE = {
  name: "엄상현",
  nameEn: "Sanghyun Eom",
  title: "AI Vibe Coder | Web3 Native",
  location: "Seoul / Incheon, South Korea",
  email: "shmksumsun@gmail.com",

  links: {
    github: "https://github.com/sumsun-dev",
    telegram: "https://t.me/crypto_offroad",
    linkedin: "https://www.linkedin.com/in/상현-엄-5a03b628a/",
  },

  roles: [
    "DigitalAsset Analyst Team Lead @ DeSpread",
    "Core Contributor @ The Ticker is ETH",
  ],

  keywords: [
    { icon: "🧩", title: "Super Generalist", desc: "다양한 지식과 경험을 통해 문제 해결에 기여합니다." },
    { icon: "⚡", title: "Fast Learner", desc: "빠르게 배우고 학습하며, 나누고 함께 성장합니다." },
    { icon: "🔑", title: "Ownership", desc: "문제를 해결하기 위해 노력하며 다양한 제안과 방향을 제시합니다." },
    { icon: "🤖", title: "Data & AI", desc: "4차 산업혁명에서 Data와 AI를 이해하고 활용하여 효율을 높입니다." },
    { icon: "💚", title: "Humanity", desc: "인간다움을 유지하기 위해 노력합니다." },
  ] satisfies Keyword[],

  career: [
    {
      hash: "a7f3e21",
      date: "2024.11",
      endDate: "현재",
      action: "feat",
      org: "The Ticker is ETH",
      role: "Core Team",
      type: "재택근무",
      detail: "이더리움과 관련한 콘텐츠를 한국에 전달하는 그룹. https://t.me/thetickeriseth",
    },
    {
      hash: "b2d8c44",
      date: "2024.03",
      endDate: "현재",
      action: "feat",
      org: "DeSpread",
      role: "Growth Lead",
      type: "정규직",
      detail: "디지털 에셋 분석 및 성장 전략",
    },
    {
      hash: "e5a1b09",
      date: "2019.12",
      endDate: "2023.06",
      action: "feat",
      org: "blockcrafters",
      role: "신사업 전략",
      type: "정규직",
      detail: "3년 7개월간 신사업 전략 수립 및 실행",
    },
    {
      hash: "f8c2d37",
      date: "2018.12",
      endDate: "2019.12",
      action: "feat",
      org: "blockcrafters",
      role: "Marketing Team",
      type: "정규직",
      detail: "마케팅 팀에서 1년 1개월 근무",
    },
    {
      hash: "0a1b2c3",
      date: "2018.06",
      endDate: "2018.12",
      action: "init",
      org: "blockcrafters",
      role: "Contents Producer",
      type: "정규직",
      detail: "콘텐츠 프로듀서로 커리어 시작",
    },
    {
      hash: "d4e5f60",
      date: "2013.03",
      endDate: "2021.07",
      action: "init",
      org: "국민대학교",
      role: "경제학 학사",
      type: "학력",
      detail: "경제학과 졸업",
    },
  ] satisfies CareerEntry[],
} as const;

export const PROJECTS: ProjectCard[] = [
  {
    title: "AI Book",
    description: "AI 멀티 에이전트 기반 책 집필 플랫폼",
    tags: ["Next.js", "Claude API", "Multi-Agent", "Prisma"],
    github: "https://github.com/sumsun-dev/ai-book",
    live: "https://ai-book-delta-navy.vercel.app",
    thumbnail: "/projects/ai-book.png",
  },
  {
    title: "AI Chef",
    description: "식재료 관리 & 맞춤 레시피 추천 AI 셰프",
    tags: ["Flutter", "Next.js", "Gemini", "Supabase"],
    github: "https://github.com/sumsun-dev/ai-chef",
    thumbnail: "/projects/ai-chef.png",
  },
  {
    title: "Talk With Legends",
    description: "RAG 기반 AI 페르소나 챗봇 — 유명인과 대화하기",
    tags: ["Next.js", "Claude API", "RAG", "pgvector"],
    github: "https://github.com/sumsun-dev/talk-with",
    thumbnail: "/projects/talk-with.png",
  },
  {
    title: "The Ticker is ETH",
    description: "이더리움 뉴스레터 & 커뮤니티 허브",
    tags: ["Next.js", "TypeScript", "Ethereum"],
    github: "https://github.com/sumsun-dev/The-Ticker-is-ETH",
    live: "https://the-ticker-is-eth-pi.vercel.app",
    thumbnail: "/projects/the-ticker-is-eth.png",
  },
];

export const CATEGORIES = ["전체", "생각", "기술", "활동", "기타"] as const;

export const NAV_LINKS = [
  { label: "about", href: "#about" },
  { label: "projects", href: "#projects" },
  { label: "career", href: "#career" },
  { label: "blog", href: "#blog" },
  { label: "contact", href: "#contact" },
] as const;

export const LIFE_PROFILE = {
  dog: {
    name: "뽀삐",
    breed: "골든 리트리버",
    birthday: "2020.03.15",
    personality: ["활발한", "사랑스러운", "똑똑한"],
    description: "산책과 공놀이를 좋아하는 우리집 막내",
  },
  hobbies: [
    { icon: "🎮", title: "Gaming", desc: "스팀 게임, 닌텐도 스위치" },
    { icon: "📚", title: "Reading", desc: "경제, 기술, SF 소설" },
    { icon: "🏃", title: "Running", desc: "주 3회 한강 러닝" },
    { icon: "☕", title: "Coffee", desc: "핸드드립 홈카페" },
    { icon: "🎵", title: "Music", desc: "재즈, 로파이 힙합" },
  ] satisfies Hobby[],
  dailyLife: [
    { time: "07:00", activity: "기상 & 뽀삐 산책", icon: "🌅" },
    { time: "09:00", activity: "업무 시작", icon: "💻" },
    { time: "12:30", activity: "점심 & 커피", icon: "☕" },
    { time: "18:00", activity: "저녁 러닝", icon: "🏃" },
    { time: "21:00", activity: "독서 & 게임", icon: "📚" },
    { time: "23:00", activity: "뽀삐와 저녁 산책", icon: "🐕" },
  ] satisfies DailyRoutine[],
} as const;

export const LIFE_NAV_LINKS = [
  { label: "hobbies", href: "#hobbies" },
  { label: "daily", href: "#daily" },
  { label: "philosophy", href: "#philosophy" },
  { label: "reading", href: "#reading" },
] as const;
