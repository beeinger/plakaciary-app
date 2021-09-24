import React, { useContext } from "react";

import Color from "color";
import { FiLink } from "react-icons/fi";
import GlobalContext from "context";
import styled from "styled-components";
import { toast } from "react-toastify";

const _Link = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  z-index: 999;

  > svg {
    cursor: pointer;
    color: ${({ disabled, theme }) =>
      disabled ? Color(theme.text).alpha(0.5).toString() : theme.text};
  }
`;

export default function Link() {
  const { link } = useContext(GlobalContext),
    handleCopy = () => {
      if (link === false) return;
      navigator.clipboard.writeText(link);
      toast.info("Link copied!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

  return (
    <_Link onClick={handleCopy} disabled={link === false}>
      <FiLink size="40px" />
    </_Link>
  );
}
