"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

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
    console.log("respuesta", respuesta);
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
  console.log("Vamos a activar la cuenta", uid);
  console.log("El token:", token);

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

export async function postAddPet(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const token = session?.user?.access;

  const rawFormData = new FormData();
  rawFormData.append("name", formData.get("name") as string);
  rawFormData.append("species", formData.get("species") as string);
  rawFormData.append("breed", formData.get("breed") as string);
  rawFormData.append("age", formData.get("age") as string);
  rawFormData.append("gender", formData.get("gender") as string);
  rawFormData.append("size", formData.get("size") as string);
  rawFormData.append("description", formData.get("description") as string);
  rawFormData.append(
    "vaccinated",
    formData.get("vaccinated") === "on" ? "true" : "false"
  );
  rawFormData.append(
    "neutered",
    formData.get("neutered") === "on" ? "true" : "false"
  );
  rawFormData.append(
    "microchipped",
    formData.get("microchip") === "on" ? "true" : "false"
  );
  rawFormData.append("status", "Available");
  rawFormData.append("shelter", "1");

  // Añade la imagen al formData
  const imageFile = formData.get("image") as File;
  if (imageFile) {
    rawFormData.append("image_files", imageFile);
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/pets/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: rawFormData,
    });

    if (res.ok) {
      // res.ok verifica si el código de estado está en el rango 200-299
      console.log("creado con éxito", res.status);
    } else {
      const errorData = await res.json(); // Obtener detalles del error desde la respuesta
      console.log("algo ha salido mal", res.status);
      console.log("respuesta: ", errorData);
      return errorData;
    }
  } catch (error) {
    console.error("hubo un error", error);
  }
}
