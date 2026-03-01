import type { CareerEntry, Keyword, ProjectCard, ProjectCategory, Hobby, DailyRoutine, Quote, Book, MockPost, Skill, SkillCategory, Capability, CapabilityCategory } from "@/types";

export const PROFILE = {
  name: "엄상현",
  nameEn: "Sanghyun Eom",
  title: "AI Vibe Coder | Web3 Native",
  location: "Seoul / Incheon, South Korea",
  email: "shmksumsun@gmail.com",

  links: {
    github: "https://github.com/sumsun-dev",
    telegram: "https://t.me/sose_crypto",
    telegramChannel: "https://t.me/crypto_offroad",
    linkedin: "https://www.linkedin.com/in/상현-엄-5a03b628a/",
  },

  roles: [
    "Digital Asset Analyst Team Lead @ DeSpread",
    "Core Contributor @ The Ticker is ETH",
  ],

  keywords: [
    { icon: "🧩", title: "Super Generalist", desc: "콘텐츠 프로듀서로 시작해 마케터, 전략가, 애널리스트, 개발자까지—6년간 5번의 역할 전환을 거치며 어떤 자리든 빠르게 채울 수 있는 사람이 되었습니다." },
    { icon: "⚡", title: "Fast Learner", desc: "Flutter를 2주 만에 익혀 AI Chef 앱을 출시했습니다. '일단 부딪히고, 모르면 파고들기'가 저의 학습법입니다." },
    { icon: "🔑", title: "Ownership", desc: "필요하면 직접 만듭니다. 온체인 데이터 파이프라인이 없으면 Dune 쿼리부터 대시보드까지 혼자 구축하고, 사이트가 필요하면 디자인부터 배포까지 끝냅니다." },
    { icon: "🤖", title: "Data & AI", desc: "Dune Analytics로 온체인 흐름을 읽고, Claude API로 멀티 에이전트 시스템을 설계합니다. 데이터를 보는 눈과 AI를 부리는 손, 둘 다 갖추려 합니다." },
    { icon: "📖", title: "Storyteller", desc: "기술 뒤에는 항상 사람의 이야기가 있습니다. 복잡한 블록체인 개념을 누구나 읽고 싶은 콘텐츠로 바꾸는 것, 그게 제가 가장 좋아하는 일입니다." },
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
      detail: "이더리움 생태계의 핵심 소식을 한국어로 전달하는 커뮤니티. 영어권 리서치를 번역·재가공하여 한국 이더리안에게 매주 뉴스레터를 발행합니다.",
      achievements: ["주간 뉴스레터 기획·번역·발행 (구독자 500+)", "텔레그램 커뮤니티 운영 및 토론 진행", "Next.js 기반 뉴스레터 웹사이트 직접 개발"],
    },
    {
      hash: "b2d8c44",
      date: "2024.03",
      endDate: "현재",
      action: "feat",
      org: "DeSpread",
      role: "Growth Lead",
      type: "정규직",
      detail: "Web3 프로젝트의 성장을 데이터로 설계하는 역할. Dune Analytics 쿼리부터 대시보드 구축까지 직접 수행하며, 수치에 기반한 전략을 리드합니다.",
      achievements: ["온체인 데이터 분석 파이프라인 설계·구축 (Dune SQL)", "주요 L1/L2 프로젝트 성장 전략 기획 및 실행 리드", "3인 팀 리드로서 프로젝트 매니징 및 멘토링"],
    },
    {
      hash: "e5a1b09",
      date: "2019.12",
      endDate: "2023.06",
      action: "feat",
      org: "blockcrafters",
      role: "신사업 전략",
      type: "정규직",
      detail: "마케터에서 전략가로 전환한 시기. 블록체인 업계의 새로운 사업 기회를 발굴하고, 투자 검토부터 파트너십 체결까지 비즈니스 전반을 경험했습니다.",
      achievements: ["DeFi·NFT 신사업 모델 기획 및 PoC 진행", "20+ 프로젝트 투자 검토 및 듀딜리전스 수행", "국내외 파트너십 발굴 및 계약 체결"],
    },
    {
      hash: "f8c2d37",
      date: "2018.12",
      endDate: "2019.12",
      action: "feat",
      org: "blockcrafters",
      role: "Marketing Team",
      type: "정규직",
      detail: "콘텐츠에서 마케팅으로 영역을 넓힌 시기. 블록체인 프로젝트의 브랜딩과 커뮤니티 성장 전략을 담당했습니다.",
      achievements: ["프로젝트별 마케팅 전략 수립·실행", "오프라인 밋업 및 컨퍼런스 기획·운영"],
    },
    {
      hash: "0a1b2c3",
      date: "2018.06",
      endDate: "2018.12",
      action: "init",
      org: "blockcrafters",
      role: "Contents Producer",
      type: "정규직",
      detail: "블록체인 업계 첫 발을 내딛은 곳. 기술 리서치 기반의 콘텐츠를 기획·제작하며 업계를 배워갔습니다.",
      achievements: ["블록체인 기술 분석 리포트 작성", "SNS 채널 콘텐츠 기획·운영"],
    },
    {
      hash: "d4e5f60",
      date: "2013.03",
      endDate: "2021.07",
      action: "init",
      org: "국민대학교",
      role: "경제학 학사",
      type: "학력",
      detail: "경제학이 가르쳐 준 '인센티브 구조'와 '시장 메커니즘'은 토큰 이코노미와 DeFi를 이해하는 데 가장 강력한 렌즈가 되었습니다.",
      achievements: ["미시·거시경제학 기반의 시장 분석 역량", "경제학적 사고 → 토큰 이코노미 설계 분석에 활용"],
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
    description: "'좋은 책을 쓰는 건 왜 이렇게 오래 걸릴까?' 이 질문에서 출발했습니다. 여러 AI 에이전트가 조사·구성·집필을 분담하고, 사람은 방향만 잡으면 되는 플랫폼을 만들었습니다.",
    tags: ["Next.js", "Claude API", "Multi-Agent", "Prisma"],
    github: "https://github.com/sumsun-dev/ai-book",
    live: "https://ai-book-delta-navy.vercel.app",
    thumbnail: "/projects/ai-book.png",
    category: "ai",
    role: "풀스택 개발",
    period: "2025.12 ~ 2026.01",
    impact: "집필 시간을 수개월 → 수일로 단축하는 멀티 에이전트 워크플로우",
    highlights: ["Claude API 멀티 에이전트 파이프라인 (리서처 → 아웃라이너 → 작가)", "실시간 집필 진행 상황 SSE 스트리밍", "Prisma + PostgreSQL로 프로젝트·챕터 관리"],
  },
  {
    title: "AI Chef",
    description: "냉장고를 열면 재료는 있는데 뭘 해먹을지 모르겠는 경험, 누구나 있잖아요. 냉장고 사진 한 장이면 AI가 재료를 인식하고 맞춤 레시피를 추천해 줍니다.",
    tags: ["Flutter", "Next.js", "Gemini", "Supabase"],
    github: "https://github.com/sumsun-dev/ai-chef",
    thumbnail: "/projects/ai-chef.png",
    category: "ai",
    role: "풀스택 개발",
    period: "2025.10 ~ 2025.11",
    impact: "Flutter 2주 학습 후 6주 만에 크로스플랫폼 앱 출시",
    highlights: ["Gemini Vision API로 식재료 이미지 인식", "Flutter 크로스플랫폼 앱 (iOS/Android)", "Supabase Auth + Row Level Security"],
  },
  {
    title: "Talk With Legends",
    description: "'스티브 잡스에게 내 사업 아이디어를 물어볼 수 있다면?' 위인들의 저서와 인터뷰를 RAG로 학습시켜, 그들의 관점으로 대화할 수 있는 AI 챗봇입니다.",
    tags: ["Next.js", "Claude API", "RAG", "pgvector"],
    github: "https://github.com/sumsun-dev/talk-with",
    thumbnail: "/projects/talk-with.png",
    category: "ai",
    role: "풀스택 개발",
    period: "2025.08 ~ 진행중",
    impact: "페르소나별 RAG 파이프라인으로 인물의 사고방식을 재현",
    highlights: ["pgvector 기반 시맨틱 검색으로 맥락 정확도 향상", "페르소나별 응답 톤·어휘 커스터마이징", "Claude API 스트리밍 + 대화 히스토리 관리"],
  },
  {
    title: "The Ticker is ETH",
    description: "한국에서 이더리움 소식을 따라가기가 어렵다는 걸 느끼고, 직접 뉴스레터와 커뮤니티를 만들었습니다. 영어권 리서치를 번역·큐레이션하여 매주 발행합니다.",
    tags: ["Next.js", "TypeScript", "Ethereum"],
    github: "https://github.com/sumsun-dev/The-Ticker-is-ETH",
    live: "https://the-ticker-is-eth-pi.vercel.app",
    thumbnail: "/projects/the-ticker-is-eth.png",
    category: "web3",
    role: "프론트엔드 개발",
    period: "2024.11 ~ 진행중",
    impact: "구독자 500+ 이더리움 한국어 콘텐츠 허브",
    highlights: ["뉴스레터 아카이브 및 자동 발행 시스템", "텔레그램 커뮤니티 연동 (실시간 알림)"],
  },
];

