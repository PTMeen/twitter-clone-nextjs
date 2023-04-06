import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

function LogoutBtn() {
  return (
    <Button
      w="full"
      borderRadius="full"
      variant="outline"
      rightIcon={<FiLogOut />}
      onClick={() => signOut()}
    >
      Logout
    </Button>
  );
}
export default LogoutBtn;
