import { useEffect } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import Navbar from "../components/Navbar";
import { auth } from "./firebase";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const values = useOutletContext();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      const uid = currentUser?.uid;
      if (!uid) navigate("/signin", { replace: true });
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Navbar />
      <Outlet context={values} />
    </>
  );
};

export default ProtectedRoute;
