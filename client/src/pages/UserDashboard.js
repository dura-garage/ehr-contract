import { useState, useEffect } from "react";
import { signer, getMyRecords} from "../api/ehrContractApi";

function UserDashboard(){
    const [user, setUser] = useState(null);
    const [records, setRecords] = useState(null);

    useEffect(() => {
        setUser(signer.getAddress());
        getMyRecords().then((records) => {
            setRecords(records);
        }
        );
    }, []);

    return (
        <div>
            <h1>User Dashboard</h1>
            <h2>My Address: {user}</h2>
            <h2>My Records:</h2>
            <ul>
                {records && records.map((record) => {
                    return <li key={record}>{record}</li>
                }
                )}
            </ul>
        </div>
    ); 

}

export default UserDashboard;