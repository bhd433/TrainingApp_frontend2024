import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { SliderMarkLabel } from "@mui/material";
import { Button, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"; // Combine Button and Snackbar import

import EditCustomer from './EditCustomer';
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";

import { CSVLink } from 'react-csv';

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
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
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
          return <AddTraining customerLink={params.data._links.customer.href} />;
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
            onClick={() => handleDeleteConfirmation(params)}
          >
            Delete
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


  // poisto vahvistus jutut vvv
  const handleDeleteConfirmation = (params) => {
    setCustomerToDelete(params);
    setOpenDeleteConfirmation(true);
  };

  const confirmDeleteCustomer = () => {
    const customerId = customerToDelete.data.id;
    fetch(customerToDelete.data._links.customer.href, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setOpenDeleteConfirmation(false);
          setOpenSnackBar(true);
          getCustomers();
        } else {
          setOpenDeleteConfirmation(false);
          window.alert("Delete failed");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  // CSV exporttiin tulee vain asiakkaan tiedot
  const handleExportClick = () => {
    const filteredCustomers = customers.map(customer => {
      const { firstname, lastname, streetaddress, postcode, city, email, phone } = customer;
      return { firstname, lastname, streetaddress, postcode, city, email, phone };
    });
    return filteredCustomers;
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
      <Button
        variant="contained"
        color="primary"
        style={{ margintop: '5px', width: '300px' }}
      >
        <CSVLink data={handleExportClick()} filename={"customers.csv"}>Export to CSV</CSVLink>
      </Button>

      <Dialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this customer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteCustomer} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}