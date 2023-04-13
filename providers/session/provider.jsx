import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const sessionContext = createContext({});

const SessionProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  // const handleLogin = async () => {
  const login = (email, password) => {
    setIsLogged(true);
    // try {
    //   const user = await signInWithEmailAndPassword(auth, email, password);
    //   console.log(user);
    // } catch (error) {
    //   console.log(error.message);
    //   showInvalidEmail();
    // }
  };

  // const handleLogin = async () => {
  const logout = (email, password) => {
    setIsLogged(false);
    // try {
    //   const user = await signInWithEmailAndPassword(auth, email, password);
    //   console.log(user);
    // } catch (error) {
    //   console.log(error.message);
    //   showInvalidEmail();
    // }
  };

  return (
    <sessionContext.Provider
      value={{
        isLogged,
        login,
        logout,
      }}
    >
      {children}
    </sessionContext.Provider>
  );
};

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { sessionContext };
export default SessionProvider;
