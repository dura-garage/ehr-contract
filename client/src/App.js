import logo from "./logo.svg";
import "./App.css";
import { getUserStatus,signer, owner } from "./api/ehrContractApi";
import { useEffect, useState } from "react";
import Homepage from "./pages/Homepage";
import Hospital from "./pages/Hospitals";
import RegisterUser from "./pages/RegisterUser";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";



function App() {
  const [userStatus, setUserStatus] = useState(null);
  const [userAddress, setUserAddress] = useState(null);



  useEffect(() => {
    setUserAddress(localStorage.getItem("connectedAddress")); 
    setUserStatus(getUserStatus());
  }, []);


  //detect metamask account change
  window.ethereum.on("accountsChanged", function (accounts) {
    setUserStatus(getUserStatus());
  });


  return (
    <>

      <Homepage />
      <hr className="w-full border-2" />
      <RegisterUser />
      <hr className="w-full border-2" />
      {signer === owner() && <AdminDashboard />}
      {userStatus === 1 && <UserDashboard/> }
      {userStatus === 2 && <DoctorDashboard/>}
      {userStatus === 3 && <HospitalDashboard/>}


      <hr />
      <Hospital />


    </>
  );
}

export default App;
