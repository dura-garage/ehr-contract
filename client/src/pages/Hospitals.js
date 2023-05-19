import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/config";


function Hospital() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    async function fetchHospitals() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const result = await contract.getAllHospitals();
      setHospitals(result);
      console.log(result);
    }
    fetchHospitals();
  }, []);

  return (
    <div>
      <h2>List of Available Hospitals</h2>
      <ol>
        {hospitals.map((hospital) => (
          <div>
            <img src={`ipfs://${hospital[4]}`} alt="hospital" width="200" height="200" />
            <li>{hospital[0]}</li>
            <li>{hospital[1]}</li>
            <li>{hospital[2]}</li>
            <li>{hospital[4]}</li>
          </div>
        ))}
      </ol>
    </div>
  );
}

export default Hospital;
