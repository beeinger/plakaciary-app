import React from "react";
import styled from "styled-components";
import Link from "components/Link";
import { useRouter } from "next/router";

function _Layout({ children, className }) {
  const router = useRouter();
  return (
    <>
      <div className={className}>{children}</div>
      {router.pathname !== "/login" && <Link />}
    </>
  );
}

const Layout = styled(_Layout)`
  margin: 32px 25vw 16px 25vw;

  @media screen and (max-width: 992px) {
    margin: 32px 15vw 16px 15vw;
  }

  @media screen and (max-width: 600px) {
    margin: 32px 5vw 16px 5vw;
  }
`;

export default Layout;
