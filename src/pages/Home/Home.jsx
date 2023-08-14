import React from "react";
import { Link } from "react-router-dom";
import ContentCopy from "@mui/icons-material/ContentCopy";
import NewsAndEvents from "./NewsAndEvents";

const Home = () => {
  return (
    <div className="relative overflow-clip h-fit">
      <div className="curved-bottom top-0 ">
        <nav className="rows-center space-x-3">
          <Link to="/">Signin</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/chatpage">ChatPage</Link>
        </nav>
      </div>
      {/* FEATURES */}
      <div className="">
        <div className=" h-[10vw] w-[10vw] p-2 cols-center rounded-full bg-primary text-center">
          <p>FEATURES</p>
          <p>FEATURES</p>
        </div>
      </div>
      <NewsAndEvents />
    </div>
  );
};

export default Home;
