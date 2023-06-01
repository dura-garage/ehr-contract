import { useEffect } from "react"

function HospitalCard({ record, key }) {
    const imageURI = `https://ipfs.io/ipfs/${record.dataHash}`

    useEffect(() => {
        console.log(imageURI)
    }, [])

    
    const timestampToDate = (timestamp) => {
        const timestampNumber = Number(timestamp.toString())
        const date = new Date(timestampNumber)
        const fullDate = date.toLocaleDateString() + " " + date.toLocaleTimeString()
        return fullDate
    }

    return (
        <div className="card m-2" style={{ width: "18rem" }}>
            <img src={imageURI} alt="record" className='card-img-top' />
            <div className="card-body">
                <h5 className="card-text">{timestampToDate(record.timestamp._hex)}</h5>
                <p className="card-text">Doctor: {record.doctor}
                </p>
            </div>
        </div>
    )
}

export default HospitalCard