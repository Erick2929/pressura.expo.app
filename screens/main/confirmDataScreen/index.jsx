import { Box, Button, Center, Flex, Input, Pressable, Text } from "native-base";
import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { themeColors } from "../../../config/theme";
import { useRoute } from "@react-navigation/native";
import ConfirmDataRow from "./components/confirmDataRow";
import { useSession } from "../../../providers/session";

const ConfirmData = ({ navigation }) => {
  const route = useRoute();
  const { createUserValues, userInfo } = useSession();
  const {
    comment,
    emotionalState,
    sis1,
    sis2,
    sis3,
    dis1,
    dis2,
    dis3,
    cp1,
    cp2,
    cp3,
  } = route.params;

  const [emotionalStateFinal, setEmotionalStateFinal] =
    useState(emotionalState);
  const [cp1Final, setCp1Final] = useState(cp1);
  const [cp2Final, setCp2Final] = useState(cp2);
  const [cp3Final, setCp3Final] = useState(cp3);
  const [sis1Final, setSis1Final] = useState(sis1);
  const [sis2Final, setSis2Final] = useState(sis2);
  const [sis3Final, setSis3Final] = useState(sis3);
  const [dis1Final, setDis1Final] = useState(dis1);
  const [dis2Final, setDis2Final] = useState(dis2);
  const [dis3Final, setDis3Final] = useState(dis3);

  const handleSendInfo = () => {
    createUserValues("Presion", {
      Comentario: comment,
      EstadoEmocional: emotionalStateFinal,
      Fecha: new Date(),
      IDPaciente: userInfo.CorreoElectronico,
      MedidaInferior: promedio(dis1Final, dis2Final, dis3Final),
      MedidaInferior1: parseInt(dis1Final),
      MedidaInferior2: dis2Final !== null ? parseInt(dis2Final) : "-",
      MedidaInferior3: dis3Final !== null ? parseInt(dis3Final) : "-",
      MedidaPulso: promedio(cp1Final, cp2Final, cp3Final),
      MedidaPulso1: parseInt(cp1Final),
      MedidaPulso2: cp2Final !== null ? parseInt(cp2Final) : "-",
      MedidaPulso3: cp3Final !== null ? parseInt(cp3Final) : "-",
      MedidaSuperior: promedio(sis1Final, sis2Final, sis3Final),
      MedidaSuperior1: parseInt(sis1Final),
      MedidaSuperior2: sis2Final !== null ? parseInt(sis2Final) : "-",
      MedidaSuperior3: sis3Final !== null ? parseInt(sis3Final) : "-",
    });
    navigation.navigate("MainScreen");
  };

  const promedio = (medida1, medida2, medida3) => {
    let medidasValidasCount = 1;
    let medidasValidasSum = parseFloat(medida1);
    if (medida2 !== null) {
      medidasValidasCount++;
      medidasValidasSum += parseFloat(medida2);
    }
    if (medida3 !== null) {
      medidasValidasCount++;
      medidasValidasSum += parseFloat(medida3);
    }
    return medidasValidasSum / medidasValidasCount;
  };

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
        <Text bold fontSize={30} color={themeColors.primario}>
          Confirma tus Medidas
        </Text>
        <Flex
          w={"90%"}
          mt={2}
          direction='row'
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text fontSize={20} color={themeColors.primario}>
            Estado corporal:{" "}
          </Text>
          <Input
            variant='outline'
            fontSize='16px'
            type='number'
            keyboardType='numeric'
            _focus={{
              borderColor: themeColors.primario,
              backgroundColor: themeColors.primarioTransparente,
            }}
            w={"50%"}
            defaultValue={emotionalStateFinal.toString()}
            onChange={(e) =>
              setEmotionalStateFinal(parseInt(e.nativeEvent.text))
            }
          />
        </Flex>
        <ConfirmDataRow
          title={"Medida 1"}
          sis={sis1}
          setSis={setSis1Final}
          dis={dis1}
          setDis={setDis1Final}
          cp={cp1}
          setCp={setCp1Final}
        />
        <ConfirmDataRow
          title={"Medida 2"}
          sis={sis2}
          setSis={setSis2Final}
          dis={dis2}
          setDis={setDis2Final}
          cp={cp2}
          setCp={setCp2Final}
        />
        <ConfirmDataRow
          title={"Medida 3"}
          sis={sis3}
          setSis={setSis3Final}
          dis={dis3}
          setDis={setDis3Final}
          cp={cp3}
          setCp={setCp3Final}
        />
        <Flex
          w={"90%"}
          mt={12}
          direction='column'
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text fontSize={20} color={themeColors.primario}>
            ¿Son correctas las medidas?
          </Text>
          <Flex
            mt={2}
            w={"100%"}
            direction='row'
            justifyContent={"space-between"}
          >
            <Button
              bg={themeColors.primario}
              marginTop={0}
              style={{ width: "45%", height: 52 }}
              rounded='xl'
              onPress={handleSendInfo}
            >
              <Text fontSize='xl' bold color='#fff'>
                Enviar
              </Text>
            </Button>
            <Button
              bg={themeColors.primario}
              marginTop={0}
              style={{ width: "45%", height: 52 }}
              rounded='xl'
              onPress={() => {
                navigation.navigate("MainScreen");
              }}
            >
              <Text fontSize='xl' bold color='#fff'>
                Reiniciar
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Center>
    </TouchableWithoutFeedback>
  );
};

export default ConfirmData;
