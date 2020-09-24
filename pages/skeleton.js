import React from "react";
import Skeleton from "../components/Skeleton";

export default function skeleton() {
  return (
    <div>
      <Skeleton circle width="50px" height="50px" />
      <Skeleton count={6} />
    </div>
  );
}
