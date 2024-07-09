"use client";
import React from "react";
import { Navbar, useDisclosure } from "@nextui-org/react";
import ModalLogin from "../sign/ModalLogin";
import NavLogo from "./components/NavLogo";
import NavLinksDesktop from "./components/NavLinksDesktop";
import NavAuth from "./components/NavAuth";
import NavMenuMobile from "./components/NavMenuMobile";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavLogo isMenuOpen={isMenuOpen} />

        <NavLinksDesktop />

        <NavAuth onOpen={onOpen} />

        <NavMenuMobile />
      </Navbar>

      <ModalLogin isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
