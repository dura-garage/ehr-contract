import React, { useContext, useEffect, useState } from 'react'
import { getAccessStatus, getUserDoctors, revokeAccessToRecordHistory } from '../api/ehrContractApi'
import EhrContext from '../context/ehrContext'

export default function AccessStatusPatient() {
    const { currentAccount, currentAccountStatus } = useContext(EhrContext)
    const [doctorAndGrantStatus, setdoctorAndGrantStatus] = useState([])
    const [toggle, setToggle] = useState(false)


    const toggleUtil = () => {
        setToggle(!toggle)
    }

    const revokeAccess = async (doctorAddress) => {
        try {
            await revokeAccessToRecordHistory(doctorAddress)
            toggleUtil()
        }
        catch (err) {
            console.log(err)

        }

    }
    useEffect(() => {
        const getDoctors = async () => {
            const docs = await getUserDoctors(currentAccount)
            // update the patient and access status 
            const doctorAndGrantStatus = []
            for (let i = 0; i < docs.length; i++) {
                let doctor = docs[i]
                const accessStatus = await getAccessStatus(currentAccount, doctor)
                if (accessStatus) { doctorAndGrantStatus.push({ doctor, accessStatus }) }
            }
            setdoctorAndGrantStatus(doctorAndGrantStatus)
        }

        if (currentAccountStatus === 1)
            getDoctors()
    }, [currentAccount, currentAccountStatus, toggle])


    return (
        <div className='container'>
            <h1>Access Request Status</h1>
            <table className='table table-striped table-success table-bordered'>
                <thead>
                    <tr>
                        <th scope="col">Doctor's Address</th>
                        <th scope="col">Access Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody> {
                    doctorAndGrantStatus.map((doctorAndGrantStatus) => {
                        return (
                            <tr key={doctorAndGrantStatus.doctor}>
                                <td>{doctorAndGrantStatus.doctor}</td>
                                <td>{doctorAndGrantStatus.accessStatus ? "Granted" : "Not Granted"}</td>
                                <td><button className="btn btn-primary" onClick={() => revokeAccess(doctorAndGrantStatus.doctor)}>Revoke</button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}