import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const UserContext = createContext();

export const ContextProvider = ({ children }) => {
  const userID = auth.currentUser?.uid;
  const serverTime = serverTimestamp();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    const uid = auth.currentUser?.uid;
    await auth.signOut();
    setOnlineStatusFalse(uid);
  };

  const addingNewUsers = async (uid, userObject, name) => {
    const userMessagesRef = collection(db, `messages/${uid}/messages`);

    await setDoc(doc(db, "users", uid), userObject, { merge: true });
    console.log("Document successfully written!");

    const messageObject = {
      sentAt: serverTimestamp(),
      senderID: { uid: "admin", name: "Chat Bot" },
      receiverID: { uid: uid, name: name },
      message: "Welcome!!",
    };
    await addDoc(userMessagesRef, messageObject);

    console.log("Message successfully written!");
  };

  const addingUserToDepartment = async (departmentName, departmentObject) => {
    await setDoc(doc(db, "departments", departmentName), departmentObject, {
      merge: true,
    });
    console.log("Document successfully written!");
  };

  const uploadFileToFireBase = async (data, path) => {
    const Ref = doc(db, path);
    await setDoc(Ref, data);
    console.log("File uploaded to FireBase");
  };

  const uploadFileToStorageAndFirestore = async (
    file,
    storagePath,
    data,
    firestorePath
  ) => {
    try {
      if (file) {
        const storageRef = ref(storage, storagePath);

        // Upload the file to Firebase Storage
        const uploadResult = await uploadBytes(storageRef, file);
        console.log("File uploaded successfully!!!");

        // Upload completed successfully, now we can get the download URL
        const downloadURL = await getDownloadURL(uploadResult.ref);
        console.log("File available at", downloadURL);

        const dataWithDownloadURL = { ...data, file: downloadURL };

        //   Upload to FireBase
        await uploadFileToFireBase(dataWithDownloadURL, firestorePath);
      } else {
        await uploadFileToFireBase(data, firestorePath);
      }
      // Create a reference to the file in Firebase Storage
    } catch (error) {
      console.log(error);
    }
  };

  const setOnlineStatusTrue = async (uid) => {
    try {
      uid &&
        (await setDoc(
          doc(db, "users", uid),
          { is_online: true },
          { merge: true }
        ));
    } catch (error) {
      console.log(error);
    }
  };
  const setOnlineStatusFalse = async (uid) => {
    try {
      uid &&
        (await setDoc(
          doc(db, "users", uid),
          { is_online: false },
          { merge: true }
        ));
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    addingNewUsers,
    createUser,
    signIn,
    logout,
    addingUserToDepartment,
    setOnlineStatusTrue,
    setOnlineStatusFalse,
    uploadFileToFireBase,
    uploadFileToStorageAndFirestore,
    serverTime,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const ContextData = () => {
  return useContext(UserContext);
};
