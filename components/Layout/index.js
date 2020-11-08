import React, { useContext } from "react";
import styled from "styled-components";
import Footer from "../Footer";
import Link from "../Link";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";

const _Layout = styled.div`
  margin: 32px 25vw 16px 25vw;

  @media screen and (max-width: 992px) {
    margin: 32px 15vw 16px 15vw;
  }

  @media screen and (max-width: 600px) {
    margin: 32px 5vw 16px 5vw;
  }
`;

export default function Layout({ Component, pageProps, Context }) {
  const { data, search } = useContext(Context);
  const router = useRouter();
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <ToastContainer />
      <_Layout>
        <Component {...{ ...pageProps, ...{ data, search } }} />
      </_Layout>
      {router.pathname !== "/login" && <Link data={data} />}
      <Footer />
    </>
  );
}
