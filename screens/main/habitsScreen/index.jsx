import {
  Box,
  Button,
  Center,
  Flex,
  Pressable,
  Stack,
  Text,
  theme,
} from "native-base";
import React, { useState } from "react";
import { themeColors } from "../../../config/theme";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useSession } from "../../../providers/session";

const Habits = ({ navigation }) => {
  const { createUserValues, userInfo } = useSession();
  const [foodQ, setFoodQ] = useState(0);
  const [exerciseQ, setExerciseQ] = useState(0);
  const [medicineQ, setMedicineQ] = useState(0);

  const handleSendInfo = () => {
    createUserValues("Habitos", {
      Ejercicio: exerciseQ,
      Fecha: new Date(),
      IDPaciente: userInfo?.CorreoElectronico,
      Medicamentos: medicineQ,
      RegimenAlimenticio: foodQ,
    });
    navigation.navigate("MainScreen");
  };

  return (
    <Center safeArea flex={1} h={"full"} justifyContent='flex-start'>
      <Flex
        w={"90%"}
        mt={1}
        direction='row'
        justifyContent={"space-between"}
        alignItems='center'
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Box
            paddingX={5}
            paddingY={1}
            bgColor={themeColors.primario}
            borderRadius={4}
          >
            <MaterialIcons name='arrow-back' size={24} color='white' />
          </Box>
        </Pressable>
        <Text
          mt={3}
          fontSize={32}
          color={themeColors.primario}
          fontWeight={700}
        >
          Habitos
        </Text>
        <Pressable>
          <Box
            paddingX={5}
            paddingY={1}
            bgColor={"rgba(0,0,0,0)"}
            borderRadius={4}
          >
            <MaterialIcons name='arrow-back' size={24} color='rgba(0,0,0,0)' />
          </Box>
        </Pressable>
      </Flex>
      <Box mt={10} alignItems='center' w='100%'>
        <Stack space={2} alignItems='center' w='90%' maxW='300'>
          <Text color={themeColors.primario}>
            ¿Te has estado alimentando sanamente?
          </Text>
          <Flex direction='row' justifyContent={"space-between"} w={"100%"}>
            <Text color={themeColors.primario}>No</Text>
            <Text color={themeColors.primario}>Si</Text>
          </Flex>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={100}
            value={50}
            minimumTrackTintColor={themeColors.primario}
            maximumTrackTintColor='gray'
            onValueChange={(v) => {
              setFoodQ(Math.floor(v));
            }}
          />
          <Text color={themeColors.primario}>
            ¿Has estado haciendo ejercicio constante?
          </Text>
          <Flex direction='row' justifyContent={"space-between"} w={"100%"}>
            <Text color={themeColors.primario}>No</Text>
            <Text color={themeColors.primario}>Si</Text>
          </Flex>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={100}
            value={50}
            minimumTrackTintColor={themeColors.primario}
            maximumTrackTintColor='gray'
            onValueChange={(v) => {
              setExerciseQ(Math.floor(v));
            }}
          />
          <Text color={themeColors.primario}>
            ¿Has estado tomando tus medicinas?
          </Text>
          <Flex direction='row' justifyContent={"space-between"} w={"100%"}>
            <Text color={themeColors.primario}>No</Text>
            <Text color={themeColors.primario}>Si</Text>
          </Flex>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={100}
            value={50}
            minimumTrackTintColor={themeColors.primario}
            maximumTrackTintColor='gray'
            onValueChange={(v) => {
              setMedicineQ(Math.floor(v));
            }}
          />
          <Box h={"15%"}></Box>
          <Button
            bg={themeColors.primario}
            marginTop={0}
            style={{ width: "90%", height: 52 }}
            rounded='xl'
            onPress={handleSendInfo}
          >
            <Text fontSize='xl' bold color='#fff'>
              Enviar
            </Text>
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default Habits;
