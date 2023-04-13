import { useContext } from "react";
import SessionProvider, { sessionContext } from "./provider";

const useSession = () => useContext(sessionContext);

export { useSession, SessionProvider };
