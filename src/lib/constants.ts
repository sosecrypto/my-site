import type { CareerEntry, Keyword, ProjectCard, ProjectCategory, Hobby, DailyRoutine, Quote, Book, MockPost, Skill, SkillCategory } from "@/types";

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
      achievements: ["이더리움 생태계 한국어 콘텐츠 기획·번역", "텔레그램 커뮤니티 운영"],
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
      achievements: ["온체인 데이터 분석 파이프라인 구축", "주요 프로젝트 성장 전략 리드", "팀 리드 역할 수행"],
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
      achievements: ["블록체인 신사업 전략 수립", "파트너십 및 투자 검토"],
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

export const PROJECT_CATEGORIES: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI" },
  { key: "web3", label: "Web3" },
  { key: "fullstack", label: "Full Stack" },
];

export const PROJECTS: ProjectCard[] = [
  {
    title: "AI Book",
    description: "AI 멀티 에이전트 기반 책 집필 플랫폼",
    tags: ["Next.js", "Claude API", "Multi-Agent", "Prisma"],
    github: "https://github.com/sumsun-dev/ai-book",
    live: "https://ai-book-delta-navy.vercel.app",
    thumbnail: "/projects/ai-book.png",
    category: "ai",
    role: "풀스택 개발",
    period: "2025.12 ~ 2026.01",
    impact: "멀티 에이전트 기반 책 집필 자동화",
    highlights: ["Claude API 멀티 에이전트 아키텍처", "실시간 집필 진행 상황 스트리밍"],
  },
  {
    title: "AI Chef",
    description: "식재료 관리 & 맞춤 레시피 추천 AI 셰프",
    tags: ["Flutter", "Next.js", "Gemini", "Supabase"],
    github: "https://github.com/sumsun-dev/ai-chef",
    thumbnail: "/projects/ai-chef.png",
    category: "ai",
    role: "풀스택 개발",
    period: "2025.10 ~ 2025.11",
    impact: "Gemini Vision으로 식재료 인식 & 레시피 추천",
    highlights: ["Flutter 크로스플랫폼 앱", "Gemini Vision API 이미지 분석"],
  },
  {
    title: "Talk With Legends",
    description: "RAG 기반 AI 페르소나 챗봇 — 유명인과 대화하기",
    tags: ["Next.js", "Claude API", "RAG", "pgvector"],
    github: "https://github.com/sumsun-dev/talk-with",
    thumbnail: "/projects/talk-with.png",
    category: "ai",
    role: "풀스택 개발",
    period: "2025.08 ~ 진행중",
    impact: "RAG + 페르소나 기반 대화형 AI",
    highlights: ["pgvector 벡터 검색", "페르소나별 응답 톤 커스터마이징"],
  },
  {
    title: "The Ticker is ETH",
    description: "이더리움 뉴스레터 & 커뮤니티 허브",
    tags: ["Next.js", "TypeScript", "Ethereum"],
    github: "https://github.com/sumsun-dev/The-Ticker-is-ETH",
    live: "https://the-ticker-is-eth-pi.vercel.app",
    thumbnail: "/projects/the-ticker-is-eth.png",
    category: "web3",
    role: "프론트엔드 개발",
    period: "2024.11 ~ 진행중",
    impact: "이더리움 생태계 한국어 콘텐츠 허브",
    highlights: ["뉴스레터 자동 발행 시스템", "텔레그램 커뮤니티 연동"],
  },
];

export const CATEGORIES = ["전체", "생각", "기술", "활동", "기타"] as const;

export const NAV_LINKS = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "career", href: "#career" },
  { label: "blog", href: "#blog" },
  { label: "contact", href: "#contact" },
] as const;

