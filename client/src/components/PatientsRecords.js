import React, { useEffect, useState } from 'react';
import RecordCard from './RecordCard';
import { getRecordHistoryOfPatient } from '../api/ehrContractApi';

const PatientsRecords = ({ patientAddress }) => {
    const [records, setRecords] = useState([])

    useEffect(() => {
        const getRecords = async () => {
            const records = await getRecordHistoryOfPatient(patientAddress)
            setRecords(records)
        }
        getRecords()
    }, [])


    return (
        <div className='container'>
            <h1>Patient: {patientAddress}</h1>
            {(records !== undefined) ? (<div className='row' >
                {records.map((r) => (
                    <RecordCard record={r} key={r.timestamp._hex} />    
                ))}
            </div>) : "No Records Found"}
        </div>
    );
};

export default PatientsRecords;
