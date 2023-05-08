import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ehr from "../artifacts/contracts/ehr.sol/ehr.json";
import Web3 from "web3";

function AddHospitalForm() {
  const [adminAddress, setAdminAddress] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];

    const networkId = await web3.eth.net.getId();
    const contractData = ehr.networks[networkId];

    if (!contractData) {
      alert("Contract not found on selected network");
      return;
    }

    const contract = new web3.eth.Contract(
        ehr.abi,
      contractData.address
    );

    try {
      await contract.methods
        .registerHospital(hospitalAddress)
        .send({ from: account });

      await contract.methods
        .registerHospitalAdmin(hospitalAddress, adminAddress)
        .send({ from: account });

      alert("Hospital added successfully");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="p-3 flex flex-col items-center justify-center gap-y-3">
      <Form.Group controlId="formAdminAddress">
        <Form.Label>Admin Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter admin address"
          value={adminAddress}
          onChange={(event) => setAdminAddress(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formHospitalAddress">
        <Form.Label>Hospital Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter hospital address"
          value={hospitalAddress}
          onChange={(event) => setHospitalAddress(event.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="bg-blue-700 rounded-md p-3 w-full text-white hover:bg-blue-400 duration-150">
        Add Hospital
      </Button>
    </Form>
  );
}

export default AddHospitalForm;
