import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ProgressIndicator } from "../../components/ProgressIndicator";
import { TextInputComponents } from "../../components/TextInputComponents";
import { ContextData } from "../../APIs/contexts/Context";
import { auth } from "../../APIs/firebase";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const { signIn, setOnlineStatusTrue } = ContextData();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      const uid = currentUser?.uid;
      setUser(uid);
      setOnlineStatusTrue(uid);
      if (uid) navigate("chatpage", { replace: true });
    });
    return unsubscribe;
  }, []);

  const HandleSignin = async () => {
    try {
      await signIn(email, password);
      setOnlineStatusTrue(user);
      navigate("chatpage", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="max-w-md w-full px-4 py-8 text-center">
        <h1 className="text-3xl font-semibold">Sign in</h1>
        <p className="text-gray-600">Sign in to your account</p>
        <TextInputComponents
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInputComponents
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          onClick={HandleSignin}
          className="my-4 w-full bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Sign in
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="my-4 w-full bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Create account
        </button>
      </div>
    </div>
  );
};

export default Signin;
