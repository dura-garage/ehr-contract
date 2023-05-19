import { useEffect, useState } from "react";
import { signer } from "../api/ehrContractApi";

function DoctorDashboard(){
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        setDoctor(signer.getAddress());
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
