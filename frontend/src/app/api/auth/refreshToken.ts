const refreshToken = async (refreshToken) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/auth/jwt/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const refreshedTokens = await res.json();

    if (!res.ok) {
      throw refreshedTokens;
    }

    return refreshedTokens;
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }
};

export default refreshToken;
