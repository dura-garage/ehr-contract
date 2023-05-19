import { useEffect, useState } from "react";

function DoctorDashboard(){
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        setDoctor(localStorage.getItem("connectedAddress"));
    }
    , []);

    return (
        <div>
            <h1>Doctor Dashboard</h1>
            <h2>My Address: {doctor}</h2>
        </div>
    );



}

export default DoctorDashboard;
