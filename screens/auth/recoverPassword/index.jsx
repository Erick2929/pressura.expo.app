import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  HStack,
  Icon,
  Image,
  Input,
  Link,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import Isotype from "../../../assets/logos/pressura-logo.png";
import { themeColors } from "../../../config/theme";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function RecoverPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [errorOcurred, setErrorOcurred] = useState(false);

  const handleEmailChange = (e) => {
    const email = e.nativeEvent.text;
    setEmail(email);
  };

  const auth = getAuth();

  useEffect(() => {
    console.log("auth: ", auth);
  }, [auth]);

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("El correo ha sido enviado");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Center safeArea flex={1} justifyContent='flex-start'>
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
        <Image
          style={{ height: 100, width: 125 }}
          alt='logo'
          source={Isotype}
          marginTop={8}
        />
        <Box
          marginTop={3}
          width='100%'
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Text bold fontSize='3xl'>
            Recuperar contraseña
          </Text>
          <Text bold fontSize='md' color='muted.400'>
            Ingresa tu correo electronico
          </Text>
        </Box>

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
            <FormControl.Label>Correo electronico</FormControl.Label>
            <Input
              variant='outline'
              fontSize='16px'
              _focus={{
                borderColor: themeColors.primario,
                backgroundColor: themeColors.primarioTransparente,
              }}
              w={{
                base: "75%",
                md: "25%",
              }}
              h={50}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name='envelope' color='black' />}
                  size={5}
                  ml='2'
                  color='muted.400'
                  marginLeft={4}
                />
              }
              placeholder='example@domain.com'
              onChange={handleEmailChange}
            />
          </FormControl>
          {emailSent && (
            <Alert status={"success"} marginTop={4}>
              <VStack space={1} flexShrink={1} w='100%'>
                <HStack flexShrink={1} space={1} justifyContent='space-between'>
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt='1' />
                    <Text fontSize='md' color='coolGray.800'>
                      {"¡El correo ha sido enviado!"}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </Alert>
          )}
          {errorOcurred && (
            <Alert status={"error"} marginTop={4}>
              <VStack space={1} flexShrink={1} w='100%'>
                <HStack flexShrink={1} space={1} justifyContent='space-between'>
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt='1' />
                    <Text fontSize='md' color='coolGray.800'>
                      {"Ocurrio un error"}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </Alert>
          )}
        </Box>

        <Box h={"25%"}></Box>
        <Button
          bg={themeColors.primario}
          style={{ width: "90%", height: 52 }}
          mb={"50px"}
          rounded='xl'
          onPress={handlePasswordReset}
        >
          <Text fontSize='xl' bold color='#fff'>
            Enviar
          </Text>
        </Button>
      </Center>
    </TouchableWithoutFeedback>
  );
}

export default RecoverPassword;
