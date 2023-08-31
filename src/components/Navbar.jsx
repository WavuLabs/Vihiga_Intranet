import React, { useEffect } from "react";
import {
  SwipeableDrawer,
  Box,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { Image, Logout as LogoutIcon } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";

import { db } from "../APIs/firebase";
import DropDown from "./DropDown";
import { auth } from "../APIs/firebase";
import InboxMessagesSidebar from "../pages/Chat/Components/InboxMessagesSidebar";
import { ContextData } from "../APIs/contexts/Context";
import UsersSideBar from "../pages/Chat/Components/UsersSideBar";
import Logo from "../../public/assets/VihigaLogo.png";

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
    <>
      <SwipeableDrawer
        anchor="left"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <List />
      </SwipeableDrawer>
      <div className="sticky grid grid-cols-2 top-0 mb-2 h-[10vh] w-full ">
        {/* Box with Logo */}
        <div className=" bg-[#020202]/60 overflow-clip">
          <div className="sm:hidden">
            <Button onClick={toggleDrawer(true)}></Button>
          </div>
          <img src={Logo} className="w-1/4 h-[9vh] m-2" />

          {/* <div className="flex-1"></div> */}
        </div>

        <div className=" bg rows-center">
          <ol className="rows-center flex-1 space-x-3 text-primary">
            <Link className="links" to="/">HOME </Link>
            <Link className="links" to="/">SIGNIN</Link>
            <Link className="links" to="/signup">SIGNUP</Link>
            <Link className="links" to="/chatpage">CHAT</Link>
          </ol>
          <div className="mx-5">
            <DropDown
              Title={
                <Avatar
                  className="border border-white/40 "
                  src={DP}
                  alt={name}
                />
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
      </div>
    </>
  );
}
