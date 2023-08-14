import React, { useEffect } from "react";
import {
  SwipeableDrawer,
  Box,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { Logout as LogoutIcon } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";

import { db } from "../APIs/firebase";
import DropDown from "./DropDown";
import { auth } from "../APIs/firebase";
import InboxMessagesSidebar from "../pages/Chat/Components/InboxMessagesSidebar";
import { ContextData } from "../APIs/contexts/Context";
import UsersSideBar from "../pages/Chat/Components/UsersSideBar";

export default function Navbar(props) {
  const { logout } = ContextData();
  const navigate = useNavigate();
  const uid = auth.currentUser?.uid;

  const [state, setState] = React.useState(false);
  const [DP, setDP] = React.useState(null);
  const [name, setName] = React.useState(null);

  useEffect(() => {
    const userRef = doc(db, "users", uid);
    const getUserData = onSnapshot(userRef, (doc) => {
      const result = doc.data();
      setDP(result.profile_picture);
      setName(result.name);
    });
    return () => uid && getUserData();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;

    setState(open);
  };

  const List = () => (
    <Box className="w-[70vw] h-[100vh] m-2 overflow-clip" role="presentation">
      <UsersSideBar />
      <div onClick={toggleDrawer(false)} className="flex flex-col h-[70vh]  ">
        <InboxMessagesSidebar />
      </div>
    </Box>
  );
  const HandleSignOut = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="relative flex flex-row top-0 bg-[#161B1C] h-[10vh] w-full justify-between items-center">
      {/* Box with Logo */}
      <div className="sm:hidden">
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
      </div>
      <Link to="/">Home </Link>
      <SwipeableDrawer
        anchor="left"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <List />
      </SwipeableDrawer>
      <div>
        <DropDown
          Title={
            <Avatar className="border border-white/40 " src={DP} alt={name} />
          }
        >
          <div className=" mx-1 cols-center">
            <p> {name && "Hello " + name} </p>
            <ListItemButton onClick={HandleSignOut}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </div>
        </DropDown>
      </div>
    </div>
  );
}
