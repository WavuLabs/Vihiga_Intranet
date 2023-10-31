import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import Navbar from "../components/Navbar";
import { auth, db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ContextData } from "./contexts/Context";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const values = useOutletContext();
  const { setOnlineStatusTrue } = ContextData();
  const [userState, setUserState] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [uid, setUID] = useState();

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

  const departmentRef = collection(db, `departments`);
  const queryDepartment = query(departmentRef, orderBy("members", "asc"));
  const [DEPARTMENTS, loadingDEPARTMENTS, errorDEPARTMENTS] = useCollectionData(queryDepartment);

  //querying the Users
  const getUserName = (uid, setName, setProfilePic) => {
    setName("");
    setProfilePic("");
    const user = USERS?.find((user) => user.uid === uid);
    if (!user) return;

    setName(user.name);
    setProfilePic(user.profile_picture);
  };

  const data = {
    ...values,
    USERS,
    loadingUSERS,
    errorUSERS,
    getUserName,
    DEPARTMENTS,
    loadingDEPARTMENTS,
    errorDEPARTMENTS,
    uid,
    currentUser,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      const uid = currentUser?.uid;
      if (uid) {
        setOnlineStatusTrue(uid);
        setUID(uid);

        onSnapshot(doc(db, "users", uid), (doc) => {
          setCurrentUser(doc.data());
        });
      } else {
        navigate("/", { replace: true });
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loadingUSERS == false) {
      setUserState(USERS);
    }

    errorUSERS && alert(errorUSERS, "error loading users");
  }, [loadingUSERS]);

  return (
    <>
      {!loadingUSERS ? (
        <Navbar props={{ currentUser, uid }} />
      ) : (
        <div className=" bg-[#161B1C] h-[10vh] w-full" />
      )}
      <Outlet context={data} />
    </>
  );
};

export default ProtectedRoute;
