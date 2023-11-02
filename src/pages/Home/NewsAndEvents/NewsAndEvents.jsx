import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../../APIs/firebase";
import { useOutletContext } from "react-router-dom";
import EventItem from "./Components/EventItem";
import NewsItem from "./Components/NewsItem";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
const all = -1000;
const NewsAndEvents = () => {
  const { currentUser } = useOutletContext();
  const [showAll, setShowAll] = useState(false);
  const [filterNews, setFilterNews] = useState(null);
  const [eventsInRange, setEventsInRange] = useState(null);
  const [customRange, setCustomRange] = useState([
    {
      startDate: addDays(new Date(), all),
      endDate: addDays(new Date(), 7),
      key: "selection",
      color: "#901106",
    },
  ]);
  const userDepartment = currentUser?.department;

  const newsRef = collection(db, `departments/${userDepartment}/news`);
  const queryNews = query(newsRef, orderBy("uploadTime", "desc"));
  const [newsData, loadingData, error] = useCollectionData(queryNews);

  const eventsRef = collection(db, `departments/${userDepartment}/events`);
  const queryEvents = query(eventsRef, orderBy("eventName", "desc"));
  const [eventsData, loadingEvents, errorEvents] =
    useCollectionData(queryEvents);

  useEffect(() => {
    if (!newsData || !eventsData) return;
    setFilterNews(
      newsData?.filter((news) => {
        const newsDate = new Date(news.uploadTime?.seconds * 1000);
        return (
          newsDate >= customRange[0].startDate &&
          newsDate <= customRange[0].endDate
        );
      })
    );
    setEventsInRange(
      eventsData?.filter((event) => {
        const { eventStartTime, eventEndTime } = event.eventTime;
        const eventStartDate = new Date(eventStartTime?.seconds * 1000);
        const eventEndDate = new Date(eventEndTime?.seconds * 1000);
        return (
          eventStartDate >= customRange[0].startDate &&
          eventEndDate <= customRange[0].endDate
        );
      })
    );
  }, [customRange, eventsData, newsData, loadingData, loadingEvents]);

  const toggleShowAll = () => setShowAll(!showAll);
  const displayedEvents = showAll ? eventsInRange : eventsData?.slice(0, 3);
  const displayedNews = showAll ? filterNews : filterNews?.slice(0, 3);

  return (
    <div className="my-5 mx-3 w-full h-h-[90vh] overflow-clip">
      <div className="row justify-between">
        <p className="p-title my-3 p-3">News & Events</p>
        <button onClick={() => toggleShowAll()}>Show All</button>
      </div>
      <div className="grid grid-cols-3 space-x-2 px-2 h-[70vh] ">
        <div className="col-span-2 overflow-y-scroll">
          {filterNews ? (
            <div className=" grid grid-flow-row gap-5 m-1 ">
              {displayedNews?.map((item, index) => (
                <div className="m-1" key={index}>
                  <NewsItem item={item} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center self-center">No News</p>
          )}
        </div>
        <div className="col overflow-y-scroll">
          <DateRangePicker
            className=" text-black w-[30vw]"
            onChange={(item) => setCustomRange([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={customRange}
            color="red"
            direction="horizontal"
          />
          <h1>Events</h1>
          {eventsData ? (
            displayedEvents?.map((event, index) => {
              return <EventItem key={index} event={event} />;
            })
          ) : (
            <p className="text-center self-center">No Events</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsAndEvents;
