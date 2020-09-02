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

import { entreeService } from "../src/service/entreeService";
import { agentService } from "../src/service/agentService";

import EnhancedEntreeTable from "../src/ui/Entree/EnhancedEntreeTab";
import Entree from "../src/ui/Entree/EntreeAddForm";
import EntreeEdit from "../src/ui/Entree/EntreeEditForm";

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

const Entrees = (props) => {
  // const classes = useStyles();
  // let i = 0;
  const theme = useTheme();
  // const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [idEntree, setIdEntree] = useState("");
  const [nomAgent, setNomAgent] = useState("");
  const [datePointage, setDatePointage] = useState("");
  const [entrees, setEntrees] = useState([]);
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
  const [datePointageHelper, setDatePointageHelper] = useState("");

  useEffect(() => {
    loadEntreeList();
    getAgents();
  }, []);
  const loadEntreeList = () => {
    setLoading(true);
    entreeService.getAllPointage().then((res) => {
      setEntrees(res);
      setLoading(false);
      console.log(res);
    });
  };
  const getAgents = () => {
    agentService.getAllAgent().then((res) => {
      setAgents(res);
    });
  };
  const onChange = (event) => {
    let valid;
    switch (event.target.id) {
      case "nomAgent":
        setNomAgent(event.target.value);
        valid = /^(?! *$)[a-zA-Z.+ '-]+$/.test(event.target.value);
        if (!valid) {
          setNomAgentHelper("Entrer le Nom de AGENT");
        } else {
          setNomAgentHelper("");
        }

        break;
      case "datePointage":
        setDatePointage(event.target.value);
        valid = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/.test(
          event.target.value
        );
        if (!valid) {
          setDatePointageHelper("Format Date non Valid");
        } else {
          setDatePointageHelper("");
        }
        console.log(datePointage);
        break;
      default:
        break;
    }
  };
  const onChangeNomAgent = (event) => {
    // e.target.value
    setNomAgent(event.target.value);
  };
  const createEntree = (e) => {
    e.preventDefault();
    let pointage = {
      nomAgent: nomAgent,
      datePointage: datePointage,
      idUser: window.localStorage.getItem("idUser"),
    };
    entreeService
      .createEntree(pointage)
      .then((res) => {
        console.log("RES", res);
        if (res.message) {
          setDatePointage("");
          setNomAgent("");
          setAlert({
            open: true,
            message: "Pointage Entree reussi !",
            backgroundColor: "#4BB543",
          });
          loadEntreeList();
        } else {
          setAlert({
            open: true,
            message: "Pointage Entree Echoué! Ressayez encore !",
            backgroundColor: "#FF3232",
          });
        }
      })
      .catch(() => {
        setDatePointage("");
        setNomAgent("");
        setAlert({
          open: true,
          message: "Pointage Sortie Echoué! Ressayez encore !",
          backgroundColor: "#FF3232",
        });
      });

    // console.log("depointage",depointage);
  };
  const updateEntree = (e) => {
    e.preventDefault();

    let pointage = {
      id: idEntree,
      nomAgent: nomAgent,
      datePointage: datePointage,
      idUser: window.localStorage.getItem("idUser"),
    };
    entreeService
      .createOrUpdateEntree(pointage)
      .then((res) => {
        console.log("RES", res);
        if (res) {
          setDatePointage("");
          setNomAgent("");
          setDialogOpenEdit(false);
          setAlert({
            open: true,
            message: "Pointage Entree Modifiée!",
            backgroundColor: "#4BB543",
          });
          loadEntreeList();
        } else {
          setAlert({
            open: true,
            message: "Erreur Modification ! Ressayez encore !",
            backgroundColor: "#FF3232",
          });
        }
      })
      .catch(() => {
        setDatePointage("");
        setNomAgent("");
        setAlert({
          open: true,
          message: "Erreur Modification ! Ressayez encore !",
          backgroundColor: "#FF3232",
        });
      });
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);

    const rowData = entrees.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );
    const matches = rowData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    const newEntrees = [...entrees];
    matches.map((row, index) =>
      row.includes(true)
        ? (newEntrees[index].search = true)
        : (newEntrees[index].search = false)
    );
    setEntrees(newEntrees);
    setPage(0);
  };
  const deleteEntreeById = (id) => {
    entreeService.deleteEntreeById(id).then((res) => {
      if (res === "") {
        console.log("entree deleted");
      }
    });
  };
  const editEntree = (id) => {
    entreeService.getPointageById(id).then((res) => {
      if (res) {
        setIdEntree(res.id);
        setNomAgent(res.nomAgent);
        setDatePointage(res.datePointage);
        console.log("entree Show edit");
      }
    });
  };

  return (
    <div>
      <Typography variant="h3" align="center" color="primary">
        Les Entrées
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
                placeholder="Rechercher  ou ajouter une nouvelle entrée "
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
            <EnhancedEntreeTable
              rows={entrees}
              setRows={setEntrees}
              page={page}
              nomAgent={nomAgent}
              setNomAgent={setNomAgent}
              agents={agents}
              setPage={setPage}
              deleteEntreeById={deleteEntreeById}
              nomAgentHelper={nomAgentHelper}
              onChangeNomAgent={onChangeNomAgent}
              onChange={onChange}
              setAgents={setAgents}
              dateDepointage={datePointage}
              setDatePointage={setDatePointage}
              editEntree={editEntree}
              dialogOpenEdit={dialogOpenEdit}
              setDialogOpenEdit={setDialogOpenEdit}
              datePointageHelper={datePointageHelper}
              setDatePointageHelper={setDatePointageHelper}
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
          setDatePointage("");
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
              Ajout Pointage Entree
            </Typography>
          </Grid>
          <Grid item>
            <DialogContent>
              <Entree
                nomAgentHelper={nomAgentHelper}
                onChangeNomAgent={onChangeNomAgent}
                onChange={onChange}
                agents={agents}
                setAgents={setAgents}
                loading={loading}
                setLoading={setLoading}
                datePointage={datePointage}
                setDatePointage={setDatePointage}
                nomAgent={nomAgent}
                setNomAgent={setNomAgent}
                setDialogOpenAdd={setDialogOpenAdd}
                createEntree={createEntree}
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
          setDatePointageHelper("");
          setNomAgent("");
          setDatePointage("");
        }}
      >
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>
            <Typography
              variant="h5"
              style={{ marginTop: "2rem", marginBottom: "2em" }}
              color="primary"
            >
              Editer Pointage Entrée
            </Typography>
          </Grid>
          <Grid item>
            <DialogContent>
              <EntreeEdit
                nomAgent={nomAgent}
                setNomAgent={setNomAgent}
                agents={agents}
                nomAgentHelper={nomAgentHelper}
                onChangeNomAgent={onChangeNomAgent}
                onChange={onChange}
                setAgents={setAgents}
                datePointage={datePointage}
                setDatePointage={setDatePointage}
                editEntree={editEntree}
                dialogOpenEdit={dialogOpenEdit}
                setDialogOpenEdit={setDialogOpenEdit}
                datePointageHelper={datePointageHelper}
                setDatePointageHelper={setDatePointageHelper}
                updateEntree={updateEntree}
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
export default Entrees;
