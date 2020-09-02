import { createMuiTheme } from "@material-ui/core/styles";

const arcBlue = "#0B72B9";
const arcGreen = "#4CAF50";
const arcGrey = "#868686";
export default createMuiTheme({
  palette: {
    common: {
      blue: `${arcBlue}`,
      orange: `${arcGreen}`,
    },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcGreen}`,
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1.25rem",

      "&:hover": {
        textDecoration: "none",
      },
    },
    logout: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      color: "white",
      textTransform: "none",
    },
  },
  overrides: {
    MuiTableSortLabel: {
      root: {
        "&:hover": {
          color: arcGreen,
        },
        "&.MuiTableSortLabel-active": {
          color: arcGreen,
        },
      },
      icon: {
        fill: arcGreen,
      },
    },
    MuiTableCell: {
      head: {
        fontSize: "1rem",
        fontWeight: 700,
        color: arcBlue,
        borderColor: arcBlue,
        borderWidth: 3,
      },
      //   body:{
      //     color:arcGrey,
      //     borderColor:arcBlue,
      //     borderWidth:2
      //   }
    },
    MuiFormControlLabel: {
      label: {
        color: arcBlue,
        fontWeight: 700,
      },
      labelPlacementStart: {
        marginLeft: 0,
        marginRight: "5em",
      },
    },
    MuiInputLabel: {
      root: {
        color: arcBlue,
        fontSize: "1rem",
      },
    },
    MuiInput: {
      root: {
        color: arcGrey,
        fontWeight: 500,
      },
      underline: {
        "&:before": {
          borderBottom: `2px solid ${arcBlue}`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid ${arcBlue}`,
        },
      },
    },
  },
});
