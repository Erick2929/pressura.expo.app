import {
  Box,
  Center,
  CheckIcon,
  Flex,
  Input,
  Pressable,
  Select,
  Text,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { themeColors } from "../../../config/theme";
import DatePicker from "react-native-datepicker";
import { useSession } from "../../../providers/session";

const Profile = ({ navigation }) => {
  // ESTAS HACIENDO LA PANTALLA DE PERFIL, DEBERAS HACERLA TOTALMENTE FUNCIONAL Y PROBAR QUE FUNCIONE
  // DESPUES HAZ LA DE LOS DOCTORES, NO TE TARDAS MUCHO LA VERDAD CONFIA EN TI PERO NO SEAS CONFIADO
  // RECUAREDA NO ESTRESARTE
  const toast = useToast();
  const { userInfo, updateUserValues, uid } = useSession();

  const [nombre, setNombre] = useState(userInfo?.Nombre);
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState(
    userInfo?.FechaDeNacimiento
  );
  const [sexo, setSexo] = useState(userInfo?.Sexo);
  const [altura, setAltura] = useState(userInfo?.Altura);
  const [peso, setPeso] = useState(userInfo?.Peso);
  const [correoElectronico, setCorreoElectronico] = useState(
    userInfo?.CorreoElectronico
  );
  const [date, setDate] = useState(userInfo?.FechaDeNacimiento);

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
            ¡Los datos fueron guardados exitisamente!
          </Box>
        );
      },
    });
  };

  const handleSaveData = () => {
    const date1 = new Date(date);
    date1.setDate(date1.getDate() + 1);
    console.log();
    updateUserValues("Paciente", uid, {
      Nombre: nombre,
      Sexo: sexo,
      Altura: altura,
      Peso: peso,
      CorreoElectronico: correoElectronico,
      FechaDeNacimiento: date1,
    });
    showToast();
  };

  return (
    <Center safeArea flex={1} h={"full"} justifyContent='flex-start'>
      <Flex
        w={"90%"}
        mt={1}
        direction='row'
        justifyContent={"space-between"}
        alignItems={"start"}
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
        <Flex direction='column' justifyContent={"center"} alignItems='center'>
          <Ionicons name='person' size={50} color={themeColors.primario} />

          <Text fontSize={32} color={themeColors.primario} fontWeight={700}>
            Perfil
          </Text>
        </Flex>
        <Pressable onPress={handleSaveData}>
          <Box
            paddingX={5}
            paddingY={1}
            bgColor={themeColors.primario}
            borderRadius={4}
          >
            <Text bold color={"white"}>
              Guardar
            </Text>
          </Box>
        </Pressable>
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
        <DatePicker
          confirmBtnText='Confirmar'
          cancelBtnText='Cancelar'
          date={date}
          onDateChange={handleDateChange}
          mode='date'
        />
      </Flex>
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
          minWidth='200'
          accessibilityLabel='Choose Service'
          placeholder='Choose Service'
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size='5' />,
          }}
          mt={1}
          onValueChange={(itemValue) => setSexo(itemValue)}
        >
          <Select.Item label='Masculino' value={0} />
          <Select.Item label='Femenino' value={1} />
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
          defaultValue={"" + altura}
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
          defaultValue={"" + peso}
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
    </Center>
  );
};

export default Profile;
