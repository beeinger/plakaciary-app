import React, { useRef } from "react";
import { LinkContainer } from "../../containers";
import { FiLink } from "react-icons/fi";
import styled from "styled-components";
import { toast } from "react-toastify";

const _Link = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;

  textarea {
    display: none;
  }
`;

export default function Link() {
  let link = LinkContainer.useContainer();

  const handleCopy = () => {
    toast.info("Link copied!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigator.clipboard.writeText(link.value);
  };

  return (
    <_Link onClick={handleCopy}>
      <FiLink size="40px" />
    </_Link>
  );
}
