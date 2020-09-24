import React from "react";
import Letter from "./Letter";

export default function ImageText({ size, children, className }) {
  return (
    <div className={className}>
      {children.split("").map((val, idx) => {
        return <Letter key={idx} size={size} char={val} />;
      })}
    </div>
  );
}
