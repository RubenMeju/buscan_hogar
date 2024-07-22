import { postAddPet } from "@/app/action";
import { Button, Checkbox, Input, Radio, RadioGroup } from "@nextui-org/react";

export default async function FormAddPet() {
  return (
    <form encType="multipart/form-data" action={postAddPet}>
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

      <input type="file" name="image" accept="image/*" />

      <Button color="primary" type="submit">
        Añadir
      </Button>
    </form>
  );
}
