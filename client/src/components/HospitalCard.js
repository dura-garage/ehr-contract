import { useEffect } from "react"

function HospitalCard({ hospital, key }) {
    const imageURI = `https://ipfs.io/ipfs/${hospital.image}`
    return (
        <div className="card m-2" style={{ width: "18rem" }}>
            <img src={imageURI} className="card-img-top" alt={`${hospital.name}`} />
            <div className="card-body">
                <h5 className="card-title">{hospital.name}</h5>
                <p className="card-text">{hospital.admin}</p>
            </div>
        </div>
    )
}

export default HospitalCard