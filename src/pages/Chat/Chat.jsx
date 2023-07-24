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
  const { USERS, getUserName, setLoggedInUserName, loggedInUserName } =
    ContextData();
  const navigate = useNavigate();
  const uid = auth.currentUser?.uid;
  const { receiverID } = useParams();

  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [loggedInUserNameDP, setLoggedInUserNameDP] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [messageText, setMessageText] = useState("");
  const [groupedMessagesState, setGroupedMessagesState] = useState();
  const [isOnline, setIsOnline] = useState(null);
  const { thisReceiverMessages } = useOutletContext();

  const bottomRef = useRef();
  const receiverRef = collection(db, `messages/${receiverID}/messages`);
  const senderRef = collection(db, `messages/${uid}/messages`);

  const q = query(
    userName ? senderRef : receiverRef,
    or(
      where("senderID.uid", "==", `${receiverID}`),
      where("receiverID.uid", "==", `${receiverID}`)
    ),
    orderBy("sentAt", "asc")
  );
  const [MessagesBtnTheTwoUsers, loading, error, snapshot] = useCollectionData(
    q,
    { idField: "id" }
  );

  const addData = async () => {
    uid &&
      receiverID &&
      loggedInUserName &&
      messageText &&
      (await addMessageToBothSides());

    //store message on both sender and receiver side
    async function addMessageToBothSides() {
      const MessageObject = {
        sentAt: serverTimestamp(),
        senderID: { uid: uid, name: loggedInUserName },
        receiverID: { uid: receiverID, name: userName },
        message: messageText,
      };

      await addDoc(senderRef, MessageObject); //sender
      console.log("Senders Document successfully written!");

      await addDoc(receiverRef, MessageObject); //receiver
      console.log("Receivers Document successfully written!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addData();
    setMessageText("");
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const testing = () => {
    console.log(userType);
  };

  const getOnlineStatus = async () => {
    const user = USERS?.find((user) => user.uid === receiverID);
    setIsOnline(user?.is_online);
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
    getOnlineStatus();
    getUserName(receiverID, setUserName, setProfilePic);
    getUserName(uid, setLoggedInUserName, setLoggedInUserNameDP);
    userName ? setUserType("user") : setUserType("group");
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [MessagesBtnTheTwoUsers]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      <div className="flex flex-row justify-between items-center p-1 bg-primary/10">
        <Avatar src={profilePic} className="m-1" alt="DP" />
        <div className="flex flex-col justify-center items-start m-2 flex-1">
          <p className="text-white">{userName ? userName : receiverID}</p>
          {userName && (
            <p className="text-white/50 text-sm">
              {isOnline == true ? "online" : "offline"}
            </p>
          )}
        </div>
      </div>
      {/* message items */}
      <div className="chatContainer ">
        <button onClick={testing}>Testing</button>
        {!loading ? (
          <>
            {MessagesBtnTheTwoUsers?.map((message, index) => {
              const senderID = message.senderID.uid;
              const name = message.senderID.name;

              const timeSent = message.sentAt?.toDate().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              const hideSender = senderID === uid ? "hidden" : null;
              const messageClass =
                senderID === uid ? "sender-chat" : "receiver-chat";
              return (
                <MessageItem
                  key={index}
                  name={name}
                  userType={userType}
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
