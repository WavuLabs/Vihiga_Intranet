import React, { useRef, useState } from "react";
import { ContextData } from "../APIs/contexts/Context";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();

  const HandleSignup = async () => {
    try {
      await createUser(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const { createUser } = ContextData();

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full px-4 py-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Sign up</h1>
        <p className="text-gray-600">Create account</p>

        <input
          ref={emailInputRef}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-4 w-full bg-gray-200 rounded border-gray-400 focus:bg-white focus:border-gray-700"
        />

        <input
          ref={passwordInputRef}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="my-4 w-full bg-gray-200 rounded border-gray-400 focus:bg-white focus:border-gray-700"
        />

        <button
          type="submit"
          onClick={HandleSignup}
          className="my-4 w-full bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Signup;
