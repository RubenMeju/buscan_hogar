"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { revalidatePath } from "next/cache";
import { newToken } from "../utils";

export async function postAddPet(formData: FormData) {
  const session = await getServerSession(authOptions);

  //verificamos el access y refrescamos el token si caduco
  const token = await newToken(session?.user);
  session.access = token;

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

  const imageFile = formData.get("image") as File;
  if (imageFile) {
    rawFormData.append("image_files", imageFile);
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/pets/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${session?.access}`,
      },
      body: rawFormData,
    });

    if (res.ok) {
      console.log("creado con éxito", res.status);
      revalidatePath("/dashboard");
      //redirect("/dashboard");
      return { success: true };
    } else {
      const errorData = await res.json();
      console.log("algo ha salido mal", res.status);
      console.log("respuesta: ", errorData);
      return { success: false, error: errorData || "Error desconocido" };
    }
  } catch (error) {
    console.error("hubo un error", error);
    return { success: false, error: error.toString() };
  }
}

export async function getPetsByShelter() {
  const res = await fetch("http://127.0.0.1:8000/pets/?shelter=1", {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function deletePetByID(id) {
  console.log("vamos a elimminar la mascota", id);
  const session = await getServerSession(authOptions);
  const token = session?.user?.access;

  const res = await fetch(`http://127.0.0.1:8000/pets/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return { status: 404, message: "Algo ha salido mal" };
  }

  revalidatePath("/dashboard");
}
