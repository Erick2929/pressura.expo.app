import { Divider, Flex, Pressable, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { themeColors } from "../../../../../config/theme";
import { useSession } from "../../../../../providers/session";

const DocRow = ({ doctorEmail, id, refetch, showToast, relation }) => {
  const { updateUserValues, deleteDocument, userInfo } = useSession();

  const handleAccept = () => {
    updateUserValues("PacienteConDoctores", id, {
      Relacion: 3,
      NombrePaciente: userInfo?.Nombre,
    });
    refetch();
    showToast();
  };
  const handleDecline = () => {
    deleteDocument("PacienteConDoctores", id);
    refetch();
    showToast();
  };

  return (
    <>
      <Flex w={"100%"} p={3} direction='row'>
        <Flex w={"50%"}>
          <Text>{"Pendiente Confirmacion"}</Text>
          <Text mt={3}>{doctorEmail}</Text>
        </Flex>
        <Flex
          w={"50%"}
          direction='row'
          justifyContent={"space-around"}
          alignItems='center'
        >
          <Pressable onPress={handleDecline}>
            <MaterialIcons
              name='cancel'
              size={24}
              color={themeColors.primario}
            />
          </Pressable>
          {relation === 2 && (
            <Pressable onPress={handleAccept}>
              <MaterialIcons
                name='check-circle-outline'
                size={24}
                color={themeColors.primario}
              />
            </Pressable>
          )}
        </Flex>
      </Flex>
      <Divider w={"100%"} />
    </>
  );
};

export default DocRow;
