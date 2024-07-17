"use client";

import { activationAccount } from "@/app/action";
import { Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Activation() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [uid, setUID] = useState("");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const uidParam = searchParams.get("uid");
    console.log(tokenParam);
    if (tokenParam !== null) {
      setToken(tokenParam);
    }

    if (uidParam !== null) {
      setUID(uidParam);
    }
  }, [searchParams]);

  return (
    <Button
      type="submit"
      color="primary"
      className="text-gray-100 font-semibold"
      onPress={() => activationAccount(uid, token)}
    >
      Activar cuenta
    </Button>
  );
}
