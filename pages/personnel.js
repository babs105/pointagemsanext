import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Grid, TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { agentService } from "../src/service/agentService";

import EnhancedAgentTable from "../src/ui/Personnel/EnhancedPersonnelTab";
import AgentAdd from "../src/ui/Personnel/PersonnelAddForm";
import AgentEdit from "../src/ui/Personnel/PersonnelEditForm";

// const useStyles = makeStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.common.arcGreen,
//     fontSize: "1rem",
//     fontWeight: 700,
//   },
//   margin: {
//     margin: theme.spacing(8),
//   },
//   paper: {
//     padding: theme.spacing(1),
//   },
// }));

const Personnel = (props) => {
  // const classes = useStyles();
  // let i = 0;
  const theme = useTheme();
  // const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [idPersonnel, setIdPersonnel] = useState("");
  const [nomAgent, setNomAgent] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [agents, setAgents] = useState([]);
  const [nomAgentHelper, setNomAgentHelper] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dialogOpenAdd, setDialogOpenAdd] = useState(false);
  const [dialogOpenEdit, setDialogOpenEdit] = useState(false);
  const [serviceNameHelper, setServiceNameHelper] = useState("");

  useEffect(() => {
    getAgents();
  }, []);

  const getAgents = () => {
    setLoading(true);
    agentService.getAllAgent().then((res) => {
      setAgents(res);
      setLoading(false);
    });
  };

  const createAgent = (e) => {
    e.preventDefault();
    let agent = { nomAgent: nomAgent, serviceName: serviceName };
    agentService
      .createAgent(agent)
      .then((res) => {
        if (res.message) {
          setNomAgent("");
          setServiceName("");
          setAlert({
            open: true,
            message: "Ajout Agent reussi !",
            backgroundColor: "#4BB543",
          });
          getAgents();
        } else {
          setAlert({
            open: true,
            message: "Ajout Agent Echoué! Ressayez encore !",
            backgroundColor: "#FF3232",
          });
        }
      })
      .catch(() => {
        setNomAgent("");
        setServiceName("");
        setAlert({
          open: true,
          message: "Ajout Agent Echoué! Ressayez encore !",
          backgroundColor: "#FF3232",
        });
      });
    //  this.props.history.push('/users');
    // console.log("pointage",pointage);
  };

  const deleteAgentById = (id) => {
    agentService.deleteAgentById(id).then((res) => {
      if (res === "") {
        console.log("agent deleted");
      }
    });
  };
  const editAgent = (id) => {
    agentService.getAgentById(id).then((res) => {
      if (res) {
        setIdPersonnel(res.id);
        setNomAgent(res.nomAgent);
        setServiceName(res.serviceName);
        console.log("entree Show edit");
      }
    });
  };
  const updateAgent = (e) => {
    e.preventDefault();

    let agent = {
      id: idPersonnel,
      nomAgent: nomAgent,
      serviceName: serviceName,
    };
    agentService
      .createOrUpdateAgent(agent)
      .then((res) => {
        console.log("RES", res);
        if (res) {
          setServiceName("");
          setNomAgent("");
          setDialogOpenEdit(false);
          setAlert({
            open: true,
            message: "Agent Modifié!",
            backgroundColor: "#4BB543",
          });
          getAgents();
        } else {
          setAlert({
            open: true,
            message: "Erreur Modification ! Ressayez encore !",
            backgroundColor: "#FF3232",
          });
        }
      })
      .catch(() => {
        setServiceName("");
        setNomAgent("");
        setAlert({
          open: true,
          message: "Erreur Modification ! Ressayez encore !",
          backgroundColor: "#FF3232",
        });
      });
  };

  const onChange = (event) => {
    let valid;
    switch (event.target.id) {
      case "nomAgent":
        setNomAgent(event.target.value);
        valid = /^(?! *$)[a-zA-Z.+ '-]+$/.test(event.target.value);
        if (!valid) {
          setNomAgentHelper("Entrer le Nom de l'Agent");
        } else {
          setNomAgentHelper("");
        }
        break;
      case "serviceName":
        setServiceName(event.target.value);
        valid = /^(?! *$)[a-zA-Z.+ '-]+$/.test(event.target.value);
        if (!valid) {
          setServiceNameHelper("Entrer le Nom du service");
        } else {
          setServiceNameHelper("");
        }
        break;
      default:
        break;
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    const rowData = agents.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );
    const matches = rowData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    const newAgents = [...agents];
    matches.map((row, index) =>
      row.includes(true)
        ? (newAgents[index].search = true)
        : (newAgents[index].search = false)
    );
    setAgents(newAgents);
    setPage(0);
  };

  return (
    <div>
      <Typography variant="h3" align="center" color="primary">
        Le Personnel
      </Typography>
      <Grid
        container
        justify="center"
        spacing={3}
        alignItems="center"
        style={{ marginTop: "2em" }}
      >
        <Grid item lg={10}>
          <Grid container justify="flex-start" spacing={3} alignItems="center">
            <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
              <TextField
                placeholder="Rechercher  ou ajouter un nouveau agent "
                style={{ width: matchesSM ? "15em" : "25em" }}
                value={search}
                onChange={handleSearch}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      style={{ cursor: "pointer" }}
                      position="end"
                      onClick={() => setDialogOpenAdd(true)}
                    >
                      <AddIcon color="primary" style={{ fontSize: "2rem" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container alignItems="center" justify="center" spacing={3}>
        <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
          {loading ? (
            <CircularProgress color="primary" />
          ) : (
            <EnhancedAgentTable
              rows={agents}
              setRows={setAgents}
              page={page}
              nomAgent={nomAgent}
              setNomAgent={setNomAgent}
              setPage={setPage}
              deleteAgentById={deleteAgentById}
              nomAgentHelper={nomAgentHelper}
              setNomAgentHelper={setNomAgentHelper}
              onChange={onChange}
              serviceName={serviceName}
              setServiceName={setServiceName}
              editAgent={editAgent}
              dialogOpenEdit={dialogOpenEdit}
              setDialogOpenEdit={setDialogOpenEdit}
              serviceNameHelper={serviceNameHelper}
              setServiceNameHelper={setServiceNameHelper}
            />
          )}
        </Grid>
      </Grid>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={dialogOpenAdd}
        fullScreen={matchesSM}
        style={{ marginTop: matchesSM ? "4rem" : undefined }}
        onClose={() => {
          setDialogOpenAdd(false);
          setServiceName("");
          setNomAgent("");
        }}
      >
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>
            <Typography
              variant="h5"
              style={{ marginTop: "2rem", marginBottom: "2em" }}
              color="primary"
            >
              Ajout Agent
            </Typography>
          </Grid>
          <Grid item>
            <DialogContent>
              <AgentAdd
                nomAgentHelper={nomAgentHelper}
                setNomAgentHelper={setNomAgentHelper}
                serviceNameHelper={serviceNameHelper}
                onChange={onChange}
                loading={loading}
                setLoading={setLoading}
                serviceName={serviceName}
                setServiceName={setServiceName}
                nomAgent={nomAgent}
                setNomAgent={setNomAgent}
                setDialogOpenAdd={setDialogOpenAdd}
                createAgent={createAgent}
              />
            </DialogContent>
          </Grid>
        </Grid>
      </Dialog>

      <Dialog
        fullWidth
        fullScreen={matchesSM}
        maxWidth="sm"
        style={{ marginTop: matchesSM ? "4rem" : undefined }}
        open={dialogOpenEdit}
        onClose={() => {
          setDialogOpenEdit(false);
          setServiceNameHelper("");
          setNomAgent("");
          setServiceName("");
        }}
      >
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>
            <Typography
              variant="h5"
              style={{ marginTop: "2rem", marginBottom: "2em" }}
              color="primary"
            >
              Editer Agent
            </Typography>
          </Grid>
          <Grid item>
            <DialogContent>
              <AgentEdit
                nomAgent={nomAgent}
                setNomAgent={setNomAgent}
                nomAgentHelper={nomAgentHelper}
                onChange={onChange}
                serviceName={serviceName}
                setServiceName={setServiceName}
                editAgent={editAgent}
                dialogOpenEdit={dialogOpenEdit}
                setDialogOpenEdit={setDialogOpenEdit}
                serviceNameHelper={serviceNameHelper}
                setServiceNameHelper={setServiceNameHelper}
                updateAgent={updateAgent}
              />
            </DialogContent>
          </Grid>
        </Grid>
      </Dialog>

      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
    </div>
  );
};
export default Personnel;
