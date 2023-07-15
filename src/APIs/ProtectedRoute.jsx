import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { auth } from "./firebase";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      const uid = currentUser?.uid;
      if (!uid) navigate("/", { replace: true });
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProtectedRoute;
