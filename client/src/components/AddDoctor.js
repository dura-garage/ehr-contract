import { registerDoctor } from '../api/ehrContractApi';

function AddDoctor() {
    const handleAddDoctor = async (e) => {
        e.preventDefault();
        const doctorAddress = document.getElementById("doctorAddress").value;
        const response = await registerDoctor(doctorAddress);
        console.log("Doctor Registration Response: ", response);
    }

    return (
        <>
            <div className="container">
                <h1>Add Doctor</h1>
                <form onSubmit={handleAddDoctor}>
                    <div className="mb-3">
                        <label htmlFor="doctorAddress" className="form-label">Doctor's Ethereum Address</label>
                        <input type="text" className="form-control" id="doctorAddress" placeholder="0x03434eb5fF29E7883C5fD54c90dF4e6A59fA3D03" required />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Add Doctor</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddDoctor