import React, { useEffect, useState } from "react";
import { Close, CloudUpload } from "@mui/icons-material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import EventIcon from "@mui/icons-material/Event";
import ApprovalIcon from "@mui/icons-material/Approval";
import UpLoadForms from "./Components/UpLoadForms";
import PendingApprovals from "../PendingApprovals/PendingApprovals";
import AddNews from "./NewsAndEvents/Components/AddNews";
import AddEvents from "./NewsAndEvents/Components/AddEvents";
import DialogComponent from "../../components/DialogComponent";
import { useOutletContext } from "react-router-dom";
import { tr } from "date-fns/locale";

const data = [
  { name: "UpLoadForms", icon: () => <CloudUpload fontSize="large" /> },
  { name: "Approvals", icon: () => <ApprovalIcon fontSize="large" /> },
  { name: "Add News/Notice", icon: () => <NewspaperIcon /> },
  { name: "Add Events", icon: () => <EventIcon /> },
];

const QuickLinks = () => {
  const { uid, currentUser } = useOutletContext();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [head, setHead] = useState();
  const userJobTitle = currentUser?.jobTitle;
  const titles = ["CECM", "Chief Officer", "Executive"];

  const checkForHeadOfDepartment = () => {
    setHead(titles.includes(userJobTitle));
  };

  const handleClose = () => setOpen(!open);

  const handleOpenDialog = (name) => {
    setSelected(name);
    setOpen(!open);
  };

  useEffect(() => {
    checkForHeadOfDepartment();
  }, [currentUser]);

  const handleDisplay = () => {
    switch (selected) {
      case "UpLoadForms":
        return <UpLoadForms handleClose={handleClose} />;
      case "Approvals":
        return <PendingApprovals handleClose={handleClose} />;
      case "Add News/Notice":
        return <AddNews handleClose={handleClose} />;
      case "Add Events":
        return <AddEvents handleClose={handleClose} />;
      default:
        return <p>Not Found</p>;
    }
  };
  return (
    <div className="">
      <p className="text-white/60 text-2xl ml-2">Quick Links</p>
      <div className="grid sm:grid-cols-4 grid-cols-2 items-center justify-evenly gap-2 m-5">
        {data?.map((item, index) => {
          if (item.name === "Approvals" && !head) return;

          return (
            <button
              key={index}
              className="bg-slate-900 p-2 h-[18vh] sm:w-[15vw] rounded-xl col justify-evenly items-center"
              onClick={() => handleOpenDialog(item.name)}
            >
              {item.icon()}
              <p>{item.name}</p>
            </button>
          );
        })}
      </div>
      <DialogComponent props={{ open, setOpen }}>
        {handleDisplay()}
      </DialogComponent>
    </div>
  );
};

export default QuickLinks;

// 22066750 Ca
