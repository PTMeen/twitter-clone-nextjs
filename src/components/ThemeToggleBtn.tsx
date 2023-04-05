import { Button, useColorMode } from "@chakra-ui/react";

import useLightDark from "@/hooks/useLightDark";
import { BsSun, BsMoonStars } from "react-icons/bs";

function ThemeToggleBtn() {
  const { lightDark } = useLightDark();
  const { toggleColorMode } = useColorMode();

  return (
    <Button
      onClick={toggleColorMode}
      colorScheme="twitter"
      w="full"
      borderRadius="full"
      variant="outline"
      leftIcon={lightDark(<BsMoonStars />, <BsSun />)}
    >
      {lightDark("Dark theme", "Light theme")}
    </Button>
  );
}
export default ThemeToggleBtn;
