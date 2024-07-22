import React from "react";

import { Button, Modal, ModalContent } from "@nextui-org/react";
import { deletePetByID } from "@/app/action";

export default function ConfirmDeletePet({ id, isOpen, onOpenChange }) {
  console.log("llega el id: ", id);
  const updateUserWithId = deletePetByID.bind(null, id);

  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <div className="p-8">
            <form action={updateUserWithId}>
              <span className="font-semibold text-2xl">
                ¿Estás completamente seguro de eliminar esta mascota?
              </span>
              <h3>{id}</h3>
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
  );
}
