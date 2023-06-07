import React from 'react';
import RecordCard from './RecordCard';
const MyRecords = ({ records }) => {


    return (
        <div className='container'>
            <h1>My Records</h1>
            {(records !== undefined) ? (<div className='row' >
                {records.map((r) => (
                    <RecordCard record={r} key={r.timestamp._hex} />    
                ))}
            </div>) : "No Records Found"}
        </div>
    );
};

export default MyRecords;
