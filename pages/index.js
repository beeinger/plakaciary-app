import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Skeleton } from "react-angled";
import GlobalContext from "context";
import TilesLine from "components/TilesLine";
import Slogan from "components/Slogan";
import Search from "components/Search";

function index() {
  const router = useRouter(),
    { d } = router.query,
    {
      query,
      data,
      fuse,
      updateData,
      password,
      checked,
      toggleChecked,
      provideDataHash,
    } = useContext(GlobalContext),
    handleMap = (val, idx) => (
      <Slogan
        key={idx}
        id={val.item || val}
        toggleChecked={toggleChecked}
        checked={checked}
      >
        {val.item || val}
      </Slogan>
    );

  useEffect(() => {
    if (d) provideDataHash(d);
    if (!password) {
      router.push("/login");
      return;
    }
    const timeout = setTimeout(updateData, 1000);
    if (d || data) clearTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [d]);

  return (
    <>
      <Head>
        <title>Home - Slogans</title>
      </Head>
      <Search disabled={!Boolean(data)} />
      {data ? (
        data.slogans.length > 0 ? (
          query.length === 0 ||
          (query.length === 1 && query[0].length === 0) ? (
            <>
              <TilesLine main slogans={data.slogans} margin="40px" />
              {data.slogans.map(handleMap)}
            </>
          ) : (
            fuse.search(query.join(" ")).map(handleMap)
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
