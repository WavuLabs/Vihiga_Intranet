import { Avatar } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  limit,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../../../APIs/firebase";
import { ContextData } from "../../../APIs/contexts/Context";
//This component will display the message inbox from different senders and the pass the messages of the senders to the chat component

export default function InboxReceiverItem(props) {
  const uid = auth.currentUser?.uid;
  const navigate = useNavigate();
  const { thisReceiver, messagesOfThisReceiver, hideThisReceiver } = props;
  const { setThisReceiverMessages } = useOutletContext();
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { loadingUSERS, USERS } = ContextData();

  /// Query the last messages sent by the user.
  const usersRef = collection(db, `messages/${uid}/messages`);
  const last = query(
    usersRef,
    or(
      where("senderID", "==", `${thisReceiver}`),
      where("receiverID", "==", `${thisReceiver}`)
    ),
    orderBy("sentAt", "desc"),
    limit(1)
  );
  const [
    lastMessage,
    loadingLastMessage,
    errorLastMessage,
    snapshotLastMessage,
  ] = useCollectionData(last, { idField: "id" });

  /// Query the last messages sent by the user.

  // console.log(messagesOfThisSender, "messagesOfThisSender");
  const getUserName = (uid) => {
    const user = USERS?.find((user) => user.uid === uid);

    if (!user) {
      console.log("Error: User not found");
      return null;
    }

    setUserName(user.name);
    setProfilePic(user.profile_picture);
  };

  useEffect(() => {
    getUserName(thisReceiver);
  }, [loadingUSERS]);

  //messages are going to be passed to the chat component
  const HandleClick = async () => {
    navigate(`/chatpage/${thisReceiver}`);
  };

  return (
    lastMessage &&
    lastMessage.map((message, index) => {
      const time = message.sentAt?.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return (
        <button
          key={index}
          className={`flex flex-row my-1 py-1 w-full ${hideThisReceiver}`}
          onClick={HandleClick}
        >
          <Avatar src={profilePic} alt="DP" className="m-1 custom-borders" />
          <>
            <div className="flex flex-col justify-between items-start m-2 flex-1">
              <p className="text-left single-line ">{userName ? userName : thisReceiver} </p>
              <p className="text-primary  single-line text-xs">
                {message.message}
              </p>
            </div>
            <div className="self-end">
              <p className="text-white/50 text-xs  text-right">{time}</p>
            </div>
          </>
        </button>
      );
    })
  );
}