export const CATEGORIES = ["전체", "생각", "기술", "활동", "기타"] as const;

export const NAV_LINKS = [
  { label: "about", href: "#about" },
  { label: "projects", href: "#projects" },
  { label: "career", href: "#career" },
  { label: "skills", href: "#skills" },
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
    { time: "07:00", activity: "기상 & 숨숨이 산책", icon: "🌅", detail: "하루를 여는 30분. 숨숨이와 동네 한 바퀴 돌며 머리를 깨웁니다." },
    { time: "09:00", activity: "업무 시작", icon: "💻", detail: "커피 한 잔과 함께 Slack 확인 → Dune 쿼리 → 분석 리포트 작성." },
    { time: "12:30", activity: "점심 & 커피", icon: "☕", detail: "직접 내린 핸드드립으로 오후를 준비합니다." },
    { time: "18:00", activity: "저녁 러닝", icon: "🏃", detail: "한강 5km 코스. 달리면서 하루를 정리하는 시간입니다." },
    { time: "21:00", activity: "독서 & 게임", icon: "📚", detail: "기술서적과 SF 소설을 번갈아 읽고, 가끔 스팀 인디 게임을 합니다." },
    { time: "23:00", activity: "숨숨이와 저녁 산책", icon: "🐕", detail: "하루를 마무리하는 조용한 산책. 내일 할 일을 머릿속으로 정리합니다." },
  ] satisfies DailyRoutine[],
  quotes: [
    { icon: "💭", text: "삶이란 B(Birth)와 D(Death) 사이의 C(Choice)이다.", source: "장 폴 사르트르", note: "매 순간의 선택이 나를 만든다는 걸 기억하게 해주는 문장입니다." },
    { icon: "😊", text: "행복은 습관이다. 그것을 몸에 지니라.", source: "허버트", note: "좋은 루틴을 만드는 게 결국 좋은 삶을 만든다고 믿습니다." },
    { icon: "⏰", text: "오늘 할 수 있는 일을 내일로 미루지 마라.", source: "벤자민 프랭클린", note: "실행력이 모든 것의 시작. 일단 시작하면 반은 끝난 겁니다." },
    { icon: "🚀", text: "가장 큰 위험은 위험 없는 삶이다.", source: "스티븐 킹", note: "안전지대에서 벗어나 새로운 역할에 도전할 때마다 떠올립니다." },
    { icon: "🚴", text: "균형을 유지하려면 계속 움직여야 한다.", source: "알베르트 아인슈타인", note: "일과 삶, 기술과 사람 사이에서 균형을 찾는 건 끊임없는 노력입니다." },
  ] satisfies Quote[],
  books: [
    { title: "클린 코드", author: "로버트 C. 마틴", status: "finished", genre: "기술", rating: 5, review: "이 책을 읽고 나서 변수 이름 짓는 데 10배 더 고민하게 되었습니다. 개발자의 겸손을 가르쳐 주는 책." },
    { title: "데미안", author: "헤르만 헤세", status: "finished", genre: "소설", rating: 4, review: "새는 알에서 나오려고 투쟁한다. 커리어를 전환할 때마다 이 구절이 떠올랐습니다." },
    { title: "사피엔스", author: "유발 하라리", status: "reading", genre: "인문", review: "호모 사피엔스가 지구를 지배한 건 '이야기를 만드는 능력' 덕분이라는 통찰이 인상적입니다." },
    { title: "이더리움 백서", author: "비탈릭 부테린", status: "reading", genre: "기술", review: "기술 문서이지만, 탈중앙화 세계에 대한 20대 청년의 비전이 담긴 선언문. 읽을 때마다 새롭습니다." },
    { title: "생각, 빠르고 느리게", author: "대니얼 카너먼", status: "wishlist", genre: "심리", review: "인간의 비합리적 의사결정을 이해하면, 더 나은 UX를 설계할 수 있을 거라는 기대." },
    { title: "프로젝트 헤일메리", author: "앤디 위어", status: "wishlist", genre: "SF", review: "마션의 작가가 쓴 또 다른 생존기. SF를 좋아하는 개발자라면 필독이라고 들었습니다." },
  ] satisfies Book[],
} as const;

