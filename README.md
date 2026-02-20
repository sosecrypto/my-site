# Terminal Odyssey

> AI Vibe Coder & Web3 Native — 엄상현의 개인 사이트

터미널 인터페이스와 스크롤 스토리텔링을 결합한 인터랙티브 포트폴리오 사이트.
두 가지 뷰 모드(Normal / CLI)를 전환하며 프로필, 커리어, 블로그를 탐색할 수 있습니다.

## Tech Stack

| Category | Stack |
|----------|-------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion, GSAP, Lenis |
| Effects | tsParticles, Glitch Text, Matrix Rain |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Markdown | react-markdown, rehype-highlight, remark-gfm |
| Font | Pretendard (KR), JetBrains Mono (EN) |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # 관리자 패널 (블로그 CRUD)
│   ├── blog/             # 블로그 목록 + 상세
│   ├── layout.tsx        # 루트 레이아웃
│   └── page.tsx          # 홈페이지
├── components/
│   ├── admin/            # 관리자 전용 컴포넌트
│   ├── blog/             # 블로그 카드, 필터, 본문
│   ├── effects/          # MatrixRain, GlitchText, ModeTransition
│   ├── home/             # Hero, About, Career, Projects, Contact
│   ├── layout/           # Navbar, Footer, ThemeToggle, CustomCursor
│   ├── terminal/         # BootSequence, InteractiveShell, TypeWriter
│   └── ui/               # Badge, Button, GlowCard
├── contexts/             # ViewMode Context (Normal/CLI 전환)
├── hooks/                # useTerminal, useTypeWriter, useScrollReveal 등
├── lib/
│   ├── constants.ts      # 프로필 데이터, 카테고리, 네비게이션
│   ├── utils.ts          # cn, formatDate, truncate
│   ├── terminal-commands.ts  # CLI 명령어 정의
│   └── supabase/         # Supabase 클라이언트/서버/쿼리
└── types/                # TypeScript 타입 정의
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Environment Variables

`.env.example`을 `.env.local`로 복사하고 값을 채웁니다:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 익명 키 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 서비스 역할 키 (관리자 전용) |

> Supabase 없이도 홈페이지(포트폴리오)는 정상 동작합니다. 블로그/관리자 기능만 비활성화됩니다.

### Run

```bash
npm install
npm run dev        # http://localhost:3000
```

### Build & Lint

```bash
npm run build      # 프로덕션 빌드
npm run lint       # ESLint 검사
npm run test       # Vitest 실행
```

## Features

- [x] 듀얼 뷰 모드 (Normal 스크롤 / CLI 터미널)
- [x] 터미널 부트 시퀀스 + 인터랙티브 셸
- [x] Matrix Rain 파티클 배경 (라이트/다크 대응)
- [x] 글리치 텍스트 + CRT 오버레이 효과
- [x] 스크롤 기반 섹션 리빌 애니메이션
- [x] 커스텀 커서
- [x] 다크/라이트 테마 토글
- [x] 프로젝트 포트폴리오 카드 섹션 (스크린샷 + GitHub/Live 링크)
- [x] 반응형 디자인
- [x] 블로그 시스템 (Supabase + Markdown)
- [x] 관리자 패널 (게시물 CRUD)
- [x] SEO 메타데이터, OG 태그, sitemap, robots.txt

## Contact

- GitHub: [sumsun-dev](https://github.com/sumsun-dev)
- Telegram: [@crypto_offroad](https://t.me/crypto_offroad)
- Email: shmksumsun@gmail.com
