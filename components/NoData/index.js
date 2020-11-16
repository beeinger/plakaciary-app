import React from "react";

export default function NoData({ data }) {
  return (
    <div>
      Please provide url containing data
      <button
        onClick={() => {
          data.updateData();
        }}
      >
        setData
      </button>
    </div>
  );
}
