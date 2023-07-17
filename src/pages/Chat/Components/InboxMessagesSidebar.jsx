import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import InboxReceiverItem from "./InboxReceiverItem";
import { useOutletContext } from "react-router-dom";

import { auth, db } from "../../../APIs/firebase";

const InboxMessagesSidebar = (props) => {
  const uid = auth.currentUser?.uid;
  const messagesByAReceiver = {};

  const [receiverState, setReceiverState] = useState({});

  const userMessagesRef = collection(db, `messages/${uid}/messages`);
  //   where("state", "==", "CA")
  const q = query(userMessagesRef, orderBy("sentAt", "asc"));
  const [messagesOfThisUser, loading, error, snapshot] = useCollectionData(q, {
    idField: "id",
  });


  const QueryLastFive = async () => {
    // Query the first page of docs
    // !loadingLastMessage && console.log("QueryLastFive", lastMessage);
  };

  const sortedMessages = () => {
    //  QueryMakes sure the object is empty
    for (let key in messagesByAReceiver) {
      delete messagesByAReceiver[key];
    }

    // Create a query to retrieve all messages with the target sender ID.
    messagesOfThisUser?.forEach((doc) => {
      const messageData = doc;
      const receiverID = messageData.receiverID;

      if (!messagesByAReceiver[receiverID]) {
        // If not, create an empty array for the sender.
        messagesByAReceiver[receiverID] = [];
      }

      messagesByAReceiver[receiverID].push(messageData);
    });

    // Access the messages for each sender.
    for (const receiverID in messagesByAReceiver) {
      const messages = messagesByAReceiver[receiverID];
      // console.log(`Messages from sender ${receiverID}:`, messages);
    }

    setReceiverState(messagesByAReceiver);
    return messagesByAReceiver;
  };

  useEffect(() => {
    if (loading === false) sortedMessages();
  }, [messagesOfThisUser]);

  return (
    <>
      {Object.keys(receiverState).length > 0
        ? Object.entries(receiverState).map(
            ([thisReceiver, messagesOfThisReceiver]) => {
              const hideThisReceiver = thisReceiver === uid ? "hidden" : "";
              return (
                <InboxReceiverItem
                  hideThisReceiver={hideThisReceiver}
                  key={thisReceiver}
                  thisReceiver={thisReceiver}
                  messagesOfThisReceiver={messagesOfThisReceiver}
                />
              );
            }
          )
        : null}
    </>
  );
};

export default InboxMessagesSidebar;
