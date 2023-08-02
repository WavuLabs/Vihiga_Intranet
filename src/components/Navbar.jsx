import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DropDown from "./DropDown";
import MenuIcon from "@mui/icons-material/Menu";
import { auth } from "../APIs/firebase";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../APIs/contexts/Context";
import ChatPage from "../pages/Chat/ChatPage";
import UsersSideBar from "../pages/Chat/Components/UsersSideBar";
import InboxMessagesSidebar from "../pages/Chat/Components/InboxMessagesSidebar";

export default function Navbar() {
  const [state, setState] = React.useState(false);
  const { logout } = ContextData();
  const navigate = useNavigate();
  const user = auth.currentUser;

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
  const SignInDetails = () => {
    if (user) {
      return (
        <DropDown Title={user?.email}>
          <ListItemButton onClick={HandleSignOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </DropDown>
      );
    }
  };

  return (
    <div className="relative flex flex-row top-0 bg-[#161B1C] h-[10vh] w-full justify-between items-center">
      {/* Box with Logo */}
      <div className="sm:hidden">
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button> 
      </div>
      <p> </p>
      <SwipeableDrawer
        anchor="left"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <List />
      </SwipeableDrawer>
      <SignInDetails />
    </div>
  );
}
