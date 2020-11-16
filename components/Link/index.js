import React from "react";
import { FiLink } from "react-icons/fi";
import styled from "styled-components";
import { toast } from "react-toastify";

const _Link = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  z-index: 999;

  > svg {
    color: ${({ disabled }) => (disabled ? "grey" : "black")};
  }
`;

export default function Link({ data }) {
  const handleCopy = () => {
    if (data.link !== false) {
      navigator.clipboard.writeText(data.link);
      toast.info("Link copied!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <_Link onClick={handleCopy} disabled={data.link === false}>
      <FiLink size="40px" />
    </_Link>
  );
}
