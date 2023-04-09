import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("gray.100", "gray.900")(props),
      },
    }),
  },
});

export default theme;
