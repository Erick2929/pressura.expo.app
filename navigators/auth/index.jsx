import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/auth/login";
import RecoverPassword from "../../screens/auth/recoverPassword";
import Signin from "../../screens/auth/signin";

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
        <StackScreen
          options={{ headerShown: false }}
          name='Signin'
          component={Signin}
        />
        <StackScreen
          options={{ headerShown: false }}
          name='Recover'
          component={RecoverPassword}
        />
      </StackNavigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
