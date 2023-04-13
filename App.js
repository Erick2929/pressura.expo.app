import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import Navigators from "./navigators";
import { SessionProvider } from "./providers/session";
import Login from "./screens/auth/login";

export default function App() {
  return (
    <NativeBaseProvider>
      <SessionProvider>
        <Navigators />
      </SessionProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
