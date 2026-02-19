import type { Post } from "@/types";

// Phase 5: 관리자 CRUD — Supabase 연결 전까지 mock
const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "AI 시대의 개발자 역할 변화",
    slug: "ai-developer-roles",
    content: "# AI 시대의 개발자 역할 변화\n\nAI 기술의 발전으로 개발자의 역할이 변하고 있습니다.",
    excerpt: "AI 기술의 발전으로 개발자의 역할이 변하고 있습니다.",
    cover_image: null,
    category: "기술",
    tags: ["AI", "개발"],
    published: true,
    created_at: "2026-02-15T09:00:00Z",
    updated_at: "2026-02-15T09:00:00Z",
  },
  {
    id: "2",
    title: "Web3와 탈중앙화의 미래",
    slug: "web3-decentralization-future",
    content: "# Web3와 탈중앙화의 미래",
    excerpt: "탈중앙화는 인터넷의 근본적인 패러다임 변화입니다.",
    cover_image: null,
    category: "생각",
    tags: ["Web3", "Ethereum"],
    published: false,
    created_at: "2026-02-10T09:00:00Z",
    updated_at: "2026-02-10T09:00:00Z",
  },
];

function isSupabaseConfigured(): boolean {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "placeholder_anon_key"
  );
}

export async function getAllPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured()) return MOCK_POSTS;

  const { createClient } = await import("./server");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getPostById(id: string): Promise<Post | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_POSTS.find((p) => p.id === id) ?? null;
  }

  const { createClient } = await import("./server");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export interface CreatePostInput {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  published: boolean;
}

export async function createPost(input: CreatePostInput): Promise<Post | null> {
  if (!isSupabaseConfigured()) return null;

  const { createClient } = await import("./server");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(
  id: string,
  input: Partial<CreatePostInput>
): Promise<Post | null> {
  if (!isSupabaseConfigured()) return null;

  const { createClient } = await import("./server");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const { createClient } = await import("./server");
  const supabase = await createClient();

  const { error } = await supabase.from("posts").delete().eq("id", id);
  return !error;
}

export async function togglePublish(
  id: string,
  published: boolean
): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const { createClient } = await import("./server");
  const supabase = await createClient();

  const { error } = await supabase
    .from("posts")
    .update({ published, updated_at: new Date().toISOString() })
    .eq("id", id);

  return !error;
}
