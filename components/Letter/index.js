import React from "react";

export default function Letter({ letter, count }) {
  return <div>{letter + " " + count}</div>;
}
