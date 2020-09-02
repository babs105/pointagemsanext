import React, { useEffect, useState } from "react";
import Router from "next/router";
import { getCookie, setCookie, delCookies } from "../../src/utils/Cookie";
import Header from "./Header";

export default function Layout({ children }) {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeComplete", routeChangeHandler);
    console.log("dans layout");
  }, []);

  const routeChangeHandler = (url) => {
    let cookie = getCookie("APPPTNMSA_COOKIE");
    if (cookie === "" && url !== "/") {
      Router.push("/");
    }
    console.log("COOOKKIIE", cookie);
    console.log(url);
    console.log("change route");

    if (url === "/") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  };
  return (
    <React.Fragment>
      {showHeader ? <Header /> : null}
      {children}
    </React.Fragment>
  );
}
