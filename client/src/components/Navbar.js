import { useContext, useEffect, useState } from 'react'
import { getUserStatus, registerUser, isOwner } from '../api/ehrContractApi'
import EhrContext from '../context/ehrContext'




function Navbar() {
    // const [account, setAccount] = useState(null)
    // const [isConnected, setIsConnected] = useState(false)
    // const [userStatus, setUserStatus] = useState(null)

    const { currentAccount, currentAccountStatus, isCurrentAccountOwner, setCurrentAccountFunc, setCurrentAccountStatusFunc, setIsCurrentAccountOwnerFunc } = useContext(EhrContext)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        const getAccount = async () => {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            setCurrentAccountFunc(accounts[0])
            setIsCurrentAccountOwnerFunc(isOwner(accounts[0]))
            console.log("From Navbar isOwner: ", isCurrentAccountOwner)
            setIsConnected(true)
            //save to local storage
            localStorage.setItem("account", accounts[0])

            getUserStatus(accounts[0]).then((result) => {
                setCurrentAccountStatusFunc(result)
            })
        }
        getAccount()
    }, [])



    // detect account change and update state
    useEffect(() => {
        const accountChange = async () => {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    console.log('Please connect to MetaMask.')
                } else if (accounts[0] !== currentAccount) {
                    setCurrentAccountFunc(accounts[0])
                    setIsCurrentAccountOwnerFunc(isOwner(currentAccount))
                    setIsConnected(true)
                    //update the local storage
                    localStorage.setItem("account", accounts[0])
                    //agin get the user status
                    getUserStatus(accounts[0]).then((result) => {
                        setCurrentAccountStatusFunc(result)
                    })
                }
            })
        }
        accountChange()
    }, [currentAccount, currentAccountStatus])


    //update the user status after registering the user
    useEffect(() => {
        const updateStatus = async () => {
            if (currentAccount !== null) {
                localStorage.setItem("account", currentAccount)
                setIsCurrentAccountOwnerFunc(isOwner(currentAccount))
                setIsConnected(true)
                getUserStatus(currentAccount).then((result) => {
                    console.log("User Status: ", result)
                    setCurrentAccountStatusFunc(result)
                })
            }
        }
        updateStatus()
    }, [currentAccount])



    const handleConnectWallet = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setCurrentAccountFunc(accounts[0])
        setIsCurrentAccountOwnerFunc(isOwner(currentAccount))
        setIsConnected(true)
        localStorage.setItem('account', accounts[0])
        getUserStatus(accounts[0]).then((result) => {
            setCurrentAccountStatusFunc(result)
        })
    }

    const handleUserRegister = async () => {
        const result = await registerUser()
        console.log("Event: ", result.events[0].event)
        setCurrentAccountStatusFunc(getUserStatus(currentAccount))
        setIsCurrentAccountOwnerFunc(isOwner(currentAccount))
    }

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
                        {isConnected && <button className={`btn btn-outline-success mx-1 ${(currentAccountStatus > 0) ? "d-none" : ''}`} onClick={handleUserRegister}  >
                            Register
                        </button>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar