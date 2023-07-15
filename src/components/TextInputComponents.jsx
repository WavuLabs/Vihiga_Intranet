import React from "react";

export const TextInputComponents = (props) => {
  return (
    <input
      className="w-full my-2 bg-gray-900 text-white p-3 rounded-lg border-gray-400 focus:bg-slate-700 focus:border-gray-700"
      {...props}
    />
  );
};
