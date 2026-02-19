import { type NextRequest, NextResponse } from "next/server";
// Phase 4에서 활성화:
// import { updateSession } from "@/lib/supabase/middleware";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function middleware(request: NextRequest) {
  // Supabase 세션 갱신 — Supabase 연결 후 활성화:
  // return await updateSession(request);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
