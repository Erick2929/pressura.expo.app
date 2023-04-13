import { Center, Flex, ScrollView, Text } from "native-base";
import React from "react";
import ViewButton from "../../../components/viewButton";
import { useSession } from "../../../providers/session";

function MainScreen() {
  const { logout } = useSession();
  return (
    <Center safeArea flex={1} h={"full"} justifyContent='flex-start'>
      <Text>This is the main screen</Text>
      <ViewButton action={logout}>Cerrar Sesion</ViewButton>
    </Center>
  );
}

export default MainScreen;
