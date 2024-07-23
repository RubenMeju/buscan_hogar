"use client";
import { ToastError } from "@/app/toast/ToastError";
import { ToastSuccess } from "@/app/toast/ToastSuccess";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalContent,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { postAddPet } from "../actionsCrudPets";

interface errorPet {
  image_files: Imagefiles;
  name: string[];
  breed: string[];
  age: string[];
  gender: string[];
  size: string[];
  description: string[];
}

interface Imagefiles {
  "0": string[];
}

export default function FormAddPet(shelterID) {
  console.log("FormAddPet esta ellegando el shelterid", shelterID.id);
  const router = useRouter();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [listError, setListError] = useState<errorPet | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await postAddPet(formData);
    // console.log(result);
    if (!result.success) {
      setListError(result.error);
      ToastError("La mascota no se ha podido añadir!!!");
    } else {
      console.log("success");
      setListError(null); // Clear the listError
      onClose();
      ToastSuccess("Mascota añadida!");
      router.push("/dashboard");
    }
  };

  console.log(listError);

  return (
    <>
      <Button onClick={onOpen} color="success" variant="flat">
        Añadir mascota
      </Button>

      <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div className="p-8">
              <h1 className="font-bold pt-4 pb-4">Añadir nueva mascota</h1>
              <span>{listError && "Revise los campos en rojo"}</span>
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <input type="hidden" value={shelterID.id} />
                <Input
                  name="name"
                  isInvalid={!!listError?.name}
                  placeholder="Nombre de la mascota"
                />

                <Input
                  name="breed"
                  isInvalid={!!listError?.breed}
                  placeholder="Raza"
                />
                <Input
                  name="age"
                  isInvalid={!!listError?.age}
                  placeholder="Edad"
                />

                <Input
                  name="description"
                  isInvalid={!!listError?.description}
                  placeholder="Descripción de la mascota"
                />

                <RadioGroup
                  name="species"
                  label="Seleccione la especie"
                  color="warning"
                  orientation="horizontal"
                  isInvalid={!!listError?.species}
                >
                  <Radio value="Dog">Perro</Radio>
                  <Radio value="Cat">Gato</Radio>
                </RadioGroup>

                <RadioGroup
                  name="gender"
                  label="Seleccione el genero"
                  color="warning"
                  orientation="horizontal"
                  isInvalid={!!listError?.gender}
                >
                  <Radio value="Male">Macho</Radio>
                  <Radio value="Female">Hembra</Radio>
                </RadioGroup>
                <RadioGroup
                  name="size"
                  label="Seleccione el tamaño"
                  color="warning"
                  orientation="horizontal"
                  isInvalid={!!listError?.size}
                >
                  <Radio value="Small">Pequeño</Radio>
                  <Radio value="Medium">Mediano</Radio>
                  <Radio value="Large">Grande</Radio>
                </RadioGroup>

                <div className="flex gap-2">
                  <Checkbox name="vaccinated">Vacunado</Checkbox>
                  <Checkbox name="neutered">Castrado</Checkbox>
                  <Checkbox name="microchip">Microchip</Checkbox>
                </div>

                <input type="file" name="image" accept="image/*" />

                <Button color="primary" type="submit">
                  Añadir
                </Button>
              </form>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
