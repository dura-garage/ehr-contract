import React from 'react';
import HospitalCard from './HospitalCard';

const HospitalList = ({ hospitals }) => {
  return (
    <div className='container'>
      <h1>List of Hospitals</h1>
      <div className="row">
        {hospitals.map((hospital) => (
            <HospitalCard  hospital={hospital} />
        ))}
      </div>
    </div>
  );
};

export default HospitalList;
