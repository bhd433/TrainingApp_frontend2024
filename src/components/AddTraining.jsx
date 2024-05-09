import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

export default function AddTraining(props) {


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(new Date());


    const [trainings, setTrainings] = useState({
        date: "",
        duration: "",
        activity: "",
        customer: "",
    });

    const handleClickOpen = () => {
        setTrainings({
            ...trainings,
            customer: props.customerLink,
            date: value,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTrainings({ ...trainings, [event.target.name]: event.target.value });
    };

    const addTraining = () => {
        const newTrainings = { ...trainings, date: value };
        handleSave(newTrainings);
        handleClose();
    };

    const handleSave = (trainings) => {
        fetch(
            "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(trainings),
            }
        )
            .then((res) => {
                if (res.ok) {
                    // taulukon päivitys
                    window.location.reload();
                } else {
                    window.alert("Failed to add");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                style={{ marginBottom: "10px", width: "100%" }}
            >
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date"
                            ampm={false}
                            onChange={(newValue) => setValue(newValue.toISOString())}
                            renderInput={(props) => (
                                <TextField
                                    {...props}
                                    value={value ? dayjs(value).format('MM/DD/YYYY') : ''}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="duration"
                        value={trainings.duration}
                        onChange={(x) => handleInputChange(x)}
                        label="Duration"
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="activity"
                        value={trainings.activity}
                        onChange={(x) => handleInputChange(x)}
                        label="Activity"
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="customer"
                        value={trainings.customer}
                        onChange={(x) => handleInputChange(x)}
                        label="Customer"
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}