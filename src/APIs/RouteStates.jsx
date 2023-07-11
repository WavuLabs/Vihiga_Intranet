import { Route, Routes } from "react-router-dom";

import ChatPage from "../pages/ChatPage";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ErrorPage from "../components/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";

const RouteStates = () => {
    return (
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app">
          <Route
            path="chatpage"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    );
  };
  export default RouteStates;