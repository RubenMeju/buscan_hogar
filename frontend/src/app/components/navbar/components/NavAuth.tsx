import { Button, Link, NavbarContent, NavbarItem } from "@nextui-org/react";

interface NavAuthProps {
  onOpen: () => void;
}

const NavAuth: React.FC<NavAuthProps> = ({ onOpen }) => {
  return (
    <NavbarContent justify="end">
      <NavbarItem>
        <Button onClick={onOpen} color="primary" variant="flat">
          Login
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};
export default NavAuth;
