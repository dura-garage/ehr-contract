import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Homepage";
import AddHospitalForm from "./pages/AddHospitalForm";
import Hospital from "./pages/Hospitals";
import RegisterUser from "./pages/RegisterUser";
import ImageUploader from "./pages/ImageUploader";
function App() {
  return (
    <>
      <Homepage />

      <hr className="w-full" />
      <AddHospitalForm />

      <hr />
      <h1 className="text-center">Register User</h1>
      <RegisterUser/>

      <hr className="w-full" />
      <Hospital />

      <hr />
      <ImageUploader/>
    </>
  );
}

export default App;
