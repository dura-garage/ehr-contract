import React, { useEffect, useState, useContext } from 'react'
import AddHospital from './AddHospital';
import AddDoctor from './AddDoctor';
import { getUserStatus, getAllHospitals, getDoctorsOfHospital, getMyRecords, isOwner } from '../api/ehrContractApi';
import HospitalList from './HospitalsList';
import AddDoctorToHospital from './AddDoctorToHospital';
import DoctorsList from './DoctorsList';
import SendRecordToPatient from './SendRecord';
import MyRecords from './MyRecords';
import EhrContext from '../context/ehrContext';

function Dashboard() {
    const [hospitals, setHospitals] = useState([])
    const [doctors, setDoctors] = useState([])
    const [myRecords, setMyRecords] = useState([])

    const { currentAccount, currentAccountStatus, isCurrentAccountOwner, setCurrentAccountFunc, setCurrentAccountStatusFunc, setIsCurrentAccountOwnerFunc } = useContext(EhrContext)



    useEffect(() => {
        if (localStorage.getItem("account") !== null) {
            setCurrentAccountFunc(localStorage.getItem("account"))
            getUserStatus(localStorage.getItem("account")).then((result) => {
                setCurrentAccountStatusFunc(result)
            })
            setIsCurrentAccountOwnerFunc(isOwner(localStorage.getItem("account").toLowerCase()))

            getMyRecords().then((result) => {
                console.log("My Records: ", result)
                setMyRecords([...result])
            }
            )
        }
        else {
            // alert the user to connect to metamask

        }

    }, [])


    useEffect(() => {
        if (currentAccountStatus > 0) {
            // get all hospitals
            getAllHospitals().then((result) => {
                console.log("All Hospitals: ", result)
                setHospitals(result)
            }
            )
        }
        if (currentAccountStatus === 3) {
            // get all doctors of hospital
            getDoctorsOfHospital(currentAccount).then((result) => {
                console.log("All Doctors: ", result)
                setDoctors([...result])
            })
        }
    }, [currentAccountStatus, currentAccount])


    // detect account change and update state
    useEffect(() => {
        const accountChange = async () => {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    console.log('Please connect to MetaMask.')
                } else if (accounts[0] !== currentAccount) {
                    setCurrentAccountFunc(accounts[0])
                    localStorage.setItem("account", accounts[0])
                    setIsCurrentAccountOwnerFunc(isOwner(localStorage.getItem("account").toLowerCase()))
                    getUserStatus(accounts[0]).then((result) => {
                        setCurrentAccountStatusFunc(result)
                    })
                }
            })
        }
        accountChange()
    }, [currentAccount])


    const onHospitalAdded = (h) => {
        setHospitals([...h])
    }

    const onDoctorAdded = (d) => {
        setDoctors([...d])
    }




    return (
        <>
            {currentAccountStatus === 0 && <h1>Please Register Yourself</h1>}

            {(currentAccountStatus === 1 || currentAccountStatus === 2)&&
                <>
                    <h1>Patient Page</h1>
                    <MyRecords records={myRecords} />
                    <HospitalList hospitals={hospitals} />
                </>

            }

            {currentAccountStatus === 2 &&
                <>
                    <h1>Doctor Page</h1>
                    <AddHospital onHospitalAdded={onHospitalAdded} />
                </>
            }

            {currentAccountStatus === 3 &&
                <>
                    <h1>Hospital Page</h1>
                    <AddDoctorToHospital onDoctorAdded={onDoctorAdded} />
                    <DoctorsList doctors={doctors} />
                </>
            }


                Is Owner: {isCurrentAccountOwner.toString()}
                
            
            {
                isCurrentAccountOwner &&
                <>
                    <h1>Owner Page</h1>   
                    <AddHospital onHospitalAdded={onHospitalAdded} />  
                    <AddDoctor />
                </>
            }

        </>
    )
}

export default Dashboard;