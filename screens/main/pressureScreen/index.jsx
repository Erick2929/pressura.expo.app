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
import { useRoute } from "@react-navigation/native";

const Pressure = ({ navigation }) => {
  const route = useRoute();
  const { emotionalState, comment } = route.params;
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
    if (
      meassureCount === 0 &&
      (sistolicMessure1 === 0 || diastolicMessure1 === 0 || cardiacPulse1 === 0)
    ) {
      alert("Favor de ingresar todas las medidas");
      return;
    }
    if (
      meassureCount === 0 &&
      !validMeassures(sistolicMessure1, diastolicMessure1)
    ) {
      alert(
        "Favor de asegurar que la Medida Superior sea mayor a la Medida Inferior"
      );
      return;
    }
    if (
      meassureCount === 1 &&
      !validMeassures(sistolicMessure2, diastolicMessure2)
    ) {
      alert(
        "Favor de asegurar que la Medida Superior sea mayor a la Medida Inferior"
      );
      return;
    }
    if (
      meassureCount === 2 &&
      !validMeassures(sistolicMessure3, diastolicMessure3)
    ) {
      alert(
        "Favor de asegurar que la Medida Superior sea mayor a la Medida Inferior"
      );
      return;
    }
    // if (
    //   meassureCount === 1 &&
    //   (sistolicMessure2 === 0 || diastolicMessure2 === 0 || cardiacPulse2 === 0)
    // ) {
    //   alert("Favor de ingresar todas las medidas");
    //   return;
    // }
    if (meassureCount === 2) {
      handleFinsh();
    }
    setTimerView(true);
    setMeassureCount(meassureCount + 1);
  };

  const validMeassures = (sis, dis) => {
    if (sis === null || dis === null) return true;
    return parseFloat(sis) > parseFloat(dis);
  };

  const handleSistolicChange = (e) => {
    const messure = e.nativeEvent.text;
    if (meassureCount === 0) {
      setSistolicMessure1(messure);
    } else if (meassureCount === 1) {
      setSistolicMessure2(messure);
    } else if (meassureCount === 2) {
      setSistolicMessure3(messure);
    }
  };
  const handleDiastolicChange = (e) => {
    const messure = e.nativeEvent.text;
    if (meassureCount === 0) {
      setDiastolicMessure1(messure);
    } else if (meassureCount === 1) {
      setDiastolicMessure2(messure);
    } else if (meassureCount === 2) {
      setDiastolicMessure3(messure);
    }
  };

  const handleCardiacPulseChange = (e) => {
    const messure = e.nativeEvent.text;
    if (meassureCount === 0) {
      setCardiacPulse1(messure);
    } else if (meassureCount === 1) {
      setCardiacPulse2(messure);
    } else if (meassureCount === 2) {
      setCardiacPulse3(messure);
    }
  };

  const validateMeassures = () => {
    return (
      isNaN(parseInt(sistolicMessure1)) ||
      isNaN(parseInt(diastolicMessure1)) ||
      isNaN(parseInt(cardiacPulse1))
    );
  };
  const handleFinsh = () => {
    if (validateMeassures()) {
      alert("las medidas son invalidas");
      return;
    }
    if (
      meassureCount === 0 &&
      (sistolicMessure1 === 0 || diastolicMessure1 === 0 || cardiacPulse1 === 0)
    ) {
      alert("Favor de ingresar todas las medidas");
      return;
    }

    navigation.navigate("ConfirmData", {
      comment: comment,
      emotionalState: emotionalState,
      sis1: sistolicMessure1,
      sis2: sistolicMessure2,
      sis3: sistolicMessure3,
      dis1: diastolicMessure1,
      dis2: diastolicMessure2,
      dis3: diastolicMessure3,
      cp1: cardiacPulse1,
      cp2: cardiacPulse2,
      cp3: cardiacPulse3,
    });
  };
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
          <Flex
            w='100%'
            h={"85%"}
            direction='column'
            alignItems={"center"}
            justifyContent='center'
          >
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
                  keyboardType='numeric'
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
                  onChange={handleSistolicChange}
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
                  keyboardType='numeric'
                  _focus={{
                    borderColor: themeColors.primario,
                    backgroundColor: themeColors.primarioTransparente,
                  }}
                  h={50}
                  placeholder='80'
                  onChange={handleDiastolicChange}
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
                  keyboardType='numeric'
                  _focus={{
                    borderColor: themeColors.primario,
                    backgroundColor: themeColors.primarioTransparente,
                  }}
                  h={50}
                  placeholder='72'
                  onChange={handleCardiacPulseChange}
                />
              </FormControl>
            </Box>
            <HStack
              justifyContent='center'
              mt={5}
              bgColor='gray.200'
              rounded='lg'
            >
              <Box
                bgColor={
                  meassureCount === 0 && themeColors.primarioTransparente
                }
                p={1}
                rounded='lg'
              >
                <Text bold color='gray.500'>
                  Primer medida
                </Text>
              </Box>
              <Box
                bgColor={
                  meassureCount === 1 && themeColors.primarioTransparente
                }
                p={1}
                rounded='lg'
              >
                <Text bold color='gray.500'>
                  Segunda medida
                </Text>
              </Box>
              <Box
                bgColor={
                  meassureCount === 2 && themeColors.primarioTransparente
                }
                p={1}
                rounded='lg'
              >
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
              onPress={handleFinsh}
            >
              <Text bold color='#fff'>
                Finalizar
              </Text>
            </Button>
          </Flex>
        </Center>
      ) : (
        <Timer action={setTimerView} />
      )}
    </TouchableWithoutFeedback>
  );
};

export default Pressure;
