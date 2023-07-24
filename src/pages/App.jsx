import { Container } from "@mui/material";
import RouteStates from "../APIs/RouteStates";
import { useEffect, useRef } from "react";
import { auth } from "../APIs/firebase";

import { ContextData } from "../APIs/contexts/Context";
import "../styles/App.css";

function App() {
  const { logout } = ContextData();
  const timeoutRef = useRef();

  const handleUserActivity = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, 15 * 60 * 1000); 
  };

  useEffect(() => {
    const handleGlobalEvent = (event) => {
      handleUserActivity();
    };

    document.addEventListener("click", handleGlobalEvent);
    document.addEventListener("keydown", handleGlobalEvent);
    document.addEventListener("scroll", handleGlobalEvent);

    return () => {
      document.removeEventListener("click", handleGlobalEvent);
      document.removeEventListener("keydown", handleGlobalEvent);
      document.removeEventListener("scroll", handleGlobalEvent);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Container className="relative">
      <RouteStates />
    </Container>
  );
}

export default App;
