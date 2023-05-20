import React, { useEffect, useState } from 'react'
import AddHospital from './AddHospital';
import AddDoctor from './AddDoctor';
import { getUserStatus, getAllHospitals, getDoctorsOfHospital, getMyRecords } from '../api/ehrContractApi';
import HospitalList from './HospitalsList';
import AddDoctorToHospital from './AddDoctorToHospital';
import DoctorsList from './DoctorsList';
import SendRecordToPatient from './SendRecord';
import MyRecords from './MyRecords';

function Dashboard() {
    const [userStatus, setUserStatus] = useState(null)
    const [account, setAccount] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    const [hospitals, setHospitals] = useState([])
    const [doctors, setDoctors] = useState([])
    const [myRecords, setMyRecords] = useState([])



    useEffect(() => {
        setAccount(window.ethereum.selectedAddress)
        getUserStatus(window.ethereum.selectedAddress).then((result) => {
            console.log("User Status: ", result)
            setUserStatus(result)
        })
        setIsConnected(true)

        getMyRecords().then((result) => {
            console.log("My Records: ", result)
            setMyRecords([...result])
        }
        )

    }, [])


    useEffect(() => {
        if (userStatus > 0) {
            // get all hospitals
            getAllHospitals().then((result) => {
                console.log("All Hospitals: ", result)
                setHospitals(result)
            }
            )
        }
    }, [userStatus])



    useEffect(() => {
        if (userStatus === 3) {
            // get all doctors of hospital
            getDoctorsOfHospital(account).then((result) => {
                console.log("All Doctors: ", result)
                setDoctors([...result])
            })
        }
    }, [userStatus, account])


    // detect account change and update account and user status
    useEffect(() => {
        const accountChange = async () => {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    console.log('Please connect to MetaMask.')
                    setIsConnected(false)
                } else if (accounts[0] !== account) {
                    setAccount(accounts[0])
                    getUserStatus(accounts[0]).then((result) => {
                        console.log("User Status: ", result)
                        setUserStatus(result)
                    })
                    console.log("Connected: ", accounts[0])
                    setIsConnected(true)
                }
            })
        }
        accountChange()

    }, [account])

    const onHospitalAdded = (h) => {
        setHospitals([...h])
    }

    const onDoctorAdded = (d) => {
        setDoctors([...d])
    }




    return (
        <>
            {/** for admin only */}
            <AddHospital onHospitalAdded={onHospitalAdded} />
            <AddDoctor />

            {/** for hospital admin only */}
            <AddDoctorToHospital onDoctorAdded={onDoctorAdded} />
            <DoctorsList doctors={doctors} />

            {/** for doctor only */}
            <SendRecordToPatient />

            {/** for any user */}
            {/** TODO: update record on user change */}
            <MyRecords records={myRecords} />

            {/** for all users */}
            <HospitalList hospitals={hospitals} />
        </>
    )
}

export default Dashboard;