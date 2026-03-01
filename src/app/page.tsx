import type { Post } from "@/types";
import HomeClient from "@/components/home/HomeClient";
import { getRecentPosts } from "@/lib/supabase/queries";

export default async function Home() {
  let recentPosts: Post[] = [];
  try {
    recentPosts = await getRecentPosts(3);
  } catch {
    // Supabase 미연결 시 빈 배열 → BlogPreview에서 MOCK_POSTS fallback
  }

  return <HomeClient recentPosts={recentPosts} />;
}
