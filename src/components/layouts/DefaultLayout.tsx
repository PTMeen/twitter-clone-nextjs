import {
  Box,
  Container,
  Grid,
  GridItem,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { ReactNode } from "react";
import Sidebar from "../Sidebar";
import FollowBar from "../FollowBar";
import useLightDark from "@/hooks/useLightDark";

interface Props {
  children: ReactNode;
}

function DefaultLayout({ children }: Props) {
  const { lightDark } = useLightDark();

  return (
    <Container maxW="7xl" h="100%">
      <Grid templateColumns="repeat(5, 1fr)" gap={2}>
        <GridItem py={4} colSpan={1} display={{ base: "none", md: "block" }}>
          <Sidebar />
        </GridItem>
        <GridItem
          py={4}
          colSpan={{ base: 5, md: 3 }}
          h="100vh"
          borderColor={lightDark("gray.200", "gray.700")}
          borderWidth={{ base: 0, md: 1 }}
          borderY="none"
          bgColor={lightDark("gray.50", "gray.800")}
        >
          {children}
        </GridItem>
        <GridItem py={4} colSpan={1} display={{ base: "none", md: "block" }}>
          <FollowBar />
        </GridItem>
      </Grid>
    </Container>
  );
}
export default DefaultLayout;
