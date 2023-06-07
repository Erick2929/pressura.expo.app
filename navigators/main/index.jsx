import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EmotionalStateScreen from "../../screens/main/emotionalStateScreen";
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
        <StackScreen
          options={{ headerShown: false }}
          name='EmotionalState'
          component={EmotionalStateScreen}
        />
      </StackNavigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
