import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  MenuItem,
  FormLabel,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { arrayUnion } from "firebase/firestore";
import { AiFillCloseCircle } from "react-icons/ai";

import { ContextData } from "../../APIs/contexts/Context";
import { ProgressIndicator } from "../../components/ProgressIndicator";
import { TextInputComponents } from "../../components/TextInputComponents";
import DropDown from "../../components/DropDown";
import { auth } from "../../APIs/firebase";
import { updateProfile } from "firebase/auth";

const MyComponent = (props) => {
  const { group, setGroup } = props.values;
  const handleOptionChange = (event) => {
    setGroup(event.target.value);
    console.log(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup value={group} onChange={handleOptionChange}>
        <FormControlLabel value="Exco" control={<Radio />} label="Exco" />
        <FormControlLabel
          value="Directors"
          control={<Radio />}
          label="Directors"
        />
        <FormControlLabel
          value="Chief Officers"
          control={<Radio />}
          label="Chief Officers"
        />
      </RadioGroup>
    </FormControl>
  );
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("");
  const [showProgressIndicator, setShowProgressIndicator] = useState(false);
  const { addingNewUsers, createUser, addingUserToGroup } = ContextData();
  const navigate = useNavigate();

  const HandleSignup = async (e) => {
    e.preventDefault();
    setShowProgressIndicator(true);
    try {
      if (!password) {
        alert("Invalid Password");
      } else if (!email) {
        alert("Invalid Email");
      } else if (!name) {
        alert("Invalid Name");
      } else if (!group) {
        alert("Invalid Group");
      } else {
        await createUser(email, password)
          .then(async (userCredential) => {
            // Signed in
            const uid = userCredential.user.uid;
            const userObject = {
              name: name,
              email: email,
              uid: uid,
              groups: arrayUnion(group),
              profile_picture: faker.image.avatar(),
              is_online: true,
              contacts: faker.phone.number("+254 7## ### ###"),
            };
            await addingNewUsers(uid, userObject);

            //ADDING THE USER TO THE GROUP SELECTED, TAKE THE UID AND ADD IT TO THE GROUP
            const groupObject = {
              members: arrayUnion({ uid: uid, name: name }),
            };
            await addingUserToGroup(group, groupObject);
            navigate("/", { replace: true });

            await updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: faker.image.avatar(),
            });
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowProgressIndicator(false);
    }
  };
  function test() {
    console.log(alert("User created successfully", "success"));
  }

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
          className="max-w-md w-full px-4 py-8 text-center"
        >
          <h1 className="text-3xl font-semibold text-gray-400">Sign up</h1>
          <p onClick={test} className="text-gray-200">
            Create account
          </p>

          <TextInputComponents
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInputComponents
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextInputComponents
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="rows-center">
            <DropDown Title="Select Group">
              <MyComponent values={{ group, setGroup }} />
            </DropDown>
            {group && (
              <p className="bg-blue-950 rows-center rounded-md p-1 gap-x-2">
                {group}
                <AiFillCloseCircle onClick={() => setGroup(null)} />
              </p>
            )}
          </div>
          <button
            type="submit"
            className="my-4 w-full bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
