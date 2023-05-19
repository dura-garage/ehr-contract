import logo from "./logo.svg";
import "./App.css";
import { getUserStatus } from "./api/ehrContractApi";
import { useEffect, useState } from "react";
import Homepage from "./pages/Homepage";
import Hospital from "./pages/Hospitals";
import RegisterUser from "./pages/RegisterUser";
import UserDashboard from "./pages/UserDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import AdminDashboard from "./pages/AdminDashboard";



function App() {
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    setUserStatus(getUserStatus());
  }, []);


  return (
    <>

      <Homepage />
      <hr className="w-full border-2" />
      <RegisterUser />
      <hr className="w-full border-2" />

      if(signer.getAddress() === owner()){
        <AdminDashboard />
      }
      else if(userStatus === 1){
        <UserDashboard />
      }
      else if(userStatus === 2){
        <DoctorDashboard />
      }
      else if(userStatus === 3){
        <HospitalDashboard />
      }
      <hr />
      <Hospital />


    </>
  );
}

export default App;
