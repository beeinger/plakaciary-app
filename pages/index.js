import React, { useEffect } from "react";
import { useRouter } from "next/router";
import TilesLine from "../components/TilesLine";
import Skeleton from "../components/Skeleton";
import Slogan from "../components/Slogan";
import Search from "../components/Search";
import Head from "next/head";

function index({ data, search }) {
  const router = useRouter();
  const { d } = router.query;

  const handleMap = (val, idx) => <Slogan key={idx}>{val.item || val}</Slogan>;

  useEffect(() => {
    if (d) data.provideDataHash(d);
    if (!data.password) {
      router.push("/login");
      return;
    }
    const timeout = setTimeout(data.updateData, 1000);
    if (d || data.value) clearTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [d]);

  return (
    <>
      <Head>
        <title>Home - Slogans</title>
      </Head>
      <Search search={search} data={data} disabled={!Boolean(data.value)} />
      {data.value ? (
        data.value.slogans.length > 0 ? (
          search.query.length === 0 ||
          (search.query.length === 1 && search.query[0].length === 0) ? (
            <>
              <TilesLine slogans={data.value.slogans} />
              <hr />
              {data.value.slogans.map(handleMap)}
            </>
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
