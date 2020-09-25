import React, { useEffect } from "react";
import { useRouter } from "next/router";
import TilesLine from "../components/TilesLine";

export default function LettersScreen({ data }) {
  // const router = useRouter();

  // useEffect(() => {
  //   if (!data.value) {
  //     router.push("/");
  //   }
  // }, [data.value]);
  const Letters = [
    { letter: "A", count: "123" },
    { letter: "B", count: "456" },
    { letter: "C", count: "789" },
    { letter: "D", count: "120" },
    { letter: "E", count: "308" },
    { letter: "F", count: "465" },
    { letter: "G", count: "578" },
    { letter: "H", count: "255" },
    { letter: "I", count: "586" },
    { letter: "J", count: "4361" },
    { letter: "K", count: "12" },
    { letter: "L", count: "1894" },
    { letter: "M", count: "758" },
    { letter: "N", count: "69" },
    { letter: "O", count: "253" },
    { letter: "P", count: "764" },
    { letter: "R", count: "61" },
    { letter: "S", count: "5" },
    { letter: "T", count: "8" },
  ];

  return <TilesLine letters={Letters} size={"10vh"} />;
}
