import { useEffect, useState } from "react";
import { ehr, getUserStatus } from "../api/ehrContractApi";

const Homepage = () => {
  const [address, setAddress] = useState(null);
  const [isOwner, setIsOwner] = useState(null);

  const connectWallet = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const addr = window.ethereum.selectedAddress;
    setAddress(addr);
    const owner = await ehr.owner();
    if (owner.toUpperCase() === addr.toUpperCase()) {
      setIsOwner(true);
      console.log("owner", owner);
      console.log("address", addr);
    }
  };

  useEffect(() => {
    const storedAddress = localStorage.getItem("connectedAddress")
    if (storedAddress) {
      setAddress(storedAddress);
    }

    async function fetchData() {
      if (window.ethereum === undefined) {
        console.log("no wallet detected");
      } else {
        window.ethereum.on("accountsChanged", function account(accounts) {
          const selectedAddress = accounts[0];
          setAddress(selectedAddress);
          localStorage.setItem("connectedAddress", selectedAddress);
          console.log("changed account addr", selectedAddress);
        });
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (address) {
      const checkOwner = async () => {
        const owner = await ehr.owner();
        if (owner.toUpperCase() === address.toUpperCase()) {
          setIsOwner(true);
        }
      };
      checkOwner();
    }
  }, [address]);

  return (
    <div className="p-4">
      <span className="flex items-center gapx-4">
        {address && (
          <div>
            <h1 className="font-semibold text-xl">Address</h1>
            <p>{address}</p>
          </div>
        )}
      </span>
      {(!address && (
        <button
          onClick={connectWallet}
          className="p-3 rounded-md w-full bg-green-400"
        >
          Connect Wallet
        </button>
      ))}
    </div>
  );
};

export default Homepage;
