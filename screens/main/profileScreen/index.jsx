import {
  Box,
  Center,
  CheckIcon,
  Flex,
  Input,
  Pressable,
  Select,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { themeColors } from "../../../config/theme";
import DatePicker from "react-native-datepicker";

const Profile = ({ navigation }) => {
  // ESTAS HACIENDO LA PANTALLA DE PERFIL, DEBERAS HACERLA TOTALMENTE FUNCIONAL Y PROBAR QUE FUNCIONE
  // DESPUES HAZ LA DE LOS DOCTORES, NO TE TARDAS MUCHO LA VERDAD CONFIA EN TI PERO NO SEAS CONFIADO
  // RECUAREDA NO ESTRESARTE
  const [date, setDate] = useState("");

  const handleDateChange = (newDate) => {
    setDate(newDate);
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
        <Pressable>
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
          placeholder='Porque...'
          multiline
          variant='outline'
          fontSize='16px'
          _focus={{
            borderColor: themeColors.primario,
            backgroundColor: themeColors.primarioTransparente,
          }}
          w={"50%"}
          // onChange={(e) => setComment(e.nativeEvent.text)}
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
          selectedValue={0}
          minWidth='200'
          accessibilityLabel='Choose Service'
          placeholder='Choose Service'
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size='5' />,
          }}
          mt={1}
          //   onValueChange={itemValue => setService(itemValue)}
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
          placeholder='Porque...'
          multiline
          variant='outline'
          fontSize='16px'
          _focus={{
            borderColor: themeColors.primario,
            backgroundColor: themeColors.primarioTransparente,
          }}
          w={"50%"}
          // onChange={(e) => setComment(e.nativeEvent.text)}
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
          placeholder='Porque...'
          multiline
          variant='outline'
          fontSize='16px'
          _focus={{
            borderColor: themeColors.primario,
            backgroundColor: themeColors.primarioTransparente,
          }}
          w={"50%"}
          // onChange={(e) => setComment(e.nativeEvent.text)}
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
          placeholder='Porque...'
          multiline
          variant='outline'
          fontSize='16px'
          _focus={{
            borderColor: themeColors.primario,
            backgroundColor: themeColors.primarioTransparente,
          }}
          w={"50%"}
          // onChange={(e) => setComment(e.nativeEvent.text)}
        />
      </Flex>
    </Center>
  );
};

export default Profile;
