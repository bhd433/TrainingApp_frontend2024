import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'; // Import CSS file for styling


// jsx importit
import App from './App.jsx'
import Customers from './components/Customers.jsx';
import Trainings from './components/Trainings.jsx';
import Error from './components/Error.jsx';
import Calendar from './components/Calendar.jsx';
import Graph from './components/Graph.jsx';


// router jutut
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';


// root route
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [                       // children are nested routes with a route
      {
        element: <Customers />,
        index: true                   // index route does not need any path
      },
      {
        path: "trainings",                // path can be defined relative to the parent path
        element: <Trainings />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "graph",
        element: <Graph />,
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);


/*
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
*/