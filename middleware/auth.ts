import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  // Optionally verify JWT here...
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/chat/:path*"],
};
