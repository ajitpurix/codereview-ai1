import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)",
  "/signup(.*)",
  "/pricing",
]);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();

  if (!isPublicRoute(req) && !session.userId) {
    return session.redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
