"use server";

export async function signUp(formData: FormData) {
  console.log("signUp");
  const rawFormData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    repassword: formData.get("repassword"),
  };

  try {
    const res = await fetch("http://127.0.0.1:8000/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: rawFormData.username,
        email: rawFormData.email,
        password: rawFormData.password,
        re_password: rawFormData.repassword,
      }),
    });
    const respuesta = await res.json();
    // console.log("respuesta", respuesta);
    if (!res.ok) {
      if (respuesta.email) {
        //   ToastError("El email ya existe!!!");
      }
      if (respuesta.password) {
        console.log("dentro de password");
        //   ToastError(respuesta.password[0]);
      }
      if (respuesta.non_field_errors) {
        //   ToastError(respuesta.non_field_errors[0]);
      }

      return null;
    }
    //ToastSuccess("Cuenta registrada con exito!");
    // router.push("/login");
  } catch (error) {}
}

export async function activationAccount(
  uid: string,
  token: string
): Promise<string> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/users/activation/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid,
          token: token,
        }),
      }
    );

    if (!res.ok) {
      const errorDetails = await res.json();
      console.error("Error en la activación:", errorDetails);
      return `Error en la activación: ${errorDetails.detail || res.status}`;
    }

    const data = await res.json();
    console.log("Activación OK", data);
    return "Activación exitosa";
  } catch (e) {
    console.error("Error de red:", e);
    return `Hubo un error con la solicitud de red: ${e}`;
  }
}
