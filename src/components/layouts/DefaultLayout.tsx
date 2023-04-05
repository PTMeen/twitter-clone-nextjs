import {
  Box,
  Container,
  Grid,
  GridItem,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import Sidebar from "../Sidebar";
import FollowBar from "../FollowBar";
import useLightDark from "@/hooks/useLightDark";

interface Props {
  children: ReactNode;
}

function DefaultLayout({ children }: Props) {
  const { colorMode } = useColorMode();
  const { lightDark } = useLightDark();

  return (
    <Container maxW="7xl" h="100vh">
      <Grid templateColumns="repeat(5, 1fr)">
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
