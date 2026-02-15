
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

// 1. Specify protected routes
const protectedRoutes = ['/admin/dashboard'];

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected
    const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

    if (isProtectedRoute) {
        // 3. Decrypt the session from the cookie
        const token = req.cookies.get('admin_session')?.value;
        const session = token ? await verifyToken(token) : null;

        // 4. Redirect to /admin/login if the user is not authenticated
        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
        }
    }

    return NextResponse.next();
}

// 5. Specify routes to match
export const config = {
    matcher: ['/admin/dashboard/:path*'],
};
