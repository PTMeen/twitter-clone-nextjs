import {
  Box,
  CloseButton,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { onClose } from "@/store/features/navigationDrawerSlice";
import { navLinks } from "@/constants/navigation";
import SidebarItem from "../SidebarItem";
import Logo from "../Logo";
import ThemeToggleBtn from "../ThemeToggleBtn";
import TweetBtn from "../TweetBtn";
import LogoutBtn from "../LogoutBtn";
import { useSession } from "next-auth/react";

function NavigationDrawer() {
  const { isOpen } = useAppSelector((state) => state.navigationDrawer);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const closeDrawer = () => dispatch(onClose());

  return (
    <>
      <Drawer placement="right" onClose={closeDrawer} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <HStack justifyContent="space-between" alignItems="flex-end">
              <Logo />
              <CloseButton onClick={closeDrawer} />
            </HStack>
          </DrawerHeader>
          <DrawerBody pt={6}>
            <VStack gap={3}>
              {navLinks.map((navLink) => {
                return (
                  <SidebarItem
                    key={navLink.href}
                    {...navLink}
                    onClick={closeDrawer}
                  />
                );
              })}
            </VStack>
            <Divider my={5} />
            <Box mb={3}>
              <ThemeToggleBtn />
            </Box>
            {session && (
              <Box mb={10}>
                <LogoutBtn />
              </Box>
            )}
            <Box>
              <TweetBtn />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default NavigationDrawer;
