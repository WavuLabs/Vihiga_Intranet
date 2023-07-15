import React, { useRef, useState } from "react";
import { ContextData } from "../APIs/contexts/Context";
import { useNavigate } from "react-router-dom";
import { TextInputComponents } from "../components/TextInputComponents";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { addingNewUsers, createUser } = ContextData();

  const HandleSignup = async () => {
    try {
      await createUser(email, password)
        .then((userCredential) => {
          // Signed in
          const uid = userCredential.user.uid;
          const userObject = {
            name: name,
            email: email,
            uid: uid,
          };
          addingNewUsers(userObject);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full px-4 py-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Sign up</h1>
        <p className="text-gray-600">Create account</p>

        <TextInputComponents
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInputComponents
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextInputComponents
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
