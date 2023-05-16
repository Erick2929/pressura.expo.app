import { onAuthStateChanged } from "firebase/auth";
import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import ViewButton from "../../../components/viewButton";
import { auth } from "../../../config/firebase/firebase";
import { useSession } from "../../../providers/session";
import { useUser } from "../../../providers/user";
import { MaterialIcons } from "@expo/vector-icons";
import { themeColors } from "../../../config/theme";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Isotype from "../../../assets/logos/pressura-logo.png";
import MainButton from "../../../components/mainButton";

function MainScreen() {
  const { logout } = useSession();
  const [userInfo, setUserInfo] = useState({});
  const [userName, setUserName] = useState("");
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

      {userName ? (
        <Text fontSize={30} mt={2} color={themeColors.primario}>
          Buen dia {userName}
        </Text>
      ) : (
        <Text fontSize={30} mt={2} color={themeColors.primario}>
          {userInfo.email}
        </Text>
      )}

      <VStack w={"100%"} alignItems='center' space={2} mt={4}>
        <MainButton title={"Tomar presión"} w='82%'>
          <FontAwesome name='heart' size={24} color='white' />
        </MainButton>

        <HStack w={"100%"} justifyContent='center' space={2}>
          <MainButton title={"Perfil"} w='40%'>
            <Ionicons name='person-circle-outline' size={24} color='white' />
          </MainButton>
          <MainButton title={"Hábitos"} w='40%'>
            <FontAwesome name='apple' size={24} color='white' />
          </MainButton>
        </HStack>

        <HStack w={"100%"} justifyContent='center' space={2}>
          <MainButton title={"Doctores"} w='40%'>
            <Ionicons name='medkit' size={24} color='white' />
          </MainButton>
          <MainButton title={"Historial"} w='40%'>
            <FontAwesome name='list-alt' size={24} color='white' />
          </MainButton>
        </HStack>
      </VStack>
    </Center>
  );
}

export default MainScreen;
