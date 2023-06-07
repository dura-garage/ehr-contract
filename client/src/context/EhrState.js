import React, { useState, useEffect } from 'react'
import EhrContext from './ehrContext'
import { getUserStatus, registerUser, isOwner } from '../api/ehrContractApi'


export default function EhrState(props) {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [currentAccountStatus, setCurrentAccountStatus] = useState(0)
  const [isCurrentAccountOwner, setIsCurrentAccountOwner] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [refreshRequired, setRefreshRequired] = useState(false)

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0]);
        const result = await isOwner(accounts[0]);
        setIsCurrentAccountOwner(result);
        setIsConnected(true)
        localStorage.setItem('account', accounts[0])
        getUserStatus(accounts[0]).then((result) => {
          setCurrentAccountStatus(result);
        }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleUserRegister = async () => {
    const userResult = await registerUser()
    setCurrentAccountStatus(getUserStatus(currentAccount))
    //force refresh
    window.location.reload();
  }



  useEffect(() => {
    async function getAccount() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
      localStorage.setItem('account', accounts[0]);
      const result = await isOwner(accounts[0]);
      setIsCurrentAccountOwner(result);
      setIsConnected(true);
      getUserStatus(accounts[0]).then((result) => {
        setCurrentAccountStatus(result);
      });
    }

    if (localStorage.getItem('account') !== null) {
      getAccount();
    }
  }, []);

  useEffect(() => {
    async function handleAccountChange() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
        const result = await isOwner(accounts[0]);
        setIsCurrentAccountOwner(result);
        getUserStatus(accounts[0]).then((result) => {
          setCurrentAccountStatus(result);
        });
      }
    }

    window.ethereum.on('accountsChanged', handleAccountChange);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountChange);
    };
  }, [currentAccount])

  useEffect(() => {
    const updateStatus = async () => {
      if (currentAccount !== null) {
        setIsCurrentAccountOwner(isOwner(currentAccount))
        setIsConnected(true)
        getUserStatus(currentAccount).then((result) => {
          setCurrentAccountStatus(result)
        })
      }
    }
    updateStatus()
  }, [currentAccount])

  return (
    <EhrContext.Provider value={{
      isConnected,
      isCurrentAccountOwner,
      currentAccount,
      currentAccountStatus,
      setIsConnected,
      handleConnectWallet,
      handleUserRegister,
      refreshRequired,
      setRefreshRequired

    }}>
      {props.children}
    </EhrContext.Provider>
  )
}
