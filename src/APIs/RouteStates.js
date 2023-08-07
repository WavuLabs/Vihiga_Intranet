import { Route, Routes, createBrowserRouter } from "react-router-dom";

import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import ChatPage from "../pages/Chat/ChatPage";
import Chat from "../pages/Chat/Chat";
import Home from "../pages/Home/Home";
import App from "../pages/App";
import ChatContext from "./contexts/ChatContext";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "chatpage",
            element: <ChatPage />,
          },
          {
            path: "chatpage/:receiverID",
            element: (
              <ChatPage>
                <Chat />
              </ChatPage>
            ),
          },
        ],
      },
      ///
    ],
  },
]);

const RouteStates = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
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
