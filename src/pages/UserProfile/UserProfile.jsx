import { Avatar, Button, Dialog, Slide, Tab, Table } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import GroupsIcon from "@mui/icons-material/Groups";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { auth, db } from "../../APIs/firebase";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { TextInputComponents } from "../../components/TextInputComponents";
import { set } from "date-fns";
import { addDoc, doc, setDoc } from "firebase/firestore";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserProfile = () => {
  // const uid = auth.currentUser?.uid;
  const { USERS, uid } = useOutletContext();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [contacts, setContacts] = useState();
  const [id, setId] = useState();
  const [nextOfKin, setNextOfKin] = useState();

  const handleClose = () => {
    setOpen(!open);
  };

  const addData = async () => {
    if (!uid) return;
    const userObject = {
      name: name,
      email: email,
      contacts: contacts,
      id: id,
      nextOfKin: nextOfKin,
    };
    await setDoc(doc(db, "users", uid), userObject, { merge: true });
    alert("Your Profile successfully updated!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addData();
    handleClose();
  };

  useEffect(() => {
    const user = USERS?.find((user) => user.uid === uid);
    if (uid) {
      setUser(user);
      setName(user?.name);
      setEmail(user?.email);
      setContacts(user?.contacts);
      setId(user?.id);
      setNextOfKin(user?.nextOfKin);
    }
  }, []);

  const handleChangeDP = () => {
    alert("change DP");
  };

  return (
    <div className="flex cols-center">
      <div className="bg-black/70 px-4 m-5 h-[30vh] w-full row  ">
        {/* DP Section */}
        <div className="relative flex w-1/4 h-full ">
          <button
            className="absolute bottom-[10%] right-[20%] z-10 p-0 hover:border-opacity-0"
            onClick={handleChangeDP}
          >
            <CameraAltIcon />
          </button>
          <Avatar
            src={user?.profile_picture}
            alt="DP"
            className="custom-borders rounded-full"
            sx={{ width: "90%", height: "90%" }}
          />
        </div>
        {/* USER details */}
        <div className="col justify-center m-2 custom-borders px-3 w-1/3">
          <p className="text-xl">
            {user?.name} {user?.name}
          </p>
          <div className="text-sm text-white/60 col ">
            <p>{"Position Name"}</p>
            <p>Groups : {user?.groups.join(" ")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <p>Namedsfdsfdsfdsfsdfs</p>
          <p>Name</p>
          <p>Name</p>
          <p>Name</p>
          <p>Name</p>
          <p>Name</p>
        </div>
      </div>
      <div className=" grid grid-flow-col w-[40vw] h-[10vh]">
        <Button onClick={() => navigate(`/chatpage/${uid}`)}>Chat</Button>
        <Button onClick={() => handleClose()} className="m-2">
          Messages
        </Button>
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
            <CloseIcon />
          </button>
          <form onSubmit={handleSubmit} className="h-[80vh] m-3 p-1 col mx-[10vw]">
            <TextInputComponents
              id="name"
              type="text"
              placeholder="Enter Phone Number"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextInputComponents
              id="email"
              type="email"
              placeholder="Enter Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInputComponents
              id="number"
              type="number"
              placeholder="Enter Phone Number"
              value={contacts}
              onChange={(e) => setContacts(e.target.value)}
            />
            <TextInputComponents
              placeholder="Enter id number"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <TextInputComponents
              placeholder="Enter Next of kin"
              value={nextOfKin}
              onChange={(e) => setNextOfKin(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default UserProfile;
