import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import theme from "@/theme";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import NavigationDrawer from "@/components/modalAndDrawer/NavigationDrawer";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <NavigationDrawer />
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ChakraProvider>
    </Provider>
  );
}
