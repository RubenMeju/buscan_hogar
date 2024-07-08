import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Ingrese su email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/jwt/create/`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        //   console.log('user: ', user)
        if (!res.ok) {
          // console.log('res no ok', user)
          throw new Error(user.detail);
        }

        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/users/me/`,
          {
            headers: { Authorization: `JWT ${user.access}` },
          }
        );

        if (!userRes.ok) {
          throw new Error(`Error on /auth/users/me/: ${userRes.statusText}`);
        }

        const userData = await userRes.json();
        console.log("------USERDATA------: ", userData);
        // If no error and we have user data, return it
        if (res.ok && user) {
          user.id = userData.id;
          user.name = userData.username;
          user.email = credentials.email;
          user.image = userData.picture;
          user.role = userData.role;

          return user;
        }
        //  //console.log('Soy el user: ', user)
        return null;
      },
    }),
  ],
};
