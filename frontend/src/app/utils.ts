import React from "react";
import verifyToken from "./api/auth/verifyToken";
import refreshToken from "./api/auth/refreshToken";
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function newToken(session) {
  const tokenVerify = await verifyToken(session.access);
  console.log("soy tokenVerify:", tokenVerify);
  if (!tokenVerify) {
    console.log("el token ha caducadooooo!");
    // Pedimos un nuevo token a la API
    const newToken = await refreshToken(session?.refresh);
    // sobreescribimos el token antiguo por el nuevo token
    session.access = newToken.access;
    return session.access;
  }
}
