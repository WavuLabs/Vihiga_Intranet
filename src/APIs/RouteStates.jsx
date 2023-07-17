import { Route, Routes } from "react-router-dom";

import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import ChatPage from "../pages/Chat/ChatPage";
import Chat from "../pages/Chat/Chat";
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
