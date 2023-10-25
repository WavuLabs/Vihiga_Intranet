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
import {
  addDoc,
  doc,
  setDoc,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";
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
  const navigate = useNavigate();
  const { uid, currentUser } = useOutletContext();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(currentUser?.email);
  const [name, setName] = useState(currentUser?.name);
  const [contacts, setContacts] = useState(currentUser?.contacts);
  const [id, setId] = useState(currentUser?.id);
  const [nextOfKin, setNextOfKin] = useState(currentUser?.nextOfKin);
  const [jobTitle, setJobTitle] = useState(currentUser?.title);
  const [department, setDepartment] = useState(currentUser?.department);
  const [jobDescription, setJobDescription] = useState(
    currentUser?.jobDescription
  );
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showProgressIndicator, setShowProgressIndicator] = useState(false);
  const [initialDataFetched, setInitialDataFetched] = useState(false);

  const userDocRef = doc(db, "users", uid);

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
      department: arrayUnion(department),
      jobTitle: jobTitle,
      jobDescription: jobDescription,
    };
    await setDoc(userDocRef, userObject, { merge: true });
    alert("Your Profile successfully updated!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addData();
    handleClose();
  };

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
      await setDoc(userDocRef, { profile_picture: imageUrl }, { merge: true });
      console.log("image succefully Updated");

      if (currentUser?.profile_picture == null) {
        alert("Try to refresh the page to see the changes");
      }

      setInitialDataFetched(false);
    } catch (error) {
      console.error(error);
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
              />
              <CameraAltIcon className="text-white" fontSize="small" />
            </Button>
            {/* <CameraAltIcon /> */}
          </button>
          <Avatar
            src={currentUser?.profile_picture}
            alt="DP"
            className="custom-borders rounded-full"
            sx={{ width: "90%", height: "90%" }}
          />
        </div>
        {/* USER details */}
        <div className="col justify-center m-2 custom-borders px-3 w-1/3">
          <p className="text-xl">{currentUser?.name}</p>
          <div className="text-sm text-white/60 col ">
            <p>Department : {currentUser?.department}</p>
            <p>{currentUser?.jobDescription}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-5 gap-1 p-3">
          <p>Email</p>
          <p>{currentUser?.email}</p>
          <p>ID</p>
          <p>{currentUser?.id}</p>
          <p>Next of Kin</p>
          <p>{currentUser?.nextOfKin}</p>
          <p>Contacts</p>
          <p>{currentUser?.contacts}</p>
          <p>Physical Address</p>
          <p>Emergency Contacts</p>
          <p>Alternative Email</p>
          <p>{currentUser?.contacts}</p>
        </div>
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
              placeholder="Enter Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <TextInputComponents
              placeholder="Enter Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <TextInputComponents
              placeholder="Enter Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <TextInputComponents
              id="name"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextInputComponents
              id="email"
              type="email"
              placeholder="Enter Email"
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
            <div className="h-[1vh]" />
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
