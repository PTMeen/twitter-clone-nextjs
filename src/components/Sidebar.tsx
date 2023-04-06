import { Box, Button, Divider, VStack } from "@chakra-ui/react";

import SidebarItem from "./SidebarItem";
import { navLinks } from "@/constants/navigation";
import Logo from "./Logo";
import ThemeToggleBtn from "./ThemeToggleBtn";
import TweetBtn from "./TweetBtn";
import { useSession } from "next-auth/react";
import LogoutBtn from "./LogoutBtn";

function Sidebar() {
  const { data: session } = useSession();

  return (
    <Box px={3}>
      <Box mb={5}>
        <Logo />
      </Box>
      <VStack>
        {navLinks.map((navLink) => {
          return <SidebarItem key={navLink.href} {...navLink} />;
        })}
      </VStack>
      <Divider my={6} />
      <Box>
        <Box>
          <ThemeToggleBtn />
        </Box>
        {session && (
          <Box mt={4}>
            <LogoutBtn />
          </Box>
        )}
        <Box mt={8}>
          <TweetBtn />
        </Box>
      </Box>
    </Box>
  );
}
export default Sidebar;
