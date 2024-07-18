import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Button, Checkbox, Input, Radio, RadioGroup } from "@nextui-org/react";
import { error } from "console";
import { getServerSession } from "next-auth";

export default async function FormAddPet() {
  const session = await getServerSession(authOptions);
  console.log("aqui el token:", session.user.access);
  async function postAddPet(formData: FormData) {
    "use server";

    const rawFormData = {
      name: formData.get("name"),
      species: formData.get("species"),
      breed: formData.get("breed"),
      age: formData.get("age"),
      gender: formData.get("gender"),
      size: formData.get("size"),
      description: formData.get("description"),
      vaccinated: formData.get("vaccinated") === "on",
      neutered: formData.get("neutered") === "on",
      microchipped: formData.get("microchip") === "on",
      status: "Available",

      shelter: 1,
    };
    console.log(rawFormData);
    // mutate data

    try {
      const res = await fetch("http://127.0.0.1:8000/pets/", {
        method: "POST",
        headers: {
          Authorization: `JWT ${session?.user?.access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rawFormData),
      });

      if (res.ok) {
        // res.ok verifica si el código de estado está en el rango 200-299
        console.log("creado con éxito", res.status);
      } else {
        const errorData = await res.json(); // Obtener detalles del error desde la respuesta
        console.log("algo ha salido mal", res.status);
        console.log("respuesta: ", errorData);
      }
    } catch (error) {
      console.error("hubo un error", error);
    }
  }
  return (
    <form action={postAddPet}>
      <Input name="name" placeholder="Nombre de la mascota" />

      <RadioGroup
        name="species"
        label="Seleccione la especie"
        color="warning"
        defaultValue="Dog"
      >
        <Radio value="Dog">Perro</Radio>
        <Radio value="Cat">Gato</Radio>
      </RadioGroup>

      <Input name="breed" placeholder="Raza" />

      <Input name="gender" placeholder="Género" />
      <Input name="age" placeholder="Edad" />
      <RadioGroup name="size" label="Seleccione el tamaño" color="warning">
        <Radio value="Small">Pequeño</Radio>
        <Radio value="Medium">Mediano</Radio>
        <Radio value="Large">Grande</Radio>
      </RadioGroup>

      <Input name="description" placeholder="Descripción de la mascota" />

      <Checkbox defaultSelected>Vacunado</Checkbox>
      <Checkbox defaultSelected>Castrado</Checkbox>
      <Checkbox defaultSelected>Microchip</Checkbox>

      <Button color="primary" type="submit">
        Añadir
      </Button>
    </form>
  );
}
