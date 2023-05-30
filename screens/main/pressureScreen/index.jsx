import {
  Box,
  Center,
  Flex,
  FormControl,
  Input,
  Pressable,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { themeColors } from "../../../config/theme";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import Isotype from "../../../assets/logos/pressura-logo.png";

const Pressure = ({ navigation }) => {
  const [sistolicMessure, setSistolicMessure] = useState(0);
  const [diastolicMessure, setDiastolicMessure] = useState(0);
  const [cardiacPulse, setCardiacPulse] = useState(0);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
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
            <FormControl.Label marginTop={4}>Pulso Cardiaco</FormControl.Label>
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
      </Center>
    </TouchableWithoutFeedback>
  );
};

export default Pressure;
