import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getToken({ req });
  const token = session?.access;
  console.log("------------------1-------TOKEN ACTUAL :", token);

  if (!token) {
    console.log("Token not found, redirecting to home.");
    return NextResponse.redirect(new URL("/", req.url));
  }
}
export const config = { matcher: ["/profile", "/dashboard"] };
