import Image from "../Image";
import React from "react";
import { parseCharToImagePath } from "utils";
import styled from "styled-components";

function _Letter({ char: _char, className }) {
  const char = parseCharToImagePath(_char);
  return char === " " ? (
    <span className={className} />
  ) : (
    <Image className={className} src={char} alt={char} />
  );
}

const Letter = styled(_Letter)`
  width: 0.75em;
  height: 1em;
  font-family: "Coda Caption", sans-serif;
  font-size: ${({ size }) => size || "inherit"};
  line-height: 1em;
  display: inline-block;
  justify-self: center;
`;

export default Letter;
