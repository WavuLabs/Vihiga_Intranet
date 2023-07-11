import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../APIs/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import MessagesSenderItem from "./MessagesSenderItem";

const messagesBySender = {};

const MessagesSidebar = (props) => {
  const uid = auth.currentUser?.uid;

  const [sendersState, setSendersState] = useState({});

  const usersRef = collection(db, `users/${uid}/messages`);
  //   where("state", "==", "CA")
  const q = query(usersRef, orderBy("sentAt", "asc"));
  const [messages, loading, error, snapshot] = useCollectionData(q, {
    idField: "id",
  });

  const sortedMessages = () => {
    //  Makes sure the object is empty
    for (let key in messagesBySender) {
      delete messagesBySender[key];
    }

    // Create a query to retrieve all messages with the target sender ID.
    messages?.forEach((doc) => {
      const messageData = doc;
      const senderId = messageData.senderID.uid;

      if (!messagesBySender[senderId]) {
        // If not, create an empty array for the sender.
        messagesBySender[senderId] = [];
      }

      messagesBySender[senderId].push(messageData);
    });

    // Access the messages for each sender.
    for (const senderId in messagesBySender) {
      const messages = messagesBySender[senderId];
      console.log(`Messages from sender ${senderId}:`, messages);
    }

    setSendersState(messagesBySender);
    return messagesBySender;
  };

  useEffect(() => {
    if (loading === false) sortedMessages();
  }, [loading]);

  return (
    <>
      <button onClick={sortedMessages}>Sort</button>
      {Object.keys(sendersState).length > 0
        ? Object.entries(sendersState).map(([sender, messages]) => (
            <div key={sender}>
              <h1>{sender}</h1>
              {messages.map((message, index) => (
                <p key={index}>{message.message}</p>
              ))}
            </div>
          ))
        : null}
      {messages?.map((message, index) => {
        return <MessagesSenderItem key={index} message={message} />;
      })}
    </>
  );
};

export default MessagesSidebar;

[
  {
    receiverID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    message: "dssd",
    senderID: {
      uid: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
      displayName: "displayName",
    },
    sentAt: {
      seconds: 1689063224,
      nanoseconds: 565000000,
    },
  },
  {
    message: "dsfsdf",
    receiverID: "qDMMAQi9y0MZybSTP51WPgiqPNV2",
    senderID: {
      displayName: "displayName",
      uid: "YoxLqDOmJVf6EAwGKCTV1jY0Dfc2",
    },
    sentAt: {
      seconds: 1689064981,
      nanoseconds: 233000000,
    },
  },
];
