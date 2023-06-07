import React, { useState, useRef } from 'react'
import { create } from 'ipfs-http-client'
import { sendRecordToPatient } from '../api/ehrContractApi'


function SendRecordToPatient({ onDoctorAdded }) {
    const [patient, setPatient] = useState("")
    const [report, setReport] = useState('')

    const formRef = useRef(null)


    // To encrypt the report with patient's public key
    // const encryptData = async (data, publicKey) => {
    //     const enc = encrypt({
    //         publicKey: publicKey.toString('base64'),
    //         data: ascii85.encode(data).toString(),
    //         version:'x25519-xsalsa20-poly1305',
    //     });

    //     const buf= Buffer.concat(
    //         Buffer.from(enc.ephemPublicKey, 'base64'),
    //         Buffer.from(enc.nonce, 'base64'),
    //         Buffer.from(enc.ciphertext, 'base64'),
    //     )
    //     return buf;
    // }




    const uploadToIPFS = async (file) => {
        try {
            const ipfs = create({ url: 'http://localhost:5001/' })
            const ipfsResponse = await ipfs.add(file)
            const ipfsHash = ipfsResponse.path

            /** 
             * TODO:
             * 1. Encrypt the ipfsHash with patient's public key
             * 2. Send the encrypted ipfsHash to patient
            */
     

            setReport(ipfsHash);
        }
        catch (err) {
            console.log("Error adding file to IPFS: ", err)
        }
    }

    const handleSendRecord = async (e) => {
        e.preventDefault();
        setPatient(document.getElementById("patientAddress").value);
        await uploadToIPFS(document.getElementById("patientRecord").files[0])
        /** send the report to patient */
        await sendRecordToPatient(patient, report);
        console.log("Report sent to patient")

        formRef.current.reset()


    }

    return (
        <>
            <div className="container">
                <h1>Send Record to Patient</h1>
                <form onSubmit={handleSendRecord} ref={formRef} style={{width:"60%"}}>
                    <div className="mb-3">
                        <label htmlFor="patientAddress" className="form-label">Patient's Ethereum Address</label>
                        <input type="text" className="form-control" id="patientAddress" placeholder="0x03434eb5fF29E7883C5fD54c90dF4e6A59fA3D03" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="patientRecord" className="form-label">Report</label>
                        <input type="file" className="form-control" id="patientRecord" placeholder="" required />
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Send Report</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SendRecordToPatient