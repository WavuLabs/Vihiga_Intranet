import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  MenuItem,
  FormLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { AiFillCloseCircle } from "react-icons/ai";

import { ContextData } from "../../APIs/contexts/Context";
import { ProgressIndicator } from "../../components/ProgressIndicator";
import { TextInputComponents } from "../../components/TextInputComponents";
import DropDown from "../../components/DropDown";
import { auth, db, storage } from "../../APIs/firebase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PhotoCamera } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import RadioGroupComponent from "../../components/RadioGroupComponent";
import { JobTitles } from "../../constants/Constants";
import SelectDepartment from "../../components/SelectDepartment";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [department, setDepartment] = useState();
  const [showProgressIndicator, setShowProgressIndicator] = useState(false);
  const { addingNewUsers, createUser, addingUserToDepartment } = ContextData();
  const navigate = useNavigate();

  const HandleSignup = async (e) => {
    e.preventDefault();
    setShowProgressIndicator(true);
    !imageUrl && (await handleSetProfilePicture(image));
    try {
      if (!password) {
        alert("Invalid Password");
      } else if (!email) {
        alert("Invalid Email");
      } else if (!imageUrl) {
        alert("Invalid Image");
      } else if (!name) {
        alert("Invalid Name");
      } else if (!department) {
        alert("Invalid Department");
      } else {
        await createUser(email, password)
          .then(async (userCredential) => {
            const uid = userCredential.user.uid;
            // Signed in

            const userObject = {
              name: name,
              email: email,
              uid: uid,
              profile_picture: imageUrl,
              is_online: true,
              contacts: number,
              department: arrayUnion(department),
              jobTitle: jobTitle,
              jobDescription: jobDescription,
              physicalAddress: "",
              alternateEmail: "",
            };

            await addingNewUsers(uid, userObject, name);

            //ADDING THE USER TO THE GROUP SELECTED, TAKE THE UID AND ADD IT TO THE GROUP
            const DepartmentObject = {
              members: arrayUnion({
                uid: uid,
                name: name,
                jobTitle: jobTitle,
                jobDescription: jobDescription,
              }),
            };

            await addingUserToDepartment(department, DepartmentObject);

            await updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: imageUrl,
            });

            navigate("/home", { replace: true });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage);
          });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowProgressIndicator(false);
    }
  };

  const uploadRestaurantImage = async () => {
    if (!image) return;
    setShowProgressIndicator(true);
    const storageRef = ref(storage, `DP/${new Date().getTime()}_${image.name}`);

    try {
      // 'file' comes from the Blob or File API

      const uploadResult = await uploadBytes(storageRef, image);
      console.log("Restaurant file uploaded successfully!!!");

      // Upload completed successfully, now we can get the download URL
      const downloadURL = await getDownloadURL(uploadResult.ref);
      console.log("File available at", downloadURL);
      setImageUrl(downloadURL);

      return downloadURL;
    } catch (error) {
      console.log(error);
    } finally {
      setShowProgressIndicator(false);
    }
  };

  const handleSetProfilePicture = async (image) => {
    if (image) {
      if (imageUrl) return;
      const downloadURL = await uploadRestaurantImage(image);
      setImageUrl(downloadURL);
      console.log("Succefully Uploaded", imageUrl);
    }
  };
  const handleUpLoadImage = (e) => {
    e.preventDefault();
    handleSetProfilePicture(image);
  };
  useEffect(() => {
    if (!jobTitle || !department) return;
    setJobDescription(jobTitle + " " + department);
  }, [jobTitle, department]);

  return (
    <>
      {showProgressIndicator && (
        <div className={`pop-up`}>
          <ProgressIndicator />
        </div>
      )}
      <div className="w-full h-full flex justify-center items-center -z-10">
        <form
          onSubmit={HandleSignup}
          className="max-w-md w-full px-4 py-8 text-center overflow-clip"
        >
          <h1 className="text-3xl font-semibold text-gray-400">Sign up</h1>
          <p className="text-gray-200">Create account</p>

          <TextInputComponents
            label="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInputComponents
            label="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInputComponents
            label="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextInputComponents
            label="number"
            type="number"
            placeholder="Enter Phone Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <div className="rows-center">
            <SelectDepartment state={department} setState={setDepartment} />
          </div>
          <div className="rows-center">
            <DropDown
              Title={
                <>
                  Select Job Title <ArrowDropDownIcon fontSize="large" />
                </>
              }
            >
              <RadioGroupComponent
                state={jobTitle}
                setState={setJobTitle}
                data={JobTitles}
              />
            </DropDown>

            {/* Display Selected Group */}
            {jobTitle && (
              <p className="bg-blue-950 rows-center rounded-md p-1 gap-x-2">
                {jobTitle}
                <AiFillCloseCircle onClick={() => setJobTitle(null)} />
              </p>
            )}
          </div>
          {jobTitle && department && (
            <TextInputComponents
              id="Job Description"
              type="text"
              placeholder="Job Description i.e Chief Officer - Environment"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          )}
          <div className="flex flex-col px-3 ">
            <p className="m-1"> Select profile picture</p>
            {imageUrl ? (
              <p className="text-green-700">Image Succefully Uploaded</p>
            ) : image ? (
              <div className="rows-center justify-between ">
                <span className=" single-line">{image?.name}</span>
                <button
                  size="small"
                  className="m-1 self-start rows-center bg-primary/50"
                  onClick={handleUpLoadImage}
                >
                  <PhotoCamera fontSize="small" />
                  <span className="m-2 single-line">Upload Image</span>
                </button>
              </div>
            ) : (
              <Button variant="contained" component="label" size="small">
                <input
                  hidden
                  required
                  name="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <PhotoCamera fontSize="small" />
                <span className="single-line">Select Image</span>
              </Button>
            )}
          </div>
          <button
            type="submit"
            className="my-4 w-full bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Sign up
          </button>
          <button
            onClick={() => navigate("/", { replace: true })}
            className="my-4 bg-gray-700/60 text-white rounded hover:bg-gray-800"
          >
            Already Have an account
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
