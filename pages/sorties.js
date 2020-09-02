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

import { sortieService } from "../src/service/sortieService";
import { agentService } from "../src/service/agentService";

import EnhancedSortieTable from "../src/ui/Sortie/EnhancedSortieTab";
import Sortie from "../src/ui/Sortie/SortieAddForm";
import SortieEdit from "../src/ui/Sortie/SortieEditForm";

// const useStyles = makeStyles((theme) => ({

// }));
const SortieListComponent = () => {
  const theme = useTheme();
  // const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [idSortie, setIdSortie] = useState("");
  const [nomAgent, setNomAgent] = useState("");
  const [dateDepointage, setDateDepointage] = useState("");

  const [agents, setAgents] = useState([]);
  const [nomAgentHelper, setNomAgentHelper] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const [sorties, setSorties] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dialogOpenAdd, setDialogOpenAdd] = useState(false);
  const [dialogOpenEdit, setDialogOpenEdit] = useState(false);
  const [dateDepointageHelper, setDateDepointageHelper] = useState("");

  useEffect(() => {
    loadEntreeList();
    getAgents();
  }, []);
  const loadEntreeList = () => {
    setLoading(true);
    sortieService.getAllDepointage().then((res) => {
      setSorties(res);
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
      case "dateDepointage":
        setDateDepointage(event.target.value);
        valid = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/.test(
          event.target.value
        );
        if (!valid) {
          setDateDepointageHelper("Format Date non Valid");
        } else {
          setDateDepointageHelper("");
        }
        console.log(dateDepointage);
        break;
      default:
        break;
    }
  };
  const onChangeNomAgent = (event) => {
    // e.target.value
    setNomAgent(event.target.value);
  };
  const createSortie = (e) => {
    e.preventDefault();
    let depointage = {
      nomAgent: nomAgent,
      dateDepointage: dateDepointage,
      idUser: window.localStorage.getItem("idUser"),
    };
    sortieService
      .createSortie(depointage)
      .then((res) => {
        console.log("RES", res);
        if (res.message) {
          setDateDepointage("");
          setNomAgent("");

          setAlert({
            open: true,
            message: "Pointage Sortie reussi !",
            backgroundColor: "#4BB543",
          });
          loadEntreeList();
        } else {
          setAlert({
            open: true,
            message: "Pointage Sortie Echoué! Ressayez encore !",
            backgroundColor: "#FF3232",
          });
        }
      })
      .catch(() => {
        setDateDepointage("");
        setNomAgent("");
        setAlert({
          open: true,
          message: "Pointage Sortie Echoué! Ressayez encore !",
          backgroundColor: "#FF3232",
        });
      });

    // console.log("depointage",depointage);
  };
  const updateSortie = (e) => {
    e.preventDefault();

    let depointage = {
      id: idSortie,
      nomAgent: nomAgent,
      dateDepointage: dateDepointage,
      idUser: window.localStorage.getItem("idUser"),
    };
    sortieService
      .createOrUpdateSortie(depointage)
      .then((res) => {
        console.log("RES", res);
        if (res) {
          setDateDepointage("");
          setNomAgent("");
          setDialogOpenEdit(false);
          setAlert({
            open: true,
            message: "Pointage Sortie Modifiée!",
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
        setDateDepointage("");
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

    const rowData = sorties.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );
    const matches = rowData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    const newSorties = [...sorties];
    matches.map((row, index) =>
      row.includes(true)
        ? (newSorties[index].search = true)
        : (newSorties[index].search = false)
    );
    setSorties(newSorties);
    setPage(0);
  };
  const deleteSortieById = (id) => {
    sortieService.deleteSortieById(id).then((res) => {
      if (res === "") {
        console.log("sortie deleted");
      }
    });
  };
  const editSortie = (id) => {
    sortieService.getDepointageById(id).then((res) => {
      if (res) {
        setIdSortie(res.id);
        setNomAgent(res.nomAgent);
        setDateDepointage(res.dateDepointage);
        console.log("sortie Show edit");
      }
    });
  };

  return (
    <div>
      <Typography variant="h3" align="center" color="primary">
        Les Sorties
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
                placeholder="Rechercher  ou ajouter une nouvelle sortie "
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
            <EnhancedSortieTable
              rows={sorties}
              setRows={setSorties}
              page={page}
              nomAgent={nomAgent}
              agents={agents}
              setPage={setPage}
              deleteSortieById={deleteSortieById}
              nomAgentHelper={nomAgentHelper}
              onChangeNomAgent={onChangeNomAgent}
              onChange={onChange}
              dateDepointage={dateDepointage}
              editSortie={editSortie}
              dialogOpenEdit={dialogOpenEdit}
              setDialogOpenEdit={setDialogOpenEdit}
              dateDepointageHelper={dateDepointageHelper}
              setDateDepointageHelper={setDateDepointageHelper}
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
          setDateDepointage("");
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
              Ajouter Pointage Sortie
            </Typography>
          </Grid>
          <Grid item>
            <DialogContent>
              <Sortie
                nomAgentHelper={nomAgentHelper}
                onChangeNomAgent={onChangeNomAgent}
                onChange={onChange}
                agents={agents}
                setAgents={setAgents}
                loading={loading}
                setLoading={setLoading}
                dateDepointage={dateDepointage}
                setDateDepointage={setDateDepointage}
                nomAgent={nomAgent}
                setNomAgent={setNomAgent}
                setDialogOpenAdd={setDialogOpenAdd}
                createSortie={createSortie}
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
          setDateDepointageHelper("");
          setNomAgent("");
          setDateDepointage("");
        }}
      >
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>
            <Typography
              variant="h5"
              style={{ marginTop: "2rem", marginBottom: "2em" }}
              color="primary"
            >
              Editer Pointage Sortie
            </Typography>
          </Grid>
          <Grid item>
            <DialogContent>
              <SortieEdit
                nomAgent={nomAgent}
                setNomAgent={setNomAgent}
                agents={agents}
                nomAgentHelper={nomAgentHelper}
                onChangeNomAgent={onChangeNomAgent}
                onChange={onChange}
                setAgents={setAgents}
                dateDepointage={dateDepointage}
                setDateDepointage={setDateDepointage}
                editSortie={editSortie}
                dialogOpenEdit={dialogOpenEdit}
                setDialogOpenEdit={setDialogOpenEdit}
                dateDepointageHelper={dateDepointageHelper}
                setDateDepointageHelper={setDateDepointageHelper}
                updateSortie={updateSortie}
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
export default SortieListComponent;
