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
import { Container, InputAdornment, MenuItem, TextField } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";

const ChatPage = ({ children }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

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
    loadingUSERS == false && setFilteredResults(USERS);
  }, [loadingUSERS]);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const searchTermToLowerCase = event.target.value.toLowerCase();

    const resultsOfSearch = USERS?.filter((user) =>
      user.name.toLowerCase().includes(searchTermToLowerCase)
    );
    setFilteredResults(resultsOfSearch);
  };

  return (
    <div className="w-full h-[89vh] flex flex-row overflow-clip">
      {/* Main sidebar div */}
      <div className="bg-[#0A0E0F] w-1/3 hidden sm:block flex-col justify-between ">
        {/* departments div*/}
        <div className="custom-borders">
          <div className="flex flex-row justify-between items-center">
            <p className="text-white p-3 w-fit">Users</p>
            <TextField
              type="search"
              label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-1 rounded-sm m-2"
              size="small"
              autoComplete="on"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="flex flex-row overflow-y-hidden overflow-x-scroll">
            {loadingUSERS == false ? (
              filteredResults?.map((user, index) => (
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
