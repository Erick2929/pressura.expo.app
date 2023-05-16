import { onAuthStateChanged } from "firebase/auth";
import {
  Box,
  Center,
  Flex,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import ViewButton from "../../../components/viewButton";
import { auth } from "../../../config/firebase/firebase";
import { useSession } from "../../../providers/session";
import { useUser } from "../../../providers/user";
import { MaterialIcons } from "@expo/vector-icons";
import { themeColors } from "../../../config/theme";
import Isotype from "../../../assets/logos/pressura-logo.png";
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

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <Center safeArea flex={1} h={"full"} justifyContent='flex-start'>
      <Flex w={"90%"} mt={1} alignItems='flex-end'>
        <Pressable onPress={logout}>
          <Box
            paddingX={3}
            paddingY={1}
            bgColor={themeColors.primario}
            borderRadius={4}
          >
            <MaterialIcons name='logout' size={24} color='white' />
          </Box>
        </Pressable>
      </Flex>
      <Image
        style={{ height: 100, width: 125 }}
        alt='logo'
        source={Isotype}
        marginTop={8}
      />

      <Text>{userInfo.email}</Text>
      <ViewButton action={logout}>Cerrar Sesion</ViewButton>
    </Center>
  );
}

export default MainScreen;
