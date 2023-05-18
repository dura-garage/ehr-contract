import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/config";
import HospitalCard from "./HospitalCard";


function Hospital() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    async function fetchHospitals() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract( CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const result = await contract.getAllHospitals();

      setHospitals(result);
      console.log(result);
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
