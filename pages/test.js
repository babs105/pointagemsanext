import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Link from "../src/Link";
import { Typography } from "@material-ui/core";

export default function Logout() {
  useEffect(() => {
    // Router.events.on("routeChangeComplete", routeChangeHandler);
  }, []);

  //   const routeChangeHandler = (url) => {
  //     console.log(url);
  //     if (url === "/logout") {
  //         Router.push({pathname:'/'})

  //   };
  return (
    <React.Fragment>
      <Typography> A Bientot </Typography>
      <Button component={Link} href="/">
        Reconnectez-vous
      </Button>
    </React.Fragment>
  );
}
