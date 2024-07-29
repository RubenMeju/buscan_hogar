"use client";
import { Modal, ModalContent } from "@nextui-org/react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useState } from "react";

interface ModalLoginProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ModalLogin({
  isOpen,
  onOpenChange,
}: ModalLoginProps): JSX.Element {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            {isLogin ? (
              <LoginForm onClose={onClose} setIsLogin={setIsLogin} />
            ) : (
              <SignUpForm onClose={onClose} setIsLogin={setIsLogin} />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
