import React from 'react';
const MyRecords = ({ records }) => {

    const timestampToDate = (timestamp) => {
        const timestampNumber = Number(timestamp.toString())
        const date = new Date(timestampNumber)
        const fullDate = date.toLocaleDateString() + " " + date.toLocaleTimeString()
        return fullDate
    }


    return (
        <div className='container'>
            <h1>My Records</h1>
            {(records !== undefined) ? (<ul>
                {records.map((r) => (

                    <div className="card m-2" style={{width: "18rem"}}>
                            <img src={`https://ipfs.io/ipfs/${r.dataHash}`} alt="record" className='card-img-top' />
                            <div className="card-body">
                                <h5 className="card-text">{timestampToDate(r.timestamp._hex)}</h5>
                                <p className="card-text">Doctor: {r.doctor}
                                </p>
                            </div>
                    </div>
                ))}
            </ul>) : "No Records Found"}
        </div>
    );
};

export default MyRecords;
