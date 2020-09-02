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

import { userService } from "../src/service/userService";
import EnhancedUserTable from "../src/ui/User/EnhancedUserTab";
import UserAdd from "../src/ui/User/UserAddForm";
import UserEdit from "../src/ui/User/UserEditForm";
const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.arcGreen,
    fontSize: "1rem",
    fontWeight: 700,
  },
  margin: {
    margin: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(1),
  },
  container: {
    width: "70rem",
    [theme.breakpoints.down("md")]: {
      width: "40rem",
    },
  },
}));

const Users = () => {
  const classes = useStyles();

  const theme = useTheme();
  // const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [username, setUsername] = useState("");
  const [idUser, setIdUser] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profil, setProfil] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [dialogOpenAdd, setDialogOpenAdd] = useState(false);
  const [dialogOpenEdit, setDialogOpenEdit] = useState(false);
  const [usernameHelper, setUsernameHelper] = useState("");
  const [firstNameHelper, setFirstNameHelper] = useState("");
  const [lastNameHelper, setLastNameHelper] = useState("");
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  useEffect(() => {
    reloadUserList();
  }, []);

  const reloadUserList = () => {
    setLoading(true);
    userService.getAllUsers().then((res) => {
      setUsers(res);
      setLoading(false);
    });
  };

  const createUser = (e) => {
    e.preventDefault();
    let user = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      confirmPassword: confirmPassword,
      role: profil,
    };
    userService
      .register(user)
      .then((res) => {
        if (res.username) {
          setFirstName("");
          setLastName("");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setProfil("");
          setAlert({
            open: true,
            message: "Utilisateur créée avec succes !",
            backgroundColor: "#4BB543",
          });
          reloadUserList();
        } else {
          setAlert({
            open: true,
            message: "Opération Echouée! Ressayez encore !",
            backgroundColor: "#FF3232",
          });
        }
      })
      .catch(() => {
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfil("");
        setAlert({
          open: true,
          message: "Opération Echouée! Ressayez encore !",
          backgroundColor: "#FF3232",
        });
      });
  };
  const deleteUserById = (id) => {
    userService.deleteUserById(id).then((res) => {
      if (res === "") {
        console.log("user deleted");
      }
    });
  };
  const editUser = (id) => {
    userService.getUserById(id).then((res) => {
      console.log(res);
      if (res) {
        setIdUser(res.id);
        setUsername(res.username);
        setFirstName(res.firstName);
        setLastName(res.lastName);
        setPassword("");
        setProfil(res.role);
        setEmail(res.email);
        setConfirmPassword("");

        console.log("entree Show edit");
      }
    });
  };
  const updateUser = (e) => {
    e.preventDefault();

    let user = {
      id: idUser,
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      role: profil,
    };
    userService
      .createOrUpdateUser(user)
      .then((res) => {
        if (res) {
          setFirstName("");
          setLastName("");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setProfil("");
          setDialogOpenEdit(false);
          setAlert({
            open: true,
            message: "Utilisateur Modifié!",
            backgroundColor: "#4BB543",
          });
          reloadUserList();
        } else {
          setAlert({
            open: true,
            message: "Opération modifiée ! Ressayez encore !",
            backgroundColor: "#FF3232",
          });
        }
      })
      .catch(() => {
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfil("");
        setAlert({
          open: true,
          message: "Opération modifiée ! Ressayez encore !",
          backgroundColor: "#FF3232",
        });
      });
  };

  const onChange = (event) => {
    let valid;

    switch (event.target.id) {
      case "username":
        setUsername(event.target.value);
        console.log(username);
        valid = /^(?! *$)[a-zA-Z.+ '-]+$/.test(event.target.value);
        if (!valid) {
          setUsernameHelper("Entrer le Login");
        } else {
          setUsernameHelper("");
        }
        break;
      case "firstName":
        setFirstName(event.target.value);
        valid = /^(?! *$)[a-zA-Z.+ '-]+$/.test(event.target.value);
        if (!valid) {
          setFirstNameHelper("Entrer le Prenom");
        } else {
          setFirstNameHelper("");
        }
        break;
      case "lastName":
        setLastName(event.target.value);
        valid = /^(?! *$)[a-zA-Z.+ '-]+$/.test(event.target.value);
        if (!valid) {
          setLastNameHelper("Entrer le Nom");
        } else {
          setLastNameHelper("");
        }
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(event.target.value);
        break;
      default:
        break;
    }
  };
  const onChangeProfil = (event) => {
    setProfil(event.target.value);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);

    const rowData = users.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );
    const matches = rowData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    const newUsers = [...users];
    matches.map((row, index) =>
      row.includes(true)
        ? (newUsers[index].search = true)
        : (newUsers[index].search = false)
    );
    setUsers(newUsers);
    setPage(0);
  };

  return (
    <div>
      <Typography variant="h3" align="center" color="primary">
        Les Utilisateurs
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
                placeholder="Rechercher ou ajouter un nouveau utilisateur "
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
            <EnhancedUserTable
              rows={users}
              setRows={setUsers}
              page={page}
              setPage={setPage}
              deleteUserById={deleteUserById}
              editUser={editUser}
              onChange={onChange}
              dialogOpenEdit={dialogOpenEdit}
              setDialogOpenEdit={setDialogOpenEdit}
              setUsernameHelper={setUsernameHelper}
              setFirstNameHelper={setFirstNameHelper}
              setLastNameHelper={setLastNameHelper}
            />
          )}
        </Grid>
      </Grid>

      <Dialog
        fullWidth
        maxWidth="md"
        open={dialogOpenAdd}
        fullScreen={matchesSM}
        style={{ marginTop: matchesSM ? "4rem" : undefined }}
        onClose={() => {
          setDialogOpenAdd(false);
          setFirstName("");
          setLastName("");
          setUsernameHelper("");
          setFirstNameHelper("");
          setLastNameHelper("");
        }}
      >
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>
            <Typography
              variant="h5"
              style={{ marginTop: "2rem", marginBottom: "2em" }}
              color="primary"
            >
              Ajout Utilisateur
            </Typography>
          </Grid>
          <Grid item>
            <DialogContent>
              <UserAdd
                usernameHelper={usernameHelper}
                firstNameHelper={firstNameHelper}
                lastNameHelper={lastNameHelper}
                username={username}
                firstName={firstName}
                lastName={lastName}
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                profil={profil}
                onChange={onChange}
                onChangeProfil={onChangeProfil}
                loading={loading}
                setLoading={setLoading}
                setDialogOpenAdd={setDialogOpenAdd}
                createUser={createUser}
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
          setLastName("");
          setFirstName("");
        }}
      >
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>
            <Typography
              variant="h5"
              style={{ marginTop: "2rem", marginBottom: "2em" }}
              color="primary"
            >
              Editer Utilisateur
            </Typography>
          </Grid>
          <Grid item>
            <DialogContent>
              <UserEdit
                usernameHelper={usernameHelper}
                firstNameHelper={firstNameHelper}
                lastNameHelper={lastNameHelper}
                username={username}
                firstName={firstName}
                lastName={lastName}
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                profil={profil}
                onChange={onChange}
                onChangeProfil={onChangeProfil}
                loading={loading}
                setLoading={setLoading}
                dialogOpenEdit={dialogOpenEdit}
                setDialogOpenEdit={setDialogOpenEdit}
                updateUser={updateUser}
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

export default Users;
