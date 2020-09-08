import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Skeleton from "../components/Skeleton";
import Slogan from "../components/Slogan";
import Search from "../components/Search";
import { findCommonElements } from "../utils";

function index({ data, search }) {
  const router = useRouter();
  const { d } = router.query;

  useEffect(() => {
    data.provideDataHash(d);
  }, []);

  if (!data.value) {
    return <Skeleton count={20} wrapper={Slogan} />;
  }

  return (
    <>
      <Search search={search} data={data} />
      {data.value.slogans.map((val, idx) => {
        if (
          search.query.length === 0 ||
          (search.query.length === 1 && search.query[0].length === 0) ||
          findCommonElements(search.query, val.toUpperCase().split(" "))
        ) {
          return <Slogan key={idx}>{val}</Slogan>;
        }
      })}
    </>
  );
}

export default dynamic(() => Promise.resolve(index), {
  ssr: false,
});
