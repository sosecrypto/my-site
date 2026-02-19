# 엄상현 개인 사이트 — Claude Code 작업 지침서

## 프로젝트 개요

엄상현(Sanghyun Eom)의 개인 브랜딩 사이트를 만들어주세요.
컨셉명: **"Terminal Odyssey"**
이력서 + 포트폴리오 + 블로그가 결합된 사이트입니다.

---

## 컨셉

터미널/CLI 인터페이스와 스크롤 스토리텔링을 결합한 창의적인 개인 사이트.

### 두 가지 뷰 모드

1. **기본 모드 (스크롤 스토리텔링)**: 시각적으로 풍부한 카드/타임라인/애니메이션. 각 섹션은 터미널 커맨드 헤더(`$ command`)로 시작하되, 콘텐츠는 일반 웹 UI.
2. **터미널 모드 (CLI)**: 전체 UI가 인터랙티브 터미널로 전환. 방문자가 직접 커맨드를 입력하여 같은 데이터를 CLI 출력 형태로 탐색. 네비게이션 바의 `CLI` 토글 버튼으로 전환.

### 테마

- 다크/라이트 모드 토글 지원 (별도 버튼)
- 기본값: 다크 모드
- 다크 모드: 깊은 남색/검정 배경 (#0a0e14), 시안/초록/앰버 강조
- 라이트 모드: 밝은 배경 (#f8fafc), 같은 컬러의 어두운 버전

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 14+ (App Router, TypeScript) |
| 스타일링 | Tailwind CSS |
| 폰트 | Pretendard (본문), JetBrains Mono (터미널/코드) |
| 테마 | next-themes (다크/라이트 토글) |
| 애니메이션 | framer-motion (스크롤 트리거, 타이핑, 페이드인) |
| DB | Supabase (PostgreSQL) |
| 인증 | Supabase Auth (이메일+비밀번호, 관리자 1인) |
| 이미지 저장 | Supabase Storage |
| 마크다운 렌더링 | react-markdown + rehype-highlight + remark-gfm |
| 에디터 | @uiw/react-md-editor (관리자 글 작성용) |
| 배포 | Vercel (GitHub 레포 연결) |
| 아이콘 | lucide-react |
| 언어 | 한국어 전용 |

---

## 프로필 데이터 (상수로 관리)

```typescript
// lib/constants.ts

export const PROFILE = {
  name: "엄상현",
  nameEn: "Sanghyun Eom",
  title: "AI Vibe Coder | Web3 Native",
  location: "Seoul / Incheon, South Korea",
  email: "shmksumsun@gmail.com",

  links: {
    github: "https://github.com/sosecrypto",
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
  ],

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
  ],
};
```

---

## 페이지 구조 & 라우팅

```
/ (홈 — 스크롤 스토리텔링 + 터미널 모드 토글)
├── 부팅 시퀀스 (2초, 첫 진입 시)
├── Hero 인트로 (타이핑 애니메이션)
├── #about — "$ cat about.md"
├── #career — "$ git log --oneline career.history"
├── #projects — "$ ls -la projects/"
├── #blog — "$ tail -f blog.log" (최근 3~5개 미리보기)
└── #contact — "$ bash contact.sh"

/blog — 블로그 목록 페이지
/blog/[slug] — 개별 글 상세 페이지

/admin — 관리자 전용 (인증 필요)
├── /admin/login — 로그인
├── /admin/posts — 글 목록 관리
├── /admin/posts/new — 새 글 작성
└── /admin/posts/[id]/edit — 글 수정
```

---

## 홈 페이지 상세 (기본 모드)

### 부팅 시퀀스
- 사이트 첫 접속 시 2초 부팅 애니메이션 (풀스크린 오버레이)
- 프로그레스 바 + 텍스트 라인 순차 표시:
  ```
  [████████████] Booting sanghyun.dev...
  Loading modules... done.
  Initializing profile... done.
  > run hello_world.sh
  ```
- 이후 메인 화면 페이드인

### Hero 섹션
- `$ whoami` 프롬프트 표시 후
- 이름 타이핑 애니메이션: "엄상현 (Sanghyun Eom)"
- 타이핑 완료 후 역할/SNS 링크 페이드인
- 하단에 스크롤 유도 화살표 (부유 애니메이션)
- SNS 아이콘: GitHub, Telegram, LinkedIn (클릭 시 새 탭)

### #about — `$ cat about.md`
- 터미널 커맨드 헤더 후 5개 키워드 카드 그리드
- 카드: 아이콘 + 제목 + 설명
- 스크롤 시 순차 페이드인 (transitionDelay 활용)

### #career — `$ git log --oneline career.history`
- git log 스타일 세로 타임라인
- 각 항목: 커밋 해시(앰버) + 날짜 + action 태그(feat/init) + 조직명 + 역할
- 좌측 세로 라인 + 원형 노드 (feat: 초록, init: 앰버)
- 클릭 시 상세 확장 (선택)
- 스크롤 시 순차 슬라이드인

### #projects — `$ ls -la projects/`
- 현재는 "coming soon" 플레이스홀더
- 추후 DB(projects 테이블)에서 카드형으로 표시
- 각 카드: 썸네일 + 프로젝트명 + 설명 + 태그 + 링크

### #blog — `$ tail -f blog.log`
- 최근 블로그 글 3~5개를 로그 형태로 미리보기
- `[날짜] [카테고리] 제목` 형태
- 각 라인 클릭 시 해당 글로 이동
- 하단에 "→ 전체 로그 보기 (/blog)" 링크

### #contact — `$ bash contact.sh`
- "커피챗 & 토론 모두 환영합니다." 메시지
- SNS 링크 카드 3개 (GitHub, Telegram, LinkedIn)
- 각 카드: 아이콘 + 플랫폼명 + 핸들

---

## 터미널 모드 상세

네비게이션의 `CLI` 토글 버튼 클릭 시 전체 화면이 인터랙티브 터미널로 전환.

### UI
- macOS 스타일 터미널 창 (상단 빨강/노랑/초록 닷 + 타이틀)
- 화면 중앙에 단일 터미널 창
- 진입 시 자동 boot 시퀀스 (whoami, role, location 출력)
- 이후 프롬프트 `$ ` 표시, 커서 깜빡임, 방문자 입력 대기

### 지원 커맨드

| 커맨드 | 동작 |
|--------|------|
| `help` | 사용 가능한 명령어 목록 |
| `whoami` | 이름, 역할, 위치 출력 |
| `about` | 5개 키워드 (아이콘 + 제목 + 설명) |
| `career` / `git log` | 경력 타임라인 (해시 + 날짜 + action: 내용) |
| `links` / `ls` | SNS 링크 3개 |
| `blog` | 최근 블로그 글 목록 |
| `coffee` | ☕ 이스터에그 (커피챗 환영 메시지) |
| `sudo` | 이스터에그 (Permission denied 유머) |
| `clear` | 화면 초기화 |
| 그 외 | "command not found" 메시지 |

---

## 블로그 페이지

### /blog (목록)
- 리스트형 레이아웃 (로그 스타일과 카드 스타일 혼합)
- 각 글: 제목, 요약, 작성일, 카테고리, 커버 이미지(있으면)
- 카테고리 필터 탭: 전체 / 생각 / 기술 / 활동 / 기타
- 페이지네이션
- **블로그는 터미널 모드/일반 모드 상관없이 동일한 UI** (가독성 우선)

### /blog/[slug] (상세)
- 터미널 스타일 헤더: `$ cat "글제목.md"` (장식용)
- 이후 마크다운 렌더링 (Pretendard 본문, JetBrains Mono 코드블록)
- 넓은 여백, 가독성 최적화
- 메타: 작성일, 카테고리, 태그
- 이전/다음 글 네비게이션
- 선택: giscus 댓글 (GitHub Discussions 기반)

---

## 관리자 페이지 (/admin)

### 디자인
- 터미널 컨셉 적용하지 않음. 깔끔한 대시보드 UI.
- 다크 모드 고정.

### /admin/login
- 이메일 + 비밀번호 폼
- Supabase Auth로 인증
- 로그인 후 /admin/posts로 리다이렉트

### /admin/posts
- 전체 글 목록 (공개/비공개 모두 표시)
- 검색, 카테고리 필터
- 공개/비공개 토글 스위치
- 삭제 버튼 (확인 모달)
- "새 글 작성" 버튼

### /admin/posts/new & /admin/posts/[id]/edit
- 제목 입력
- 슬러그 자동 생성 (타임스탬프 기반) + 수동 수정 가능
- 마크다운 에디터 (@uiw/react-md-editor, 미리보기 split view)
- 이미지 업로드: 드래그앤드롭 또는 파일 선택 → Supabase Storage 업로드 → 마크다운에 URL 자동 삽입
- 카테고리 선택: 드롭다운 (생각 / 기술 / 활동 / 기타)
- 태그 입력: 쉼표 구분 자유 입력
- 커버 이미지 업로드 (선택)
- 요약(excerpt) 입력 (미입력 시 본문 앞 150자 자동 추출)
- 공개/비공개 토글
- 저장 / 발행 버튼

### 인증 가드
- /admin 하위 모든 페이지는 layout.tsx에서 세션 체크
- 미인증 시 /admin/login으로 리다이렉트

---

## 데이터베이스 (Supabase)

### 테이블: posts

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT '기타',
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 슬러그 인덱스
CREATE INDEX idx_posts_slug ON posts(slug);
-- 공개 글 조회용
CREATE INDEX idx_posts_published ON posts(published, created_at DESC);
```

### 테이블: projects (선택, 추후)

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  url TEXT,
  tags TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### RLS 정책

```sql
-- posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT
  USING (published = true);

CREATE POLICY "Admin can read all posts"
  ON posts FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin can insert"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin can update"
  ON posts FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin can delete"
  ON posts FOR DELETE
  USING (auth.uid() IS NOT NULL);
```

### Storage 버킷

- `blog-images` — 블로그 글 내 이미지 (공개 읽기 / 인증 쓰기)
- `profile` — 프로필 이미지 등 (공개 읽기 / 인증 쓰기)

### Auth

- 방식: 이메일 + 비밀번호
- 관리자 1인만 Supabase 대시보드에서 수동 생성
- 회원가입 UI 없음

---

## 네비게이션 바

```
[~/sanghyun]                    [about] [career] [blog] [contact]  |  [CLI] [🌙]
```

- 좌측: `~/sanghyun` 로고 (JetBrains Mono, 시안 컬러, 클릭 시 홈)
- 우측: 섹션 링크들 + CLI 토글 + 테마 토글
- 상단 고정, 배경 blur 효과
- 터미널 모드에서는 섹션 링크 숨김 (CLI, 테마 토글만 표시)
- 모바일: 햄버거 메뉴

---

## 디자인 시스템

### 컬러 (Tailwind CSS 변수로 관리)

```
다크 모드:
  --bg-primary: #0a0e14
  --bg-secondary: #1a1f2e (또는 slate-800 계열)
  --text-primary: #e2e8f0
  --text-secondary: #94a3b8
  --accent-cyan: #22d3ee
  --accent-green: #4ade80
  --accent-amber: #f59e0b
  --accent-rose: #f43f5e
  --border: #2d3748

라이트 모드:
  --bg-primary: #f8fafc
  --bg-secondary: #ffffff
  --text-primary: #1e293b
  --text-secondary: #64748b
  --accent-cyan: #0891b2
  --accent-green: #16a34a
  --accent-amber: #d97706
  --accent-rose: #e11d48
  --border: #e2e8f0
```

### 타이포그래피

- 본문/UI: Pretendard, 16px
- 터미널/코드: JetBrains Mono, 13~14px
- Hero 제목: clamp(28px, 5vw, 52px), fontWeight 800
- 섹션 헤더: JetBrains Mono, 14px (커맨드 스타일)

### 핵심 컴포넌트

1. **TerminalWindow** — macOS 스타일 터미널 창 프레임 (3 dot + 타이틀바 + 콘텐츠)
2. **TypeWriter** — 타이핑 애니메이션 (텍스트, 속도, 트리거 props)
3. **SectionHeader** — `$ command` 스타일 섹션 헤더 (깜빡이는 커서)
4. **GlowCard** — 호버 시 은은한 글로우 효과 카드
5. **GitTimeline** — git log 스타일 세로 타임라인
6. **InteractiveShell** — 인터랙티브 커맨드 입력 터미널
7. **BootSequence** — 부팅 시퀀스 오버레이

---

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # 홈
│   ├── globals.css
│   ├── blog/
│   │   ├── page.tsx          # 블로그 목록
│   │   └── [slug]/
│   │       └── page.tsx      # 블로그 상세
│   └── admin/
│       ├── layout.tsx        # 인증 가드
│       ├── login/page.tsx
│       └── posts/
│           ├── page.tsx
│           ├── new/page.tsx
│           └── [id]/
│               └── edit/page.tsx
├── components/
│   ├── terminal/
│   │   ├── TerminalWindow.tsx
│   │   ├── TypeWriter.tsx
│   │   ├── BootSequence.tsx
│   │   └── InteractiveShell.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── AboutSection.tsx
│   │   ├── CareerTimeline.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── BlogPreview.tsx
│   │   └── ContactSection.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── SectionHeader.tsx
│   │   └── ThemeToggle.tsx
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   ├── PostContent.tsx
│   │   └── CategoryFilter.tsx
│   ├── admin/
│   │   ├── MarkdownEditor.tsx
│   │   ├── ImageUploader.tsx
│   │   └── PostForm.tsx
│   └── ui/
│       ├── GlowCard.tsx
│       ├── Button.tsx
│       └── Badge.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # createBrowserClient
│   │   ├── server.ts         # createServerClient
│   │   └── middleware.ts     # 세션 갱신용
│   ├── constants.ts          # PROFILE 데이터
│   ├── terminal-commands.ts  # 터미널 커맨드 정의
│   └── utils.ts
├── hooks/
│   ├── useTypeWriter.ts
│   ├── useScrollReveal.ts
│   └── useTerminal.ts
├── types/
│   └── index.ts              # Post, Project 타입 정의
└── middleware.ts              # Supabase Auth 미들웨어
```

---

## 환경변수 (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 반응형 브레이크포인트

| 뷰포트 | 레이아웃 |
|--------|---------|
| ~768px (모바일) | 단일 컬럼, 햄버거 메뉴, 키워드 카드 1열 |
| 768~1024px (태블릿) | 2열 그리드 |
| 1024px~ (데스크톱) | 최대 너비 800px (콘텐츠), 1000px (네비게이션) |

---

## SEO

- Next.js Metadata API로 각 페이지별 title, description, og:image
- 블로그 글별 동적 메타데이터
- sitemap.xml 자동 생성 (next-sitemap 또는 app/sitemap.ts)
- robots.txt (/admin 제외)

---

## 개발 순서

### Phase 1 — 기반 세팅
1. `npx create-next-app@latest` (App Router, TypeScript, Tailwind, ESLint)
2. 폰트 설정 (Pretendard, JetBrains Mono)
3. next-themes 설치 및 다크/라이트 토글
4. Supabase 클라이언트 설정
5. 기본 레이아웃 (Navbar, Footer)

### Phase 2 — 홈 페이지
6. BootSequence 컴포넌트
7. Hero 섹션 (TypeWriter 애니메이션)
8. SectionHeader 컴포넌트
9. AboutSection (키워드 카드 + 스크롤 애니메이션)
10. CareerTimeline (git log 스타일)
11. ProjectsSection (placeholder)
12. BlogPreview (tail -f 스타일)
13. ContactSection

### Phase 3 — 터미널 모드
14. TerminalWindow 컴포넌트
15. InteractiveShell (커맨드 파싱 + 출력)
16. CLI 토글 연동

### Phase 4 — 블로그
17. Supabase 테이블 생성 + RLS
18. /blog 목록 페이지 (SSR)
19. /blog/[slug] 상세 페이지 (마크다운 렌더링)
20. 카테고리 필터

### Phase 5 — 관리자
21. /admin/login (Supabase Auth)
22. 인증 가드 (middleware + layout)
23. /admin/posts (글 목록 관리)
24. /admin/posts/new (마크다운 에디터 + 이미지 업로드)
25. /admin/posts/[id]/edit

### Phase 6 — 완성도
26. SEO (메타데이터, sitemap)
27. 스크롤 애니메이션 정교화 (framer-motion)
28. 반응형 최적화
29. 이스터에그 (coffee, sudo 등)

---

## 참고 데모

이 프로젝트의 인터랙티브 프로토타입(React 컴포넌트)이 있습니다.
기본 모드 스크롤 스토리텔링, 터미널 모드 전환, 다크/라이트 토글, 부팅 시퀀스, 인터랙티브 터미널의 전체 UX 플로우를 데모합니다.
실제 구현 시 이 데모의 구조와 스타일을 참고하되, Next.js App Router + Tailwind CSS + 컴포넌트 분리 형태로 재구현해주세요.

---

## 참고 레퍼런스

- brittanychiang.com — 다크 미니멀 톤, 섹션 구성
- leerob.io — Next.js + Vercel 블로그 통합 구조
- terminal.sexy — 터미널 컬러 스킴
- Apple 제품 페이지 — 스크롤 스토리텔링 기법

---

## 핵심 주의사항

1. **블로그는 모드 무관하게 동일 UI**: 터미널 모드 여부와 상관없이 블로그 목록/상세는 항상 같은 가독성 높은 UI를 사용합니다.
2. **터미널 모드는 홈 페이지에서만 작동**: /blog, /admin 에서는 터미널 모드 불필요.
3. **관리자는 1인**: 회원가입 기능 없음. Supabase 대시보드에서 수동으로 계정 생성.
4. **한국어 전용**: 모든 UI 텍스트, 블로그 내용 한국어.
5. **이미지 업로드**: 블로그 에디터에서 이미지 첨부 시 Supabase Storage에 업로드하고 마크다운에 URL 삽입.
