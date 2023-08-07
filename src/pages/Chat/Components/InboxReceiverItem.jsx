import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
import DoneAllIcon from "@mui/icons-material/DoneAll";

import { auth, db } from "../../../APIs/firebase";
import { ContextData } from "../../../APIs/contexts/Context";
//This component will display the message inbox from different senders and the pass the messages of the senders to the chat component

export default function InboxReceiverItem(props) {
  const uid = auth.currentUser?.uid;
  const navigate = useNavigate();
  const { thisReceiver, messagesOfThisReceiver, hideThisReceiver } = props;
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { getUserName } = ContextData();

  /// Query the last messages sent by the user.
  const usersRef = collection(db, `messages/${uid}/messages`);
  const lastQuery = query(
    usersRef,
    or(
      where("senderID.uid", "==", `${thisReceiver}`),
      where("receiverID.uid", "==", `${thisReceiver}`)
    ),
    orderBy("sentAt", "desc"),
    limit(1)
  );
  const [lastMessage, loadingLastMessage, errorLastMessage] =
    useCollectionData(lastQuery);

  useEffect(() => {
    getUserName(thisReceiver, setUserName, setProfilePic);
    errorLastMessage && console.log(errorLastMessage, "errorLastMessage");
  }, []);

  //messages are going to be passed to the chat component
  const HandleClick = async () => {
    console.log(hideThisReceiver);
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
          className={`flex flex-row my-1 px-2 mx-2 py-1 w-[97%] ${hideThisReceiver}`}
          onClick={HandleClick}
        >
          <Avatar src={profilePic} alt="DP" className="m-1 custom-borders" />
          <div className="flex flex-col flex-1 items-start m-1 overflow-x-clip">
            <p className="text-left single-line ">
              {userName ? userName : thisReceiver}
            </p>
            <div className="flex flex-row items-center w-full overflow-clip ">
              {message.senderID.uid === uid && (
                <DoneAllIcon fontSize="small" className="mx-1" />
              )}
              <p className="text-primary text-xs text-left single-line max-w-[15vw]">
                {message.message}
              </p>
            </div>
          </div>

          <p className="text-white/50 text-xs text-right single-line mt-2 ">
            {time}
          </p>
        </button>
      );
    })
  );
}
