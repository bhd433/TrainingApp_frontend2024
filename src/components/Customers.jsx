import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar } from "@mui/material";
import { SliderMarkLabel } from "@mui/material";

import EditCustomer from './EditCustomer';
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";


export default function Customers() {


  //state
  const [customers, setCustomers] = useState
    ([{
      id: '',
      firstname: '',
      lastname: '',
      streetaddress: '',
      postcode: '',
      city: '',
      email: '',
      phone: ''
    }]);


  const [openSnackBar, setOpenSnackBar] = useState(false);

  // coldefs
  const [colDefs, setColDefs] = useState([
    { field: 'firstname', filter: true, floatingFilter: true },
    { field: 'lastname', filter: true, floatingFilter: true },
    { field: 'streetaddress', filter: true, floatingFilter: true },
    { field: 'postcode', filter: true, floatingFilter: true },
    { field: 'city', filter: true, floatingFilter: true },
    { field: 'email', filter: true, floatingFilter: true },
    { field: 'phone', filter: true, floatingFilter: true },
    {
      headerName: 'Edit',
      cellRenderer: (params) => {
        return (
          <EditCustomer updateCustomer={updateCustomer} customer={params.data} />
        )
      }
    },
    {
      headerName: 'Add training',
      cellRenderer: (params) => {
        if (params.data._links) {
          return (
            <Button onClick={() => handleClick(params)}>
              <AddTraining customerLink={params.data._links.customer.href} />
            </Button>
          );
        } else {
          return null;
        }
      },
    },
    {
      headerName: 'Delete',
      cellRenderer: (params) => {
        return (
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={() => deleteCustomer(params)}
          >Delete
          </Button>
        )
      }
    }
  ])


  // haetaan asiakkaat
  useEffect(() => getCustomers, [])  //käynnistyy ekan renderin jälkee


  // asiakas fetch
  const getCustomers = () => {

    fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers", { method: 'GET' })
      .then(asiakkaat => {
        return asiakkaat.json()
      })
      .then(asiakasdata => {
        setCustomers(asiakasdata._embedded.customers)
      })
      .catch(error => console.error(error))
  }


  // delete 
  const deleteCustomer = (params) => {

    fetch(params.data._links.customer.href, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          // taulukon päivitys
          window.location.reload();
        } else {
          window.alert("Delete failed");
        }
      })
      .catch((error) => console.log(error));
  };


  // päivitys
  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => {
        if (res.ok) {
          // taulukon päivitys
          window.location.reload();
        } else {
          window.alert("Update failed");
        }
      })
      .catch((err) => console.log(err));
  };


  // uuden asiakkaan tallennus
  const handleSave = (customer) => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/customers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      }
    )
      .then((res) => {
        if (res.ok) {
          // taulukon päivitys
          window.location.reload();
        } else {
          window.alert("Save failed");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (params) => {
    setCustomerLink(params.data._links.customer.href);
  };



  return (
    <>
      <div className="ag-theme-material" style={{ width: '100vw', maxWidth: '1200px', height: '750px', margin: '0 auto' }}>
        <AgGridReact
          rowData={customers}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
        ></AgGridReact>
      </div>

      <AddCustomer handleSave={handleSave}></AddCustomer>
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