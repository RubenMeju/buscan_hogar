import {
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
        <p>Adoptar</p>
        <p className="font-bold text-inherit">MASCOTAS</p>
      </NavbarBrand>
    </NavbarContent>
  );
};

export default NavLogo;
