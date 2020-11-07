import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Skeleton from "../components/Skeleton";
import Slogan from "../components/Slogan";
import Search from "../components/Search";

function index({ data, search }) {
  const router = useRouter();
  const { d } = router.query;

  const handleMap = (val, idx) => {
    console.log(val);
    return <Slogan key={idx}>{val.item || val}</Slogan>;
  };

  useEffect(() => {
    const timeout = setTimeout(data.updateData, 1000);
    if (d) {
      console.log("clear");
      data.provideDataHash(d);
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [d]);

  useEffect(() => {
    console.log(search.query);
    data.fuse && console.log(data.fuse.search(search.query).map((val) => val));
  }, [data.fuse, search.query]);

  return (
    <>
      <Search search={search} data={data} />
      {data.value ? (
        data.value.slogans.length > 0 ? (
          search.query.length === 0 ||
          (search.query.length === 1 && search.query[0].length === 0) ? (
            data.value.slogans.map(handleMap)
          ) : (
            data.fuse.search(search.query.join(" ")).map(handleMap)
          )
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
