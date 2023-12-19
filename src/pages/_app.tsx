import "@/styles/global.css";

import type { AppProps } from "next/app";

import { ThemeProvider } from "@/components/theme-provider";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Web3Modal } from "@/context/Web3Modal";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          {ready && (
            <Web3Modal>
              <Component {...pageProps} />
              <Toaster />
            </Web3Modal>
          )}
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
