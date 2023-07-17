import React, { useEffect, useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import { doc, getDoc } from "firebase/firestore";

import { ProgressIndicator } from "../../components/ProgressIndicator";
import { ContextData } from "../../APIs/contexts/Context";
import { auth, db } from "../../APIs/firebase";
import DropDown from "../../components/DropDown";
import { GroupsItem } from "./Components/GroupsItem";
import UsersSideBar from "./Components/UsersSideBar";
import InboxMessagesSidebar from "./Components/InboxMessagesSidebar";
import { MenuItem } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";

const ChatPage = ({ children }) => {
  const navigate = useNavigate();
  const uid = auth.currentUser?.uid;
  const {
    USERS,
    loadingUSERS,
    GROUPS,
    loadingGROUPS,
    userGroups,
    setUserGroups,
  } = ContextData();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      const uid = currentUser?.uid;
      if (uid) {
        getGroups();
      }
    });
    return unsubscribe;
  }, []);

  const getGroups = async () => {
    const uid = auth.currentUser.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserGroups(docSnap.data().groups);
    } else {
      console.log("No such document!");
    }
  };

  const handleGroupItemClick = (group) => {
    navigate(`/chatpage/${group}`);
  };

  return (
    <div className="w-full h-[89vh] flex flex-row overflow-clip">
      {/* Main sidebar div */}
      <div className="bg-[#0A0E0F] w-1/3 hidden sm:block flex-col justify-between ">
        {/* departments div*/}
        <div className="custom-borders">
          <div className="flex flex-row justify-between items-center">
            <p className="text-white p-3">Users</p>
            <button
              onClick={() => {}}
              className="bg-[#0A0E0F] text-white/50 p-3 text-sm flex flex-row justify-between items-center"
            >
              New Chat <AiOutlineCaretRight className="ml-1" />
            </button>
          </div>
          <div className="flex flex-row overflow-y-hidden overflow-x-scroll">
            {loadingUSERS == false ? (
              USERS?.map((user, index) => (
                <UsersSideBar
                  key={index}
                  user={user}
                  hideSender={user.uid === uid ? "hidden" : ""}
                />
              ))
            ) : (
              <ProgressIndicator />
            )}
          </div>
          <DropDown Title="Groups">
            {userGroups?.map((group, index) => (
              <MenuItem key={index} onClick={() => handleGroupItemClick(group)}>
                {group}
              </MenuItem>
            ))}
          </DropDown>
        </div>

        {/*  */}
        <div className="flex-1 h-full custom-borders overflow-clip w-full">
          <p className="text-white p-3">Messages</p>
          <div className="flex flex-col overflow-y-scroll overflow-x-hidden h-5/6 w-full">
            <InboxMessagesSidebar />
          </div>
        </div>
      </div>

      {/* IN chat */}
      <div className="bg-[#121616] flex-1 relative ">
        {/* CHAT */}
        {children}
      </div>
    </div>
  );
};

export default ChatPage;
