import Header from "@/components/Header";
import { Box, Button, useColorMode } from "@chakra-ui/react";

function HomePage() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Header title="Home" />
    </>
  );
}
export default HomePage;
