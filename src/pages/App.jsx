import { Container } from "@mui/material";
import { useEffect, useRef } from "react";

import { ContextData } from "../APIs/contexts/Context";
import { Outlet } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../APIs/firebase";

function App() {
  const { logout, handleGetUsers } = ContextData();
  const timeoutRef = useRef();

  const values = {};

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
      <Outlet context={values} />
    </Container>
  );
}

export default App;
