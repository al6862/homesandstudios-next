import React, { createContext, useState } from 'react';

export const DataContext = createContext();

// This context provider is passed to any component requiring the context
export const DataProvider = ({ children }) => {
  const [navList, setNavList] = useState();
  const [siteConfig, setSiteConfig] = useState();

  return (
    <DataContext.Provider
      value={{
        navList,
        setNavList,
        siteConfig,
        setSiteConfig,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
