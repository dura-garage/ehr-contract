import React, { useRef } from 'react'
import { requestAccessToRecordHistory } from '../api/ehrContractApi'

export default function ReqestToPatientMedicalHistory() {
  const formRef = useRef(null)
  const handleRequest = async () => {
    await requestAccessToRecordHistory(document.getElementById("patientAddress").value)
    console.log(`ADoctor requests BPatient`);
  }

  return (
    <>
      <div className="container">
        <h1>Request for Patient Medical History</h1>
        <form onSubmit={handleRequest} ref={formRef} style={{ width: "60%" }}>
          <div className="mb-3">
            <label htmlFor="patientAddress" className="form-label">Patient's Ethereum Address</label>
            <input type="text" className="form-control" id="patientAddress" placeholder="0x03434eb5fF29E7883C5fD54c90dF4e6A59fA3D03" required />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">Request</button>
          </div>
        </form>
      </div>
    </>
  )
}
