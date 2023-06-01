import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import EhrState from "./context/EhrState";

function App() {

  return (

    <>
      <EhrState>
        <Navbar />
        <Dashboard />
      </EhrState>
    </>
  );
}

export default App;
