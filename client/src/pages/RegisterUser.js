import React from "react";
import { useState, useEffect } from "react";
import { contractMethod } from '../api/ehrContractApi'

function RegisterUser() {
  const [userStatus, setUserStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transaction = await contractMethod.registerUser();
    const result = await transaction.wait();
    setUserStatus(true);
    alert(result.events[0].event);

  }

  const checkUserStatus = async () => {
    const userAddress = localStorage.getItem("connectedAddress");
    const status = await contractMethod.getUserStatus(userAddress);
    console.log("status is ", status)
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
