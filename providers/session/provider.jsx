import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../config/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const sessionContext = createContext({});

const SessionProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleCreatePatient = async (uid, name, email) => {
    await setDoc(doc(db, "Paciente", uid), {
      Nombre: name,
      Correo: email,
    });
  };

  const register = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log("user: ", user);
        handleCreatePatient(user.uid, name, email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    setIsLogged(true);
  };

  // const handleLogin = async () => {
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoginError(false);
        const user = userCredential.user;
        setIsLogged(true);
      })
      .catch((error) => {
        setLoginError(true);
      });
  };

  // const handleLogin = async () => {
  const logout = (email, password) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsLogged(false);
      })
      .catch((error) => {
        // An error happened.
      });
    // setIsLogged(false);
  };

  return (
    <sessionContext.Provider
      value={{
        isLogged,
        loginError,
        login,
        logout,
        register,
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
