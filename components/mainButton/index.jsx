import { Flex, Pressable, Text } from "native-base";
import React from "react";
import { themeColors } from "../../config/theme";

const MainButton = ({ children, title, w, action }) => {
  return (
    <Pressable
      w={w || "100%"}
      bgColor={themeColors.primario}
      onPress={action}
      _pressed={{ backgroundColor: themeColors.primarioTransparente }}
      borderRadius={4}
    >
      <Flex
        w={"100%"}
        flexDirection='column'
        alignItems={"center"}
        justifyContent={"center"}
        padding={5}
      >
        {children}
        <Text fontSize={20} mt={2} color={"white"}>
          {title}
        </Text>
      </Flex>
    </Pressable>
  );
};

export default MainButton;
