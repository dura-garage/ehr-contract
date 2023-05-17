import React, { useState, useEffect } from "react";
import Web3 from "web3";
import ehrContract from "../artifacts/contracts/ehr.sol/ehr.json";

const hospitals = [
  {
    name: "Hospital A",
    address: "0x123...",
  },
  {
    name: "Hospital B",
    address: "0x456...",
  },
  {
    name: "Hospital C",
    address: "0x789...",
  },
];

const web3 = new Web3(Web3.givenProvider);

function Hospital() {
  const [connected, setConnected] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    async function fetchHospitals() {
      // 1. Create a new Web3 instance using the provider of your choice
      const web3 = new Web3("http://localhost:7545");

      // 2. Get the contract instance using the ABI and contract address
      const contract = new web3.eth.Contract(
        ehrContract.abi,
        "0x3da41833D2EAC7FA32Fee1e590d5a86CeDBFa611" // replace with actual contract address
      );

      // 3. Call the `getAllHospitals` function on the contract and await the result
      const result = await contract.methods.getAllHospitals().call();

      // 4. Set the state with the result
      // setHospitals(result);

      // 5. Log the result to the console
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
          <div>
            <li>
              <strong>{hospital[0]}</strong>
              <br />
              <p>{hospital[1]}</p>

              ETH Address: {hospital[2]}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Hospital;
