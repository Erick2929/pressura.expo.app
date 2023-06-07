import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Popover,
  Pressable,
  Stack,
  Text,
} from "native-base";
import React, { useRef, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { themeColors } from "../../../config/theme";
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";

function EmotionalStateScreen({ navigation }) {
  const [emotionalState, setEmotionalState] = useState(100);
  const initialFocusRef = useRef(null);
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
          textAlign='center'
        >
          Registro de estado emocional
        </Text>

        <Flex direction='row' alignItems={"center"}>
          <Text
            fontSize={18}
            color={themeColors.primario}
            fontWeight={500}
            textAlign='center'
          >
            ¿Cómo te sientes ahora?
          </Text>
          <Popover
            initialFocusRef={initialFocusRef}
            trigger={(triggerProps) => {
              return (
                <Button
                  bgColor={themeColors.primario}
                  ml={2}
                  px={1}
                  py={0}
                  {...triggerProps}
                >
                  ?
                </Button>
              );
            }}
          >
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Body>
                ¿Tienes alguna molestia, incomodidad o estrés?
              </Popover.Body>
            </Popover.Content>
          </Popover>
        </Flex>

        <Box
          marginTop={8}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box alignItems='center' w='100%'>
            <Stack space={4} alignItems='center' w='90%' maxW='300'>
              {/* <Text textAlign='center'>onChangeValue - {onChangeValue}</Text> */}
              <Flex direction='row' justifyContent={"space-between"} w={"100%"}>
                <FontAwesome name='frown-o' size={54} color='black' />
                <FontAwesome name='smile-o' size={54} color='black' />
              </Flex>
              <Slider
                style={{ width: "100%", height: 40 }}
                minimumValue={0}
                maximumValue={100}
                value={100}
                minimumTrackTintColor={themeColors.primario}
                maximumTrackTintColor='gray'
                onValueChange={(v) => {
                  setEmotionalState(Math.floor(v));
                }}
              />
              <Flex direction='row' justifyContent={"space-between"} w={"100%"}>
                <Text
                  fontSize={18}
                  color={themeColors.primario}
                  fontWeight={500}
                  textAlign='center'
                >
                  Mal
                </Text>
                <Text
                  fontSize={18}
                  color={themeColors.primario}
                  fontWeight={500}
                  textAlign='center'
                >
                  Bien
                </Text>
              </Flex>
              {emotionalState !== 100 && (
                <>
                  <Text
                    fontSize={18}
                    color={themeColors.primario}
                    fontWeight={500}
                    textAlign='center'
                  >
                    ¿Por qué no se siente al 100?
                  </Text>
                  <Input
                    mx='3'
                    placeholder='Porque...'
                    multiline
                    variant='outline'
                    fontSize='16px'
                    _focus={{
                      borderColor: themeColors.primario,
                      backgroundColor: themeColors.primarioTransparente,
                    }}
                    w={{
                      base: "85%",
                      md: "25%",
                    }}
                    h={50}
                  />
                </>
              )}
              <Box h={"15%"}></Box>
              <Button
                bg={themeColors.primario}
                marginTop={0}
                style={{ width: "90%", height: 52 }}
                rounded='xl'
                onPress={() => navigation.navigate("Pressure")}
              >
                <Text fontSize='xl' bold color='#fff'>
                  Enviar
                </Text>
              </Button>
            </Stack>
          </Box>
        </Box>
      </Center>
    </TouchableWithoutFeedback>
  );
}

export default EmotionalStateScreen;
