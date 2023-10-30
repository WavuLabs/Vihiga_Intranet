const EventDates = (props) => {
  const { FormattedDate } = props;
  return (
    <div className="rows-center w-full p-2">
      <p className="font-bold text-sm">{FormattedDate}</p>
      <div className="flex-1 mx-2 px-2 ">
        <p className="text-blue-600 text-xl">News Title</p>
        <p>12.00 - 13.00</p>
      </div>
      <p className="text-sm rounded-xl h-fit px-3 bg-blue-600/40 ">Prority</p>
    </div>
  );
};

export default EventDates;
