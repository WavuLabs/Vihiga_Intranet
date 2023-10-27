import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AiFillCloseCircle } from "react-icons/ai";
import { db, storage } from "../../../APIs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import RadioGroupComponent from "../../../components/RadioGroupComponent";
import { departments } from "../../../constants/Constants";
import DropDown from "../../../components/DropDown";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import { ProgressIndicator } from "../../../components/ProgressIndicator";
import { TextField } from "@mui/material";

const UpLoadData = () => {
  const [file, setFile] = React.useState(null);
  const [department, setDepartment] = React.useState();
  const [fileName, setFileName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { currentUser } = useOutletContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !department) {
      alert("Please select a file and department");
      return;
    }

    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `forms/${file.name}`);
    try {
      setLoading(true);
      // Upload the file to Firebase Storage
      const uploadResult = await uploadBytes(storageRef, file);
      console.log("Restaurant file uploaded successfully!!!");

      // Upload completed successfully, now we can get the download URL
      const downloadURL = await getDownloadURL(uploadResult.ref);
      console.log("File available at", downloadURL);
      //   Upload to FireBase
      await uploadFileToFireBase(downloadURL);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //   Upload to FireBase function
  const uploadFileToFireBase = async (downloadURL) => {
    const data = {
      department: department,
      file: downloadURL,
      name: fileName,
      uploadTime: serverTimestamp(),
    };
    const Ref = doc(db, `departments/${department}/files`, file.name);
    await setDoc(Ref, data);
    console.log("File uploaded to FireBase");
  };

  return (
    <div className="bg-slate-900 p-2 h-[50vh] w-[80vw] rounded-xl col justify-evenly ">
      <form onSubmit={handleSubmit} className="col">
        <TextField
          type="text"
          placeholder="Enter File Name"
          onChange={(e) => setFileName(e.target.value)}
        />
        <div className="row">
          <DropDown
            Title={
              <>
                Select Department <ArrowDropDownIcon fontSize="large" />
              </>
            }
          >
            <RadioGroupComponent
              state={department}
              setState={setDepartment}
              data={departments}
            />
          </DropDown>
          {/* Display Selected Group */}
          {department && (
            <p className="bg-blue-950 rows-center rounded-md p-1 gap-x-2">
              {department}
              <AiFillCloseCircle onClick={() => setDepartment(null)} />
            </p>
          )}
        </div>
        <input
          required
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="m-2 w-1/4" type="submit">
          Upload
        </button>
      </form>

      {loading && (
        <div className="absolute w-full h-full bg-white/40">
          <ProgressIndicator />
        </div>
      )}
    </div>
  );
};

export default UpLoadData;
