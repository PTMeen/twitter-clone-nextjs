import { useColorMode } from "@chakra-ui/react";

const useLightDark = () => {
  const { colorMode } = useColorMode();

  const lightDark = (lightStyle: any, darkStyle: any) => {
    return colorMode === "light" ? lightStyle : darkStyle;
  };

  return { lightDark };
};
export default useLightDark;
