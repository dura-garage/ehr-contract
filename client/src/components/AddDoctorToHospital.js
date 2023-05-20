import React, { useRef} from 'react'
import { addDoctorToHospital,getDoctorsOfHospital, signer } from '../api/ehrContractApi';

function AddDoctorToHospital({onDoctorAdded}) {

    const formRef = useRef(null)

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        const response = await addDoctorToHospital(e.target.doctorAddress.value)
        console.log("Doctor Address: ", e.target.doctorAddress.value)
        console.log("Doctor Added to Hospital: ", response.events[0].event)
        onDoctorAdded(getDoctorsOfHospital(signer.getAddress()))

        formRef.current.reset() 

    }

    return (
        <>
            <div className="container">
                <h1>Add Doctor to Hospital</h1>
                <form onSubmit={handleAddDoctor} ref={formRef}>
                    <div className="mb-3">
                        <label htmlFor="doctorAddress" className="form-label">Doctor's Ethereum Address</label>
                        <input type="text" className="form-control" id="doctorAddress" placeholder="0x03434eb5fF29E7883C5fD54c90dF4e6A59fA3D03" required />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Add Doctor</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddDoctorToHospital