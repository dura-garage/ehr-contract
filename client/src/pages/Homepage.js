import { useEffect, useState } from "react";
import {CHAIN_ID} from "../constants/config";

const Homepage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState(window.ethereum.selectedAddress);


  useEffect(() => {
    setAddress(window.ethereum.selectedAddress);
    // console.log(window.ethereum.selectedAddress);
  }, [address]);

  useEffect(() => {
    // Get the current account from Metamask
    const accounts = window.ethereum.selectedAddress;
    // Listen for the accountsChanged event
    window.ethereum.on('accountsChanged', (accounts) => {
      // Update the address state with the new account information
      setAddress(accounts[0]);
    });
  }, []);


  const handleLogin = async () => {
    try {
     

      //check the chain id
      const chainId = await window.ethereum.chainId;
      const decimalChainId= parseInt(chainId,16);
      console.log("ChainID", decimalChainId);
      if (decimalChainId !== CHAIN_ID) {
        alert("Please connect to the Correct Network");
      }
      else {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(res[0]);
        setIsConnected(true);
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className=" p-4">
      <span className="flex items-center gapx-4">
        <h1 className="font-semibold text-xl">{isConnected ? "Address :" : ""}</h1> <p>{address}</p>
      </span>
      {!isConnected ? (<button
        onClick={handleLogin}
        className=" p-3 rounded-md w-full bg-green-400"
      > Login
      </button>) : ""}
    </div>
  );
};
export default Homepage;
