import { useContext } from "react";
import UserProvider, { userContext } from "./provider";

const useUser = () => useContext(userContext);

export { useUser, UserProvider };
