import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { limit, serverTimestamp } from "firebase/firestore";
import SelectDepartment from "../../../../components/SelectDepartment";
import { ContextData } from "../../../../APIs/contexts/Context";
import { ProgressIndicator } from "../../../../components/ProgressIndicator";
import { set } from "date-fns";

const AddNews = ({ handleClose }) => {
  const { currentUser } = useOutletContext();
  const [news, setNews] = useState("");
  const [newsHeadline, setNewsHeadline] = useState("");
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const { uploadFileToStorageAndFirestore } = ContextData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!department) {
      alert("Please select a file and department");
      setLoading(false);
      return;
    }
    const newsData = {
      newsHeadline: newsHeadline,
      news: news,
      department: department,
      uploadTime: serverTimestamp(),
      uploadedBy: {
        uid: currentUser.uid,
        name: currentUser.name,
        department: currentUser.department,
      },
    };
    const firestorePath = `news/${newsHeadline}`;
    const storagePath = `forms/${department}/news/${file.name}`;

    await uploadFileToStorageAndFirestore(
      file,
      storagePath,
      newsData,
      firestorePath
    );
    setLoading(false);
    alert("News Added");
    handleClose();
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
          onChange={(e) => {
            if (e.target.value.length <= 100) {
              setNewsHeadline(e.target.value);
            }
          }}
          error={newsHeadline.length > 100}
          helperText={
            newsHeadline.length > 100
              ? "Limit 100 characters"
              : `${newsHeadline.length}/100 characters`
          }
          className="w-[50vw]"
          margin="normal"
          variant="outlined"
          placeholder="Enter News"
          required
          maxLength={10}
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

export default AddNews;
