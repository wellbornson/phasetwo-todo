import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // Basic check for session cookie
    // Note: This does not verify the token, just checks existence.
    // Real verification happens on API routes or client-side fetch.
    
    const sessionCookie = request.cookies.get("better-auth.session_token");
    const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup");
    const isProtectedPage = request.nextUrl.pathname.startsWith("/tasks");

    if (isProtectedPage && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthPage && sessionCookie) {
        return NextResponse.redirect(new URL("/tasks", request.url));
    }
    
    if (request.nextUrl.pathname === "/") {
         return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/signup", "/tasks/:path*"],
};
