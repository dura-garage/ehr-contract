import { useEffect, useState } from "react";
import { registerHospital } from "../api/ehrContractApi";


function AdminDashboard(){

    return(
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Register Hospital:</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                registerHospital(e.target[0].value, e.target[1].value, e.target[2].value);
            }}>
                <input type="text" placeholder="Hospital Address" required/>
                <input type="text" placeholder="Hospital Name" required/>
                {/* <input type="text" placeholder="Hospital Logo Hash" required/> file upload*/}
                <button type="submit">Register</button>
            </form>
            <br />
            <br />
            
        </div>

    )



        

}

export default AdminDashboard;