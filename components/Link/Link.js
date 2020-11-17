import React, { useContext } from "react";
import { FiLink } from "react-icons/fi";
import styled from "styled-components";
import { toast } from "react-toastify";
import GlobalContext from "context";

const _Link = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  z-index: 999;

  > svg {
    color: ${({ disabled }) => (disabled ? "grey" : "black")};
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
