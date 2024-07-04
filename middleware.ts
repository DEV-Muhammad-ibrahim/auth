import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Public paths
    const isPublicPath = ['/login', '/signup', '/verifyemail'].some(p => path.startsWith(p));
    
    // Private paths
    const isPrivatePath = ['/profile', '/createBlog', '/blogs'].some(p => path.startsWith(p));

    // Token validation
    const token = request.cookies.get('token')?.value;

    if (isPrivatePath && !token) {
        // Redirect to login if trying to access a private page without a token
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    
    if (isPublicPath && token) {
        // Redirect to home if trying to access a public page with a token
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/blogs',
        '/createBlog',
    ],
}
