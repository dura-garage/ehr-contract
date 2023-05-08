import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Homepage";
import AddHospitalForm from "./pages/AddHospitalForm";
import Hospital from "./pages/Hospitals";
function App() {
  return (
    <>
      <Homepage />

      <hr className="w-full" />
      <AddHospitalForm />

      <hr className="w-full" />
      <Hospital />
    </>
  );
}

export default App;
