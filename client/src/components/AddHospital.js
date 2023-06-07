import React, { useState, useRef } from 'react'
import { create } from 'ipfs-http-client'
import { getAllHospitals, registerHospital } from '../api/ehrContractApi';

function AddHospital({onHospitalAdded}) {
    /** Hospital Details */
    const [hospitalName, setHospitalName] = useState("");
    const [hospitalAdminEthAddress, setHospitalAdminEthAddress] = useState("");
    const [hospitalLogoImage, setHospitalLogoImage] = useState("");
    const formRef = useRef(null)


    const uploadToIPFS = async (file) => {
        try {
            const ipfs = create({ url: 'http://localhost:5001/' })
            const ipfsResponse = await ipfs.add(file)
            const ipfsHash = ipfsResponse.path
            setHospitalLogoImage(ipfsHash);
        }
        catch (err) {
            console.log("Error adding file to IPFS: ", err)
        }
    }


    const handleAddHospital = async (e) => {
        e.preventDefault();
        setHospitalAdminEthAddress(document.getElementById("ETHAddress").value);
        setHospitalName(document.getElementById("name").value);

        const file = document.getElementById("logoImge").files[0];
        await uploadToIPFS(file)

        /** Add hospital to blockchain */
        const response = await registerHospital(hospitalAdminEthAddress, hospitalName, hospitalLogoImage);
        
        console.log("Hospital Registration Response: ", response);
        formRef.current.reset()
        // force a re-render
        window.location.reload();
        onHospitalAdded(getAllHospitals());
    }

    return (
        <>
            <div className="container">
                <h1>Add Hospital</h1>
                <form onSubmit={handleAddHospital} ref={formRef} style={{width:"60%"}}>
                    <div className="mb-3">
                        <label htmlFor="ETHAddress" className="form-label">Ethereum Address</label>
                        <input type="text" className="form-control" id="ETHAddress" placeholder="0x03434eb5fF29E7883C5fD54c90dF4e6A59fA3D03" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Janki Hospital" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="logoImge" className="form-label">Logo</label>
                        <input type="file" className="form-control" id="logoImge" placeholder="Janki Hospital" required  accept='image/*'/>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Add Hospital</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddHospital