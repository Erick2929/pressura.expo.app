import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ConfirmData from "../../screens/main/confirmDataScreen";
import Doctors from "../../screens/main/doctorsScreen";
import EmotionalStateScreen from "../../screens/main/emotionalStateScreen";
import Habits from "../../screens/main/habitsScreen";
import History from "../../screens/main/historyScreen";
import MainScreen from "../../screens/main/mainScreen";
import Pressure from "../../screens/main/pressureScreen";
import Profile from "../../screens/main/profileScreen";

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
        <StackScreen
          options={{ headerShown: false }}
          name='ConfirmData'
          component={ConfirmData}
        />
        <StackScreen
          options={{ headerShown: false }}
          name='History'
          component={History}
        />
        <StackScreen
          options={{ headerShown: false }}
          name='Habits'
          component={Habits}
        />
        <StackScreen
          options={{ headerShown: false }}
          name='Profile'
          component={Profile}
        />
        <StackScreen
          options={{ headerShown: false }}
          name='Doctors'
          component={Doctors}
        />
      </StackNavigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
