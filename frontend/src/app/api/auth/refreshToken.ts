const refreshToken = async (refreshToken) => {
  console.log("Refreshing access refreshToken:", refreshToken);
  try {
    const res = await fetch("http://127.0.0.1:8000/auth/jwt/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const refreshedTokens = await res.json();
    console.log("El token despues de refrescar access:", refreshedTokens);

    if (!res.ok) {
      throw refreshedTokens;
    }

    return refreshedTokens;
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }
};

export default refreshToken;
