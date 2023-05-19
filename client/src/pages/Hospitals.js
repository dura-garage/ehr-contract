import React, { useState, useEffect } from "react";
import HospitalCard from "./HospitalCard";
import { ehr } from "../api/ehrContractApi";


function Hospital() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    async function fetchHospitals() {
      const result = await ehr.getAllHospitals();
      setHospitals(result);
      console.log("Hospitals ", result);
    }
    fetchHospitals();
  }, []);



  return (
    <div>
      <h2>List of Available Hospitals</h2>
      <ul>
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital.admin} ethAddress={hospital.admin} name={hospital.name} description={hospital.description}  image={hospital.image}/>
        ))}

      </ul>
    </div>
  );
}

export default Hospital;

