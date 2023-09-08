import NewsEventItem from "./Components/NewsEventItem";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { useState } from "react";
import EventDates from "./Components/EventDates";

const NewsAndEvents = () => {
  const [date, setDate] = useState(dayjs());
  const now = dayjs(date).get("date");
  const FormattedDate = dayjs(date).format("DD MMM");
  return (
    <div className="my-5 mx-3 ">
      <p className="p-title my-3 p-3">News & Events</p>
      <div className="grid grid-flow-col space-x-2 px-2">
        <div className="col-span-2 grid grid-flow-row customs-border m-1 ">
          <NewsEventItem />
          <NewsEventItem />
          <NewsEventItem />
        </div>
        <div className="">
          <StaticDatePicker
            onChange={(date) => setDate(date)}
            defaultValue={dayjs()}
          />
          <EventDates FormattedDate={FormattedDate} />
          <EventDates FormattedDate={FormattedDate} />
          <EventDates FormattedDate={FormattedDate} />
        </div>
      </div>
    </div>
  );
};

export default NewsAndEvents;
