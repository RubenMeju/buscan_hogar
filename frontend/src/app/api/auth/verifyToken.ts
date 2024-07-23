const verifyToken = async (token) => {
  console.log("Verifying token:", token);
  try {
    const res = await fetch("http://127.0.0.1:8000/auth/jwt/verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    if (!res.ok) {
      return false;
    }

    return true;
  } catch (error) {
    throw new Error("Algo ha salido mal");
  }
};

export default verifyToken;
