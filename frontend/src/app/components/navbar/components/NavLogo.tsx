import {
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from "@nextui-org/react";

interface NavLogoProps {
  isMenuOpen: boolean;
}

const NavLogo: React.FC<NavLogoProps> = ({ isMenuOpen }) => {
  return (
    <NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <Link href="/">
          <p>Adoptar</p>
          <p className="font-bold text-inherit">MASCOTAS</p>
        </Link>
      </NavbarBrand>
    </NavbarContent>
  );
};

export default NavLogo;
