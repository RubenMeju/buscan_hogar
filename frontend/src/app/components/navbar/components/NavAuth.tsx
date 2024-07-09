import { Button, Link, NavbarContent, NavbarItem } from "@nextui-org/react";

interface NavAuthProps {
  onOpen: () => void;
}

const NavAuth: React.FC<NavAuthProps> = ({ onOpen }) => {
  return (
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <Link href="#">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button onClick={onOpen} color="primary" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};
export default NavAuth;
