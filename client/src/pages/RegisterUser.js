import Web3 from "web3";
import ehrContract from "../artifacts/contracts/ehr.sol/ehr.json";
import { useEffect } from "react";

const web3 = new Web3(Web3.givenProvider);

function RegisterUser() {
  const userContractAddress = "0x3da41833D2EAC7FA32Fee1e590d5a86CeDBFa611"; // replace with actual contract address

  async function handleSubmit(e) {
    e.preventDefault();

    const accounts = await web3.eth.requestAccounts();
    const contractAddress = "0x3da41833D2EAC7FA32Fee1e590d5a86CeDBFa611"; // replace with actual contract address
    const contract = new web3.eth.Contract(ehrContract.abi, contractAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 300000;

    const result = await contract.methods
      .registerUser()
      .send({ from: accounts[0], gasPrice, gasLimit });

    console.log(result);
  }

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <button type="submit" className="p-3 bg-green-600 cursor-pointer">
        Register User
      </button>
    </form>
  );
}

export default RegisterUser;
