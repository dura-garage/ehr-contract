import { useEffect, useState } from "react";
import {CHAIN_ID} from "../constants/config";

const Homepage = () => {
  const [address, setAddress] = useState(window.ethereum.selectedAddress);


  useEffect(() => {
    setAddress(window.ethereum.selectedAddress);
  }, [address]);

  useEffect(() => {
    // Listen for the accountsChanged event
    window.ethereum.on('accountsChanged', (accounts) => {
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
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" p-4">
      <span className="flex items-center gapx-4">
        {address && (
          <div>
            <h1 className="font-semibold text-xl">Address</h1>
            <p>{address}</p>
          </div>
        )}
      </span>
      {!address && (<button
        onClick={handleLogin}
        className=" p-3 rounded-md w-full bg-green-400"
      > Connect Wallet
      </button>)}
    </div>
  );
};
export default Homepage;
