import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar } from "@mui/material";
import { SliderMarkLabel } from "@mui/material";

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

    /*
    
    
    {
      headerName: 'Delete',
      cellRenderer: (params) => {
        return (
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={() => deleteCar(params)}
          >Delete
          </Button>
        )
      }
    },
    {
      headerName: 'Edit',
      cellRenderer: (params) => {
        return (
          //<Button
          //  size="small"
          //  color="info"
          //  variant="contained"
          //onClick={(row) => 
          <EditCar updateCar={updateCar} car={params.data} />
          //}
          //>Edit
          //</Button>
        )
      }
    }
    */
  ])




  // haetaan treenit
  useEffect(() => getTrainings, [])  //fetch once after first render


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


  /*
   const getTrainings = () => {
       fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings")
         .then(response => response.json())
         .then(data => {
           console.log("Training data:", data);
           setTrainings(data._embedded.trainings);
         })
         .catch(error => console.error(error));
     };
     
     const fetchCustomerData = (customerLink) => {
       return fetch(customerLink)
         .then(response => response.json())
         .then(customerData => customerData)
         .catch(error => {
           console.error("Error fetching customer data:", error);
           return null;
         });
     };
     */




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
    </>
  )
}

/*
<Snackbar
                open={openSnackBar}
                autoHideDuration={3000}
                onClose={handleCloseSnackBar}
                message="Car deleted successfully"
            />
*/