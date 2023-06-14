import { Divider, Flex, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { themeColors } from "../../../../../config/theme";

const DocRow = ({}) => {
  return (
    <>
      <Flex w={"100%"} p={3} direction='row'>
        <Flex w={"50%"}>
          <Text>{"Pendiente Confirmacion"}</Text>
          <Text mt={3}>{"ejemplodoctor@gmail.com"}</Text>
        </Flex>
        <Flex
          w={"50%"}
          direction='row'
          justifyContent={"space-around"}
          alignItems='center'
        >
          <MaterialIcons name='cancel' size={24} color={themeColors.primario} />
          <MaterialIcons
            name='check-circle-outline'
            size={24}
            color={themeColors.primario}
          />
        </Flex>
      </Flex>
      <Divider w={"100%"} />
    </>
  );
};

export default DocRow;
