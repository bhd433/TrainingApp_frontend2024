import './App.css'
import { Link, Outlet } from 'react-router-dom';


function App() {

  // navigointi
  return (
    <>
      <div className="App">
        <nav className="navigation">
          <Link to={"/"}>Customers</Link>
          <Link to={"/trainings"}>Trainings</Link>
        </nav>
        <Outlet />
      </div>
    </>
  )
  

  /*
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Training App</Typography>
        </Toolbar>
      </AppBar>

      <Customers />
    </>
  )
  */
}


export default App
