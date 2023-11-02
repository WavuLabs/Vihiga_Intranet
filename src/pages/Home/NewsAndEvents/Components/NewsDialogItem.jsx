import React from "react";

const NewsDialogItem = ({ props }) => {
  const { newsItem } = props;
  const { news, newsHeadline, uploadedBy, file } = newsItem;
  return (
    <div className="h-[80vh] w-full col p-3">
      <p className="text-center text-3xl px-4 text-primary/70">{newsHeadline}</p>
      <div className="border-b-2 "/>
      <div className="col w-full m-2 gap-2">
        <img
          src={file}
          alt="Image"
          loading="lazy"
          className="h-[24vh] w-[30vw] object-cover rounded-xl"
        />

        <p> {news}</p>
      </div>
    </div>
  );
};

export default NewsDialogItem;
