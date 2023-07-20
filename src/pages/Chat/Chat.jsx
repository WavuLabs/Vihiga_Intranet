import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import {
  Alert,
  Avatar,
  Button,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import {
  collection,
  orderBy,
  query,
  serverTimestamp,
  addDoc,
  setDoc,
  doc,
  where,
  or,
} from "firebase/firestore";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { auth, db } from "../../APIs/firebase";
import { ContextData } from "../../APIs/contexts/Context";
import DropDown from "../../components/DropDown";
import { MessageItem } from "./Components/MessageItem";
import { ProgressIndicator } from "../../components/ProgressIndicator";

const Chat = (props) => {
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { USERS, getUserName } = ContextData();
  const { receiverID } = useParams();
  const { thisReceiverMessages } = useOutletContext();
  const uid = auth.currentUser?.uid;
  const [messageText, setMessageText] = useState("");
  const [groupedMessagesState, setGroupedMessagesState] = useState();
  const navigate = useNavigate();
  const bottomRef = useRef();

  const receiverRef = collection(db, `messages/${receiverID}/messages`);
  const senderRef = collection(db, `messages/${uid}/messages`);

  const q = query(
    userName ? senderRef : receiverRef,
    or(
      where("senderID", "==", `${receiverID}`),
      where("receiverID", "==", `${receiverID}`)
    ),
    orderBy("sentAt", "asc")
  );
  const [MessagesBtnTheTwoUsers, loading, error, snapshot] = useCollectionData(
    q,
    { idField: "id" }
  );

  const addData = async () => {
    //store message on both sender and receiver side
    const MessageObject = {
      sentAt: serverTimestamp(),
      senderID: uid,
      receiverID: receiverID,
      message: messageText,
    };

    await addDoc(senderRef, MessageObject); //sender
    console.log("Senders Document successfully written!");

    await addDoc(receiverRef, MessageObject); //receiver
    console.log("Receivers Document successfully written!");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addData();
    setMessageText("");
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const testing = () => {
    console.log(receiverID);
  };

  const groupMessagesByDate = async (messages) => {
    const groupedMessages = {};
    await messages?.forEach((message) => {
      const date = message.sentAt?.toDate().toDateString();
      if (!groupedMessages[date]) {
        groupedMessages[date] = [];
      }
      // Convert sentAt to a string
      const sentAtString = message.sentAt?.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      groupedMessages[date].push({ ...message, sentAt: sentAtString });
    });

    setGroupedMessagesState(groupedMessages);
    console.log(groupedMessages, "groupedMessages");
    // return groupedMessages;
  };

  useEffect(() => {
    getUserName(receiverID, setUserName, setProfilePic);
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [MessagesBtnTheTwoUsers]);

  error && alert("Error occurred in fetching Data");
  return (
    <>
      <div className="flex flex-row justify-between items-center p-1 bg-yellow-900">
        <Avatar src={profilePic} className="m-1" alt="DP" />
        <div className="flex flex-col justify-center items-start m-2 flex-1">
          <p className="text-white">{userName ? userName : receiverID}</p>
          {/* <p className="text-white/50 text-sm">D</p> */}
        </div>
      </div>
      {/* message items */}
      <div className="chatContainer">
        <button onClick={testing}>Testing</button>
        {!loading ? (
          <>
            {MessagesBtnTheTwoUsers?.map((message, index) => {
              const timeSent = message.sentAt?.toDate().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              const messageClass =
                message.senderID === uid ? "sender-chat" : "receiver-chat";

              const hideSender = message.senderID === uid ? "hidden" : "block";
              return (
                <MessageItem
                  key={index}
                  messageItem={message.message}
                  profilePic={profilePic}
                  hideSender={hideSender}
                  sentAT={timeSent}
                  messageClass={messageClass}
                />
              );
            })}
          </>
        ) : (
          <ProgressIndicator />
        )}

        <span ref={bottomRef} className=""></span>
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
