import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase/firebase";

const userContext = createContext({});

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserInfo(user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return (
    <userContext.Provider
      value={{
        user: userInfo,
        setUserInfo,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export { userContext };
export default UserProvider;
