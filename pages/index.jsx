import React, { useContext, useEffect } from "react";

import GlobalContext from "context";
import Head from "next/head";
import Link from "components/Link";
import Search from "components/Search";
import { Skeleton } from "react-angled";
import Slogan from "components/Slogan";
import TilesLine from "components/TilesLine";
import styled from "styled-components";
import { useRouter } from "next/router";

const Layout = styled.div`
  display: grid;

  grid-template:
    ". search ." 13vh
    ". slogans ." auto
    / auto 50vw auto;
  row-gap: 8px;

  @media screen and (max-width: 992px) {
    grid-template:
      ". search ." 13vh
      ". slogans ." auto
      / auto 60vw auto;
  }

  @media screen and (max-width: 600px) {
    grid-template:
      ". search ." 13vh
      ". slogans ." auto
      / auto 85vw auto;
  }

  .search {
    grid-area: search;
    align-self: center;
  }

  .slogans {
    grid-area: slogans;
  }
`;

export default function Index() {
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
  }, [d, data, password, provideDataHash, router, updateData]);

  return (
    <>
      <Head>
        <title>Home - Slogans</title>
      </Head>
      <Layout>
        <div className="search">
          <Search disabled={!Boolean(data)} />
        </div>
        {router.pathname !== "/login" && <Link />}
        {data ? (
          data.slogans.length > 0 ? (
            query.length === 0 ||
            (query.length === 1 && query[0].length === 0) ? (
              <div className="slogans">
                <TilesLine main slogans={data.slogans} margin="40px" />
                {data.slogans.map(handleMap)}
              </div>
            ) : (
              <div className="slogans">
                {fuse.search(query.join(" ")).map(handleMap)}
              </div>
            )
          ) : (
            <div className="slogans">
              <Slogan disabled>No slogans, add some.</Slogan>
            </div>
          )
        ) : (
          <div className="slogans">
            <Skeleton count={20} wrapper={Slogan} />
          </div>
        )}
      </Layout>
    </>
  );
}
