import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { deletePetByID } from "@/app/action";
import { DeleteIcon } from "@/app/icons/DeleteIcon";
import React from "react";

export default function ConfirmDeletePet({ id }) {
  const updateUserWithId = deletePetByID.bind(null, id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="text-lg text-danger cursor-pointer active:opacity-50"
        onPress={onOpen}
      >
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div className="p-8">
              <form action={updateUserWithId}>
                <span className="font-semibold text-2xl">
                  ¿Estás completamente seguro de eliminar esta mascota?
                </span>
                <div className="flex justify-center gap-4">
                  <Button color="default" type="button" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="danger" type="submit">
                    Confirmar eliminación
                  </Button>
                </div>
              </form>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
