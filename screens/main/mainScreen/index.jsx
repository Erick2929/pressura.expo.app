import React, { useEffect, useState } from "react";
import { useSession } from "../../../providers/session";
import { useUser } from "../../../providers/user";
import Isotype from "../../../assets/logos/pressura-logo.png";
import {
  Center,
  Box,
  Flex,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { themeColors } from "../../../config/theme";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import MainButton from "../../../components/mainButton";
import { Alert } from "react-native";

function MainScreen({ navigation }) {
  const { logout } = useSession();
  const { userInfo, createUserValues } = useSession();

  const creditos =
    "Pressura ha sido desarrollado por estudiantes del Tecnológico de Monterrey durante el semestre Febrero Junio de 2023, como parte del módulo Desarrollo de Aplicaciones para Dispositivos Móviles del bloque TC2007B y asesorados por la maestra Yolanda Martínez Treviño. Desarrollador: Erick Francisco Siller Ojeda. Pressura se distribuye como está de manera gratuita y se prohíbe su distribución y uso con fines de lucro.";

  const showCredtisAlert = () => {
    Alert.alert("Créditos", creditos, [
      {
        text: "Ok",
      },
    ]);
  };

  return (
    <Center safeArea flex={1} h={"full"} justifyContent='flex-start'>
      <Flex w={"90%"} mt={1} justifyContent='space-between' direction='row'>
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
        <Pressable onPress={showCredtisAlert}>
          <Box
            paddingX={3}
            paddingY={1}
            bgColor={themeColors.primario}
            borderRadius={4}
          >
            <MaterialIcons name='info-outline' size={24} color='white' />
          </Box>
        </Pressable>
      </Flex>
      <Flex
        w='100%'
        h={"85%"}
        direction='column'
        alignItems={"center"}
        justifyContent='center'
      >
        <Image
          style={{ height: 100, width: 125 }}
          alt='logo'
          source={Isotype}
          marginTop={8}
        />

        {userInfo.Nombre ? (
          <Text fontSize={30} mt={2} color={themeColors.primario}>
            Buen dia {userInfo.Nombre}
          </Text>
        ) : (
          <Text fontSize={30} mt={2} color={themeColors.primario}>
            {userInfo.CorreoElectronico}
          </Text>
        )}

        <VStack w={"100%"} alignItems='center' space={2} mt={4}>
          <MainButton
            title={"Tomar presión"}
            w='82%'
            action={() => navigation.navigate("EmotionalState")}
          >
            <FontAwesome name='heart' size={24} color='white' />
          </MainButton>

          <HStack w={"100%"} justifyContent='center' space={2}>
            <MainButton
              action={() => navigation.navigate("Profile")}
              title={"Perfil"}
              w='40%'
            >
              <Ionicons name='person-circle-outline' size={24} color='white' />
            </MainButton>
            <MainButton
              action={() => navigation.navigate("Habits")}
              title={"Hábitos"}
              w='40%'
            >
              <FontAwesome name='apple' size={24} color='white' />
            </MainButton>
          </HStack>

          <HStack w={"100%"} justifyContent='center' space={2}>
            <MainButton
              action={() => navigation.navigate("Doctors")}
              title={"Doctores"}
              w='40%'
            >
              <Ionicons name='medkit' size={24} color='white' />
            </MainButton>
            <MainButton
              action={() => navigation.navigate("History")}
              title={"Historial"}
              w='40%'
            >
              <FontAwesome name='list-alt' size={24} color='white' />
            </MainButton>
          </HStack>
        </VStack>
      </Flex>
    </Center>
  );
}

export default MainScreen;
