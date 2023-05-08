import { useEffect, useState } from "react";
import {ethers} from "ethers";
// import contract
import ehr from "../artifacts/contracts/ehr.sol/ehr.json";

const Homepage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState(window.ethereum.selectedAddress);

  const contract_address = "0x54021590aCBC5ff42523d378890d1dF7E2e86e58";

  useEffect(() => {
    setAddress(window.ethereum.selectedAddress);
    console.log(window.ethereum.selectedAddress);
  }, [address]);

  const handleLogin = async () => {
    try {
      const res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(res[0]);
      setIsConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" p-4">
      <span className="flex items-center gapx-4">
        <h1 className="font-semibold text-xl">Address: </h1> <p>{address}</p>
      </span>
      <button
        onClick={handleLogin}
        className=" p-3 rounded-md w-full bg-green-400"
      >
        Login
      </button>

      
    </div>
  );
};
export default Homepage;
