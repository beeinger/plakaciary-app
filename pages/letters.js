import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Letters from "../views/Letters";

export default function LettersScreen({ data }) {
  const router = useRouter();

  useEffect(() => {
    if (!data.value) {
      router.push("/");
    }
  }, [data.value]);

  return <Letters data={data} />;
}
