import { useState } from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/config";


const web3 = new Web3(Web3.givenProvider);


function AddHospitalForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [hospital_address, setHospitalAddress] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const accounts = await web3.eth.requestAccounts();
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 300000;

    const result = await contract.methods
      .registerHospital(hospital_address, name, description, image)
      .send({ from: accounts[0], gasPrice, gasLimit });

    console.log(result);
    
  }

  return (
    

    <form onSubmit={handleSubmit} className="p-3">
      <label>
        Address:
        <input
          type="text"
          value={hospital_address}
          onChange={(e) => setHospitalAddress(e.target.value)}
        />
      </label>
      <br />
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Image:
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" className='p-3 bg-blue-400 w-full'>Register Hospital</button>
    </form>
  );
}

export default AddHospitalForm;