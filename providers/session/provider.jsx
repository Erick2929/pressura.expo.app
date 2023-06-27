import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../config/firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

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

  const createUserValues = async (collectionName, paramObj) => {
    try {
      const collectionRef = collection(db, collectionName);
      await addDoc(collectionRef, paramObj);
      console.log("Documento actualizado exitosamente!");
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
    }
  };

  const updateUserValues = async (collection, document, paramObj) => {
    try {
      const docRef = doc(db, collection, document);
      await updateDoc(docRef, paramObj);
      console.log("Documento actualizado exitosamente!");
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
    }
    refetchUser();
  };

  const deleteDocument = async (collection, document) => {
    try {
      await deleteDoc(doc(db, collection, document));
      console.log("Document has been deleted sucessfully!");
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const handleCreatePatient = async (uid, name, email) => {
    await setDoc(doc(db, "Paciente", uid), {
      Altura: 0,
      Nombre: name,
      CorreoElectronico: email,
      Direccion: "",
      FechaNacimiento: new Date(),
      IDPaciente: email,
      Peso: 0,
      Sexo: 0,
    });
  };

  const handleReadUserDB = async () => {
    try {
      const docRef = doc(db, "Paciente", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const user = docSnap.data();
        if (user?.FechaNacimiento) {
          user.FechaNacimiento = user.FechaNacimiento.toDate();
        }
        // console.log("Usuarioooooo: ", user);
        setUserInfo(user);
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const refetchUser = () => {
    handleReadUserDB();
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
        logout();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error Register: ", errorMessage);
        alert(errorMessage);
        // ..
      });
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
        setIsLogged(false);
        setUserInfo({});
        setUid("");
      })
      .catch((error) => {
        console.log("Error at logout: ", error);
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
        updateUserValues,
        createUserValues,
        uid,
        refetchUser,
        deleteDocument,
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
