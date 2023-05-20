import React, { useState, useRef } from 'react'
import { create } from 'ipfs-http-client'
import { sendRecordToPatient } from '../api/ehrContractApi'

function SendRecordToPatient({onDoctorAdded}) {
    const [patient, setPatient] = useState("")
    const [report, setReport] = useState('')

    const formRef = useRef(null)

    
    const uploadToIPFS = async (file) => {
        try {
            const ipfs = create({ url: 'http://localhost:5001/' })
            const ipfsResponse = await ipfs.add(file)
            const ipfsHash = ipfsResponse.path
            setReport(ipfsHash);
        }
        catch (err) {
            console.log("Error adding file to IPFS: ", err)
        }
    }

    const handleSendRecord = async (e) => {
        e.preventDefault();
        uploadToIPFS(document.getElementById("patientRecord").files[0])
        setPatient(document.getElementById("patientAddress").value);

        /** send the report to patient */
        sendRecordToPatient(patient, report).then((result) => {
            console.log("Patient Record Sent: ", result)
        }
        )

        formRef.current.reset()


    }

    return (
        <>
            <div className="container">
                <h1>Send Record to Patient</h1>
                <form onSubmit={handleSendRecord} ref={formRef}>
                    <div className="mb-3">
                        <label htmlFor="patientAddress" className="form-label">Patient's Ethereum Address</label>
                        <input type="text" className="form-control" id="patientAddress" placeholder="0x03434eb5fF29E7883C5fD54c90dF4e6A59fA3D03" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="patientRecord" className="form-label">Report</label>
                        <input type="file" className="form-control" id="patientRecord" placeholder="" required />
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Add Doctor</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SendRecordToPatient