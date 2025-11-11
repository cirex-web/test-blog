import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(
    new URL(
      "https://fluttering-rooster-dbc.notion.site/journal-2a857280f0eb80109614de3f3f73e302"
    )
  );
  console.log(request.nextUrl.pathname);
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home/history", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: "/",
};
