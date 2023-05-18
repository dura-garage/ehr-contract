import { useState } from "react";
import Web3 from "web3";
import ehrContract from "../artifacts/contracts/ehr.sol/ehr.json";
import {CONTRACT_ABI, CONTRACT_ADDRESS} from '../constants/ vconfig';
const web3 = new Web3(Web3.givenProvider);


function AddHospitalForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [hospital_address, setHospitalAddress] = useState("");
  const ipfs = create({ host: '127.0.0.1', port: 5001, protocol: 'http' });

  // 
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedHash, setUploadedHash] = useState('');

  
  const uploadImage = async () => {
    alert('uploading image to IPFS...');
    try {
      const file = await ipfs.add(urlSource("https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"));
      setUploadedHash(file.path);
      console.log('upload file!!!!!!!!!!!!!!!!!');

      console.log(file.path);
      alert('image uploaded to IPFS');

    } catch (error) {
      console.error('Error uploading image to IPFS:', error);
      alert('Error uploading image to IPFS:', error);
    }
  };

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

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0])
  };

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
        <div>
      <h1>IPFS Image Uploader</h1>
      <input type="file" onChange={handleFileInputChange} />
      <div className="p-3 bg-red-500" onClick={uploadImage}>Upload</div>
      {uploadedHash && (
        <div>
          <h2>Uploaded Image Hash:</h2>
          <p>{uploadedHash}</p>
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