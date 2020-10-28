import Head from "next/head";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { createClient, Provider } from "urql";
import OpenLayout from "../components/Open/Layout/OpenLayout";
import GlobalStyles from "../styles/GlobalStyles";
import theme from "../styles/theme";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }: any) {
  const [loaded, setLoaded] = useState(false);
  const [webPlayer, setWebPlayer] = useState(false);
  useEffect(() => {
    setLoaded(true);
    return () => {
      setLoaded(false);
    };
  }, []);

  var pathName: string;
  loaded ? (pathName = window.location.pathname) : (pathName = "");

  useEffect(() => {
    let regex = /\/open\//g;
    regex.test(pathName) ? setWebPlayer(true) : setWebPlayer(false);
    return () => {
      setWebPlayer(false);
    };
  }, [pathName]);

  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>musha</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <GlobalStyles />
        {webPlayer ? (
          <OpenLayout>
            <Component {...pageProps} />
          </OpenLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
