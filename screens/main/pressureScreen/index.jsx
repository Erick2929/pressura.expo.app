import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  HStack,
  Input,
  Pressable,
  Stack,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { themeColors } from "../../../config/theme";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import MainButton from "../../../components/mainButton";
import Timer from "../../../components/timer";

const Pressure = ({ navigation }) => {
  const [sistolicMessure1, setSistolicMessure1] = useState(0);
  const [diastolicMessure1, setDiastolicMessure1] = useState(0);
  const [cardiacPulse1, setCardiacPulse1] = useState(0);
  const [sistolicMessure2, setSistolicMessure2] = useState(null);
  const [diastolicMessure2, setDiastolicMessure2] = useState(null);
  const [cardiacPulse2, setCardiacPulse2] = useState(null);
  const [sistolicMessure3, setSistolicMessure3] = useState(null);
  const [diastolicMessure3, setDiastolicMessure3] = useState(null);
  const [cardiacPulse3, setCardiacPulse3] = useState(null);
  const [meassureCount, setMeassureCount] = useState(0);
  const [timerView, setTimerView] = useState(false);

  const handleNextMeassure = () => {
    setTimerView(true);
    setMeassureCount(meassureCount + 1);
  };

  // ESTAS HACIENDO QUE LAS MEDIDAS YA ESTEN SIENDO CONTADAS CON EL ESTADO DE MEASSURECOUNT
  // DEBES DE HACER QUE YA SEA POSIBLE EL SUBIR LOS DATOS Y PARA ESO PROBABLEMENTE DEBES DE CREAR UNA
  // FUNCION EN EL PROVIDER QUE SE LLAME CREARDATOS O ALGO ASI
  // CHECA LA EMOTIONAL STATE SCREEN

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      {!timerView ? (
        <Center safeArea flex={1} h={"full"} justifyContent='flex-start'>
          <Flex w={"90%"} mt={1} alignItems='flex-start'>
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
          </Flex>
          <Text
            mt={3}
            fontSize={28}
            color={themeColors.primario}
            fontWeight={700}
          >
            Toma tu presión
          </Text>
          <Box
            marginTop={8}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl>
              <FormControl.Label>Media Sistólica</FormControl.Label>
              <Input
                variant='outline'
                fontSize='16px'
                type='number'
                _focus={{
                  borderColor: themeColors.primario,
                  backgroundColor: themeColors.primarioTransparente,
                }}
                w={{
                  base: "75%",
                  md: "25%",
                }}
                h={50}
                placeholder='120'
                onChange={(e) => {
                  setSistolicMessure(e.nativeEvent.text);
                }}
              />

              <FormControl.Label marginTop={4}>
                Medida Diastólica
              </FormControl.Label>
              <Input
                w={{
                  base: "75%",
                  md: "25%",
                }}
                variant='outline'
                fontSize='16px'
                type={"number"}
                _focus={{
                  borderColor: themeColors.primario,
                  backgroundColor: themeColors.primarioTransparente,
                }}
                h={50}
                placeholder='80'
                onChange={(e) => setDiastolicMessure(e.nativeEvent.text)}
              />
              <FormControl.Label marginTop={4}>
                Pulso Cardiaco
              </FormControl.Label>
              <Input
                w={{
                  base: "75%",
                  md: "25%",
                }}
                variant='outline'
                fontSize='16px'
                type={"number"}
                _focus={{
                  borderColor: themeColors.primario,
                  backgroundColor: themeColors.primarioTransparente,
                }}
                h={50}
                placeholder='72'
                onChange={(e) => setCardiacPulse(e.nativeEvent.text)}
              />
            </FormControl>
          </Box>
          <HStack
            justifyContent='center'
            mt={5}
            bgColor='gray.200'
            rounded='lg'
          >
            <Box bgColor={themeColors.primarioTransparente} p={1} rounded='lg'>
              <Text bold color='gray.500'>
                Primer medida
              </Text>
            </Box>
            <Box bgColor={themeColors.primarioTransparente} p={1} rounded='lg'>
              <Text bold color='gray.500'>
                Segunda medida
              </Text>
            </Box>
            <Box bgColor={themeColors.primarioTransparente} p={1} rounded='lg'>
              <Text bold color='gray.500'>
                Tercera medida
              </Text>
            </Box>
          </HStack>
          <Button
            bg={themeColors.primario}
            marginTop={6}
            rounded='xl'
            onPress={handleNextMeassure}
          >
            <Text bold color='#fff'>
              Siguiente medida
            </Text>
          </Button>
          <Button
            bg={themeColors.primario}
            marginTop={6}
            rounded='xl'
            // onPress={handleLogin}
          >
            <Text bold color='#fff'>
              Finalizar
            </Text>
          </Button>
        </Center>
      ) : (
        <Timer action={setTimerView} />
      )}
    </TouchableWithoutFeedback>
  );
};

export default Pressure;
