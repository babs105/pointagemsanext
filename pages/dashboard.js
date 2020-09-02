import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { entreeService } from "../src/service/entreeService";
import { sortieService } from "../src/service/sortieService";
import EntreeListToday from "../src/ui/Dashbord/EntreeListToday";
import SortieListToday from "../src/ui/Dashbord/SortieListToday";
import AgentNotPointer from "../src/ui/Dashbord/AgentNotPointer";
import AgentsPresent from "../src/ui/Dashbord/AgentsPresent";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));
let intervalID;
export default function Dashboard() {
  const classes = useStyles();

  const [entreesToday, setEntreesToday] = useState([]);
  const [sortiesToday, setSortiesToday] = useState([]);
  const [agentPresentToday, setAgentPresentToday] = useState([]);
  const [agentNotPointerToday, setAgentNotPointerToday] = useState([]);

  useEffect(() => {
    intervalID = setInterval(() => {
      loadEntreeTodayList();
      loadSortieTodayList();
      loadAgentsPresent();
      loadAgentNotPointer();
      console.log("reload");
    }, 1000);
    loadEntreeTodayList();
    loadSortieTodayList();
    loadAgentsPresent();
    loadAgentNotPointer();
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const loadEntreeTodayList = () => {
    entreeService.getAllPointageToday().then((res) => {
      setEntreesToday(res);
    });
  };
  const loadSortieTodayList = () => {
    sortieService.getAllDepointageToday().then((res) => {
      setSortiesToday(res);
    });
  };

  const loadAgentsPresent = () => {
    entreeService.getAgentsPresents().then((res) => {
      setAgentPresentToday(res);
    });
  };
  const loadAgentNotPointer = () => {
    entreeService.getAllAgentNotPointToday().then((res) => {
      setAgentNotPointerToday(res);
    });
  };

  return (
    <div>
      <Grid container>
        <Grid item md={12} sm={12} xs={12}>
          <Paper>
            <Typography variant="h6" align="center" color="primary">
              {" "}
              Aujourd'hui
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
          <Typography variant="h6" align="center" style={{ color: "red" }}>
            Absents
          </Typography>
          {agentNotPointerToday ? (
            <AgentNotPointer agentNotPointerToday={agentNotPointerToday} />
          ) : null}
        </Grid>
        <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
          <Typography variant="h6" align="center" style={{ color: "green" }}>
            Présents
          </Typography>
          {agentPresentToday ? (
            <AgentsPresent agentPresentToday={agentPresentToday} />
          ) : null}
        </Grid>
        <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
          <Typography variant="h6" align="center" style={{ color: "green" }}>
            Pointage Entrée
          </Typography>
          {entreesToday ? (
            <EntreeListToday entreesToday={entreesToday} />
          ) : null}
        </Grid>
        <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
          <Typography variant="h6" align="center" style={{ color: "orange" }}>
            Pointage Sortie
          </Typography>
          {sortiesToday ? (
            <SortieListToday sortiesToday={sortiesToday} />
          ) : null}
        </Grid>
        <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
          {/* <TotalVehiculeReportLastMonth/> */}
        </Grid>
        <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
          {/* <TotalQteFuelReportLastMonth/> */}
        </Grid>
        <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
          {/* <TotalVehiculeReportCurrentMonth/> */}
        </Grid>
        <Grid item lg={3} md={3} sm={6} xl={3} xs={12}></Grid>

        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}></Grid>
        <Grid item lg={12} md={12} sm={12} xl={3} xs={12}></Grid>

        <Grid item lg={12} md={12} sm={12} xl={3} xs={12}></Grid>
        <Grid item lg={6} md={6} sm={6} xl={12} xs={12}>
          <Grid item lg={6} md={3} sm={6} xs={12}></Grid>
          <Grid item lg={6} md={3} sm={6} xs={12}></Grid>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xl={12} xs={12}>
          <Grid item lg={6} md={3} sm={6} xs={12}></Grid>
          <Grid item lg={6} md={3} sm={6} xs={12}></Grid>
        </Grid>
      </Grid>
    </div>
  );
}
