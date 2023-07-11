import { CircularProgress } from "@mui/material";

export const ProgressIndicator = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <CircularProgress size={40} />
    </div>
  );
};
