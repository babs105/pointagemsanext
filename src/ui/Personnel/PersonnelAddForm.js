import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button } from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "20rem",
    [theme.breakpoints.down("sm")]: {
      width: "15rem",
    },
  },
  sendButton: {
    width: "20rem",
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
      width: "15rem",
    },
  },
  margin: {
    margin: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(6),
  },
}));
function AgentAddComponent(props) {
  const classes = useStyles();

  const buttonContents = <React.Fragment>Valider</React.Fragment>;
  return (
    <div>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          {/* <TextField  className={classes.textField} type="text" label="Nom Agent" error={nomAgentHelper.length !== 0} helperText ={nomAgentHelper} variant="outlined" margin="normal" id="nomAgent" value={nomAgent}  onChange={onChange} fullWidth required /> */}
          <TextField
            className={classes.textField}
            variant="outlined"
            label="Nom Agent"
            name="nomAgent"
            id="nomAgent"
            value={props.nomAgent}
            onChange={props.onChange}
            error={props.nomAgentHelper.length !== 0}
            helperText={props.nomAgentHelper}
          />
        </Grid>
        <Grid item style={{ marginTop: 50 }}>
          <TextField
            id="serviceName"
            variant="outlined"
            label="Nom Service ou Département"
            name="serviceName"
            className={classes.textField}
            value={props.serviceName}
            onChange={props.onChange}
            error={props.serviceNameHelper.length !== 0}
            helperText={props.serviceNameHelper}
          />
        </Grid>
      </Grid>

      <Grid
        container
        justify="space-between"
        style={{ marginTop: "3em", marginBottom: "3em" }}
      >
        <Grid item>
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
              props.nomAgent.length === 0 ||
              props.serviceName.length === 0 ||
              props.nomAgentHelper.length !== 0 ||
              props.serviceNameHelper.length !== 0
            }
            variant="contained"
            // className={classes.sendButton}
            fullWidth
            color="primary"
            onClick={props.createAgent}
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

export default AgentAddComponent;
