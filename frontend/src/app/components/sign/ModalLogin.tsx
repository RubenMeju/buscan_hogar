import { Modal, ModalContent } from "@nextui-org/react";
import LoginForm from "./LoginForm";

interface ModalLoginProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ModalLogin({
  isOpen,
  onOpenChange,
}: ModalLoginProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => <LoginForm onClose={onClose} />}
      </ModalContent>
    </Modal>
  );
}
