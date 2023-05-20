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
    const result = await  contractMethod.registerUser()
    return await result.wait()
}

const getUserStatus = async (userAccount) => {
    const status = await ehr.getUserStatus(userAccount)
    return status
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
    const response=await contractMethod.addDoctorToHospital(doctorAddress)
    return await response.wait()
}

const getDoctorsOfHospital = async (hospitalAddress) => {
    const doctors = await ehr.getDoctors(hospitalAddress)
    return doctors
}

const sendRecordToPatient = async (patientAddress, recordHash) => {
    const response= await contractMethod.sendRecordToPatient(patientAddress, recordHash)
    return await response.wait()
}

const getMyRecords = async () => {
    const records = await ehr.getMyRecords()
    return records // array of record hash
}

const requestAccessToRecordHistory = async (patientAddress) => {
    return contractMethod.requestAccessToRecordHistory(patientAddress)
}

const grantAccessToRecordHistory = async (doctorAddress) => {
    return contractMethod.grantAccessToRecordHistory(doctorAddress)
}

const revokeAccessToRecordHistory = async (doctorAddress) => {
    return contractMethod.revokeAccessToRecordHistory(doctorAddress)
}

const getAccessStatus = async (doctorAddress) => {
    const status = await ehr.getAccessStatus(doctorAddress)
    return status
}

const getRequestStatus = async (patientAddress) => {
    const status = await ehr.getRequestStatus(patientAddress)
    return status
}

const getRecordHistoryOfPatient = async (patientAddress) => {
    const records = await ehr.getRecordHistoryOfPatient(patientAddress)
    return records
}

const owner = () => {
    const owner = ehr.getOwner()
    owner.then((result) => {
        return result
    }
    )
}

export {
    ehr, 
    contractMethod,
    signer,
    owner,
    registerUser,
    getUserStatus,
    registerDoctor,
    registerHospital,
    getAllHospitals,
    addDoctorToHospital,
    getDoctorsOfHospital,
    
    sendRecordToPatient,
    getMyRecords,
    requestAccessToRecordHistory,
    grantAccessToRecordHistory,
    revokeAccessToRecordHistory,
    getAccessStatus,
    getRequestStatus,
    getRecordHistoryOfPatient
};
