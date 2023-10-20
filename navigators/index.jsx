import React from "react";
import { useSession } from "../providers/session";
import AuthNavigator from "./auth";
import MainNavigator from "./main";

function Navigators() {
  const { isLogged } = useSession();

  if (isLogged) return <MainNavigator />;
  return <AuthNavigator />;
}

export default Navigators;
