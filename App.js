import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { StyleSheet } from "react-native";
import Navigators from "./navigators";
import { SessionProvider } from "./providers/session";
import { UserProvider } from "./providers/user";
import Login from "./screens/auth/login";

export default function App() {
  return (
    <NativeBaseProvider>
      <SessionProvider>
        <UserProvider>
          <Navigators />
        </UserProvider>
      </SessionProvider>
    </NativeBaseProvider>
  );
}
