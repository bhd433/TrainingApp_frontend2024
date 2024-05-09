import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";



function Calendar() {


  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);


  useEffect(() => {
    fetchTrainings();
  }, []);


  const fetchTrainings = () => {
    fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings")
      .then((response) => response.json())
      .then((data) => {
        const formattedTrainings = data.map((training) => ({
          id: training.id,
          title: training.activity,
          start: dayjs(training.date).format(),
          duration: training.duration,
          customer: training.customer,
        }));
        console.log(formattedTrainings)
        setTrainings(formattedTrainings);
      })
      .catch((error) => {
        console.error("Error fetching trainings:", error);
      });
  };


  const handleEventClick = (info) => {
    console.log(info.event.extendedProps);
    setSelectedTraining(info.event.extendedProps);
  };



  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={trainings}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        eventClick={handleEventClick}
      />
      {selectedTraining && (
        <div className="selected-training">
          <h2>{selectedTraining.title}</h2>
          <p>Date: {dayjs(selectedTraining.start).format("DD-MM-YYYY HH:mm:ss")}</p>
          <p>Customer: {selectedTraining.customer.firstname} {selectedTraining.customer.lastname}</p>
          <p>Email: {selectedTraining.customer.email}</p>
          <p>Phone: {selectedTraining.customer.phone}</p>
          <p>Address: {selectedTraining.customer.streetaddress}, {selectedTraining.customer.postcode} {selectedTraining.customer.city}</p>
        </div>
      )}
    </div>
  );
}

//<p>Activity: {selectedTraining.activity}</p>

export default Calendar;