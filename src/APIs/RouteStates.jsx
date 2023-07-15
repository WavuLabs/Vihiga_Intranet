import { Route, Routes } from "react-router-dom";

import ChatPage from "../pages/ChatPage";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ErrorPage from "../components/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "../components/Chat";
import ChatContext from "./contexts/ChatContext";

const RouteStates = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ChatContext />}>
        <Route
          path="chatpage/:receiverID"
          element={
            <ProtectedRoute>
              <ChatPage>
                <Chat />
              </ChatPage>
            </ProtectedRoute>
          }
        />
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
