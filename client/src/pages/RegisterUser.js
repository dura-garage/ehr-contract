import React from "react";
import { useState, useEffect } from "react";
import { registerUser, getUserStatus } from '../api/ehrContractApi'

function RegisterUser() {
  const [userStatus, setUserStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transaction = await registerUser();
    const result = await transaction.wait();
    setUserStatus(getUserStatus());
    alert(result.events[0].event);

  }

  useEffect(() => {
    setUserStatus(getUserStatus());
  }, []);

  

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      setUserStatus(getUserStatus());
    };

    setUserStatus(getUserStatus());

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);


  return (
    <form onSubmit={handleSubmit} className="p-3">
      {(userStatus<1) &&
        (<button type="submit" className=" p-3 rounded-md w-full bg-green-400">
          Register
        </button>)
      }
    </form>
  );
}

export default RegisterUser;
