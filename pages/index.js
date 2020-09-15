import React from "react";
import dynamic from "next/dynamic";

const Slogans = dynamic(() => import("../views/Slogans"), { ssr: false });

export default function Main({ data }) {
  return <Slogans data={data} />;
}
