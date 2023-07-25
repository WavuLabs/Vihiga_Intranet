import React, { useEffect, useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../APIs/firebase";
import { ContextData } from "../../../APIs/contexts/Context";
import { useNavigate } from "react-router-dom";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import UsersSideBarItem from "./UsersSideBarItem";
import DropDown from "../../../components/DropDown";
import { ProgressIndicator } from "../../../components/ProgressIndicator";
import SearchIcon from "@mui/icons-material/Search";

const UsersSideBar = () => {
  const uid = auth.currentUser?.uid;
  const {
    USERS,
    loadingUSERS,
    GROUPS,
    loadingGROUPS,
    userGroups,
    setUserGroups,
  } = ContextData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const getGroups = async () => {
    const uid = auth.currentUser.uid;
    const user = USERS?.find((user) => user.uid === uid);
    setUserGroups(user?.groups);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const searchTermToLowerCase = event.target.value.toLowerCase();

    const resultsOfSearch = USERS?.filter((user) =>
      user.name.toLowerCase().includes(searchTermToLowerCase)
    );
    setFilteredResults(resultsOfSearch);
  };

  const handleGroupItemClick = (group) => {
    navigate(`/chatpage/${group}`);
  };

  useEffect(() => {
    if (USERS) {
      setFilteredResults(USERS);
      getGroups();
    }
  }, [USERS]);

  return (
    <>
      <TextField
        type="search"
        label="Search Chat"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full rounded-sm m-2"
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
      <div className="flex flex-row overflow-y-hidden overflow-x-scroll">
        {loadingUSERS == false ? (
          filteredResults?.map((user, index) => (
            <UsersSideBarItem
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
    </>
  );
};

export default UsersSideBar;
