import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../firebase";

const ChatContext = () => {
  const [thisReceiverMessages, setThisReceiverMessages] = useState([]);

  const values = {
    thisReceiverMessages,
    setThisReceiverMessages,
  };
  return <Outlet context={values} />;
};

export default ChatContext;
