import React from 'react'

function HospitalCard({hospital, key}) {

    return (
        <div className="card m-1" style={{widhth:"18rem"}}>
            <img src={`https://ipfs.io/ipfs/${hospital.image}`} className="card-img-top" alt={`${hospital.name}`}/>
                <div className="card-body">
                    <h5 className="card-title">{hospital.name}</h5>
                    <p className="card-text">{hospital.admin}</p>
                </div>
        </div>
    )
}

export default HospitalCard