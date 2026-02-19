import { PROFILE } from "./constants";

const ASCII_LOGO = `
 ____                    _
/ ___|  __ _ _ __   __ _| |__  _   _ _   _ _ __
\\___ \\ / _\` | '_ \\ / _\` | '_ \\| | | | | | | '_ \\
 ___) | (_| | | | | (_| | | | | |_| | |_| | | | |
|____/ \\__,_|_| |_|\\__, |_| |_|\\__, |\\__,_|_| |_|
                    |___/       |___/
`;

export interface CommandOutput {
  type: "text" | "table" | "ascii" | "error" | "links";
  content: string;
  className?: string;
}

type CommandHandler = (args: string[]) => CommandOutput[];

const commands: Record<string, CommandHandler> = {
  help: () => [
    { type: "ascii", content: ASCII_LOGO, className: "text-accent-cyan" },
    { type: "text", content: "", className: "" },
    { type: "text", content: "사용 가능한 명령어:", className: "text-accent-green font-bold" },
    { type: "text", content: "", className: "" },
    { type: "text", content: "  whoami     — 프로필 정보", className: "text-text-secondary" },
    { type: "text", content: "  about      — 키워드 소개", className: "text-text-secondary" },
    { type: "text", content: "  career     — 경력 히스토리 (git log)", className: "text-text-secondary" },
    { type: "text", content: "  links      — SNS 링크", className: "text-text-secondary" },
    { type: "text", content: "  blog       — 최근 블로그 글", className: "text-text-secondary" },
    { type: "text", content: "  coffee     — ☕", className: "text-text-secondary" },
    { type: "text", content: "  neofetch   — 시스템 정보", className: "text-text-secondary" },
    { type: "text", content: "  clear      — 화면 초기화", className: "text-text-secondary" },
    { type: "text", content: "", className: "" },
    { type: "text", content: "  이스터에그를 찾아보세요 ;)", className: "text-text-secondary italic" },
  ],

  whoami: () => [
    { type: "text", content: `${PROFILE.name} (${PROFILE.nameEn})`, className: "text-accent-cyan font-bold text-lg" },
    { type: "text", content: PROFILE.title, className: "text-accent-green" },
    { type: "text", content: `📍 ${PROFILE.location}`, className: "text-text-secondary" },
    { type: "text", content: "", className: "" },
    ...PROFILE.roles.map((role) => ({
      type: "text" as const,
      content: `  → ${role}`,
      className: "text-accent-amber",
    })),
  ],

  about: () => [
    { type: "text", content: "# about.md", className: "text-accent-cyan font-bold" },
    { type: "text", content: "", className: "" },
    ...PROFILE.keywords.map((kw) => ({
      type: "text" as const,
      content: `  ${kw.icon} ${kw.title} — ${kw.desc}`,
      className: "text-text-primary",
    })),
  ],

  career: () => [
    { type: "text", content: "commit    date        action  org", className: "text-text-secondary" },
    { type: "text", content: "───────   ──────────  ──────  ─────────────────", className: "text-border" },
    ...PROFILE.career.map((entry) => ({
      type: "text" as const,
      content: `${entry.hash}  ${entry.date.padEnd(10)}  ${entry.action.padEnd(6)}  ${entry.org} · ${entry.role}`,
      className: entry.action === "feat" ? "text-accent-green" : "text-accent-amber",
    })),
  ],

  "git log": () => commands.career([]),

  links: () => [
    { type: "text", content: "📎 Links", className: "text-accent-cyan font-bold" },
    { type: "text", content: "", className: "" },
    { type: "links", content: `  GitHub    → ${PROFILE.links.github}`, className: "text-text-primary" },
    { type: "links", content: `  Telegram  → ${PROFILE.links.telegram}`, className: "text-text-primary" },
    { type: "links", content: `  LinkedIn  → ${PROFILE.links.linkedin}`, className: "text-text-primary" },
  ],

  ls: () => commands.links([]),

  blog: () => [
    { type: "text", content: "📝 최근 블로그", className: "text-accent-cyan font-bold" },
    { type: "text", content: "", className: "" },
    { type: "text", content: "  [2026-02-15] [기술] AI 시대의 개발자 역할 변화", className: "text-text-primary" },
    { type: "text", content: "  [2026-02-10] [생각] Web3와 탈중앙화의 미래", className: "text-text-primary" },
    { type: "text", content: "  [2026-01-28] [활동] DeSpread 팀과 함께한 1년", className: "text-text-primary" },
    { type: "text", content: "", className: "" },
    { type: "text", content: "  → /blog 에서 전체 글 보기", className: "text-accent-green" },
  ],

  coffee: () => [
    { type: "text", content: "☕ 커피챗 환영합니다!", className: "text-accent-amber font-bold" },
    { type: "text", content: "", className: "" },
    { type: "text", content: "  크립토, AI, 기술 이야기 뭐든 좋아합니다.", className: "text-text-primary" },
    { type: "text", content: `  Telegram: ${PROFILE.links.telegram}`, className: "text-accent-cyan" },
    { type: "text", content: `  Email: ${PROFILE.email}`, className: "text-accent-cyan" },
  ],

  sudo: () => [
    { type: "error", content: "Permission denied: 관리자 권한이 필요합니다.", className: "text-accent-rose" },
    { type: "text", content: "  (이 터미널은 읽기 전용입니다 😉)", className: "text-text-secondary" },
  ],

  matrix: () => [
    { type: "text", content: "🟢 Matrix mode activated...", className: "text-accent-green animate-pulse" },
    { type: "text", content: "  (메인 화면에서 확인하세요)", className: "text-text-secondary" },
  ],

  "rm -rf /": () => [
    { type: "error", content: "nice try, but this terminal is read-only 😏", className: "text-accent-rose" },
  ],

  "rm -rf": () => [
    { type: "error", content: "nice try, but this terminal is read-only 😏", className: "text-accent-rose" },
  ],

  exit: () => [
    { type: "text", content: "\"You can check out any time you like, but you can never leave\" 🎸", className: "text-accent-amber" },
  ],

  ping: () => [
    { type: "text", content: "PONG! 🏓 latency: 0ms (you're on localhost)", className: "text-accent-green" },
  ],

  date: () => [
    { type: "text", content: new Date().toString(), className: "text-accent-cyan" },
  ],

  neofetch: () => {
    const uptime = Math.floor(Math.random() * 365) + 1;
    return [
      { type: "ascii", content: ASCII_LOGO, className: "text-accent-cyan" },
      { type: "text", content: `  OS:      TerminalOdyssey v1.0`, className: "text-accent-green" },
      { type: "text", content: `  Host:    sanghyun.dev`, className: "text-accent-green" },
      { type: "text", content: `  Kernel:  Next.js 16.x`, className: "text-accent-green" },
      { type: "text", content: `  Uptime:  ${uptime} days`, className: "text-accent-green" },
      { type: "text", content: `  Shell:   TerminalOdyssey Shell`, className: "text-accent-green" },
      { type: "text", content: `  Theme:   Dark (Cyber Terminal)`, className: "text-accent-green" },
      { type: "text", content: `  Lang:    TypeScript, Korean`, className: "text-accent-green" },
      { type: "text", content: `  Powered: ☕ + 🤖`, className: "text-accent-amber" },
    ];
  },

  echo: (args) => [
    { type: "text", content: args.join(" "), className: "text-text-primary" },
  ],

  pwd: () => [
    { type: "text", content: "/home/visitor/sanghyun.dev", className: "text-text-primary" },
  ],
};

export function executeCommand(input: string): CommandOutput[] | "clear" {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "clear") return "clear";
  if (trimmed === "") return [];

  // rm -rf 시리즈 체크
  if (trimmed.startsWith("rm ")) {
    return commands["rm -rf /"]([]);
  }

  // sudo 시리즈 체크
  if (trimmed.startsWith("sudo")) {
    return commands.sudo([]);
  }

  // git log
  if (trimmed === "git log" || trimmed.startsWith("git log ")) {
    return commands.career([]);
  }

  const parts = trimmed.split(" ");
  const cmd = parts[0];
  const args = parts.slice(1);

  const handler = commands[cmd];
  if (handler) return handler(args);

  return [
    {
      type: "error",
      content: `command not found: ${cmd}`,
      className: "text-accent-rose",
    },
    {
      type: "text",
      content: '  "help" 를 입력하면 사용 가능한 명령어를 볼 수 있습니다.',
      className: "text-text-secondary",
    },
  ];
}
