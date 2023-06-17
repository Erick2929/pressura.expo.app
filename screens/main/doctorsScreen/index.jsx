import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Popover,
  Pressable,
  Text,
  useToast,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { themeColors } from "../../../config/theme";
import { MaterialIcons } from "@expo/vector-icons";
import DocRow from "./components/docRow";
import { useSession } from "./../../../providers/session";
import { validarCorreo } from "../../../utils/formatters/emailValid";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase/firebase";

const Doctors = ({ navigation }) => {
  const initialFocusRef = useRef(null);
  const toast = useToast();
  const { createUserValues, userInfo } = useSession();
  const [requestLogs, setRequestLogs] = useState([]);
  const [doctorEmail, setDoctorEmail] = useState("");

  const handleCreateDoctorRquest = () => {
    createUserValues("PacienteConDoctores", {
      IDDoctor: doctorEmail,
      IDPaciente: userInfo?.CorreoElectronico,
      NombrePaciente: userInfo?.Nombre,
      Relacion: 1,
    });
    setDoctorEmail("");
    getRequests();
    showToast();
  };

  const getRequests = async () => {
    try {
      const q = query(
        collection(db, "PacienteConDoctores"),
        where("IDPaciente", "==", userInfo.CorreoElectronico),
        where("Relacion", "in", [1, 2])
        // TIENES QUYU HACER EL DOC ROW DE CONFIRJMACION PENDIENTE
        // TEINES QUE HACE LO DEL DATE PICKER EN ANDROID ALV
      );
      const querySnapshot = await getDocs(q);
      const logArray = [];
      querySnapshot.forEach((doc) => {
        logArray.push({ ...doc.data(), id: doc.id });
      });

      setRequestLogs(logArray);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const showToast = () => {
    toast.show({
      placement: "top",
      render: () => {
        return (
          <Box bg='emerald.500' px='2' py='1' rounded='sm' mb={5}>
            ¡Acción aceptada!
          </Box>
        );
      },
    });
  };
  useEffect(() => {
    getRequests();
  }, []);

  return (
    <Center safeArea flex={1} h={"full"} justifyContent='flex-start'>
      <Flex
        w={"100%"}
        px='15px'
        mt={1}
        direction='row'
        justifyContent={"space-between"}
        alignItems='center'
        backgroundColor='gray.300'
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
          Doctores
        </Text>
        <Box>
          <Popover
            initialFocusRef={initialFocusRef}
            trigger={(triggerProps) => {
              return (
                <Pressable {...triggerProps}>
                  <Box
                    paddingX={5}
                    paddingY={1}
                    bgColor={themeColors.primario}
                    borderRadius={4}
                  >
                    <MaterialIcons name='add' size={24} color='white' />
                  </Box>
                </Pressable>
              );
            }}
          >
            <Popover.Content>
              <Popover.Arrow
                style={{ backgroundColor: themeColors.primario }}
              />
              <Popover.Body backgroundColor={themeColors.primario}>
                <Text bold color={"white"}>
                  Ingresa el correo de tu doctor
                </Text>
                <Input
                  onChange={(e) => setDoctorEmail(e.nativeEvent.text)}
                  value={doctorEmail}
                  backgroundColor={"white"}
                  mt={5}
                  rounded='sm'
                  fontSize='xs'
                  ref={initialFocusRef}
                />
                <Flex
                  w={"100%"}
                  direction='row'
                  justifyContent={"center"}
                  mt={5}
                >
                  {validarCorreo(doctorEmail) && (
                    <Button onPress={handleCreateDoctorRquest} p={1}>
                      Enviar
                    </Button>
                  )}
                </Flex>
              </Popover.Body>
            </Popover.Content>
          </Popover>
        </Box>
      </Flex>
      {requestLogs.map((obj) => {
        return (
          <DocRow
            key={obj.id}
            doctorEmail={obj.IDDoctor}
            id={obj.id}
            relation={obj.Relacion}
            refetch={getRequests}
            showToast={showToast}
          />
        );
      })}
    </Center>
  );
};

export default Doctors;
