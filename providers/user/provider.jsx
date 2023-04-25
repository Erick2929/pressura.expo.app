import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase/firebase";
import PropTypes from "prop-types";

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

  useEffect(() => {
    console.log(userInfo);
  }, []);

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

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { userContext };
export default UserProvider;
