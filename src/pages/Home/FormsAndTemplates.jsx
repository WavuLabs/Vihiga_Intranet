import React, { useEffect, useRef, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TuneIcon from "@mui/icons-material/Tune";
import { TextField } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../APIs/firebase";
import SelectDepartment from "../../components/SelectDepartment";
import { useOutletContext } from "react-router-dom";
import { set } from "date-fns";

const FormsAndTemplates = () => {
  const { currentUser } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("Executive");
  const [loading, setLoading] = useState(false);
  const [searchIntatiated, setSearchIntatiated] = useState(false);
  const [forms, setForms] = useState([]);

  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const getForms = async (name, department) => {
    const dataArray = [];
    setLoading(true);
    setSearchIntatiated(true);
    const Ref = collection(db, `files`);
    const queryByDepartment = query(Ref, where("department", "==", department));
    try {
      const q = department === "All Departments" ? Ref : queryByDepartment;

      const snapshotData = await getDocs(q);
      snapshotData.forEach((doc) => {
        dataArray.push(doc.data());
      });

      if (name === "") return setForms(dataArray);

      const filteredData = dataArray.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );
      // console.log(filteredData, "filtered data");

      setForms(filteredData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchItemClick = (file) => {
    window.open(file);
  };

  useEffect(() => {
    getForms(searchQuery, department);
  }, [department, currentUser]);

  useEffect(() => {
    setDepartment(currentUser?.department);
  }, [currentUser]);

  return (
    <div className="w-full my-[7vh]">
      <p className="text-white/60 text-center">Forms and Templates</p>
      {/* Create a Search Box */}
      <SkeletonTheme baseColor="#FFFFFF" highlightColor="#444">
        <form onSubmit={handleSubmit} className="cols-center w-full sm:m-4">
          <TextField
            ref={inputRef}
            type="search"
            placeholder="Search Forms and Templates"
            className="w-[90vw] border border-white/40 rounded-md p-2 px-3 focus:outline-none focus:ring-blue-500"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              getForms(event.target.value, department);
            }}
          />
          <SelectDepartment state={department} setState={setDepartment} />

          {searchIntatiated &&
            (loading === true ? (
              <Skeleton
                count={6}
                containerClassName="grid grid-cols-3 w-full m-4"
                inline
                width="30vw"
                height="6vh"
                className="m-2"
              />
            ) : (
              <div className=" w-full m-4">
                {forms.length > 0 ? (
                  <div className="grid sm:grid-cols-5 grid-flow-col w-full m-4 mx-[2vw]">
                    {forms.map((item, index) => (
                      <button
                        key={index}
                        className="bg-slate-900 m-2 p-2 h-[20vh] sm:w-[15vw] rounded-xl col justify-evenly items-center"
                        onClick={() => handleSearchItemClick(item.file)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="cols-center w-full">
                    {department === null ? (
                      <p className="text-white/60">No Department selected</p>
                    ) : (
                      <p className="text-white/60">No results found</p>
                    )}
                  </div>
                )}
              </div>
            ))}
        </form>
      </SkeletonTheme>
    </div>
  );
};

export default FormsAndTemplates;
