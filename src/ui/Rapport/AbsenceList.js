import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { Paper, Grid } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

import { ExportXlsx } from "./ExportXlsx";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const AbsenceListComponent = (props) => {
  const classes = useStyles();
  const data = props.absences;
  let i = 0;

  // const [data,setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      {/* <Typography variant="h4" align ="center">Liste du Personnel</Typography> */}
      <Grid container justify="center" spacing={3}>
        <Grid item md={10} sm={12} xs={12}>
          <ExportXlsx csvData={data} fileName={"Rapport-Absence"} />
        </Grid>
      </Grid>

      <Grid container alignItems="center" justify="center" spacing={3}>
        <Grid item md={10} sm={12} xs={9}>
          <Paper style={{ marginTop: "20px" }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">N°: </TableCell>
                    <TableCell align="center">NOM AGENT</TableCell>
                    <TableCell align="center">DATE ABSENCE </TableCell>

                    <TableCell align="center">ACTIONS </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    /* {loader ?
       <Grid container alignItems="center" justify="center" >
               
    <Grid item >
      <Paper className={classes.paper } >
       <div className={classes.margin}>
       <Loader/>
      
       </div>
    </Paper>
    </Grid>
   </Grid>:( */

                    data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow key={row.id}>
                            <TableCell align="center">{(i = i + 1)}</TableCell>
                            <TableCell align="center">{row.nomAgent}</TableCell>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {row.dateAbsence}
                            </TableCell>
                            <TableCell align="right" onClick={() => {}}>
                              <CreateIcon />
                            </TableCell>
                            <TableCell align="right" onClick={() => {}}>
                              <DeleteIcon />
                            </TableCell>
                          </TableRow>
                        );
                      })
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default AbsenceListComponent;
