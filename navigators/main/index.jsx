import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainScreen from "../../screens/main/mainScreen";

const MainNavigator = () => {
  const { Navigator: StackNavigator, Screen: StackScreen } =
    createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StackNavigator>
        <StackScreen
          options={{ headerShown: false }}
          name='MainScreen'
          component={MainScreen}
        />
      </StackNavigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
