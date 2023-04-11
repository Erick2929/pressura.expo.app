import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/auth/login";

const { Navigator: StackNavigator, Screen: StackScreen } =
  createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator>
        <StackScreen
          options={{ headerShown: false }}
          name='Login'
          component={Login}
        />
      </StackNavigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
