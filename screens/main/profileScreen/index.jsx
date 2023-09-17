import {
  Alert,
  Box,
  Center,
  CheckIcon,
  Flex,
  HStack,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Select,
  Text,
  useToast,
  VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { themeColors } from "../../../config/theme";
import { useSession } from "../../../providers/session";
import DatePicker from "../../../components/datePicker";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const Profile = ({ navigation }) => {
  const toast = useToast();
  const { userInfo, updateUserValues, uid } = useSession();

  const [nombre, setNombre] = useState(userInfo?.Nombre);
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState(
    userInfo?.FechaNacimiento
  );
  const [sexo, setSexo] = useState(userInfo?.Sexo);
  const [altura, setAltura] = useState(userInfo?.Altura);
  const [peso, setPeso] = useState(userInfo?.Peso);
  const [correoElectronico, setCorreoElectronico] = useState(
    userInfo?.CorreoElectronico
  );
  const [date, setDate] = useState(userInfo?.FechaNacimiento);
  const [isWrongDate, setIsWrongDate] = useState(false);

  useEffect(() => {
    console.log("User: ", userInfo);
    console.log("Nombre: ", nombre);
    console.log("Sexo: ", sexo);
    console.log("Altura: ", altura);
    console.log("Peso: ", peso);
    console.log("Email: ", correoElectronico);
    console.log("Date: ", date);
  }, [nombre, sexo, altura, peso, correoElectronico, date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const showToast = () => {
    toast.show({
      placement: "top",
      render: () => {
        return (
          <Box bg='emerald.500' px='2' py='1' rounded='sm' mb={5}>
            ¡Los datos fueron guardados exitosamente!
          </Box>
        );
      },
    });
  };

  // const validateSave = () =>{

  // }

  const handleSaveData = () => {
    if (isWrongDate) return;
    const date1 = new Date(date);
    date1.setDate(date1.getDate() + 1);
    console.log();
    updateUserValues("Paciente", uid, {
      Nombre: nombre,
      Sexo: sexo,
      Altura: altura,
      Peso: peso,
      CorreoElectronico: correoElectronico,
      FechaNacimiento: date1,
    });
    showToast();
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        h={"full"}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Center safeArea flex={1} h={"full"} justifyContent='flex-start'>
          <Flex
            w={"90%"}
            mt={1}
            direction='row'
            justifyContent={"space-between"}
            alignItems={"flex-start"}
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
            <Pressable onPress={handleSaveData}>
              <Box
                paddingX={5}
                paddingY={1}
                bgColor={isWrongDate ? "gray.400" : themeColors.primario}
                borderRadius={4}
              >
                <Text bold color={"white"}>
                  Guardar
                </Text>
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
            <Flex
              direction='column'
              justifyContent={"center"}
              alignItems='center'
            >
              <Ionicons name='person' size={50} color={themeColors.primario} />

              <Text fontSize={32} color={themeColors.primario} fontWeight={700}>
                Perfil
              </Text>
            </Flex>
            <Flex
              mt={3}
              w='90%'
              direction='row'
              justifyContent={"space-between"}
              alignItems='center'
            >
              <Text color={themeColors.primario}>Nombre:</Text>
              <Input
                mx='3'
                placeholder='Juan Perez Loya'
                multiline
                variant='outline'
                fontSize='16px'
                defaultValue={nombre}
                _focus={{
                  borderColor: themeColors.primario,
                  backgroundColor: themeColors.primarioTransparente,
                }}
                w={"50%"}
                onChange={(e) => setNombre(e.nativeEvent.text)}
              />
            </Flex>
            <Flex
              mt={3}
              w='90%'
              direction='row'
              justifyContent={"space-between"}
              alignItems='center'
            >
              <Text color={themeColors.primario}>Fecha de nacimiento:</Text>
              <Box w={"50%"}>
                <DatePicker
                  date={date}
                  setDate={setDate}
                  setIsWrongDate={setIsWrongDate}
                />
              </Box>
            </Flex>
            {isWrongDate && (
              <Alert status={"error"} marginTop={4}>
                <VStack space={1} flexShrink={1} w='100%'>
                  <HStack
                    flexShrink={1}
                    space={1}
                    justifyContent='space-between'
                  >
                    <HStack space={2} flexShrink={1}>
                      <Alert.Icon mt='1' />
                      <Text fontSize='md' color='coolGray.800'>
                        {"Fecha invalida"}
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Alert>
            )}
            <Flex
              mt={3}
              w='90%'
              direction='row'
              justifyContent={"space-between"}
              alignItems='center'
            >
              <Text color={themeColors.primario}>Sexo:</Text>
              <Select
                selectedValue={sexo}
                minWidth='50%'
                accessibilityLabel='Choose Service'
                placeholder='Choose Service'
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size='5' />,
                }}
                mt={1}
                onValueChange={(itemValue) => setSexo(itemValue)}
              >
                <Select.Item label='Masculino' value={1} />
                <Select.Item label='Femenino' value={2} />
              </Select>
            </Flex>
            <Flex
              mt={3}
              w='90%'
              direction='row'
              justifyContent={"space-between"}
              alignItems='center'
            >
              <Text color={themeColors.primario}>Altura:</Text>
              <Input
                mx='3'
                placeholder='1.7'
                multiline
                variant='outline'
                fontSize='16px'
                defaultValue={altura ? "" + altura : ""}
                _focus={{
                  borderColor: themeColors.primario,
                  backgroundColor: themeColors.primarioTransparente,
                }}
                w={"50%"}
                onChange={(e) => {
                  const a = parseFloat(e.nativeEvent.text);
                  setAltura(Number.isNaN(a) ? "" : a);
                }}
              />
            </Flex>
            <Flex
              mt={3}
              w='90%'
              direction='row'
              justifyContent={"space-between"}
              alignItems='center'
            >
              <Text color={themeColors.primario}>Peso:</Text>
              <Input
                mx='3'
                placeholder='80'
                defaultValue={peso ? "" + peso : ""}
                multiline
                variant='outline'
                fontSize='16px'
                _focus={{
                  borderColor: themeColors.primario,
                  backgroundColor: themeColors.primarioTransparente,
                }}
                w={"50%"}
                onChange={(e) => {
                  const p = parseFloat(e.nativeEvent.text);
                  setPeso(Number.isNaN(p) ? "" : p);
                }}
              />
            </Flex>
            <Flex
              mt={3}
              w='90%'
              direction='row'
              justifyContent={"space-between"}
              alignItems='center'
            >
              <Text color={themeColors.primario}>Correo Electronico:</Text>
              <Input
                mx='3'
                placeholder='ejemplo@ejemplo.com'
                defaultValue={correoElectronico}
                multiline
                variant='outline'
                fontSize='16px'
                _focus={{
                  borderColor: themeColors.primario,
                  backgroundColor: themeColors.primarioTransparente,
                }}
                w={"50%"}
                onChange={(e) => setCorreoElectronico(e.nativeEvent.text)}
              />
            </Flex>
          </Flex>
        </Center>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Profile;