export const LIFE_NAV_LINKS = [
  { label: "hobbies", href: "#hobbies" },
  { label: "daily", href: "#daily" },
  { label: "philosophy", href: "#philosophy" },
  { label: "reading", href: "#reading" },
] as const;

export const CAPABILITY_CATEGORIES: { key: CapabilityCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "analysis", label: "Analysis" },
  { key: "product", label: "Product" },
  { key: "content", label: "Content" },
  { key: "ai", label: "AI" },
];

export const CAPABILITIES: Capability[] = [
  {
    icon: "📊",
    title: "온체인 데이터 분석",
    description: "블록체인 트랜잭션 데이터를 수집·시각화하여 인사이트 도출",
    tools: ["Dune Analytics", "SQL", "Python"],
    category: "analysis",
  },
  {
    icon: "🚀",
    title: "풀스택 프로덕트 빌딩",
    description: "아이디어부터 배포까지 혼자 완성하는 프로덕트 개발",
    tools: ["Next.js", "React", "Supabase", "Tailwind"],
    category: "product",
  },
  {
    icon: "✍️",
    title: "기술 콘텐츠 & 스토리텔링",
    description: "복잡한 기술을 누구나 이해할 수 있는 콘텐츠로 변환",
    tools: ["뉴스레터", "블로그", "SNS"],
    category: "content",
  },
  {
    icon: "🤖",
    title: "AI 에이전트 시스템 설계",
    description: "멀티 에이전트 파이프라인 설계 및 AI 기반 서비스 구축",
    tools: ["Claude API", "RAG", "pgvector"],
    category: "ai",
  },
  {
    icon: "📈",
    title: "성장 전략 & 그로스",
    description: "데이터 기반 성장 전략 수립 및 팀 리드",
    tools: ["대시보드", "A/B 테스트", "KPI 설계"],
    category: "analysis",
  },
  {
    icon: "📱",
    title: "크로스플랫폼 앱 개발",
    description: "모바일 + 웹 크로스플랫폼 서비스 구현",
    tools: ["Flutter", "React Native"],
    category: "product",
  },
];

