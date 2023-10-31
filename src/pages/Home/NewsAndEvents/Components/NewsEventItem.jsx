import React from "react";
import { Avatar } from "@mui/material";
import { faker } from "@faker-js/faker";

const NewsEventItem = ({ item }) => {
  const { news, newsHeadline, uploadedBy, file } = item;
  const image = file ? file : faker.image.url();
  const handleClick= (e)=>{
    e.preventDefault()
    console.log('Clicked')
  }
  return (
    <div className="grid grid-flow-col space-x-3 grid-cols-3 mx-2 my-1 py-2 custom-borders hover:scale-[1.02] cursor-pointer" onClick={handleClick}>
      <img
        src={image}
        alt="Image"
        loading="lazy"
        className="w-full h-[15vw] object-cover"
      />
      <div className="col-span-2 col justify-between ">
        <div>
          <h2 className="first-letter:uppercase">{newsHeadline}</h2>
          <p className="text-sm text-white/40">
            {news.length > 100 ? news.slice(0, 150) + "..." : news}
          </p>
        </div>
        <div className="flex flex-row m-2 space-x-3">
          <Avatar src="" alt="" sx={{ width: "2vw", height: "2vw" }} />
          <div className="flex flex-col">
            <p className="text-sm text-white/40">
              Uploaded By {uploadedBy.name} from {uploadedBy.department}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewsEventItem;
