import { onAuthStateChanged } from "firebase/auth";
import { Center, Flex, ScrollView, Text } from "native-base";
import React, { useEffect, useState } from "react";
import ViewButton from "../../../components/viewButton";
import { auth } from "../../../config/firebase/firebase";
import { useSession } from "../../../providers/session";
import { useUser } from "../../../providers/user";

function MainScreen() {
  const { logout } = useSession();
  const [userInfo, setUserInfo] = useState({});
  // const { user, setUserInfo } = useUser();

  const handleLogout = () => {
    logout();
  };

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
    <Center safeArea flex={1} h={"full"} justifyContent='flex-start'>
      <Text>{userInfo.email}</Text>
      <ViewButton action={logout}>Cerrar Sesion</ViewButton>
    </Center>
  );
}

export default MainScreen;
