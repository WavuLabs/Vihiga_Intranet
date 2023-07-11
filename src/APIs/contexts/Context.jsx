import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const UserContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const uid = currentUser?.uid;
      setUser(uid);
    });
    return unsubscribe;
  }, []);

  //querying the Users
  const usersRef = collection(db, `users`);
  const queryUsers = query(usersRef, orderBy("name", "asc"));
  const [valueUSERS, loadingUSERS, error, snapshot] = useCollectionData(
    queryUsers,
    {
      idField: "id",
    }
  );
  const [USERS, setUSERS] = useState(valueUSERS);

  useEffect(() => {
    if (loadingUSERS === false) {
      return setUSERS(valueUSERS);
    }
  }, [loadingUSERS]);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const addingNewUsers = async () => {
    const usersObject = {
      name: "Test",
      email: "test@gmail.com",
      profile_picture:
        "https://avatars.dicebear.com/api/avataaars/your-seed.svg",
      is_online: true,
      groups: [],
      contacts: "0700000000",
      uid: user,
    };
    await setDoc(doc(db, "users", user), usersObject, { merge: true });
    console.log("Document successfully written!");
  };

  const value = {
    user,
    currentUser,
    USERS,
    loadingUSERS,
    addingNewUsers,
    setUser,
    createUser,
    signIn,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const ContextData = () => {
  return useContext(UserContext);
};
