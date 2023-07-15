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
import { auth } from "../APIs/firebase";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../APIs/contexts/Context";

export default function Navbar() {
  const [state, setState] = React.useState(false);
  const { setLoggedInUser } = ContextData();
  const navigate = useNavigate();
  const left = "left";
  const user = auth.currentUser;
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const HandleSignOut = async () => {
    await auth.signOut();
    await setLoggedInUser(null);
    navigate("/", { replace: true });
  };
  const SignInDetails = () => {
    if (user) {
      return (
        <DropDown Title={user?.email}>
          <ListItemButton onClick={HandleSignOut}>
            <ListItemIcon>
              <Logout />
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
      <Button onClick={toggleDrawer(true)}>{left}</Button>
      <SwipeableDrawer
        anchor={left}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list(left)}
      </SwipeableDrawer>
      {/* Box with user name and avatar */}
      <SignInDetails />
    </div>
  );
}
