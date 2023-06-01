import React, { useState, useEffect } from 'react'
import EhrContext from './ehrContext'
import { ethers } from 'ethers'

export default function EhrState(props) {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [currentAccountStatus, setCurrentAccountStatus] = useState(0)
  const [isCurrentAccountOwner, setIsCurrentAccountOwner] = useState(false)

  const setCurrentAccountFunc = (account) => {
    setCurrentAccount(account)
  }
  const setCurrentAccountStatusFunc = (status) => {
    setCurrentAccountStatus(status)
  }
  const setIsCurrentAccountOwnerFunc = (isOwner) => {
    setIsCurrentAccountOwner(isOwner)
  }

  useEffect(() => {
    async function getAccount() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      setCurrentAccount(accounts[0]);
    }

    getAccount();
  }, []);

  useEffect(() => {
    async function handleAccountChange() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
      }
    }

    window.ethereum.on('accountsChanged', handleAccountChange);

    return () => {
      window.ethereum.off('accountsChanged', handleAccountChange);
    };
  }, [currentAccount]);




  return (
    <EhrContext.Provider value={{
      isCurrentAccountOwner,
      currentAccount,
      currentAccountStatus,
      setCurrentAccountFunc,
      setCurrentAccountStatusFunc,
      setIsCurrentAccountOwnerFunc
    }}>
      {props.children}
    </EhrContext.Provider>
  )
}
