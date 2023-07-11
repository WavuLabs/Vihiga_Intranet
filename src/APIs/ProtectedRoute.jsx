import { Navigate } from "react-router-dom";
import { ContextData } from "../APIs/contexts/Context";
import Navbar from "../components/Navbar";

const ProtectedRoute = ({ children }) => {
  // const ProtectedRoute = () => {
  // const { user } = ContextData();

  // if (!user) {
  //   // return <Navigate to='/' />;
  // }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProtectedRoute;
