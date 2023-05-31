import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  KeyboardAvoidingView,
  Link,
  Pressable,
  Stack,
  Text,
  theme,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import Isotype from "../../../assets/logos/pressura-logo.png";
import { themeColors } from "../../../config/theme";
import { FontAwesome } from "@expo/vector-icons";
import { useSession } from "../../../providers/session";

const Signin = ({ navigation }) => {
  const { register } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [showFirstPass, setShowFirstPass] = useState(false);
  const [showSecondPass, setshowSecondPass] = useState(false);
  const [notSamePassword, setNotSamePassword] = useState(false);

  const handleRegister = () => {
    if (password === confirmPassword) {
      register(email, password);
      console.log("Registro");
    } else {
      setNotSamePassword(true);
    }
  };
  const handleEmailChange = (e) => {
    const email = e.nativeEvent.text;
    setEmail(email);
  };
  const handlePasswordChange = (e) => {
    const password = e.nativeEvent.text;
    setPassword(password);
  };
  const handleConfirmPasswordChange = (e) => {
    const password = e.nativeEvent.text;
    setConfirmPassword(password);
  };
  const handleFirstNameChange = (e) => {
    const firstName = e.nativeEvent.text;
    setFirstName(firstName);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <Center safeArea>
          <Image
            style={{ height: 100, width: 125 }}
            alt='logo'
            source={Isotype}
            marginTop={8}
          />
          <Box
            width='100%'
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Text bold fontSize='3xl'>
              ¡Hola, Bienvenido!
            </Text>
            <Text bold fontSize='md' color='muted.400'>
              Registrate para obtener acceso
            </Text>
          </Box>
          <Stack marginTop={3} width='80%' space={4}>
            <Input
              p={"10px"}
              size='2xl'
              placeholder='Nombre Completo'
              _focus={{
                borderColor: themeColors.primario,
                backgroundColor: themeColors.primarioTransparente,
              }}
              onChange={handleFirstNameChange}
            />
            <Input
              p={"10px"}
              size='2xl'
              placeholder='Correo Electronico'
              _focus={{
                borderColor: themeColors.primario,
                backgroundColor: themeColors.primarioTransparente,
              }}
              onChange={handleEmailChange}
            />
            {notSamePassword && (
              <Alert status={"error"}>
                <VStack space={2} flexShrink={1} w='100%'>
                  <HStack
                    flexShrink={1}
                    space={2}
                    justifyContent='space-between'
                  >
                    <HStack space={2} flexShrink={1}>
                      <Alert.Icon mt='1' />
                      <Text fontSize='md' color='coolGray.800'>
                        Las contraseñas no coinciden
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Alert>
            )}
            <Input
              p={"10px"}
              type={showFirstPass ? "text" : "password"}
              size='2xl'
              InputRightElement={
                <Pressable onPress={() => setShowFirstPass(!showFirstPass)}>
                  <Icon
                    as={
                      <FontAwesome
                        name={!showFirstPass ? "eye" : "eye-slash"}
                        color='black'
                      />
                    }
                    size={5}
                    mr='2'
                    color='muted.400'
                  />
                </Pressable>
              }
              placeholder='Contraseña'
              _focus={{
                borderColor: themeColors.primario,
                backgroundColor: themeColors.primarioTransparente,
              }}
              onChange={handlePasswordChange}
            />
            <Input
              p={"10px"}
              type={showSecondPass ? "text" : "password"}
              size='2xl'
              InputRightElement={
                <Pressable onPress={() => setshowSecondPass(!showSecondPass)}>
                  <Icon
                    as={
                      <FontAwesome
                        name={!showSecondPass ? "eye" : "eye-slash"}
                        color='black'
                      />
                    }
                    size={5}
                    mr='2'
                    color='muted.400'
                  />
                </Pressable>
              }
              placeholder='Confirmar contraseña'
              _focus={{
                borderColor: themeColors.primario,
                backgroundColor: themeColors.primarioTransparente,
              }}
              onChange={handleConfirmPasswordChange}
            />
          </Stack>

          <Button
            bg={themeColors.primario}
            marginTop={9}
            isDisabled={!email || !password || !confirmPassword || !firstName}
            style={{ width: "80%", height: 52 }}
            rounded='xl'
            onPress={handleRegister}
            _pressed={{ backgroundColor: themeColors.primario }}
          >
            <Text fontSize='xl' bold color='#fff'>
              CONTINUAR
            </Text>
          </Button>

          <Text fontSize='md' marginTop='3.0' marginBottom='8.0'>
            ¿Ya tienes cuenta?{" "}
            <Link onPress={() => navigation.navigate("Login")}>
              <Text
                fontWeight='bold'
                fontSize='md'
                color={themeColors.primario}
              >
                Ingresa Aquí
              </Text>
            </Link>
          </Text>
        </Center>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Signin;
