import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, MenuItem } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "20em",
    [theme.breakpoints.down("sm")]: {
      width: "15em",
    },
  },
  // sendButton: {
  //   width: "20rem",
  //   [theme.breakpoints.down("sm")]: {
  //     width: "15rem",
  //   },
  // },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(6),
  },
}));
function SortieAddComponent(props) {
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
            select
            name="agent"
            id="agent"
            value={props.nomAgent}
            onChange={props.onChangeNomAgent}
          >
            {props.agents.map((dt, i) => (
              <MenuItem value={dt.nomAgent} key={i} name={dt.nomAgent}>
                {dt.nomAgent}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item style={{ marginTop: 50 }}>
          <TextField
            id="dateDepointage"
            variant="outlined"
            label="Date heure de Sortie"
            name="dateDepointage"
            type="datetime-local"
            className={classes.textField}
            value={props.dateDepointage}
            onChange={props.onChange}
            InputLabelProps={{
              shrink: true,
            }}
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
              props.dateDepointage.length === 0 ||
              props.nomAgentHelper.length !== 0
            }
            variant="contained"
            className={classes.sendButton}
            fullWidth
            color="primary"
            onClick={props.createSortie}
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
export default SortieAddComponent;
