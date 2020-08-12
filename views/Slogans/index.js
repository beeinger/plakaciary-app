import React, { useEffect } from "react";
import { useRouter } from "next/router";
import NoData from "./NoData";
import Slogan from "../../components/Slogan";

export default function Slogans({ data }) {
  const router = useRouter();
  const { d } = router.query;

  useEffect(() => {
    data.provideDataHash(d);
  }, []);

  if (!data.value) {
    return <NoData data={data} />;
  }

  return data.value.slogans.map((val) => <Slogan>{val}</Slogan>);
}
