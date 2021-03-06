import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid, TextField, Button, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    width: 350,
  },
  paper: {
    padding: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function UserAddComponent(props) {
  const classes = useStyles();

  const buttonContents = <React.Fragment>Valider</React.Fragment>;
  return (
    <div>
      <Grid container justify="center" spacing={3}>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <TextField
                style={{ width: "15rem", marginBottom: "2rem" }}
                variant="outlined"
                label="Prenom"
                name="firstName"
                id="firstName"
                error={props.firstNameHelper.length !== 0}
                helperText={props.firstNameHelper}
                value={props.firstName}
                onChange={props.onChange}
              />
            </Grid>
            <Grid item style={{ marginBottom: "2rem" }}>
              <TextField
                style={{ width: "15rem" }}
                id="username"
                variant="outlined"
                label="Login"
                name="username"
                error={props.usernameHelper.length !== 0}
                helperText={props.usernameHelper}
                value={props.username}
                onChange={props.onChange}
              />
            </Grid>
            <Grid item style={{ marginBottom: "2rem" }}>
              <TextField
                style={{ width: "15rem" }}
                type="password"
                id="password"
                variant="outlined"
                label="Mot de Passe"
                name="email"
                value={props.password}
                onChange={props.onChange}
              />
            </Grid>
            <Grid item>
              <TextField
                style={{ width: "15rem" }}
                select
                id="profil"
                label="Role"
                name="profil"
                value={props.profil}
                onChange={props.onChangeProfil}
              >
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Agent"}>Agent</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          {/* <TextField  className={classes.textField} type="text" label="Nom Agent" error={nomAgentHelper.length !== 0} helperText ={nomAgentHelper} variant="outlined" margin="normal" id="nomAgent" value={nomAgent}  onChange={onChange} fullWidth required /> */}
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item style={{ marginBottom: "2rem" }}>
              <TextField
                style={{ width: "15rem" }}
                id="lastName"
                variant="outlined"
                label="Nom"
                name="lastName"
                error={props.lastNameHelper.length !== 0}
                helperText={props.lastNameHelper}
                value={props.lastName}
                onChange={props.onChange}
              />
            </Grid>
            <Grid item style={{ marginBottom: "2rem" }}>
              <TextField
                style={{ width: "15rem" }}
                id="email"
                variant="outlined"
                label="E-mail"
                name="email"
                value={props.email}
                onChange={props.onChange}
              />
            </Grid>
            <Grid item>
              <TextField
                style={{ width: "15rem" }}
                type="password"
                id="confirmPassword"
                variant="outlined"
                label="Confirmer Mot de Passe"
                name="confirmPassword"
                value={props.confirmPassword}
                onChange={props.onChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        justify="center"
        style={{ marginTop: "3em", marginBottom: "3em" }}
      >
        <Grid item style={{ marginRight: "1rem" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => props.setDialogOpenAdd(false)}
          >
            Annuler
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={
              props.firstName.length === 0 ||
              props.lastName.length === 0 ||
              props.username.length === 0 ||
              props.email.length === 0 ||
              props.password.length === 0 ||
              props.confirmPassword.length === 0 ||
              props.profil.length === 0 ||
              props.firstNameHelper.length !== 0 ||
              props.lastNameHelper.length !== 0 ||
              props.usernameHelper.length !== 0
            }
            variant="contained"
            // className={classes.sendButton}
            fullWidth
            color="primary"
            onClick={props.createUser}
          >
            {props.loading ? (
              <CircularProgress style={{ color: "white" }} size={30} />
            ) : (
              buttonContents
            )}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserAddComponent;
