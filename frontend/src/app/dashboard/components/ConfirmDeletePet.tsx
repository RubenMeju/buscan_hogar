import React from "react";

import { Button, Modal, ModalContent } from "@nextui-org/react";
import { deletePetByID } from "../actionsCrudPets";
import { useFormStatus } from "react-dom";

export default function ConfirmDeletePet({ id, isOpen, onOpenChange }) {
  const { pending } = useFormStatus();

  console.log("llega el id: ", id);

  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <div className="p-8">
            <div>
              <span className="font-semibold text-2xl">
                ¿Estás completamente seguro de eliminar esta mascota?
              </span>
              {pending && <h1>pending</h1>}
              <h3>{id}</h3>
              <div className="flex justify-center gap-4">
                <Button color="default" type="button" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="danger"
                  onClick={async () => {
                    const updatedLikes = await deletePetByID(id);
                    onClose();
                  }}
                >
                  Confirmar eliminación
                </Button>
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
