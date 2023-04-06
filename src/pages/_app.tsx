import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import theme from "@/theme";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import NavigationDrawer from "@/components/modalAndDrawer/NavigationDrawer";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import LoginModal from "@/components/modalAndDrawer/LoginModal";
import RegisterModal from "@/components/modalAndDrawer/RegisterModal";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <NavigationDrawer />
          <LoginModal />
          <RegisterModal />
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  );
}
