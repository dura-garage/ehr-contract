import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

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

function Hospital() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    async function checkWallet() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          setConnected(true);
        } catch (err) {
          console.error(err);
        }
      }
    }
    checkWallet();
  }, []);

  return (
    <div>
      <h2>List of Available Hospitals</h2>
      {connected ? (
        <ul>
          {hospitals.map((hospital) => (
            <li key={hospital.address}>
              <strong>{hospital.name}</strong>
              <br />
              ETH Address: {hospital.address}
            </li>
          ))}
        </ul>
      ) : (
        <p>Please connect your Ethereum wallet.</p>
      )}
    </div>
  );
}

export default Hospital;
