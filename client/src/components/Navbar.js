import { useState, useEffect } from 'react'
import { getUserStatus, registerUser } from '../api/ehrContractApi'




function Navbar() {
    const [account, setAccount] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    const [userStatus, setUserStatus] = useState(null)

    useEffect(() => {
        const getAccount = async () => {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            setAccount(accounts[0])
            getUserStatus(accounts[0]).then((result) => {
                console.log("User Status: ", result)
                setUserStatus(result)
            })
            console.log("Connected: ", accounts[0])
            setIsConnected(true)
        }
        getAccount()
    }, [])

    // detect account change and update state
    useEffect(() => {
        const accountChange = async () => {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    console.log('Please connect to MetaMask.')
                    setIsConnected(false)
                } else if (accounts[0] !== account) {
                    setAccount(accounts[0])
                    getUserStatus(accounts[0]).then((result) => {
                        console.log("User Status: ", result)
                        setUserStatus(result)
                    })
                    console.log("Connected: ", accounts[0])
                    setIsConnected(true)
                }
            })
        }
        accountChange()
    }, [account])

    //update the user status after registering the user
    useEffect(() => {
        const updateStatus = async () => {
            if (account !== null) {
                getUserStatus(account).then((result) => {
                    console.log("User Status: ", result)
                    setUserStatus(result)
                })
            }
        }
        updateStatus()
    }, [account])



    const handleConnectWallet = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])
        getUserStatus(accounts[0]).then((result) => {
            console.log("User Status: ", result)
            setUserStatus(result)
        })
        console.log("Connected: ", accounts[0])
        setIsConnected(true)
    }

    const handleUserRegister = async () => {
        const result = await registerUser()
        console.log("Event: ", result.events[0].event)
        setUserStatus(getUserStatus(account))
        console.log("User Status: ", userStatus)
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">MyApp</a>
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
                                isConnected ? account : "Connect Wallet"
                            }
                        </button>
                        {isConnected && <button className={`btn btn-outline-success mx-1 ${(userStatus > 0) ? "d-none" : ''}`} onClick={handleUserRegister}  >
                            Register
                        </button>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar