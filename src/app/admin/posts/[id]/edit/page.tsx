import { notFound } from "next/navigation";
import { getPostById } from "@/lib/supabase/admin-queries";
import EditPostClient from "./edit-client";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) notFound();

  return <EditPostClient post={post} />;
}
