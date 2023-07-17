import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, collection, query, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const UserContext = createContext();

export const ContextProvider = ({ children }) => {
  const userID = auth.currentUser?.uid;
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userGroups, setUserGroups] = useState([]);

  const usersRef = collection(db, `users`);
  const queryUsers = query(usersRef, orderBy("name", "asc"));
  const [USERS, loadingUSERS, errorUSERS, snapshotUSERS] = useCollectionData(
    queryUsers,
    {
      idField: "id",
    }
  );

  const groupsRef = collection(db, `groups`);
  const queryGROUPS = query(groupsRef, orderBy("groupName", "asc"));
  const [GROUPS, loadingGROUPS, errorGROUPS, snapshotGROUPS] =
    useCollectionData(queryGROUPS, {
      idField: "id",
    });

  //querying the Users
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      const uid = currentUser?.uid;
      setLoggedInUser(uid);
    });
    return unsubscribe;
  }, []);

  const getUserName = (uid, setName, setProfilePic) => {
    setName("");
    setProfilePic("");
    const user = USERS?.find((user) => user.uid === uid);

    if (!user) {
      console.log("Error: User not found");
      return;
    }
    setName(user.name);
    setProfilePic(user.profile_picture);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const addingNewUsers = async (uid, userObject) => {
    await setDoc(doc(db, "users", uid), userObject, { merge: true });
    console.log("Document successfully written!");
  };

  const addingUserToGroup = async (groupName, groupObject) => {
    await setDoc(doc(db, "groups", groupName), groupObject, { merge: true });
    console.log("Document successfully written!");
  };

  const value = {
    loggedInUser,
    USERS,
    loadingUSERS,
    GROUPS,
    loadingGROUPS,
    userGroups,
    setUserGroups,
    getUserName,
    setLoggedInUser,
    addingNewUsers,
    createUser,
    signIn,
    logout,
    addingUserToGroup,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const ContextData = () => {
  return useContext(UserContext);
};
