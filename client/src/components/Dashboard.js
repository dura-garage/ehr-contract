import React, { useEffect, useState, useContext } from 'react'
import AddHospital from './AddHospital';
import AddDoctor from './AddDoctor';
import { getAllHospitals, getDoctorsOfHospital, getMyRecords } from '../api/ehrContractApi';
import HospitalList from './HospitalsList';
import AddDoctorToHospital from './AddDoctorToHospital';
import DoctorsList from './DoctorsList';
import SendRecordToPatient from './SendRecord';
import MyRecords from './MyRecords';
import GrantAccessToMedicalHistory from './GrantAccessToMedicalHistory';
import EhrContext from '../context/ehrContext';
import AccessStatusDoctor from './AccessStatusDoctor';
import AccessStatusPatient from './AccessStatusPatient';

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

        async function fetchData() {
            const hs = await getAllHospitals()
            setHospitals(hs)
            // get my records
            const rs = await getMyRecords(currentAccount)
            console.log("My Records: ", rs)
            setMyRecords(rs)
        }


        if (currentAccountStatus === 1) {
            fetchData()
        }
    }, [])


    useEffect(() => {

        async function fetchData() {

            //only the hospital has access to doctors
            if (currentAccountStatus === 3) {
                // get all doctors of hospital
                const ds = await getDoctorsOfHospital(currentAccount)
                setDoctors([...ds])
            }
            //assuming that only patient can have records
            if (currentAccountStatus === 1) {
                // get all hospitals
                const hs = await getAllHospitals()
                setHospitals([...hs])

                // get my records
                const rs = await getMyRecords(currentAccount)
                console.log("My Records: ", rs)
                setMyRecords([...rs])
            }
        }
        fetchData()
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
                    <AccessStatusDoctor />

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
            {(currentAccountStatus === 1) && !isCurrentAccountOwner &&
                <>
                    <h1>Patient Page</h1>
                    <MyRecords records={myRecords} />
                    {/*  See doctors request for medical history */}

                    <GrantAccessToMedicalHistory />
                    <AccessStatusPatient />
                    <HospitalList hospitals={hospitals} />

                </>

            }

        </>
    )
}

export default Dashboard;