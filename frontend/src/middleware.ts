import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import verifyToken from "./app/api/auth/verifyToken";
import refreshToken from "./app/api/auth/refreshToken";

export async function middleware(req) {
  const session = await getToken({ req });
  const token = session?.access;
  //console.log("------------------1-------TOKEN ACTUAL :", token);

  if (!token) {
    console.log("Token not found, redirecting to home.");
    return NextResponse.redirect(new URL("/", req.url));
  }

  const tokenVerify = await verifyToken(token);

  if (!tokenVerify) {
    // console.log('el token ha caducadooooo!')
    // Pedimos un nuevo token a la API
    const newToken = await refreshToken(session?.refresh);
    // sobreescribimos el token antiguo por el nuevo token
    session.access = newToken.access;
  }
}
export const config = { matcher: ["/profile", "/dashboard"] };
