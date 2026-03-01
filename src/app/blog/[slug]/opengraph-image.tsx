import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";
export const alt = "블로그 포스트 | 엄상현";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let title = "Blog Post";
  let excerpt = "";
  let category = "";

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("posts")
      .select("title, excerpt, category")
      .eq("slug", slug)
      .single();

    if (data) {
      title = data.title;
      excerpt = data.excerpt || "";
      category = data.category || "";
    }
  } catch {
    // fallback to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0e14",
          padding: "60px",
          fontFamily: "monospace",
        }}
      >
        {/* Terminal frame */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #2d3748",
            borderRadius: "16px",
            overflow: "hidden",
            flex: 1,
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "16px 20px",
              borderBottom: "1px solid #2d3748",
              background: "rgba(26, 31, 46, 0.8)",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#eab308" }} />
              <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#22c55e" }} />
            </div>
            <span style={{ flex: 1, textAlign: "center", fontSize: "14px", color: "#94a3b8" }}>
              visitor@shmksumsun.xyz — blog
            </span>
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "40px",
              flex: 1,
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", color: "#94a3b8", fontSize: "18px" }}>
              <span style={{ color: "#22d3ee" }}>$</span>
              <span style={{ marginLeft: "8px" }}>cat blog/{slug}.md</span>
            </div>
            {category && (
              <div
                style={{
                  display: "flex",
                  fontSize: "16px",
                  color: "#22d3ee",
                  border: "1px solid rgba(34, 211, 238, 0.3)",
                  borderRadius: "6px",
                  padding: "4px 12px",
                  width: "fit-content",
                }}
              >
                {category}
              </div>
            )}
            <div style={{ fontSize: "40px", fontWeight: "bold", color: "#e2e8f0", lineHeight: 1.2 }}>
              {title.length > 50 ? title.slice(0, 50) + "..." : title}
            </div>
            {excerpt && (
              <div style={{ fontSize: "20px", color: "#94a3b8", lineHeight: 1.4 }}>
                {excerpt.length > 100 ? excerpt.slice(0, 100) + "..." : excerpt}
              </div>
            )}
            <div style={{ fontSize: "16px", color: "#4ade80", marginTop: "8px" }}>
              엄상현 | Terminal Odyssey
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
