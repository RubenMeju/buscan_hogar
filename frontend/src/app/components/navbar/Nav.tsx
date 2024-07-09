"use client";
import React from "react";
import { Navbar, useDisclosure } from "@nextui-org/react";
import ModalLogin from "../sign/ModalLogin";
import NavLogo from "./components/NavLogo";
import NavLinksDesktop from "./components/NavLinksDesktop";
import NavAuth from "./components/NavAuth";
import NavMenuMobile from "./components/NavMenuMobile";
import NavUserAvatar from "./components/NavUserAvatar";

import { useSession } from "next-auth/react";

export default function App() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(session);
  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavLogo isMenuOpen={isMenuOpen} />

        <NavLinksDesktop />

        {session?.user?.access ? (
          <NavUserAvatar />
        ) : (
          <NavAuth onOpen={onOpen} />
        )}

        <NavMenuMobile />
      </Navbar>

      <ModalLogin isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
