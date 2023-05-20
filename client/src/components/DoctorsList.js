import React from 'react';

const DoctorsList = ({ doctors }) => {
  return (
    <div className='container'>
      <h1>Doctors List</h1>
      <ol className='list-group list-group-numbered'>
        {doctors.map((d) => (
            <li key={d.id} className='list-group-item'>{d}</li>
        ))}
      </ol>
    </div>
  );
};

export default DoctorsList;
