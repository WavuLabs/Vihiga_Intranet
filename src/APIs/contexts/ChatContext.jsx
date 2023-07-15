import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../firebase";

const ChatContext = () => {
  const [state, setState] = useState("Intial State");
  const [thisReceiverMessages, setThisReceiverMessages] = useState([]);
  const [thisReceiverName, setThisReceiverName] = useState("");
  const values = {
    uidContext: auth.currentUser?.uid,
    state,
    setState,
    thisReceiverMessages,
    setThisReceiverMessages,
    thisReceiverName,
    setThisReceiverName,
    // receiverID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    // senderName: "Rahul",
    // messageText: "",
    // bottomRef: useRef(),
    // usersRef: collection(db, `users/${uid}/messages`),
    // groupsRef: collection(db, "groups"),
    // q: query(usersRef, where("senderID", "==", `${uid}`)),
    // messageObject: {
    //   sentAt: serverTimestamp(),
    //   senderID: { uid: uid, displayName: senderName },
    //   receiverID: receiverID,
    //   message: messageText,
    // },
    // addData: async () => {
    //   await addDoc(usersRef, messageObject);
    //   console.log("Document successfully written!");
    // },
    // handleSubmit: async (event) => {
    //   event.preventDefault();
    //   await addData(messageText);
    //   setMessageText("");
    //   bottomRef.current.scrollIntoView({ behavior: "smooth" });
    // },
  };

  return (
    <>
      <Outlet context={values} />
    </>
  );
};

export default ChatContext;
