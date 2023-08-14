import { Container } from "@mui/material";
import { useEffect, useRef } from "react";

import { ContextData } from "../APIs/contexts/Context";
import { Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "../APIs/firebase";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../constants/Constants";

function App() {
  const navigate = useNavigate();
  const { logout, setOnlineStatusTrue } = ContextData();
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      const uid = currentUser?.uid;
      uid && setOnlineStatusTrue(uid);
      !uid && navigate("/", { replace: true });
    });
    return unsubscribe;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container className="relative">
     
        <Outlet context={values} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
