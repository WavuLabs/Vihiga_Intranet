import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className=" flex flex-col">
        <Link to="/signin">Signin</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/chatpage">ChatPage</Link>
      </div>
    </div>
  );
};

export default Home;
