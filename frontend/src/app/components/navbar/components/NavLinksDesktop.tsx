import { Link, NavbarContent, NavbarItem } from "@nextui-org/react";

export default function NavLinksDesktop() {
  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground" href="#">
          Inicio
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link href="#" aria-current="page">
          Refugios
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">
          Apadrinar
        </Link>
      </NavbarItem>
    </NavbarContent>
  );
}
