import React from "react";
import styled from "styled-components";

function _Image({ src: _src, alt, className }) {
  const src = `/letters/minimised/${_src}.svg`;

  return <img {...{ src, alt, className }} />;
}

const Image = styled(_Image)`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
`;

export default Image;
