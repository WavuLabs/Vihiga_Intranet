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

import { auth, db } from "../../../APIs/firebase";

const InboxMessagesSidebar = (props) => {
  const uid = auth.currentUser?.uid;
  const messagesByAReceiver = {};

  const [receiverState, setReceiverState] = useState({});

  const userMessagesRef = collection(db, `messages/${uid}/messages`);
  const q = query(userMessagesRef, orderBy("sentAt", "desc"));
  const [messagesOfThisUser, loading, error] = useCollectionData(q);

  const sortedMessages = () => {
    //  QueryMakes sure the object is empty
    for (let key in messagesByAReceiver) {
      delete messagesByAReceiver[key];
    }

    // Create a query to retrieve all messages with the target sender ID.
    messagesOfThisUser?.forEach((doc) => {
      const messageData = doc;
      const receiverID = messageData.receiverID;

      if (!messagesByAReceiver[receiverID.uid]) {
        // If not, create an empty array for the sender.
        messagesByAReceiver[receiverID.uid] = [];
      }

      messagesByAReceiver[receiverID.uid].push(messageData);
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
    if (loading === false) {
      const messagesByAReceiver = sortedMessages();
      // console.log(Object.keys(messagesByAReceiver).length);
      sortedMessages();
    }
    error && alert(error.message);
  }, [messagesOfThisUser]);

  return (
    <>
      <p className="p-2">Inbox</p>
      <div className="overflow-x-hidden overflow-y-scroll flex-1 custom-borders">
        <div className="flex flex-col flex-1 justify-start items-center">
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
        </div>
      </div>
    </>
  );
};

export default InboxMessagesSidebar;
