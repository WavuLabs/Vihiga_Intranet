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
import UserProfile from "../pages/UserProfile/UserProfile";

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
            path: "/profile",
            element: <UserProfile />,
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
