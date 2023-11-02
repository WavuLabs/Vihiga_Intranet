import React from "react";
import { Avatar } from "@mui/material";
import { faker } from "@faker-js/faker";

const NewsItem = ({ item }) => {
  const { news, newsHeadline, uploadedBy, file } = item;
  const image = file ? file : faker.image.url();
  const handleClick = (e) => {
    e.preventDefault();
    console.log("Clicked");
  };
  return (
    <div
      className="grid grid-cols-3 space-x-3 m-2 py-2 h-[26vh] border border-white/20 hover:scale-[1.02] cursor-pointer overflow-clip"
      onClick={handleClick}
    >
      <div className="">
        <img
          src={image}
          alt="Image"
          loading="lazy"
          className="h-[24vh] w-full object-cover rounded-xl"
        />
      </div>
      <div className="col-span-2 col justify-between ">
        <div className="flex-1 col ">
          <h2 className="first-letter:uppercase">{newsHeadline}</h2>
          <p className="text-sm text-white/40 text-ellipsis overflow-hidden">
            {news?.length > 100 ? news.slice(0, 400) + "..." : news}
          </p>
        </div>
        <div className="flex flex-row m-2 space-x-3">
          <Avatar src="" alt="" sx={{ width: "2vw", height: "2vw" }} />
          <p className="text-sm text-white/40">
            Uploaded By {uploadedBy.name} from {uploadedBy.department}
          </p>
        </div>
      </div>
    </div>
  );
};
export default NewsItem;
