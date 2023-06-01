import { useContext} from 'react'
import EhrContext from '../context/ehrContext'

function Navbar() {
    const { 
        isConnected,
        currentAccount, 
        isCurrentAccountOwner,
        currentAccountStatus, 
        handleConnectWallet,
        handleUserRegister
        } = useContext(EhrContext)


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">DHR</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                    </ul>
                    <div className="d-flex">

                        <button className="btn btn-outline-success" disabled={isConnected} onClick={handleConnectWallet}>
                            {
                                isConnected ? currentAccount : "Connect Wallet"
                            }
                        </button>
                        {isConnected && !isCurrentAccountOwner && <button className={`btn btn-outline-success mx-1 ${(currentAccountStatus > 0) ? "d-none" : ''}`} onClick={handleUserRegister}  >
                            Register
                        </button>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar