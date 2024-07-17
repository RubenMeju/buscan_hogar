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
import { signIn } from "next-auth/react";
import { useState } from "react";

interface LoginFormProps {
  onClose: () => void;
  setIsLogin: (isLogin: boolean) => void;
}

interface ErrorList {
  email?: string;
  password?: string;
  [key: string]: string | undefined;
}

export default function LoginForm({ onClose, setIsLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [listError, setListError] = useState<ErrorList>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) {
        console.log("Success");
        onClose();
      } else {
        console.log("Error", JSON.parse(res?.error));
        setListError(JSON.parse(res?.error || "{}"));
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Iniciar sesión</ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <Input
            autoFocus
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            isRequired
            label="Email"
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
            placeholder="Ingrese su password"
            type="password"
            autoComplete="false"
            variant="bordered"
            value={password}
            isInvalid={!!listError?.password}
            errorMessage={listError?.password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <span>¿Aún no tienes una cuenta? </span>
            <Link className="cursor-pointer" onClick={() => setIsLogin(false)}>
              Crear cuenta
            </Link>
          </div>
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              classNames={{
                label: "text-small",
              }}
            >
              Recordarme
            </Checkbox>
            <Link color="primary" href="#" size="sm">
              ¿Has olvidado tú password?
            </Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Cerrar
          </Button>
          <Button color="primary" type="submit">
            Iniciar sesión
          </Button>
        </ModalFooter>
      </form>
    </>
  );
}
