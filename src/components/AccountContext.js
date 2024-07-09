import React, { createContext, useState, useContext } from 'react';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [selectedSourceAccount, setSelectedSourceAccount] = useState('');
  const [selectedDestinationAccount, setSelectedDestinationAccount] = useState('');

  return (
    <AccountContext.Provider
      value={{
        selectedSourceAccount,
        setSelectedSourceAccount,
        selectedDestinationAccount,
        setSelectedDestinationAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);
