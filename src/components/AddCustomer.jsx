import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddCustomer(props) {
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const addCustomer = () => {
    props.handleSave(customer);
    handleClose();
  };


  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginBottom: "10px", marginTop: "10px", width: "300px" }}
      >
        Add customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={handleInputChange}
            label="First name"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={handleInputChange}
            label="Last name"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={handleInputChange}
            label="Street address"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={handleInputChange}
            label="Postcode"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="city"
            value={customer.city}
            onChange={handleInputChange}
            label="City"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="email"
            value={customer.email}
            onChange={handleInputChange}
            label="Email"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={handleInputChange}
            label="Phone"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}