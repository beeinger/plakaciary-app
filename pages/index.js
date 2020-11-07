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
    const timeout = setTimeout(data.updateData, 1000);
    if (d) {
      console.log("clear");
      data.provideDataHash(d);
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [d]);

  return (
    <>
      <Search search={search} data={data} />
      {data.value ? (
        data.value.slogans.length > 0 ? (
          data.value.slogans.map((val, idx) => {
            if (
              search.query.length === 0 ||
              (search.query.length === 1 && search.query[0].length === 0) ||
              findCommonElements(search.query, val.toUpperCase().split(" "))
            ) {
              return <Slogan key={idx}>{val}</Slogan>;
            }
          })
        ) : (
          <Slogan disabled>No slogans, add some.</Slogan>
        )
      ) : (
        <Skeleton count={20} wrapper={Slogan} />
      )}
    </>
  );
}

export default index;
