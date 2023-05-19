import React, { useState, useEffect } from "react";
import HospitalCard from "./HospitalCard";
import { ehr } from "../api/ehrContractApi";


function Hospital() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    async function fetchHospitals() {
      const result = await ehr.getAllHospitals();
      setHospitals(result);
      console.log("Results ", result);
    }
    fetchHospitals();
  }, []);

  return (
    <div>
      <h2>List of Available Hospitals</h2>
      <ul>
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital.id} name={hospital[0]} description={hospital[1]} ethAddress={hospital[2]} />
        ))}
      </ul>
    </div>
  );
}

export default Hospital;
