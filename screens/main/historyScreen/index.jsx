import { Box, Center, Flex, Pressable, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { themeColors } from "../../../config/theme";
import { useSession } from "../../../providers/session";
import { db } from "../../../config/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import LogRow from "./components/LogRow";

const History = ({ navigation }) => {
  const { userInfo } = useSession();

  const [historicLogs, setHistoricLogs] = useState([]);

  const getHistoricLogs = async () => {
    try {
      const q = query(
        collection(db, "Presion"),
        where("IDPaciente", "==", userInfo.CorreoElectronico)
      );
      const querySnapshot = await getDocs(q);
      const logArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        logArray.push(doc.data());
      });
      setHistoricLogs(logArray);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const convertirObjetoAFecha = (objetoTiempo) => {
    const fecha = new Date(objetoTiempo * 1000);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear().toString().slice(-2);
    const hora = fecha.getHours().toString().padStart(2, "0");
    const minutos = fecha.getMinutes().toString().padStart(2, "0");

    return `${dia}/${mes}/${año} ${hora}:${minutos}`;
  };
  useEffect(() => {
    getHistoricLogs();
  }, []);

  return (
    <Center safeArea flex={1} h={"full"} justifyContent='flex-start'>
      <Flex
        w={"90%"}
        mt={1}
        direction='row'
        justifyContent={"space-between"}
        alignItems='center'
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
        <Text
          mt={3}
          fontSize={32}
          color={themeColors.primario}
          fontWeight={700}
        >
          Historial
        </Text>
        <Pressable>
          <Box
            paddingX={5}
            paddingY={1}
            bgColor={"rgba(0,0,0,0)"}
            borderRadius={4}
          >
            <MaterialIcons name='arrow-back' size={24} color='rgba(0,0,0,0)' />
          </Box>
        </Pressable>
      </Flex>
      {historicLogs.map((log) => {
        return (
          <LogRow
            key={log.IDPaciente + log.Fecha}
            sis={log.MedidaSuperior}
            dis={log.MedidaInferior}
            date={convertirObjetoAFecha(log?.Fecha?.seconds)}
          />
        );
      })}
    </Center>
  );
};

export default History;
