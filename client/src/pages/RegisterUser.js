import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/config";
import { ethers } from "ethers";
import { useState, useEffect } from "react";


function RegisterUser() {
  const [userStatus, setUserStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const transaction = await contract.registerUser();
    const result = await transaction.wait();
    setUserStatus(true);
    alert(result.events[0].event);

  }

  const checkUserStatus = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const userAddress = await provider.getSigner().getAddress();
    const status = await contract.getUserStatus(userAddress);
    setUserStatus(status);
    if (status > 0) {
      setUserStatus(true);
    }
    else {
      setUserStatus(false);
    }
  }

  useEffect(() => {
    checkUserStatus();
  }, []);

  useEffect(() => {
    checkUserStatus();
  }, [userStatus]);

  window.ethereum.on("accountsChanged", (accounts) => {
    checkUserStatus();
  });

  return (
    <form onSubmit={handleSubmit} className="p-3">
      {!userStatus &&
        (<button type="submit" className=" p-3 rounded-md w-full bg-green-400">
          Register
        </button>)
      }
    </form>
  );
}

export default RegisterUser;
