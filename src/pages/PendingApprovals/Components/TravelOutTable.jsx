import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
} from "@mui/material";
import { addDays, format, differenceInDays } from "date-fns";
import {
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import {
  useCollectionData,
  useCollectionDataOnce,
} from "react-firebase-hooks/firestore";
import { useOutletContext } from "react-router-dom";
import { db } from "../../../APIs/firebase";
import { styles } from "../../../constants/Constants";

const TravelOutTable = () => {
  const [data, setData] = useState([]);
  const { uid, currentUser } = useOutletContext();

  const path = `groups/${currentUser?.groups[0]}/travelOutRequests`;
  const q = query(collection(db, path), orderBy("startDate", "desc"));
  const [travelOutRequests, loading, error, snapshot] = useCollectionData(q);

  useEffect(() => {
    // Handle loading state
    if (loading) return;

    // Process data when not loading
    const filteredData = travelOutRequests
      ?.filter((item) => {
        return !(item.status === "rejected" || item.status === "approved");
      })
      .map((item) => {
        const startDate = new Date(item.startDate.seconds * 1000);
        const endDate = new Date(item.endDate.seconds * 1000);
        return { ...item, startDate, endDate };
      });

    setData(filteredData);
    console.log(data.length, "dataLength");

    error && console.log(error);
  }, [loading, travelOutRequests, error]);

  const handdleStatusChange = async (item, status) => {
    const Ref = doc(db, path, item.uid);
    await setDoc(Ref, { ...item, status: status }, { merge: true });
  };
  return (
    <div className="p-3">
      {data.length > 0 ? (
        <TableContainer sx={styles.col}>
          <Table className="p-2 w-3/4 border col-center text-black">
            <TableHead>
              <TableRow className="bg-slate-200">
                <TableCell>Name</TableCell>
                <TableCell>Leave Dates</TableCell>
                <TableCell>Total Days</TableCell>
                <TableCell>Travelling Destinaion</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {format(item.startDate, "PP")} -{" "}
                    {format(item.endDate, "PP")}
                  </TableCell>
                  <TableCell>
                    {differenceInDays(item.endDate, item.startDate)}
                    {" days"}
                  </TableCell>
                  <TableCell>{item.destination}</TableCell>
                  <TableCell>
                    <button
                      className="m-2 bg-green"
                      onClick={() => handdleStatusChange(item, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="m-2 bg-primary"
                      onClick={() => handdleStatusChange(item, "rejected")}
                    >
                      Reject
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p className="text-center">No Pending Approvals</p>
      )}
    </div>
  );
};

export default TravelOutTable;
