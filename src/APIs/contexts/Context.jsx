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
import { auth, db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const UserContext = createContext();

export const ContextProvider = ({ children }) => {
  const userID = auth.currentUser?.uid;

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
    await setDoc(doc(db, "departments", departmentName), departmentObject, { merge: true });
    console.log("Document successfully written!");
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
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const ContextData = () => {
  return useContext(UserContext);
};
