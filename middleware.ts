import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard");
  const session = req.auth;

  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // @ts-expect-error - NextAuth types don't include role by default without module augmentation
    if (session.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
