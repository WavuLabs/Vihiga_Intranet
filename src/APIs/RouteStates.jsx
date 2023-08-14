import { Route, Routes, createBrowserRouter, redirect } from "react-router-dom";

import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import ChatPage from "../pages/Chat/ChatPage";
import Chat from "../pages/Chat/Chat";
import Home from "../pages/Home/Home";
import App from "../pages/App";
import ChatContext from "./contexts/ChatContext";
import { auth } from "./firebase";

export const Router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/",
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
            path: "/home",
            element: <Home />,
          },
          {
            path: "chatpage",
            element: <ChatPage />,
            children: [
              {
                path: ":receiverID",
                element: <Chat />,
              },
            ],
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