export const LIFE_PROFILE = {
  title: "와인 & 위스키 | 홈 쉐프 | 숨숨 & 선이",
  roles: [
    "🍷 와인 & 위스키",
    "👨‍🍳 홈 쉐프",
    "🐕 숨숨 & 선이",
  ],
  dog: {
    name: "숨숨이",
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
    { time: "07:00", activity: "기상 & 숨숨이 산책", icon: "🌅" },
    { time: "09:00", activity: "업무 시작", icon: "💻" },
    { time: "12:30", activity: "점심 & 커피", icon: "☕" },
    { time: "18:00", activity: "저녁 러닝", icon: "🏃" },
    { time: "21:00", activity: "독서 & 게임", icon: "📚" },
    { time: "23:00", activity: "숨숨이와 저녁 산책", icon: "🐕" },
  ] satisfies DailyRoutine[],
  quotes: [
    { icon: "💭", text: "삶이란 B(Birth)와 D(Death) 사이의 C(Choice)이다.", source: "장 폴 사르트르" },
    { icon: "😊", text: "행복은 습관이다. 그것을 몸에 지니라.", source: "허버트" },
    { icon: "⏰", text: "오늘 할 수 있는 일을 내일로 미루지 마라.", source: "벤자민 프랭클린" },
    { icon: "🚀", text: "가장 큰 위험은 위험 없는 삶이다.", source: "스티븐 킹" },
    { icon: "🚴", text: "균형을 유지하려면 계속 움직여야 한다.", source: "알베르트 아인슈타인" },
  ] satisfies Quote[],
  books: [
    { title: "클린 코드", author: "로버트 C. 마틴", status: "finished", genre: "기술", rating: 5, review: "개발자라면 꼭 읽어야 할 필독서" },
    { title: "데미안", author: "헤르만 헤세", status: "finished", genre: "소설", rating: 4, review: "청춘의 성장과 자아 탐구" },
    { title: "사피엔스", author: "유발 하라리", status: "reading", genre: "인문", review: "인류의 역사를 새롭게 바라보다" },
    { title: "이더리움 백서", author: "비탈릭 부테린", status: "reading", genre: "기술" },
    { title: "생각, 빠르고 느리게", author: "대니얼 카너먼", status: "wishlist", genre: "심리" },
    { title: "프로젝트 헤일메리", author: "앤디 위어", status: "wishlist", genre: "SF" },
  ] satisfies Book[],
} as const;

export const LIFE_NAV_LINKS = [
  { label: "hobbies", href: "#hobbies" },
  { label: "daily", href: "#daily" },
  { label: "philosophy", href: "#philosophy" },
  { label: "reading", href: "#reading" },
] as const;

export const SKILL_CATEGORIES: { key: SkillCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "language", label: "Languages" },
  { key: "framework", label: "Frameworks" },
  { key: "tool", label: "Tools" },
  { key: "blockchain", label: "Blockchain" },
];

export const SKILLS: Skill[] = [
  { name: "TypeScript", level: 85, category: "language" },
  { name: "Python", level: 75, category: "language" },
  { name: "JavaScript", level: 90, category: "language" },
  { name: "SQL", level: 70, category: "language" },
  { name: "Next.js", level: 85, category: "framework" },
  { name: "React", level: 85, category: "framework" },
  { name: "Flutter", level: 60, category: "framework" },
  { name: "Tailwind CSS", level: 90, category: "framework" },
  { name: "Claude API", level: 85, category: "tool" },
  { name: "Supabase", level: 80, category: "tool" },
  { name: "Git", level: 85, category: "tool" },
  { name: "Docker", level: 60, category: "tool" },
  { name: "Ethereum", level: 80, category: "blockchain" },
  { name: "Solidity", level: 55, category: "blockchain" },
  { name: "DeFi", level: 85, category: "blockchain" },
  { name: "On-chain Analysis", level: 80, category: "blockchain" },
];

export const MOCK_POSTS: MockPost[] = [
  { date: "2026-02-15", category: "기술", title: "AI 시대의 개발자 역할 변화", slug: "#" },
  { date: "2026-02-10", category: "생각", title: "Web3와 탈중앙화의 미래", slug: "#" },
  { date: "2026-01-28", category: "활동", title: "DeSpread 팀과 함께한 1년", slug: "#" },
];
