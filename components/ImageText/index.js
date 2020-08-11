import React from "react";
import Letter from "./Letter";

function ImageText({ children }) {
  return (
    <div>
      {children.split("").map((val) => {
        return <Letter char={val} />;
      })}
    </div>
  );
}

export default ImageText;
