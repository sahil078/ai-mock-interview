import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the protected routes
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)', // Protect all routes under /dashboard
]);

// Define public routes that don't require authentication
const publicRoutes = ['/sign-in', '/sign-up', '/']; // Include your sign-in, sign-up, and root routes

export default clerkMiddleware((auth, req) => {
    // Check if the current request is for a public route
    if (publicRoutes.includes(req.nextUrl.pathname)) {
        return; // Allow access to public routes
    }

    // Check if the route is protected
    if (isProtectedRoute(req)) {
        auth().protect(); // Protect the protected route
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
