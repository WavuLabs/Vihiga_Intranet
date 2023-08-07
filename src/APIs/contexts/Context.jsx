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
  const [userState, setUserState] = useState([]);
  const [loggedInUserName, setLoggedInUserName] = useState(null);
  const [userGroups, setUserGroups] = useState([]);

  const usersRef = collection(db, `users`);
  const queryUsers = query(usersRef, orderBy("name", "asc"));
  const [USERS, loadingUSERS, errorUSERS] = useCollectionData(queryUsers);

  const handleGetUsers = async () => {
    const dataArray = [];
    const querySnapshot = await getDocs(queryUsers);

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const snapshotData = { ...docData, documentID: doc.id };
      dataArray.push(snapshotData);
    });

    setUserState(dataArray);
  };

  useEffect(() => {
    loadingUSERS == false && setUserState(USERS);
  errorUSERS && alert(errorUSERS, "error loading users")
  }, [loadingUSERS]);

  const groupsRef = collection(db, `groups`);
  const queryGROUPS = query(groupsRef, orderBy("groupName", "asc"));
  const [GROUPS, loadingGROUPS, errorGROUPS] = useCollectionData(queryGROUPS);

  //querying the Users
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      const uid = currentUser?.uid;
      setOnlineStatusTrue(uid);
    });
    return unsubscribe;
  }, []);

  const getUserName = (uid, setName, setProfilePic) => {
    setName("");
    setProfilePic("");
    if (!userState) handleGetUsers();
    const user = userState?.find((user) => user.uid === uid);
    if (!user) return;
    
    setName(user.name);
    setProfilePic(user.profile_picture);
  };

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

  const addingUserToGroup = async (groupName, groupObject) => {
    await setDoc(doc(db, "groups", groupName), groupObject, { merge: true });
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
    USERS,
    loadingUSERS,
    GROUPS,
    loadingGROUPS,
    userGroups,
    loggedInUserName,
    userState,
    setLoggedInUserName,
    setUserGroups,
    getUserName,
    addingNewUsers,
    createUser,
    signIn,
    logout,
    addingUserToGroup,
    setOnlineStatusTrue,
    setOnlineStatusFalse,
    handleGetUsers,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const ContextData = () => {
  return useContext(UserContext);
};
