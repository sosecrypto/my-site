# Terminal Odyssey — Project Guide

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 (postcss plugin)
- **Animation**: Framer Motion, GSAP, Lenis (smooth scroll)
- **Effects**: tsParticles, Glitch Text, Matrix Rain
- **Database/Auth**: Supabase (PostgreSQL + Auth)
- **Testing**: Vitest + React Testing Library + jsdom

## Project Structure

```
src/
├── app/            # Next.js App Router (pages, layouts, metadata)
├── components/     # React components (admin, blog, effects, home, layout, terminal, ui)
├── contexts/       # React Context (ViewMode: Normal/CLI, LifeWork: WORK/LIFE)
├── hooks/          # Custom hooks (useTerminal, useTypeWriter, useScrollReveal, useViewMode, useLifeWork)
├── lib/            # Utilities (utils.ts, terminal-commands.ts, constants.ts, supabase/)
├── types/          # TypeScript type definitions
└── fonts/          # Local font files (Pretendard)
```

## Key Conventions

- **Path alias**: `@/*` → `./src/*`
- **File naming**: kebab-case (e.g., `terminal-commands.ts`)
- **Component naming**: PascalCase (e.g., `MatrixRain.tsx`)
- **Proxy file**: `src/proxy.ts` (NOT middleware.ts — Next.js 16 convention)
- **Fonts**: Pretendard (Korean, local), JetBrains Mono (English, Google Fonts)
- **Theme**: dark/light via `next-themes`, CSS variables for colors
- **LIFE/WORK mode**: `data-life-mode` HTML attribute로 CSS 테마 이원화, LifeWorkContext로 상태 관리

## Commands

```bash
npm run dev         # 개발 서버 (http://localhost:3000)
npm run build       # 프로덕션 빌드
npm run lint        # ESLint 검사
npm run test        # Vitest 단위 테스트
npm run test:watch  # Vitest watch 모드
```

## Environment Variables

`.env.example` 참조. Supabase 없이도 홈페이지(포트폴리오)는 정상 동작.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | 블로그용 | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 블로그용 | Supabase 익명 키 |
| `SUPABASE_SERVICE_ROLE_KEY` | 관리자용 | Supabase 서비스 역할 키 |

## Commit Convention

```
feat|fix|refactor|docs|test|chore(scope): 한글 또는 영어 설명
```

## Testing

- Vitest + jsdom environment
- `src/**/*.test.{ts,tsx}` 패턴
- AAA pattern (Arrange, Act, Assert)
- 순수 함수 → 단위 테스트, 컴포넌트 → React Testing Library
