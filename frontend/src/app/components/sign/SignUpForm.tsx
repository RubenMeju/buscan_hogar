import { signUp } from "@/app/action";
import { LockIcon } from "@/app/icons/LockIcon";
import { MailIcon } from "@/app/icons/MailIcon";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox,
  Link,
} from "@nextui-org/react";
import { useState } from "react";

interface SignUpFormProps {
  onClose: () => void;
  setIsLogin: (isLogin: boolean) => void;
}

interface ErrorList {
  email?: string;
  password?: string;
  [key: string]: string | undefined;
}

export default function SignUpForm({ onClose, setIsLogin }: SignUpFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const [listError, setListError] = useState<ErrorList>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Crear cuenta</ModalHeader>
      <form action={signUp}>
        <ModalBody>
          <Input
            autoFocus
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            isRequired
            label="Username"
            name="username"
            placeholder="Ingrese su nombre de usuario"
            variant="bordered"
            type={"text"}
            value={username}
            isInvalid={!!listError?.username}
            errorMessage={listError?.username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            autoFocus
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            isRequired
            label="Email"
            name="email"
            placeholder="Ingrese su email"
            variant="bordered"
            type={"email"}
            value={email}
            isInvalid={!!listError?.email}
            errorMessage={listError?.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            endContent={
              <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            isRequired
            label="Password"
            name="password"
            placeholder="Ingrese su password"
            type="password"
            autoComplete="false"
            variant="bordered"
            value={password}
            isInvalid={!!listError?.password}
            errorMessage={listError?.password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            endContent={
              <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            isRequired
            label="Cofirmar Password"
            name="repassword"
            placeholder="Repita su password"
            type="password"
            autoComplete="false"
            variant="bordered"
            value={repassword}
            isInvalid={!!listError?.repassword}
            errorMessage={listError?.repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />

          <div>
            <span>¿Ya tienes una cuenta? </span>
            <Link className="cursor-pointer" onPress={() => setIsLogin(true)}>
              Iniciar sesión
            </Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Cerrar
          </Button>
          <Button color="primary" type="submit">
            Crear cuenta
          </Button>
        </ModalFooter>
      </form>
    </>
  );
}
