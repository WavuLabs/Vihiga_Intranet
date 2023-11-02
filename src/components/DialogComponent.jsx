import { Dialog } from "@mui/material";
import React from "react";
import { Transition } from "../constants/Constants";
import { Close } from "@mui/icons-material";

const DialogComponent = ({ props, children }) => {
  const { open, setOpen } = props;
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      className="p-4 m-2 relative"
    >
      <div className="relative col ">
        <button
          className="fixed bg-black/60 z-10 p-0 self-end rounded-none"
          onClick={handleClose}
        >
          <Close />
        </button>
        {console.log(open, "open")}
        {children}
      </div>
    </Dialog>
  );
};

export default DialogComponent;
