import { useState } from "react";
import { create } from 'ipfs-http-client';
import { contractMethod } from "../api/ehrContractApi";

const ipfs = create({ host: "localhost", port: 5001, protocol: "http" });



function AddHospitalForm() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [hospital_address, setHospitalAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);



  async function handleSubmit(e) {
    try {

      e.preventDefault();
      const ipfsHash = await ipfs.add(selectedFile);
      console.log("here")
      const path = await ipfs.get(ipfsHash);
    setImage(path);
      console.log("ipfs hash", ipfsHash);
      console.log("IPFS Hash: ", path);
      const transaction = await contractMethod.registerHospital(hospital_address, name, description, image);
      const result = await transaction.wait();
      console.log("Result", result);
    } catch (error) {
      console.log(error);
    }
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