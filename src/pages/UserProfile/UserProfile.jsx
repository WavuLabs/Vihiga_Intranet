import { Avatar, Button, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { auth, db, storage } from "../../APIs/firebase";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { TextInputComponents } from "../../components/TextInputComponents";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ProgressIndicator } from "../../components/ProgressIndicator";
import DialogComponent from "../../components/DialogComponent";
import SelectDepartment from "../../components/SelectDepartment";
import { set } from "date-fns";

const UserProfile = () => {
  const navigate = useNavigate();
  const { uid, currentUser } = useOutletContext();
  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState(currentUser?.department);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showProgressIndicator, setShowProgressIndicator] = useState(false);
  const [updatedUserValues, setUpdatedUserValues] = useState();
  const handleClose = () => setOpen(!open);
  const userDocRef = doc(db, "users", uid);

  useEffect(() => {
    if (!currentUser) return;
    setDepartment(currentUser?.department);
    setUpdatedUserValues(currentUser);
    console.log("Current user Count");
  }, []);

  useEffect(() => {
    if (updatedUserValues?.department !== department) {
      if (!department) {
        console.log("No Department");
        return;
      }
      handleFieldChange("department", department);
    }
  }, [department]);

  const handleFieldChange = (field, value) => {
    //check if the updatedUserValues is set
    if (!updatedUserValues) setUpdatedUserValues(currentUser);

    //set the updatedUserValues
    setUpdatedUserValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
    console.log(field, value);
  };

  const addData = async () => {
    console.log(updatedUserValues);
    await setDoc(userDocRef, updatedUserValues, { merge: true });
    alert("Your Profile successfully updated!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!department) {
      alert("Please Select a Department");
      return;
    }
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
    } catch (error) {
      console.error(error);
    } finally {
      setShowProgressIndicator(false);
    }
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
          <p>{updatedUserValues?.contacts}</p>
        </div>
      </div>
      <div className=" grid grid-flow-col w-[40vw] h-[10vh]">
        <Button onClick={() => navigate(`/chatpage/${uid}`)}>Chat</Button>
        <Button onClick={() => handleClose()} className="m-2">
          Edit Profile
        </Button>
      </div>
      <DialogComponent props={{ open, setOpen }}>
        <form
          onSubmit={handleSubmit}
          className="h-[80vh] m-3 p-1 col mx-[10vw]"
        >
          <TextInputComponents
            placeholder="Enter Job Title"
            label="Job Title"
            defaultValue={currentUser?.jobTitle}
            helperText="Please Enter your Job Title"
            onChange={(e) => handleFieldChange("jobTitle", e.target.value)}
          />

          <SelectDepartment state={department} setState={setDepartment} />

          <TextInputComponents
            label="Job Description"
            placeholder="Enter Job Description"
            defaultValue={currentUser?.jobDescription}
            onChange={(e) =>
              handleFieldChange("jobDescription", e.target.value)
            }
          />
          <TextInputComponents
            label="Name"
            id="name"
            type="text"
            placeholder="Enter Name"
            defaultValue={currentUser?.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
          />
          <TextInputComponents
            id="email"
            type="email"
            placeholder="Enter Email"
            defaultValue={currentUser?.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
          />
          <TextInputComponents
            label="Contacts"
            id="number"
            type="number"
            maxLength="10"
            placeholder="Enter Phone Number"
            defaultValue={currentUser?.contacts}
            onChange={(e) => handleFieldChange("contacts", e.target.value)}
          />
          <TextInputComponents
            label="ID"
            placeholder="Enter id number"
            defaultValue={currentUser?.id}
            onChange={(e) => handleFieldChange("id", e.target.value)}
          />
          <TextInputComponents
            label="Next of Kin"
            placeholder="Enter Next of kin"
            defaultValue={currentUser?.nextOfKin}
            onChange={(e) => handleFieldChange("nextOfKin", e.target.value)}
          />
          <div className="h-[3vh]" />
          <Button type="submit">Submit</Button>
        </form>
      </DialogComponent>
      {showProgressIndicator && (
        <div className="z-50 top-[5vh] cols-center h-[80vh] w-[80vw] absolute backdrop-blur-sm bg-white/30">
          <ProgressIndicator />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
