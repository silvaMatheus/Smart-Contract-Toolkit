import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/utils";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");
  const pathname = request.nextUrl.pathname;

  if (pathname === "/auth" && token) {
    console.log('pathname === "/auth" && token');
    console.log(`token ${token}`);

    return NextResponse.redirect(new URL(getUrl("/app")));
  }

  if (pathname.includes("/app") && !token) {
    console.log(pathname.includes("/app") && !token);
    console.log(pathname);

    return NextResponse.redirect(new URL(getUrl("/auth")));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
