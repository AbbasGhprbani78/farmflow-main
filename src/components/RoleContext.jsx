
import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState(null);

  const updateSharedData = (data) => {
    setSharedData(data);
  };

  return (
    <MyContext.Provider value={{ sharedData, updateSharedData }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
