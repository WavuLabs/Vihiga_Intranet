import React, { useRef, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TuneIcon from "@mui/icons-material/Tune";
import { TextField } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DropDown from "../../components/DropDown";
import RadioGroupComponent from "../../components/RadioGroupComponent";
import { departments } from "../../constants/Constants";
import { AiFillCloseCircle } from "react-icons/ai";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../APIs/firebase";
import { set } from "date-fns";
import { data } from "autoprefixer";

const FormsAndTemplates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectDepartment, setSelectDepartment] = useState(false);
  const [searchIntatiated, setSearchIntatiated] = useState(false);
  const [forms, setForms] = useState([]);
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    inputRef.current.blur();
  };

  const getForms = async (name, department) => {
    setSearchIntatiated(true);
    const dataArray = [];
    setLoading(true);
    try {
      const Ref = collection(db, `departments/${department}/files`);
      const q = query(Ref, where("name", "==", name));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
      });
      setForms(dataArray);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleSearchItemClick = (file) => {
    window.open(file);
  };

  return (
    <div className="w-full my-[7vh]">
      {/* Create a Search Box */}
      <SkeletonTheme baseColor="#FFFFFF" highlightColor="#444">
        <form onSubmit={handleSubmit} className="cols-center w-full m-4">
          <TextField
            ref={inputRef}
            type="search"
            placeholder="Search Forms and Templates"
            className="w-[90vw] border border-white/40 rounded-md p-2 px-3 focus:outline-none focus:ring-blue-500"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            InputProps={{
              endAdornment: (
                <button>
                  <TuneIcon
                    onClick={() => setSelectDepartment(!selectDepartment)}
                    className="text-white/60"
                  />
                </button>
              ),
            }}
          />
          {
            <div className="rows-center">
              <DropDown
                Title={
                  <>
                    Select Department <ArrowDropDownIcon fontSize="large" />
                  </>
                }
              >
                <RadioGroupComponent
                  state={department}
                  setState={setDepartment}
                  data={departments}
                />
              </DropDown>
              {/* Display Selected Group */}
              {department && (
                <p className="bg-blue-950 rows-center rounded-md p-1 gap-x-2">
                  {department}
                  <AiFillCloseCircle onClick={() => setDepartment(null)} />
                </p>
              )}
            </div>
          }
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
              <div className="grid grid-cols-3 w-full m-4">
                {forms.length > 0 &&
                  forms.map((item, index) => (
                    <button
                      className="bg-slate-900 p-2 h-[15vh] w-[10vw] rounded-xl col justify-evenly items-center"
                      key={index}
                      onClick={() => handleSearchItemClick(item.file)}
                    >
                      {item.name}
                    </button>
                  ))}
              </div>
            ))}
        </form>
        <button onClick={() => getForms(searchQuery, department)}>
          Search
        </button>
      </SkeletonTheme>
    </div>
  );
};

export default FormsAndTemplates;
