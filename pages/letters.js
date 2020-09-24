import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function LettersScreen({ data }) {
  const router = useRouter();

  useEffect(() => {
    if (!data.value) {
      router.push("/");
    }
  }, [data.value]);

  return <div>Hello</div>;
}
