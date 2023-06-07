import React, { useContext, useEffect, useState } from 'react'
import { getAccessStatus, getUserPatients } from '../api/ehrContractApi'
import EhrContext from '../context/ehrContext'

export default function AccessStatusDoctor() {
    const { currentAccount, currentAccountStatus } = useContext(EhrContext)
    const [patients, setPatients] = useState([])
    const [patientAndAccessStatus, setPatientAndAccessStatus] = useState([])

    useEffect(() => {
        const getPatients = async () => {
            const patients = await getUserPatients(currentAccount)
            setPatients(patients)
            // update the patient and access status 
            const patientAndAccessStatus = []
            for (let i = 0; i < patients.length; i++) {
                let patient = patients[i]
                console.log("Patient: ", patient)
                console.log("Current Account: ", currentAccount)
                const accessStatus = await getAccessStatus(patient, currentAccount)
                console.log("Access Status: ", accessStatus)
                if (accessStatus) { patientAndAccessStatus.push({ patient, accessStatus }) }
            }
            setPatientAndAccessStatus(patientAndAccessStatus)
        }

        if (currentAccountStatus === 2) {
            getPatients()
        }
    }, [currentAccount, currentAccountStatus])

    return (
        <div className='container'>
            <h1>Access Request Status</h1>
            <table className='table table-striped table-success table-bordered'>
                <thead>
                    <tr>
                        <th scope="col">Patient's Address</th>
                        <th scope="col">Access Status</th>
                    </tr>
                </thead>
                <tbody>{
                    patientAndAccessStatus.map((patientAndAccessStatus) => {
                        return (
                            <tr key={patientAndAccessStatus.patient}>
                                <td>{patientAndAccessStatus.patient}</td>
                                <td>Available</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
