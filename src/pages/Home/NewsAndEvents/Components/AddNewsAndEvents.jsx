import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { serverTimestamp } from "firebase/firestore";
import SelectDepartment from "../../../../components/SelectDepartment";
import { ContextData } from "../../../../APIs/contexts/Context";
import { ProgressIndicator } from "../../../../components/ProgressIndicator";

const AddNewsAndEvents = () => {
  const [news, setNews] = useState("");
  const [newsHeadline, setNewsHeadline] = useState("");
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const { uploadFileToStorageAndFirestore } = ContextData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newsData = {
      newsHeadline: newsHeadline,
      news: news,
      time: serverTimestamp(),
    };
    const firestorePath = `departments/${department}/news/${newsHeadline}`;
    const storagePath = `forms/${department}/${file}`;

    await uploadFileToStorageAndFirestore(
      file,
      storagePath,
      newsData,
      firestorePath
    );
    setLoading(false);
  };

  return (
    <div className="w-full border p-3 ">
      {loading && (
        <div className="absolute w-full h-full bg-white/40">
          <ProgressIndicator />
        </div>
      )}
      <p className="text-lg text-center">Add news </p>
      <form onSubmit={handleSubmit} className="col">
        {/* News Headline */}
        <p className="text-sm text-gray-500">News Headline</p>
        <TextField
          label="News Headline"
          value={newsHeadline}
          onChange={(e) => setNewsHeadline(e.target.value)}
          multiline
          className="w-[50vw] m-28 "
          margin="normal"
          variant="outlined"
          placeholder="Enter News"
          required
          // size="small"
        />
        <p className="text-sm text-gray-500 m-2">News</p>
        <TextField
          label="News"
          value={news}
          onChange={(e) => setNews(e.target.value)}
          multiline
          className="flex-grow flex-1"
          variant="outlined"
          rows={10}
          placeholder="News Details"
          fullWidth
          required
        />
        {/* select Image */}
        <p className="text-sm text-gray-500 m-2">Select Image</p>
        <input
          type="file"
          className="m-2"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        {/* Select Department */}
        <SelectDepartment state={department} setState={setDepartment} />
        <Button
          sx={{ width: "100%", marginTop: "1rem" }}
          variant="outlined"
          type="submit"
        >
          Add News
        </Button>
      </form>
    </div>
  );
};

export default AddNewsAndEvents;
