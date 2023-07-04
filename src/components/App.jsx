import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../APIs/ProtectedRoute";
import { ContextData } from "../APIs/contexts/Context";
import "../styles/App.css";

import Chat from "../pages/Chat";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <>
        <Routes>
          <Route path="/" element={<Signin />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/app">
            <Route
              path="chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </>
    </>
  );
}

export default App;
