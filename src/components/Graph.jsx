import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";


function Graph() {


  const [data, setData] = useState([]);


  useEffect(() => {
    fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  useEffect(() => {
    if (data.length > 0) {
      renderGraph(data);
    }
  }, [data]);


  const renderGraph = (data) => {
    const activities = {};
    data.forEach((item) => {
      if (item.activity in activities) {
        activities[item.activity] += item.duration;
      } else {
        activities[item.activity] = item.duration;
      }
    });
  
    const mostPopularActivity = Object.keys(activities).reduce((a, b) => (activities[a] > activities[b] ? a : b));
  
    
    const existingChart = Chart.getChart("myChart");
    if (existingChart) {
      existingChart.destroy();
    }

  
    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(activities),
        datasets: [{
          label: "Duration (minutes)",
          data: Object.values(activities),
          backgroundColor: Object.keys(activities).map(activity => activity === mostPopularActivity ? "rgba(255, 99, 132, 0.2)" : "rgba(54, 162, 235, 0.2)"),
          borderColor: Object.keys(activities).map(activity => activity === mostPopularActivity ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)"),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
}

export default Graph;