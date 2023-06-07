import { ethers } from "ethers";

import ehrArtifact from "../constants/ehr.json";
import contractAddress from "../constants/contract-address.json";


const provider = new ethers.providers.Web3Provider(
    window.ethereum
);

// for get functions
const ehr = new ethers.Contract(
    contractAddress.ehr,
    ehrArtifact.abi,
    provider
);

// for external functions
const signer = provider.getSigner()
const contractMethod = new ethers.Contract(
    contractAddress.ehr,
    ehrArtifact.abi,
    signer
)

const registerUser = async () => {
    const result = await contractMethod.registerUser()
    return await result.wait()
}

const getUserStatus = async (userAccount) => {
    const status = await ehr.getUserStatus(userAccount)
    return status
}

const getUserDoctors = async (patientAddress) => {
    const doctors = await ehr.getUserDoctors(patientAddress)
    return doctors
}

const getUserPatients = async (doctorAddress) => {
    const patients = await ehr.getUserPatients(doctorAddress)
    return patients
}

const registerDoctor = async (doctorAddress) => {
    return contractMethod.registerDoctor(doctorAddress)
}

const registerHospital = async (hospitalAddress, hospitalName, hospitalLogoHash) => {
    const response = await contractMethod.registerHospital(hospitalAddress, hospitalName, hospitalLogoHash)
    return await response.wait()
}

const getAllHospitals = async () => {
    const hospitals = await ehr.getAllHospitals()
    return hospitals
}

const addDoctorToHospital = async (doctorAddress) => {
    const response = await contractMethod.addDoctorToHospital(doctorAddress)
    return await response.wait()
}

const getDoctorsOfHospital = async (hospitalAddress) => {
    const doctors = await ehr.getDoctors(hospitalAddress)
    return doctors
}

const sendRecordToPatient = async (patientAddress, recordHash) => {
    console.log("patientAddress: ", patientAddress)
    const response = await contractMethod.sendRecordToPatient(patientAddress, recordHash)
    return response
}

const getMyRecords = async () => {
    const currentAccount = await signer.getAddress()
    const records = await ehr.getMyRecords({ from: currentAccount})
    return records // array of record hash
}

// const requestAccessToRecordHistory = async (patientAddress) => {
//     return await contractMethod.requestAccessToRecordHistory(patientAddress)
// }

const grantAccessToRecordHistory = async (doctorAddress) => {
    return await contractMethod.grantAccessToRecordHistory(doctorAddress)
}

const revokeAccessToRecordHistory = async (doctorAddress) => {
    return await contractMethod.revokeAccessToRecordHistory(doctorAddress)
}

const getAccessStatus = async (patientAddress, doctorAddress) => {
    const status = await ehr.getAccessStatus(patientAddress, doctorAddress)
    return status
}

// const getRequestStatus = async (patientAddress, doctorAddress) => {
//     const status = await ehr.getRequestStatus(patientAddress, doctorAddress)
//     return status
// }

const getRecordHistoryOfPatient = async (patientAddress) => {
    const records = await ehr.getRecordHistoryOfPatient(patientAddress)
    return records
}

const isOwner = async (userAddress) => {
    const owner = await ehr.getOwner()
    const result = owner.toLowerCase() === userAddress
    return result
}



export {
    ehr,
    contractMethod,
    signer,
    isOwner,
    registerUser,
    getUserStatus,
    getUserDoctors,
    getUserPatients,
    registerDoctor,
    registerHospital,
    getAllHospitals,
    addDoctorToHospital,
    getDoctorsOfHospital,
    sendRecordToPatient,
    getMyRecords,
    grantAccessToRecordHistory,
    revokeAccessToRecordHistory,
    getAccessStatus,
    getRecordHistoryOfPatient
};
