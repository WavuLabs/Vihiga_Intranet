import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import DropDown from "../components/DropDown";
import { Avatar, Button, MenuItem, Stack, TextField } from "@mui/material";
import {
  collection,
  orderBy,
  query,
  serverTimestamp,
  addDoc,
  setDoc,
  doc,
  where,
} from "firebase/firestore";
import { auth, db } from "../APIs/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MessageItem } from "../components/MessageItem";
import { ContextData } from "../APIs/contexts/Context";

const Chat = () => {
  const uid = auth.currentUser?.uid;
  const { USERS, loadingUSERS } = ContextData();

  const [userName, setUserName] = useState([]);

  const getUserName = async () => {
    if (loadingUSERS === true) return;
    const result = USERS?.find((user) => user.uid === uid);
    if (result.length > 1) {
      console.log("Error: Multiple users with same UID found");
      return;
    }
    setUserName(result.name);
  };

  useEffect(() => {
    getUserName();
    // console.log(values);
  }, [USERS]);

  const [messageText, setMessageText] = useState("");
  const bottomRef = useRef();
  const usersRef = collection(db, `users/${uid}/messages`);
  const groupsRef = collection(db, "groups");

  const q = query(usersRef, where("senderID.uid", "==", `${uid}`));
  const [values, loading, error, snapshot] = useCollectionData(q, {
    idField: "id",
  });

  const messageObject = {
    sentAt: serverTimestamp(),
    senderID: { uid: uid, displayName: userName },
    receiverID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    message: messageText,
  };

  const addData = async () => {
    await getUserName();
    await addDoc(usersRef, messageObject);
    console.log("Document successfully written!");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addData(messageText);
    setMessageText("");
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center p-2 bg-yellow-900">
        <Avatar className="m-1">B</Avatar>
        <div className="flex flex-col justify-center items-start m-2 flex-1">
          <p className="text-white">Name</p>
          <p className="text-white/50 text-sm">Department Name</p>
        </div>
      </div>
      {/* message items */}
      <div className="chatContainer">
        {!loading == true
          ? values.map((message, index) => {
              const timeSent = message.sentAT?.toDate().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              const messageClass =
                message.senderID.uid === uid ? "sent-chat" : "received-chat";
              return (
                <MessageItem
                  key={index}
                  messageItem={message.message}
                  sentAT={timeSent}
                  messageClass={messageClass}
                />
              );
            })
          : null}
        <p ref={bottomRef}></p>
      </div>

      <form
        className="bg-[#121616] flex flex-row w-full absolute bottom-0 justify-between items-center p-3 space-x-1"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Message"
          placeholder="Type your message here"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          margin="none"
          className="flex-1 rounded-sm m-1"
          size="small"
          required
          autoFocus={true}
          autoComplete="off"
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
    </>
  );
};

export default Chat;
