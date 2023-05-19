import { useState, useEffect } from 'react';
import { signer, getDoctorsOfHospital, addDoctorToHospital } from '../api/ehrContractApi';

function HospitalDashboard(){
    const [hospital, setHospital] = useState(null);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        setHospital(signer.getAddress());
        getDoctorsOfHospital(signer.getAddress()).then((doctors) => {
            setDoctors(doctors);
        }
        , []);
    });


    return (
        <div>
            <h1>Hospital Dashboard</h1>
            <h2>My Address: {hospital}</h2>
            <h2>Add Doctor:</h2>  
            <form onSubmit={(e) => {
                e.preventDefault();
                addDoctorToHospital(signer.getAddress(), e.target[0].value);
            }}>
                <input type="text" placeholder="Doctor Address" required/>
                <button type="submit">Add</button>
            </form>
            <br />
            <br />
            <h2>Doctors:</h2>
            <ul>
                {doctors.map((doctor) => {
                    return <li>{doctor}</li>
                })}
            </ul>

        </div>
    );





}

export default HospitalDashboard;