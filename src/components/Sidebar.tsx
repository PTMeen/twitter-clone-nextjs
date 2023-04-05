import { Box, Button, Divider, VStack } from "@chakra-ui/react";

import SidebarItem from "./SidebarItem";
import { navLinks } from "@/constants/navigation";
import Logo from "./Logo";
import ThemeToggleBtn from "./ThemeToggleBtn";
import TweetBtn from "./TweetBtn";

function Sidebar() {
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
        <ThemeToggleBtn />
      </Box>
      <Box mt={4}>
        <TweetBtn />
      </Box>
    </Box>
  );
}
export default Sidebar;
