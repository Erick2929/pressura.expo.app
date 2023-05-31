import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainScreen from "../../screens/main/mainScreen";
import Pressure from "../../screens/main/pressureScreen";

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
        <StackScreen
          options={{ headerShown: false }}
          name='Pressure'
          component={Pressure}
        />
      </StackNavigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
