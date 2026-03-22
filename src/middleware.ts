import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const response = NextResponse.next();

  // Security: Global security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  
  // Strict Transport Security (HSTS) - only in production
  if (process.env.NODE_ENV === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  // Protect all /admin routes
  if (path.startsWith("/admin")) {
    // allow access to login page
    if (path === "/admin/login") {
      return response;
    }

    const session = request.cookies.get("robotikai_admin");

    // Block if session is missing, empty, or uses the old insecure value
    if (!session || !session.value || session.value === "authenticated") {
      // Correctly handle the redirect for all admin paths
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
