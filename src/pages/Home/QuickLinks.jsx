import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import UpLoadData from "./Components/UpLoadData";
import { Dialog } from "@mui/material";
import { Transition } from "../../constants/Constants";
import { set } from "date-fns";

const QuickLinks = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const data = [
    { name: "Cancel", icon: () => <Close /> },
    { name: "Cancel", icon: () => <Close /> },
    { name: "Cancel", icon: () => <Close /> },
    { name: "Cancel", icon: () => <Close /> },
    { name: "Cancel", icon: () => <Close /> },
    { name: "UpLoadData", icon: () => <Close /> },
  ];
  const handleOpenDialog = (name) => {
    setSelected(name);
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  const handleDisplay = () => {
    switch (selected) {
      case "UpLoadData":
        return <UpLoadData />;
      default:
        return null;
    }
  };
  return (
    <div className="">
      <p className="text-white/60 text-2xl">Quick Links</p>
      <div className="grid grid-cols-4 items-center justify-evenly gap-2 m-5">
        {data?.map((item, index) => (
          <button
            key={index}
            className="bg-slate-900 p-2 h-[15vh] w-[10vw] rounded-xl col justify-evenly items-center"
            onClick={() => handleOpenDialog(item.name)}
          >
            {item.icon()}
            <p>{item.name}</p>
          </button>
        ))}
      </div>
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
          {handleDisplay()}
        </div>
      </Dialog>
    </div>
  );
};

export default QuickLinks;

// 22066750 Ca
