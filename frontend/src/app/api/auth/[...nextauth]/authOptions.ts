import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/?login=true",
  },
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
        console.log("Credentials");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/jwt/create/`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        console.log("user: ", user);
        if (!res.ok) {
          console.log("res no ok", user);
          throw new Error(JSON.stringify(user));
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
        //   console.log("------USERDATA------: ", userData);
        // If no error and we have user data, return it
        if (res.ok && user) {
          user.id = userData.id;
          user.name = userData.username;
          user.email = userData.email;
          user.image = userData.picture;
          user.role = userData.role;

          return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      /*
      if (account && account.provider === "google") {
        token.id_token = account.id_token;
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/social_auth/google/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ auth_token: token.id_token }),
            }
          );
          if (response.ok) {
            const token = await response.json();
            return token;

            // Si la autenticación fue exitosa en el servidor, retornar el token
          } else {
            // Si la autenticación falló, retornar null para evitar la creación de la sesión
            console.error("Request failed:", response.statusText);
            return null;
          }
        } catch (error) {
          console.error("Error:", error);
        }

        try {
          const response = await fetch("http://127.0.0.1:8000/auth/users/me/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "JWT " + token.id_token,
            },
          });

          if (response.ok) {
            const user = await response.json();
            if (user.is_active === true) {
              // Asignamos los tokens si están disponibles en el objeto user
              if (user && user.id_token) {
                token.access = user.id_token;
              }
              return token;
            }
          } else {
            // Si la autenticación falló, retornar null para evitar la creación de la sesión
            console.error("Request failed:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }*/

      // Asignamos los tokens si están disponibles en el objeto user
      if (user && user.access) {
        token.access = user.access;
        token.refresh = user.refresh;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, user, token }) {
      // console.log("meju token", token);

      // Agregamos los tokens a la sesión si están disponibles
      if (token && token.access) {
        session.user.id = token.sub;
        session.user.access = token.access;
        session.user.role = token.role;
      }
      if (token && token.refresh) {
        session.user.refresh = token.refresh;
      }

      // Si no hay token, borramos la sesión
      if (!token) {
        return null;
      }

      return session;
    },
  },
};
