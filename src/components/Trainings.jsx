import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { SliderMarkLabel } from "@mui/material";
import { Button, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

// date
import dayjs from "dayjs";


export default function Trainings() {


  const [trainings, setTrainings] = useState
    ([{
      id: '',
      date: '',
      duration: '',
      activity: '',
      customer: ''
    }]);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [trainingToDelete, setTrainingToDelete] = useState(null);


  const [colDefs, setColDefs] = useState([

    {
      field: 'date',
      filter: true,
      floatingFilter: true,
      valueGetter: (params) => {
        const date1 = params.data.date;
        const date2 = dayjs(date1);
        return date2.format("DD-MM-YYYY")
      }
    },
    {
      field: 'duration',
      filter: true,
      floatingFilter: true,
    },
    {
      field: 'activity',
      filter: true,
      floatingFilter: true
    },
    {
      field: 'customer',
      headerName: 'Customer',
      filter: true,
      floatingFilter: true,
      cellRenderer: (params) => {
        const customer = params.data.customer;
        if (customer && customer.firstname && customer.lastname) {
          return customer.firstname + ' ' + customer.lastname;
        } else {
          return 'Unknown';
        }
      }
    },
    {
      headerName: "Delete",
      cellRenderer: (params) => {
        return (
          <Button
            onClick={() => deleteTraining(params)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        )
      }
    }
  ])


  // haetaan treenit
  useEffect(() => getTrainings, [])  //käynnistyy ekan renderin jälkee


  const getTrainings = () => {

    fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings", { method: 'GET' })
      .then(treenit => {
        return treenit.json()
      })
      .then(treenidata => {
        console.log("Training data:", treenidata);
        setTrainings(treenidata)
      })
      .catch(error => console.error(error))
  }

  // poisto ja vahvistus
  const deleteTraining = (params) => {
    const id = params.data.id;
    setOpenConfirmationDialog(true);
    setTrainingToDelete(params);
  };

  const confirmDeleteTraining = () => {
    const id = trainingToDelete.data.id;
    fetch(
      `https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${id}`,
      { method: "DELETE" }
    )
      .then((res) => {
        if (res.ok) {
          setOpenConfirmationDialog(false);
          setOpenSnackBar(true);
          getTrainings();
        } else {
          setOpenConfirmationDialog(false);
          window.alert("Delete failed");
        }
      })
      .catch((error) => console.log(error));
  };




  return (
    <>
      <div className="ag-theme-material" style={{ width: '100vw', maxWidth: '1200px', height: '750px', margin: '0 auto' }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
        ></AgGridReact>
      </div>

      <Dialog open={openConfirmationDialog} onClose={() => setOpenConfirmationDialog(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this training?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmationDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteTraining} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}