import React from "react";
import { Avatar, Button } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useNavigate } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";

const StaffItem = (props) => {
  const navigate = useNavigate();
  const { staff } = props;
  const { name, department, email, contacts, profile_picture, uid } = staff;
  const details = [
    {
      title: "Department",
      content: department,
      value: () => <WorkOutlineIcon fontSize="large" />,
    },
    {
      title: "Email",
      content: email,
      value: () => <InboxIcon fontSize="large" />,
    },
    {
      title: "Contact",
      content: contacts,
      value: () => <PhoneIcon fontSize="large" />,
    },
  ];
  const HandleClick = async () => {
    navigate(`/chatpage/${uid}`);
  };
  return (
    <div className="custom-borders bg-white/5 shadow-lg flex flex-col  m-1 p-2">
      <div className=" flex flex-row items-center mx-2 elevate-2 shadow-sm shadow-slate-500 p-2">
        <Avatar
          src={profile_picture}
          className="border border-white/40 overflow-clip "
        />
        <p className="m-2 opacity-60 font-medium">{name}</p>
      </div>

      {details.map((detail, index) => (
        <div key={index} className="flex flex-row ml-3 my-1 overflow-hidden">
          {detail.value()}
          <div className="flex flex-col">
            <p className="m-2">{detail.title}</p>
            <p className="m-2 line-clamp-2">{detail.content}</p>
          </div>
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={HandleClick}>
        <MailIcon className="mx-3" /> Message
      </Button>
    </div>
  );
};

export default StaffItem;
