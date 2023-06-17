import { Flex, Input, Text } from "native-base";
import React from "react";
import { themeColors } from "../../../../../config/theme";

const ConfirmDataRow = ({ title, sis, setSis, dis, setDis, cp, setCp }) => {
  return (
    <Flex w={"90%"} mt={2} direction='column'>
      <Text italic color={themeColors.primario}>
        {title}
      </Text>
      <Flex w={"100%"} mt={2} direction='row' justifyContent={"space-between"}>
        <Flex
          w={"45%"}
          direction='row'
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text color={themeColors.primario}>Sistólica: </Text>
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
            defaultValue={sis !== null ? sis.toString() : ""}
            onChange={(e) => {
              setSis(parseInt(e.nativeEvent.text));
            }}
          />
        </Flex>
        <Flex
          w={"45%"}
          direction='row'
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text color={themeColors.primario}>Diastólica: </Text>
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
            defaultValue={dis !== null ? dis.toString() : ""}
            onChange={(e) => {
              setDis(parseInt(e.nativeEvent.text));
            }}
          />
        </Flex>
      </Flex>
      <Flex
        mt={2}
        w={"100%"}
        direction='row'
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text color={themeColors.primario}>Pulso: </Text>
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
          defaultValue={cp !== null ? cp.toString() : ""}
          onChange={(e) => {
            setCp(parseInt(e.nativeEvent.text));
          }}
        />
      </Flex>
    </Flex>
  );
};

export default ConfirmDataRow;
