"use client";
import { Navbar, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ModalLogin from "../../sign/ModalLogin";
import NavAuth from "./NavAuth";
import NavLinksDesktop from "./NavLinksDesktop";
import NavLogo from "./NavLogo";
import NavMenuMobile from "./NavMenuMobile";
import NavUserAvatar from "./NavUserAvatar";
import { Session } from "../types_nav";

interface NavBarProps {
  session: Session | null;
}

const NavBar: React.FC<NavBarProps> = ({ session }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log("Que session: ", session);
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
};

export default NavBar;
