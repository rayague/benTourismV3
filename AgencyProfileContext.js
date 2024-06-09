// AgencyProfileContext.js
import React, { createContext, useContext, useState } from "react";

const AgencyProfileContext = createContext();

export const AgencyProfileProvider = ({ children }) => {
  const [agencyProfile, setAgencyProfile] = useState(null);

  return (
    <AgencyProfileContext.Provider value={{ agencyProfile, setAgencyProfile }}>
      {children}
    </AgencyProfileContext.Provider>
  );
};

export const useAgencyProfile = () => useContext(AgencyProfileContext);
