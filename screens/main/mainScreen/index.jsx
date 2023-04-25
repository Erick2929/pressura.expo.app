import { Center, Flex, ScrollView, Text } from "native-base";
import React, { useEffect } from "react";
import ViewButton from "../../../components/viewButton";
import { useSession } from "../../../providers/session";
import { useUser } from "../../../providers/user";

function MainScreen() {
  const { logout } = useSession();
  const { user, setUserInfo } = useUser();

  const handleLogout = () => {
    logout();
    setUserInfo({});
  };
  useEffect(() => {
    console.log(user.email);
  }, [user]);

  return (
    <Center safeArea flex={1} h={"full"} justifyContent='flex-start'>
      <Text>{user.email}</Text>
      <ViewButton action={logout}>Cerrar Sesion</ViewButton>
    </Center>
  );
}

export default MainScreen;
