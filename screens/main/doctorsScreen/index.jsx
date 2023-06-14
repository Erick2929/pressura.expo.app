import { Box, Center, Flex, Pressable, Text } from "native-base";
import React from "react";
import { themeColors } from "../../../config/theme";
import { MaterialIcons } from "@expo/vector-icons";
import DocRow from "./components/docRow";

const Doctors = ({ navigation }) => {
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
        <Pressable>
          <Box
            paddingX={5}
            paddingY={1}
            bgColor={themeColors.primario}
            borderRadius={4}
          >
            <MaterialIcons name='add' size={24} color='white' />
          </Box>
        </Pressable>
      </Flex>
      <DocRow />
    </Center>
  );
};

export default Doctors;
