import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.warning.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
}));

export default function AgentsPresent(props) {
  const classes = useStyles();
  const { agentPresentToday } = props;

  // const [data, setData] = useState([]);

  //   useEffect(() => {
  //             entreeService.getAgentsPresents()
  //             .then((res) => {
  //                 setData(res);
  //                 console.log("Presents",data);
  //             });

  // }, []);

  let i = 0;
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            {/* <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Pointage Entrée 
            </Typography> */}
          </Grid>
          <Grid item>
            {/* <Avatar className={classes.avatar}>
              <EqualizerIcon className={classes.icon} />
            </Avatar> */}
          </Grid>
        </Grid>

        <TableContainer className={classes.container}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">AGENT </TableCell>
                <TableCell align="center">SERVICE OU DEPARTEMENT </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agentPresentToday.map((row) => {
                return (
                  <TableRow key={(i = i + 1)} component="th" scope="row">
                    <TableCell>
                      <Typography variant="h6" style={{ color: "green" }}>
                        {row ? row.nomAgent : "Not Found"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" style={{ color: "green" }}>
                        {" "}
                        {row ? row.serviceName : "Not Found"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
