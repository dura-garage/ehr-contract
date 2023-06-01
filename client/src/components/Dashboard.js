import React, { useEffect, useState, useContext } from 'react'
import AddHospital from './AddHospital';
import AddDoctor from './AddDoctor';
import { getAllHospitals, getDoctorsOfHospital, getMyRecords} from '../api/ehrContractApi';
import HospitalList from './HospitalsList';
import AddDoctorToHospital from './AddDoctorToHospital';
import DoctorsList from './DoctorsList';
import SendRecordToPatient from './SendRecord';
import MyRecords from './MyRecords';
import DoctorsRequestForMedicalHistory from './DoctorsRequestForMedicalHistory';
import ReqestToPatientMedicalHistory from './ReqestToPatientMedicalHistory';
import EhrContext from '../context/ehrContext';

function Dashboard() {
    const [hospitals, setHospitals] = useState([])
    const [doctors, setDoctors] = useState([])
    const [myRecords, setMyRecords] = useState([])

    const { 
        currentAccount, 
        currentAccountStatus, 
        isCurrentAccountOwner, 
    } = useContext(EhrContext)



    useEffect(() => {
        //assuming that only patient can have records
        if (currentAccountStatus === 1) {
            getAllHospitals().then((result) => {
                console.log("All Hospitals: ", result)
                setHospitals(result)
            }
            )
            // get my records
            getMyRecords(currentAccount).then((result) => {
                console.log("My Records: ", result)
                setMyRecords(result)
            })
        }
    }, [])


    useEffect(() => {
        //only the hospital has access to doctors
        if (currentAccountStatus === 3) {
            // get all doctors of hospital
            getDoctorsOfHospital(currentAccount).then((result) => {
                console.log("All Doctors: ", result)
                setDoctors([...result])
            })
        }
        //assuming that only patient can have records
        if(currentAccountStatus === 1) {
            // get all hospitals
            getAllHospitals().then((result) => {
                console.log("All Hospitals: ", result)
                setHospitals(result)
            }
            )
            // get my records
            getMyRecords(currentAccount).then((result) => {
                console.log("My Records: ", result)
                setMyRecords(result)
            })
        }
    }, [currentAccountStatus, currentAccount])


    const onHospitalAdded = (h) => {
        setHospitals([...h])
    }

    const onDoctorAdded = (d) => {
        setDoctors([...d])
    }




    return (
        <>
            {currentAccountStatus === 0 && <h1>Please Register Yourself</h1>}

            

            {currentAccountStatus === 2 &&
                <>
                    <h1>Doctor Page</h1>
                    <SendRecordToPatient />
                    <ReqestToPatientMedicalHistory/>
                </>
            }

            {currentAccountStatus === 3 &&
                <>
                    <h1>Hospital Page</h1>
                    <AddDoctorToHospital onDoctorAdded={onDoctorAdded} />
                    <DoctorsList doctors={doctors} />
                </>
            }  
            {
                isCurrentAccountOwner && 
                <>
                <h1>Owner Page</h1>
                <AddHospital onHospitalAdded={onHospitalAdded} />
                <AddDoctor onDoctorAdded={onDoctorAdded} />
                </>
            }
            {(currentAccountStatus === 1)&&
                <>
                    <h1>Patient Page</h1>
                    <MyRecords records={myRecords} />
                    {/*  See doctors request for medical history */}
                    <DoctorsRequestForMedicalHistory/>
                    <HospitalList hospitals={hospitals} />

                </>

            }
    
        </>
    )
}

export default Dashboard;