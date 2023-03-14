import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import Isotype from "../../../assets/logos/pressura-logo.png";
import { FontAwesome } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  Icon,
  Image,
  Input,
  Link,
  Pressable,
  Text,
  useToast,
} from "native-base";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();

  const handleEmailChange = (e) => {
    const email = e.nativeEvent.text;
    setEmail(email);
  };

  const handlePasswordChange = (e) => {
    const password = e.nativeEvent.text;
    setPassword(password);
  };

  const handleLogin = () => {
    toast.show({
      title: "Invalid email address",
      variant: "top-accent",
      description: "Please enter a valid email address",
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Center safeArea flex={1} justifyContent='flex-start'>
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
            Inicia sesión para continuar
          </Text>
        </Box>

        <Box marginTop={8}>
          <FormControl>
            <FormControl.Label>Correo electronico</FormControl.Label>
            <Input
              variant='outline'
              fontSize='16px'
              _focus={{
                borderColor: "#259891",
                backgroundColor: "rgba(37,152,145,0.2)",
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
              autoCapitalize={false}
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
                borderColor: "#259891",
                backgroundColor: "rgba(37,152,145,0.2)",
              }}
              h={50}
              autoCapitalize={false}
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
        </Box>

        <Button
          bg='#259891'
          marginTop='auto'
          style={{ width: "90%", height: 52 }}
          rounded='xl'
          onPress={handleLogin}
        >
          <Text fontSize='xl' bold color='#fff'>
            Iniciar Sesión
          </Text>
        </Button>

        <Text fontSize='md' marginTop='3.0' marginBottom='8.0'>
          ¿No tienes cuenta?{" "}
          <Link href='https://www.pideloseguro.net/register'>
            <Text fontWeight='bold' fontSize='md' color='#259891'>
              Registrate
            </Text>
          </Link>
        </Text>
      </Center>
    </TouchableWithoutFeedback>
  );
}

export default Login;