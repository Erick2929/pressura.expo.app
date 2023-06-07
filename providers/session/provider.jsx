import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../config/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";

const sessionContext = createContext({});

const SessionProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [uid, setUid] = useState("");
  const [userInfo, setUserInfo] = useState({
    // name: "",
    // email: "",
    // height: "",
    // address: 0,
    // dob: "",
    // id: "",
    // weight: 0,
    // gender: "",
  });

  const handleCreatePatient = async (uid, name, email) => {
    await setDoc(doc(db, "Paciente", uid), {
      Altura: 0,
      Nombre: name,
      CorreoElectronico: email,
      Direccion: "",
      FechaDeNacimiento: "",
      IDPaciente: email,
      Peso: 0,
      Sexo: 0,
    });
  };

  const handleReadUserDB = async () => {
    const docRef = doc(db, "Paciente", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const user = docSnap.data();

      setUserInfo(user);

      // escucha el audio en el grupo de wasap Docs y links imprtantes HAZLOOOOOOOOOOOOOOOOOOOOOOOOOOO
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (isLogged) {
      handleReadUserDB();
    }
  }, [isLogged]);

  const register = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        handleCreatePatient(user.uid, name, email);
        setUid(user.uid);
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
        setUid(user.uid);
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
        userInfo,
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