export const SKILL_CATEGORIES: { key: SkillCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "language", label: "Languages" },
  { key: "framework", label: "Frameworks" },
  { key: "tool", label: "Tools" },
  { key: "blockchain", label: "Blockchain" },
];

export const SKILLS: Skill[] = [
  { name: "TypeScript", level: 85, category: "language", desc: "모든 프로젝트의 기본 언어" },
  { name: "Python", level: 75, category: "language", desc: "데이터 분석 & 스크립팅" },
  { name: "JavaScript", level: 90, category: "language", desc: "프론트엔드 & Node.js 풀스택" },
  { name: "SQL", level: 70, category: "language", desc: "Dune Analytics 온체인 쿼리" },
  { name: "Next.js", level: 85, category: "framework", desc: "App Router 기반 풀스택 개발" },
  { name: "React", level: 85, category: "framework", desc: "컴포넌트 설계 & 상태 관리" },
  { name: "Flutter", level: 60, category: "framework", desc: "2주 학습 → AI Chef 앱 출시" },
  { name: "Tailwind CSS", level: 90, category: "framework", desc: "빠른 프로토타이핑의 핵심" },
  { name: "Claude API", level: 85, category: "tool", desc: "멀티 에이전트 시스템 설계" },
  { name: "Supabase", level: 80, category: "tool", desc: "Auth · DB · RLS 통합 백엔드" },
  { name: "Git", level: 85, category: "tool", desc: "브랜치 전략 & CI/CD 파이프라인" },
  { name: "Docker", level: 60, category: "tool", desc: "개발 환경 컨테이너화" },
  { name: "Ethereum", level: 80, category: "blockchain", desc: "생태계 분석 & 커뮤니티 운영" },
  { name: "Solidity", level: 55, category: "blockchain", desc: "스마트 컨트랙트 분석 수준" },
  { name: "DeFi", level: 85, category: "blockchain", desc: "프로토콜 메커니즘 & 리스크 분석" },
  { name: "On-chain Analysis", level: 80, category: "blockchain", desc: "Dune 대시보드 직접 구축" },
];

export const MOCK_POSTS: MockPost[] = [
  { date: "2026-02-15", category: "기술", title: "AI 시대의 개발자 역할 변화", slug: "#" },
  { date: "2026-02-10", category: "생각", title: "Web3와 탈중앙화의 미래", slug: "#" },
  { date: "2026-01-28", category: "활동", title: "DeSpread 팀과 함께한 1년", slug: "#" },
];
