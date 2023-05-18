import { useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS , API_KEY, API_SECRET} from '../constants/config';
import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';

const ipfs = create({ host: "localhost", port: 5001, protocol: "http" });



function AddHospitalForm() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [hospital_address, setHospitalAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);



  async function handleSubmit(e) {
    e.preventDefault();
    const ipfsHash = await ipfs.add(selectedFile);
    setImage(ipfsHash.path);
    console.log("IPFS Hash: ", ipfsHash.path);



    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const transaction = await contract.registerHospital(hospital_address, name, description, image);
    const result = await transaction.wait();
    console.log(result);
  }

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("File: ", event.target.files[0])
  };

  return (


    <form onSubmit={handleSubmit} className="p-3">
      <label>
        Address:
        <input
          required={true}
          type="text"
          value={hospital_address}
          onChange={(e) => setHospitalAddress(e.target.value)}
        />
      </label>
      <br />
      <label>
        Name:
        <input
          required={true}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          required={true}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Image:
        <div>
          <input type="file" onChange={handleFileInputChange} />
          {image && (
            <div>
              <h2>Uploaded Image Hash:</h2>
              <p>{image}</p>
            </div>
          )}
        </div>
      </label>
      <br />
      <button type="submit" className='p-3 bg-blue-400 w-full'>Register Hospital</button>
    </form>
  );
}

export default AddHospitalForm;