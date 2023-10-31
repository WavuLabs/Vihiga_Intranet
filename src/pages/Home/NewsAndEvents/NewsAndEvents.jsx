import { useEffect, useState } from "react";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import EventDates from "./Components/EventDates";
import NewsEventItem from "./Components/NewsEventItem";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../APIs/firebase";
import { useOutletContext } from "react-router-dom";

const NewsAndEvents = () => {
  const { currentUser } = useOutletContext();
  const [date, setDate] = useState(dayjs());
  const [department, setDepartment] = useState(null);
  const FormattedDate = dayjs(date).format("DD MMM");
  const userDepartment = [currentUser?.department];

  const Ref = collection(db, `departments/${userDepartment[0]}/news`);
  const queryNews = query(Ref, orderBy("time", "asc"));
  const [newsData, loadingData, error] = useCollectionData(queryNews);

  const eventsRef = collection(db, `departments/${userDepartment[0]}/events`);
  const queryEvents = query(eventsRef, orderBy("time", "asc"));
  const [eventsData, loadingEvents, errorEvents] =
    useCollectionData(queryEvents);

  const filterNews = newsData?.filter((item) => {
    const date = dayjs(item.time?.toDate()).format("DD MMM");
    return date === FormattedDate;
  });
  return (
    <div className="my-5 mx-3 ">
      <p className="p-title my-3 p-3">News & Events</p>
      <div className="grid grid-cols-3 space-x-2 px-2">
        <div className="col-span-2">
          {filterNews ? (
            <div className=" grid grid-flow-row customs-border m-1 ">
              {filterNews?.map((item, index) => (
                <div className="customs-border m-1" key={index}>
                  <NewsEventItem item={item} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center self-center">No News</p>
          )}
        </div>
        <div className="">
          <StaticDatePicker
            onChange={(date) => setDate(date)}
            defaultValue={dayjs()}
          />
          {eventsData ? (
            eventsData?.map((item, index) => (
              <EventDates key={index} item={item} />
            ))
          ) : (
            <p className="text-center self-center">No Events</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsAndEvents;
