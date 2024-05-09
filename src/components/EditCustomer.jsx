import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function EditCustomer(props) {


    //state
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });


  const handleClickOpen = () => {
    console.log(props.customer);
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city,
      email: props.customer.email,
      phone: props.customer.phone,
    });
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };


  const handleInputChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };


  const editCustomer = () => {
    props.updateCustomer(customer, props.customer._links.customer.href);
    handleClose();
  };



  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginBottom: "10px", width: "100%" }}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={(x) => handleInputChange(x)}
            label="First name"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={(x) => handleInputChange(x)}
            label="Last name"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={(x) => handleInputChange(x)}
            label="Street address"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={(x) => handleInputChange(x)}
            label="Postcode"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="city"
            value={customer.city}
            onChange={(x) => handleInputChange(x)}
            label="City"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="email"
            value={customer.email}
            onChange={(x) => handleInputChange(x)}
            label="Email"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={(x) => handleInputChange(x)}
            label="Phone"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}