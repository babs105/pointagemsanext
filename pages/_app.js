import React, { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "../src/ui/Theme";
import { getCookie } from "../src/utils/Cookie";
import Layout from "../src/ui/Layout";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const cookie = getCookie("APPPTNMSA_COOKIE");

    if (cookie === "" || cookie === null) {
      router.push({ pathname: "/" });
    }
    //  else {
    //   router.push({ pathname: "/dashboard" });
    // }

    console.log("dans apppp");

    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Pointage MSA</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={Theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
