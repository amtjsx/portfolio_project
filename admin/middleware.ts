import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes (except login)
  // if (request.nextUrl.pathname.startsWith("/") && !request.nextUrl.pathname.startsWith("/login")) {
  // In a real application, you would verify the JWT token here
  // For this demo, we'll let the client-side AuthGuard handle it
  // return NextResponse.next()
  //}

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
