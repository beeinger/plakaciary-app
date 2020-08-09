import React from "react";
import styled from "styled-components";
import Footer from "../Footer";
import Link from "../Link";
import { LinkContainer } from "../../containers";

const _Layout = styled.div`
  margin: 32px 25vw 16px 25vw;

  @media screen and (max-width: 992px) {
    margin: 32px 15vw 16px 15vw;
  }

  @media screen and (max-width: 600px) {
    margin: 32px 5vw 16px 5vw;
  }
`;

export default function Layout({ children }) {
  return (
    <LinkContainer.Provider>
      <div>
        <_Layout>{children}</_Layout>
      </div>
      <Link />
      <Footer />
    </LinkContainer.Provider>
  );
}
