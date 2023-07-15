import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import DropDown from "../components/DropDown";
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
import { auth, db } from "../APIs/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MessageItem } from "../components/MessageItem";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ProgressIndicator } from "./ProgressIndicator";
import { ContextData } from "../APIs/contexts/Context";

const Chat = (props) => {
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { USERS, getUserName } = ContextData();
  const { receiverID } = useParams();
  const { thisReceiverMessages, thisReceiverName } = useOutletContext();
  const uid = auth.currentUser?.uid;
  const [messageText, setMessageText] = useState("");
  const [groupedMessagesState, setGroupedMessagesState] = useState();
  const navigate = useNavigate();
  const bottomRef = useRef();

  const groupsRef = collection(db, "groups");
  const receiverRef = collection(db, `users/${receiverID}/messages`);
  const senderRef = collection(db, `users/${uid}/messages`);

  const q = query(
    senderRef,
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
    console.log(userName, "userName");
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
      <div className="flex flex-row justify-between items-center p-2 bg-yellow-900">
        <Avatar src={profilePic} className="m-1" alt="DP" />
        <div className="flex flex-col justify-center items-start m-2 flex-1">
          {/* <p className="text-white">{thisReceiverName}</p> */}
          <p className="text-white">{userName && userName}</p>
          <p className="text-white/50 text-sm">Department Name</p>
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

        <span ref={bottomRef} className="h-1"></span>
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
[
  {
    message: "from walter account to test account",
    receiverID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    sentAt: {
      seconds: 1689249847,
      nanoseconds: 791000000,
    },
    senderID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
  },
  {
    message: "I am from walter sending to test",
    sentAt: {
      seconds: 1689252416,
      nanoseconds: 575000000,
    },
    receiverID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    senderID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
  },
  {
    sentAt: {
      seconds: 1689314693,
      nanoseconds: 164000000,
    },
    receiverID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    senderID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
    message: "hello test",
  },
  {
    senderID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    message: "test to walt",
    sentAt: {
      seconds: 1689315047,
      nanoseconds: 953000000,
    },
    receiverID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
  },
  {
    receiverID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
    message: "test sending to walt after updating the query method",
    senderID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    sentAt: {
      seconds: 1689316515,
      nanoseconds: 776000000,
    },
  },
  {
    sentAt: {
      seconds: 1689324872,
      nanoseconds: 607000000,
    },
    receiverID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
    message:
      "TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, TRying a long text, ",
    senderID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
  },
  {
    message: "hi",
    receiverID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
    sentAt: {
      seconds: 1689324919,
      nanoseconds: 473000000,
    },
    senderID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
  },
  {
    receiverID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    message: "hi",
    sentAt: {
      seconds: 1689324939,
      nanoseconds: 969000000,
    },
    senderID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
  },
  {
    message: "j",
    sentAt: {
      seconds: 1689325014,
      nanoseconds: 507000000,
    },
    senderID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    receiverID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
  },
  {
    receiverID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
    message: "d",
    senderID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    sentAt: {
      seconds: 1689325071,
      nanoseconds: 648000000,
    },
  },
  {
    message: "dddd",
    receiverID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
    sentAt: {
      seconds: 1689325144,
      nanoseconds: 968000000,
    },
    senderID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
  },
  {
    senderID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    sentAt: {
      seconds: 1689325988,
      nanoseconds: 942000000,
    },
    receiverID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
    message: "dfsdf",
  },
  {
    senderID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    message: "dfdfdf",
    sentAt: {
      seconds: 1689325993,
      nanoseconds: 430000000,
    },
    receiverID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
  },
  {
    senderID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    message: "sdfsd",
    sentAt: {
      seconds: 1689326288,
      nanoseconds: 558000000,
    },
    receiverID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
  },
  {
    message: "ffffffff",
    senderID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    receiverID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
    sentAt: {
      seconds: 1689326298,
      nanoseconds: 165000000,
    },
  },
  {
    sentAt: {
      seconds: 1689326959,
      nanoseconds: 61000000,
    },
    senderID: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
    receiverID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    message: "dsfsdfd",
  },
];
