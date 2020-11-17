import React from "react";
import Letter from "./Letter";

export default function ImageText({ size, children, onClick, className }) {
  return (
    <div className={className} onClick={onClick}>
      {children.split("").map((val, idx) => {
        return <Letter key={idx} size={size} char={val} />;
      })}
    </div>
  );
}
