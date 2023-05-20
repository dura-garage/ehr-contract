import React from 'react';
import HospitalCard from './HospitalCard';

const HospitalList = ({ hospitals }) => {
  return (
    <div className='container'>
      <h1>List of Hospitals</h1>
      <ul>
        {hospitals.map((hospital) => (
            <HospitalCard  hospital={hospital} />
        ))}
      </ul>
    </div>
  );
};

export default HospitalList;
