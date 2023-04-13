import { Button, Text } from "native-base";
import React from "react";
import { themeColors } from "../../config/theme";

const ViewButton = ({ children, action, marginTop }) => {
  return (
    <Button
      bg={themeColors.primario}
      marginTop={marginTop || "auto"}
      style={{ width: "90%", height: 52 }}
      rounded='xl'
      onPress={action}
    >
      <Text fontSize='xl' bold color='#fff'>
        {children}
      </Text>
    </Button>
  );
};

export default ViewButton;
