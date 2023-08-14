import { Avatar } from "@mui/material";
import React from "react";
import { faker } from "@faker-js/faker";

const NewsEventItem = () => {
  return (
    <div className="grid grid-flow-col space-x-3 grid-cols-3 m-2 py-2 custom-borders">
      <img
        src={faker.image.url()}
        alt=""
        loading="lazy"
        className="w-full h-[15vw] object-cover"
      />
      <div className="col-span-2 flex flex-col ">
        <h2>News Title</h2>
        <p className="text-sm text-white/40">
          lorem!   lorem!lorem! lorem!lorem! lorem!lorem!lorem!lorem! lorem!lorem! lorem!lorem!lorem!
        </p>
        <div className="flex flex-row m-2 space-x-3">
          <Avatar src="" alt="" sx={{ width: "5vw", height: "5vw" }} />
          <div className="flex flex-col">
            <p className="text-sm text-white/40">Author</p>
            <p className="text-sm text-white/40">Author</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewsEventItem;
