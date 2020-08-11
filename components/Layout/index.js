import React from "react";
import styled from "styled-components";
import Footer from "../Footer";
import Link from "../Link";
import { ToastContainer } from "react-toastify";
import { DataContainer } from "../../containers";

const _Layout = styled.div`
  margin: 32px 25vw 16px 25vw;

  @media screen and (max-width: 992px) {
    margin: 32px 15vw 16px 15vw;
  }

  @media screen and (max-width: 600px) {
    margin: 32px 5vw 16px 5vw;
  }
`;

export default function Layout({ children, Component, pageProps }) {
  const data = DataContainer.useContainer();
  return (
    <div>
      <ToastContainer
        style={{ width: "40vw", position: "fixed", left: "60vw", top: "8px" }}
      />
      <_Layout>
        <Component {...{ ...pageProps, ...{ data } }} />
      </_Layout>
      <Link data={data} />
      <Footer />
    </div>
  );
}
