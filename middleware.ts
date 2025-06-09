import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  // Set a cookie or header to indicate auth status
  const response = NextResponse.next();
  response.headers.set("x-user-authenticated", token ? "true" : "false");
  return response;
}

// Optionally, only run on specific routes
export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
