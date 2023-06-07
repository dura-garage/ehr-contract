import React, { useRef, useContext, useEffect} from 'react'
import { grantAccessToRecordHistory } from '../api/ehrContractApi'
import EhrContext from '../context/ehrContext'

export default function GrantAccessToMedicalHistory() {
  const formRef = useRef(null) 

  const handleRequest = async (e) => {
    e.preventDefault();
    const doctorAddress = document.getElementById("doctorAddress").value;
    await grantAccessToRecordHistory(doctorAddress)
    formRef.current.reset();
    //relaod the window
    window.location.reload();
  }


  return (
    <>
      <div className="container">
        <h1>Grant Access to Doctor for Medical History</h1>
        <form onSubmit={handleRequest} ref={formRef} style={{ width: "60%" }}>
          <div className="mb-3">
            <label htmlFor="doctorAddress" className="form-label">Doctor's Ethereum Address</label>
            <input type="text" className="form-control" id="doctorAddress" placeholder="0x03434eb5fF29E7883C5fD54c90dF4e6A59fA3D03" required />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">Grant Access</button>
          </div>
        </form>
      </div>
    </>
  )
}
