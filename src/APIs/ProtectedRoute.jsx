import { Navigate } from "react-router-dom";
import { ContextData } from "../APIs/contexts/Context";

const ProtectedRoute = ({ children }) => {
  // const ProtectedRoute = () => {
  const { user } = ContextData();

  if (!user) {
    // return <Navigate to='/' />;
  }
  return (
    <>
      <h1>Hello world!</h1>
      {children}
    </>
  );
};

export default ProtectedRoute;
