import type { Post } from "@/types";

// Phase 4: Supabase 쿼리 — 환경변수 연결 전까지 mock 데이터 반환
const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "AI 시대의 개발자 역할 변화",
    slug: "ai-developer-roles",
    content: "# AI 시대의 개발자 역할 변화\n\nAI 기술의 발전으로 개발자의 역할이 빠르게 변하고 있습니다.\n\n## Vibe Coding의 등장\n\nAI와 함께 코딩하는 새로운 방식, Vibe Coding이 주목받고 있습니다. 개발자는 더 이상 한 줄 한 줄 코드를 작성하는 것이 아니라, AI에게 의도를 전달하고 결과를 검수하는 역할로 변화하고 있습니다.\n\n## 핵심 역량의 변화\n\n- **문제 정의 능력**: 무엇을 만들어야 하는지 명확히 정의\n- **아키텍처 설계**: 시스템의 큰 그림을 그리는 능력\n- **AI 프롬프트 엔지니어링**: AI와 효과적으로 소통하는 능력\n- **코드 리뷰 & QA**: AI가 생성한 코드를 검증하는 능력\n\n## 결론\n\nAI는 개발자를 대체하는 것이 아니라, 더 높은 수준의 문제를 해결할 수 있도록 도와주는 도구입니다.",
    excerpt: "AI 기술의 발전으로 개발자의 역할이 빠르게 변하고 있습니다. Vibe Coding의 등장과 함께 새로운 핵심 역량이 요구됩니다.",
    cover_image: null,
    category: "기술",
    tags: ["AI", "개발", "Vibe Coding"],
    published: true,
    created_at: "2026-02-15T09:00:00Z",
    updated_at: "2026-02-15T09:00:00Z",
  },
  {
    id: "2",
    title: "Web3와 탈중앙화의 미래",
    slug: "web3-decentralization-future",
    content: "# Web3와 탈중앙화의 미래\n\n탈중앙화는 단순한 기술 트렌드가 아닌, 인터넷의 근본적인 패러다임 변화입니다.\n\n## 왜 탈중앙화인가\n\n중앙화된 플랫폼에 대한 의존은 검열, 데이터 독점, 단일 장애점 등의 문제를 야기합니다.\n\n## 이더리움 생태계의 성장\n\n이더리움은 스마트 컨트랙트를 통해 탈중앙화 애플리케이션(dApp)의 기반을 제공합니다.\n\n## 앞으로의 방향\n\n진정한 탈중앙화를 위해서는 기술적 발전뿐 아니라 사용자 경험의 개선이 필수적입니다.",
    excerpt: "탈중앙화는 단순한 기술 트렌드가 아닌, 인터넷의 근본적인 패러다임 변화입니다.",
    cover_image: null,
    category: "생각",
    tags: ["Web3", "Ethereum", "탈중앙화"],
    published: true,
    created_at: "2026-02-10T09:00:00Z",
    updated_at: "2026-02-10T09:00:00Z",
  },
  {
    id: "3",
    title: "DeSpread 팀과 함께한 1년",
    slug: "despread-one-year",
    content: "# DeSpread 팀과 함께한 1년\n\n2024년 3월, DeSpread에 합류한 지 벌써 1년이 지났습니다.\n\n## 성장의 시간\n\n디지털 에셋 분석이라는 새로운 영역에서 많은 것을 배웠습니다. 팀원들과 함께 성장하는 경험은 정말 소중했습니다.\n\n## 주요 성과\n\n- 디지털 에셋 분석 프레임워크 구축\n- Growth Lead로서 전략 수립 및 실행\n- 팀 리딩 경험\n\n## 앞으로의 계획\n\n앞으로도 Web3 생태계의 성장에 기여하고 싶습니다.",
    excerpt: "2024년 3월 DeSpread에 합류한 지 벌써 1년. 디지털 에셋 분석이라는 새로운 영역에서의 성장기.",
    cover_image: null,
    category: "활동",
    tags: ["DeSpread", "Web3", "회고"],
    published: true,
    created_at: "2026-01-28T09:00:00Z",
    updated_at: "2026-01-28T09:00:00Z",
  },
];

function isSupabaseConfigured(): boolean {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "placeholder_anon_key"
  );
}

export async function getPublishedPosts(category?: string): Promise<Post[]> {
  if (!isSupabaseConfigured()) {
    if (category && category !== "전체") {
      return MOCK_POSTS.filter((p) => p.category === category);
    }
    return MOCK_POSTS;
  }

  // Supabase 연동 시 활성화
  const { createClient } = await import("./server");
  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (category && category !== "전체") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_POSTS.find((p) => p.slug === slug) ?? null;
  }

  const { createClient } = await import("./server");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) return null;
  return data;
}

export async function searchPosts(query: string): Promise<Post[]> {
  if (!query.trim()) return [];

  if (!isSupabaseConfigured()) {
    const lowerQuery = query.toLowerCase();
    return MOCK_POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.content.toLowerCase().includes(lowerQuery) ||
        p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
    );
  }

  const { createClient } = await import("./server");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) throw error;
  return data ?? [];
}

export async function getRecentPosts(limit = 5): Promise<Post[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_POSTS.slice(0, limit);
  }

  const { createClient } = await import("./server");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}
