import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import Isotype from "../../../assets/logos/pressura-logo.png";
import { FontAwesome } from "@expo/vector-icons";
import {
  Alert,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Icon,
  Image,
  Input,
  Link,
  Pressable,
  Text,
  useToast,
  VStack,
} from "native-base";
import ToastAlert from "../../../components/toastAlert";
import { getAuth } from "firebase/auth";
import { app } from "../../../config/firebase/firebase";
import { themeColors } from "../../../config/theme";
import { useSession } from "../../../providers/session";

function Login({ navigation }) {
  const toast = useToast();
  const { login, loginError } = useSession();
  const id = "test-toast";
  const auth = getAuth(app);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const handleEmailChange = (e) => {
    const email = e.nativeEvent.text;
    setEmail(email);
  };

  const handlePasswordChange = (e) => {
    const password = e.nativeEvent.text;
    setPassword(password);
  };

  const handleLogin = () => {
    login(email, password);
  };

  const showInvalidEmail = () => {
    if (!toast.isActive(id)) {
      toast.show({
        placement: "top",
        render: () => (
          <ToastAlert
            id={id}
            title='Invalid email address'
            variant='subtle'
            description='Please enter a valid email address'
            isClosable
          />
        ),
      });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Center safeArea flex={1} justifyContent='center'>
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
            ¡Hola, Bienvenido!
          </Text>
          <Text bold fontSize='md' color='muted.400'>
            Inicia sesión para continuar
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

            <FormControl.Label marginTop={4}>Contraseña</FormControl.Label>
            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
              variant='outline'
              fontSize='16px'
              type={show ? "text" : "password"}
              _focus={{
                borderColor: themeColors.primario,
                backgroundColor: themeColors.primarioTransparente,
              }}
              h={50}
              placeholder='Contraseña'
              onChange={handlePasswordChange}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <FontAwesome
                        name={!show ? "eye" : "eye-slash"}
                        color='black'
                      />
                    }
                    size={5}
                    ml='2'
                    marginRight={4}
                    color='muted.400'
                  />
                </Pressable>
              }
            />
          </FormControl>
          {loginError && (
            <Alert status={"error"} marginTop={4}>
              <VStack space={1} flexShrink={1} w='100%'>
                <HStack flexShrink={1} space={1} justifyContent='space-between'>
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt='1' />
                    <Text fontSize='md' color='coolGray.800'>
                      {"Usuario o contraseña incorrectos"}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </Alert>
          )}
        </Box>
        <Box h={"15%"}></Box>
        <Button
          bg={themeColors.primario}
          marginTop={0}
          style={{ width: "90%", height: 52 }}
          rounded='xl'
          onPress={handleLogin}
        >
          <Text fontSize='xl' bold color='#fff'>
            Iniciar Sesión
          </Text>
        </Button>

        <Text fontSize='md' marginTop='3.0' marginBottom='1.0'>
          ¿No tienes cuenta?{" "}
          <Link onPress={() => navigation.navigate("Signin")}>
            <Text
              // style={{
              //   backgroundColor: "blue",
              // }}
              fontWeight='bold'
              fontSize='md'
              mt={1}
              color={themeColors.primario}
            >
              Registrate
            </Text>
          </Link>
        </Text>
        <Link onPress={() => navigation.navigate("Recover")} marginBottom='8.0'>
          <Text fontWeight='bold' fontSize='md' color={themeColors.primario}>
            Olvide mi contraseña
          </Text>
        </Link>
      </Center>
    </TouchableWithoutFeedback>
  );
}

export default Login;
