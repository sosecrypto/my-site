import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "엄상현 | Terminal Odyssey";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
              visitor@shmksumsun.xyz
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
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", color: "#94a3b8", fontSize: "20px" }}>
              <span style={{ color: "#22d3ee" }}>$</span>
              <span style={{ marginLeft: "8px" }}>whoami</span>
            </div>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#e2e8f0" }}>
              엄상현
            </div>
            <div style={{ fontSize: "28px", color: "#22d3ee" }}>
              AI Vibe Coder | Web3 Native
            </div>
            <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
              <span style={{ fontSize: "18px", color: "#4ade80" }}>
                DigitalAsset Analyst Team Lead @ DeSpread
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
