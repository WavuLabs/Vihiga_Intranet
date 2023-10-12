import {
  Avatar,
  Box,
  Button,
  Dialog,
  Slide,
  Tab,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import GroupsIcon from "@mui/icons-material/Groups";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { auth, db, storage } from "../../APIs/firebase";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { TextInputComponents } from "../../components/TextInputComponents";
import { set } from "date-fns";
import { addDoc, doc, setDoc, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PhotoCamera } from "@mui/icons-material";
import { ProgressIndicator } from "../../components/ProgressIndicator";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TabPanel = (props) => {
  const { children, data, index, ...other } = props;
  return (
    <TableContainer
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Table className="m-2 p-2 border col-center text-black">
        <TableHead>
          <TableRow className="bg-slate-200">
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {data.map((item, index) => ( */}
          <TableRow key={index}>
            <TableCell>Car Loan</TableCell>
            <TableCell>2000</TableCell>
            <TableCell>Yes</TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        // onClick={handleSubmit}
        className="m-4 self-end"
      >
        Submit
      </Button>
    </TableContainer>
  );
};

const UserProfile = () => {
  // const uid = auth.currentUser?.uid;
  const { USERS, uid } = useOutletContext();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [contacts, setContacts] = useState();
  const [id, setId] = useState();
  const [nextOfKin, setNextOfKin] = useState();
  const [image, setImage] = useState(null);
  const [groups, setGroups] = useState([]);
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [showProgressIndicator, setShowProgressIndicator] = useState(false);

  onSnapshot(doc(db, "users", uid), (doc) => {
    setUser(doc.data());
  });

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
    const dataArray = [];
    const getUser = USERS?.find((user) => user.uid === uid);
    dataArray.push(getUser);
    const groupsArray = [];
    getUser?.groups.map((group) => groupsArray.push(group));

    if (uid) {
      setData(dataArray);
      setUser(getUser);
      setName(user?.name);
      setEmail(user?.email);
      setContacts(user?.contacts);
      setId(user?.id);
      setNextOfKin(user?.nextOfKin);
      setGroups(groupsArray);
      console.log(data);
    }
  }, []);

  const uploadRestaurantImage = async () => {
    if (!image) return;
    setShowProgressIndicator(true);
    const storageRef = ref(storage, `DP/${uid}`);

    try {
      const uploadResult = await uploadBytes(storageRef, image);
      console.log("Restaurant file uploaded successfully!!!");

      // Upload completed successfully, now we can get the download URL
      const downloadURL = await getDownloadURL(uploadResult.ref);
      console.log("File available at", downloadURL);
      setImageUrl(downloadURL);

      if (!uid) return;
      await setDoc(
        doc(db, "users", uid),
        { profile_picture: imageUrl },
        { merge: true }
      );
      console.log("image succefully Updated")

      return downloadURL;
    } catch (error) {
      console.log(error);

      // TODO: handle errors using meaningful error message
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;
        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
        default:
        // unknown error
      }

      throw error;
    } finally {
      setShowProgressIndicator(false);
    }
  };

  const handleUpLoadImage = (e) => {
    e.preventDefault();
    uploadRestaurantImage();
  };

  useEffect(() => {
    image ? uploadRestaurantImage() : console.log("No Image");
  }, [image]);

  const handleFileBlur = () => {
    // handleUpLoadImage();
    console.log("File Uploaded", image);
  };

  return (
    <div className="cols-center relative">
      <div className="bg-black/70 px-4 m-5 h-[30vh] w-full row  ">
        {/* DP Section */}
        <div className="relative col w-1/4 h-full ">
          <button
            className="absolute bottom-[10%] right-[20%] z-10 p-0 hover:border-opacity-0"
            // onClick={handleChangeDP}
          >
            <Button
              component="label"
              sx={{
                backgroundColor: "#FFFFFF10",
                margin: "1px",
                padding: "1px",
              }}
            >
              <input
                hidden
                required
                name="imageInput"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                onBlur={handleFileBlur}
              />
              <CameraAltIcon className="text-white" fontSize="small" />
            </Button>
            {/* <CameraAltIcon /> */}
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
          <p className="text-xl">{user?.name}</p>
          <div className="text-sm text-white/60 col ">
            <p>{"Position Name"}</p>
            <div className="row">
              <p>Groups :</p>
              <div className="px-1">
                {groups?.map((group) => (
                  <p key={group}>{group}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {data?.map((user, index) => (
          <div key={index} className="grid grid-cols-2 mt-5 gap-1 p-3">
            <p>Email</p>
            <p>{user.email}</p>
            <p>ID</p>
            <p>{user.id ? user.id : "user?.name"}</p>
            <p>Next of Kin</p>
            <p>{user.nextOfKin}</p>
            <p>Contacts</p>
            <p>{user.contacts}</p>
          </div>
        ))}
      </div>
      <div className=" grid grid-flow-col w-[40vw] h-[10vh]">
        <Button onClick={() => navigate(`/chatpage/${uid}`)}>Chat</Button>
        <Button onClick={() => handleClose()} className="m-2">
          Edit Profile
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
          <form
            onSubmit={handleSubmit}
            className="h-[80vh] m-3 p-1 col mx-[10vw]"
          >
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
      {showProgressIndicator && (
        <div className="z-50 top-[5vh] cols-center h-[80vh] w-[80vw] absolute backdrop-blur-sm bg-white/30">
          <ProgressIndicator />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
