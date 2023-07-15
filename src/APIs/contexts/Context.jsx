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
  const [loggedInUser, setLoggedInUser] = useState(null);

  const usersRef = collection(db, `users`);
  const queryUsers = query(usersRef, orderBy("name", "asc"));
  const [USERS, loadingUSERS, errorUSERS, snapshotUSERS] = useCollectionData(
    queryUsers,
    {
      idField: "id",
    }
  );

  const groupsRef = collection(db, `groups`);
  const queryGROUPS = query(groupsRef, orderBy("name", "asc"));
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
    const user = USERS?.find((user) => user.uid === uid);

    if (!user) {
      console.log("Error: User not found");
      return null;
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

  const addingNewUsers = async (userObject) => {
    const { name, email, uid } = userObject;
    const usersObject = {
      name: name,
      email: email,
      profile_picture: "https://api.dicebear.com/6.x/adventurer/svg?seed=Abby",
      is_online: true,
      groups: [],
      contacts: "0700000000",
      uid: uid,
    };

    await setDoc(doc(db, "users", uid), usersObject, { merge: true });

    // const userRefMessages = collection(db, `users/${uid}/messages`);
    // await addDoc(userRefMessages, {
    //   sentAt: serverTimestamp(),
    //   senderID: "admin",
    //   receiverID: "admin",
    //   message: "Welcome to the chat app",
    // });

    console.log("Document successfully written!");
  };

  const value = {
    loggedInUser,
    USERS,
    loadingUSERS,
    GROUPS,
    loadingGROUPS,
    getUserName,
    setLoggedInUser,
    addingNewUsers,
    createUser,
    signIn,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const ContextData = () => {
  return useContext(UserContext);
};
