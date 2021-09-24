import React from "react";
import { ThemeContext } from "styled-components";
import styled from "styled-components";
import { useContext } from "react";

function _Image({ src: _src, alt, className }) {
  const theme = useContext(ThemeContext),
    src = `/letters/minimised/${theme.is || "light"}/${_src}.svg`;

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
