import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/auth";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    // Update session expiration if it exists
    await updateSession(request);

    const path = request.nextUrl.pathname;

    // Protect /admin routes
    // Protect /admin routes
    if (path.startsWith("/admin")) {
        console.log("Middleware: Processing path:", path);

        if (!path.startsWith("/admin/login")) {
            const session = request.cookies.get("session")?.value;
            console.log("Middleware: Checking session for protected path:", path);
            console.log("Middleware: Session cookie found:", !!session);

            if (!session) {
                console.log("Middleware: No session, redirecting to login");
                return NextResponse.redirect(new URL("/admin/login", request.url));
            }

            try {
                await decrypt(session);
                console.log("Middleware: Session valid");
            } catch (error) {
                console.log("Middleware: Session invalid", error);
                // Invalid token
                return NextResponse.redirect(new URL("/admin/login", request.url));
            }
        }

        return NextResponse.next();
    }

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
