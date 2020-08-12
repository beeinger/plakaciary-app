import React from "react";
import Letter from "./Letter";

export default function ImageText({ size, children }) {
  return (
    <div>
      {children.split("").map((val) => {
        return <Letter size={size} char={val} />;
      })}
    </div>
  );
}
